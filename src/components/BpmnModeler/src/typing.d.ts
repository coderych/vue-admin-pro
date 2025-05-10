declare module 'bpmn-js-properties-panel' {
  export const BpmnPropertiesPanelModule: ModuleDeclaration
  export const BpmnPropertiesProviderModule: ModuleDeclaration
  export const CamundaPlatformPropertiesProviderModule: ModuleDeclaration
}

declare module 'diagram-js-grid' {
  export default ModuleDeclaration
}

interface ExtensionProperty {
  name: string
  value: string
}

interface ExecutionListener {
  _type: 'delegateExpression' | 'expression' | 'class' | null
  _value: string
  event: string
  expression?: string
  delegateExpression?: string
  class?: string
  script?: {
    scriptFormat: string
    resource: string
  }
}

interface TaskListener {
  _type: 'delegateExpression' | 'expression' | 'class' | null
  _value: string
  event: string
  expression?: string
  delegateExpression?: string
  class?: string
  script?: {
    scriptFormat: string
    resource: string
  }
}

interface ConditionExpression {
  _type: 'none' | 'script' | 'expression'
  _scriptType?: 'external' | 'inline'
  body?: string
  language?: string
  resource?: string
}

declare interface ElementData {
  element?: any
  id: string
  name?: string
  type?: string
  documentation?: string
  businessObject?: any
  executionListeners: ExecutionListener[]
  executionProperties: ExtensionProperty[]
  taskListeners: TaskListener[]
  conditionExpression: ConditionExpression
  _implementationType: 'expression' | 'delegateExpression' | 'class' | 'none'
  _implementationValue: string
  expression: string
  resultVariable: string
  class: string
  delegateExpression: string
}
