<script setup lang="ts">
import Modeler from 'bpmn-js/lib/Modeler.js'
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
import GridModule from 'diagram-js-grid'
import { ModelerTools } from './components'
import { useBpmnModeler } from './context'
import { TranslateModule } from './plugins/translate'
import './styles/index.css'

const {
  modeler,
  xml,
  scale,
  revocable,
  recoverable,
  commandStack,
  canvas,
  showMap,
  currentElement,
  importXML,
  createDiagram,
  updateXML,
  onUpdateElement,
} = useBpmnModeler()

async function init() {
  modeler.value = new Modeler({
    container: '#camunda-modeler',
    additionalModules: [
      GridModule,
      TranslateModule,
    ],
    moddleExtensions: {
      camunda: CamundaBpmnModdle,
    },
  })

  modeler.value?.on('element.changed', (e: any) => {
    const { element } = e
    onUpdateElement(element)
  })

  modeler.value?.on('selection.changed', (e: any) => {
    console.log('selection changed', e)

    const { newSelection } = e || {}
    if (newSelection?.length === 0) {
      onUpdateElement(canvas.value?.getRootElement() as any)
      showMap.properties = false
    }
    else if (newSelection?.length === 1) {
      onUpdateElement(newSelection[0])
      showMap.properties = true
    }
    else {
      onUpdateElement(null)
    }

    console.log('currentElement: ', currentElement.value)
  })

  modeler.value?.on('canvas.viewbox.changed', (e: any) => {
    scale.value = e?.viewbox?.scale || 1
  })

  modeler.value?.on('commandStack.changed', () => {
    revocable.value = commandStack.value?.canUndo() || false
    recoverable.value = commandStack.value?.canRedo() || false
    updateXML()
  })

  nextTick(() => {
    if (xml.value) {
      importXML(xml.value)
    }
    else {
      createDiagram()
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="camunda-modeler-container">
    <div id="camunda-modeler" @dblclick="showMap.properties = true">
      <ModelerTools />
    </div>

    <PropertiesPanel />
  </div>
</template>

<style scoped>
.camunda-modeler-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
#camunda-modeler {
  width: 100%;
  height: 100%;
  position: relative;
}

:deep(.bio-properties-panel-container) {
  overflow: hidden;
}
</style>
