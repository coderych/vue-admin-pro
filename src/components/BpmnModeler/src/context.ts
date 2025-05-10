import type { ModdleElement, SaveXMLResult } from 'bpmn-js/lib/BaseViewer'
import type BpmnFactory from 'bpmn-js/lib/features/modeling/BpmnFactory'
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling'
import type { Element } from 'bpmn-js/lib/model/Types'
import type BpmnModeler from 'bpmn-js/lib/Modeler'
import type CommandStack from 'diagram-js/lib/command/CommandStack'
import type Canvas from 'diagram-js/lib/core/Canvas'
import { createGlobalState } from '@vueuse/core'
import { downloadFile, getConditionExpression, getDefaultXML, getDocumentation, getImplementation, getListener } from './helper'

const prefix = 'camunda'

const defaultElementData: ElementData = {
  id: '',
  executionListeners: [],
  executionProperties: [],
  taskListeners: [],
  conditionExpression: { _type: 'none' },
  expression: '',
  delegateExpression: '',
  class: '',
  resultVariable: '',
}

export const useBpmnModeler = createGlobalState(() => {
  const modeler = ref<BpmnModeler>({} as BpmnModeler)
  const scale = ref(1)
  const xml = ref<string>('')
  const recoverable = shallowRef(false)
  const revocable = shallowRef(false)
  const showMap: Record<'preview' | 'properties', boolean> = reactive({
    preview: false,
    properties: false,
  })

  const currentElement = shallowRef<Element | null>(null)
  const elementData = reactive<ElementData>({ ...defaultElementData })

  const canvas = computed<Canvas | null>(() => modeler.value?.get('canvas') as any)
  const commandStack = computed<CommandStack | null>(() => modeler.value?.get('commandStack') as any)
  const modeling = computed<Modeling | null>(() => modeler.value?.get('modeling') as any)
  const bpmnFactory = computed<BpmnFactory | null>(() => modeler.value?.get('bpmnFactory') as any)
  const moddle = computed<ModdleElement | null>(() => modeler.value?.get('moddle') as any)

  // 导入模型
  async function importXML(xmlStr: string): Promise<void> {
    if (!modeler.value) {
      throw new Error('modeler is not initialized')
    }
    try {
      xml.value = xmlStr
      const result = await modeler.value.importXML(xmlStr)
      const { warnings } = result
      console.log(warnings)
      center()
    }
    catch (error) {
      console.error(error)
      window.$message?.error('导入模型失败，数据格式不正确！')
    }
  }

  // 导出模型
  async function download(type: 'xml' | 'bpmn' | 'svg' = 'xml') {
    if (!modeler.value) {
      throw new Error('modeler is not initialized')
    }

    const filename = modeler.value.getDefinitions()?.rootElements?.[0]?.name || 'diagram'

    if (type === 'xml' || type === 'bpmn') {
      const { xml, error } = await modeler.value.saveXML({ format: true })
      if (error) {
        console.error(error)
        window.$message?.error('导出模型失败！')
        return
      }
      // 下载文件
      downloadFile(filename, xml!, type)
    }
    else if (type === 'svg') {
      try {
        const { svg } = await modeler.value.saveSVG()
        downloadFile(filename, svg!, 'svg')
      }
      catch (error) {
        console.error(error)
        window.$message?.error('导出SVG失败！')
      }
    }
  }

  // 缩放
  async function zoom(radio: number = 0) {
    if (radio === 0) {
      center()
      return
    }
    const newScale = scale.value + radio
    if (newScale <= 0.2 || newScale >= 4) {
      return
    }
    scale.value = newScale
    canvas.value?.zoom(scale.value)
  }

  // 撤销
  async function undo() {
    commandStack.value?.undo()
  }

  // 恢复
  async function redo() {
    commandStack.value?.redo()
  }

  // 创建流程图
  async function createDiagram() {
    const id = `Process_${new Date().getTime()}`
    const name = `业务流程_${new Date().getTime()}`
    importXML(getDefaultXML(id, name, 'camunda'))
    center()
  }

  // 居中
  function center() {
    canvas.value?.zoom('fit-viewport', 'auto' as any)
  }

  // 更新xml
  function updateXML() {
    modeler.value?.saveXML({ format: true }).then((res: SaveXMLResult) => {
      xml.value = res.xml || ''
    })
  }

  // 预览
  async function handlePreview() {
    showMap.preview = true
    // 读取xml
    const { xml: result, error } = await modeler.value?.saveXML({ format: true }) as any
    if (error) {
      console.error(error)
      window.$message?.error('导出模型失败！')
    }
    xml.value = result
  }

  // 更新属性
  function updateProperties(props: Record<string, any>, element: Element = currentElement.value!) {
    if (!element || !props) {
      return
    }
    modeling.value?.updateProperties(toRaw(element), props)
  }

  // 获取其他扩展元素
  function getOtherExtensionElements(type: string) {
    return currentElement.value?.businessObject?.extensionElements?.values?.filter((item: any) => item.$type !== type) || []
  }

  // 更新执行属性
  function updateExecutionProperties() {
    const properties = moddle.value?.create(`${prefix}:Properties`, {
      values: elementData.executionProperties?.map((item) => {
        return moddle.value?.create(`${prefix}:Property`, {
          name: item.name,
          value: item.value,
        })
      }),
    })

    const extensionElements = moddle.value?.create(`bpmn:ExtensionElements`, {
      values: getOtherExtensionElements(`${prefix}:Properties`).concat([properties]),
    })

    updateProperties({ extensionElements })
  }

  // 更新执行监听器
  function updateExecutionListeners() {
    const executionListeners = elementData.executionListeners.map((item) => {
      return moddle.value?.create(`${prefix}:ExecutionListener`, {
        event: item.event,
        expression: item.expression,
        class: item.class,
        delegateExpression: item.delegateExpression,
        script: item.script,
        _type: item._type,
        _value: item._value,
      })
    })

    const extensionElements = moddle.value?.create(`bpmn:ExtensionElements`, {
      values: getOtherExtensionElements(`${prefix}:ExecutionListener`).concat(executionListeners),
    })

    updateProperties({ extensionElements })
  }

  // 更新任务监听器
  function updateTaskListeners() {
    const taskListeners = elementData.taskListeners.map((item) => {
      return moddle.value?.create(`${prefix}:TaskListener`, {
        event: item.event,
        expression: item.expression,
        class: item.class,
        delegateExpression: item.delegateExpression,
        script: item.script,
        _type: item._type,
        _value: item._value,
      })
    })

    const extensionElements = moddle.value?.create(`camunda:ExtensionElements`, {
      values: getOtherExtensionElements(`${prefix}:TaskListener`).concat(taskListeners),
    })

    updateProperties({ extensionElements })
  }

  // 更新条件
  function updateConditionExpression() {
    if (elementData.conditionExpression._type === 'none') {
      updateProperties({
        conditionExpression: null,
      })
      return
    }

    if (elementData.conditionExpression._type === 'expression') {
      elementData.conditionExpression.language = ''
      elementData.conditionExpression.resource = ''
      elementData.conditionExpression._scriptType = undefined
    }
    else if (elementData.conditionExpression._type === 'script') {
      if (elementData.conditionExpression._scriptType === 'external') {
        elementData.conditionExpression.body = ''
      }
    }

    const conditionExpression = moddle.value?.create('bpmn:FormalExpression', {
      body: elementData.conditionExpression.body || null,
      language: elementData.conditionExpression.language || null,
      resource: elementData.conditionExpression.resource || null,
      _type: elementData.conditionExpression._type,
      _scriptType: elementData.conditionExpression._scriptType,
    })

    updateProperties({
      conditionExpression,
    })
  }

  // 更新元素
  function onUpdateElement(element: Element | null) {
    if (element === null) {
      currentElement.value = null
      Object.assign(elementData, { ...defaultElementData })
      return
    }
    currentElement.value = element
    const businessObject = element?.businessObject || {}

    const executionProperties: ElementData['executionListeners'] = []
    const executionListeners: ElementData['executionListeners'] = []
    const taskListeners: ElementData['taskListeners'] = []

    businessObject?.extensionElements?.values?.forEach((extension: any) => {
      if (extension.$type === `${prefix}:ExecutionListener`) {
        executionListeners.push(getListener(extension))
      }
      else if (extension.$type === `${prefix}:TaskListener`) {
        taskListeners.push(getListener(extension))
      }
      else if (extension.$type === `${prefix}:Properties`) {
        executionProperties.push(...extension?.values?.map((item: any) => ({ name: item.name, value: item.value })))
      }
    })

    // 合并数据
    Object.assign(elementData, {
      id: element?.id || null,
      businessObject,
      name: businessObject?.name || null,
      type: element?.type || null,
      documentation: getDocumentation(businessObject),
      executionListeners,
      executionProperties,
      taskListeners,
      conditionExpression: getConditionExpression(businessObject),
      ...getImplementation(businessObject),
    })

    console.log('elementData', elementData)
  }

  return {
    modeler,
    scale,
    xml,
    recoverable,
    revocable,
    showMap,
    currentElement,
    elementData,

    modeling,
    canvas,
    commandStack,
    bpmnFactory,
    moddle,

    importXML,
    download,
    zoom,
    undo,
    redo,
    createDiagram,
    updateXML,
    center,
    handlePreview,

    // 属性相关
    onUpdateElement,
    updateProperties,
    updateExecutionProperties,
    updateExecutionListeners,
    updateTaskListeners,
    updateConditionExpression,
  }
})
