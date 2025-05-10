const TYPE_TARGET = {
  activiti: 'http://activiti.org/bpmn',
  camunda: 'http://bpmn.io/schema/bpmn',
  flowable: 'http://flowable.org/bpmn',
}

export function getDefaultXML(id: string, name: string, type: 'camunda' | 'activiti' | 'flowable' = 'camunda') {
  console.log('获取默认XML', id, name, type)

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_${id}" 
  targetNamespace="${TYPE_TARGET[type]}" >
  <bpmn:process id="${id}" name="${name}" isExecutable="true" >
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${id}">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="182" y="162" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
}

export function downloadFile(filename: string, data: string, type: 'bpmn' | 'xml' | 'svg' = 'bpmn') {
  if (!filename || !data) {
    return
  }
  console.log('导出文件', filename, data, type)

  const a = document.createElement('a')
  a.href = `data:application/${type.toLocaleLowerCase() === 'svg' ? 'text/xml' : 'bpmn20-xml'};charset=UTF-8,${encodeURIComponent(data)}`
  a.download = `${filename}.${type}`
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}

const iconsByType: Record<string, string> = {
  Association: 'bpmn-icon-association',
  BusinessRuleTask: 'bpmn-icon-business-rule-task',
  CallActivity: 'bpmn-icon-call-activity',
  Collaboration: 'bpmn-icon-connection-multi',
  ConditionalFlow: 'bpmn-icon-conditional-flow',
  SequenceFlow: 'bpmn-icon-connection',
  DataInput: 'bpmn-icon-data-input',
  DataInputAssociation: 'bpmn-icon-data-input',
  DataOutput: 'bpmn-icon-data-output',
  DataOutputAssociation: 'bpmn-icon-data-output',
  DataObjectReference: 'bpmn-icon-data-object',
  DataStoreReference: 'bpmn-icon-data-store',
  DefaultFlow: 'bpmn-icon-default-flow',
  CancelEndEvent: 'bpmn-icon-end-event-cancel',
  CompensateEndEvent: 'bpmn-icon-end-event-compensation',
  ErrorEndEvent: 'bpmn-icon-end-event-error',
  EscalationEndEvent: 'bpmn-icon-end-event-escalation',
  LinkEndEvent: 'bpmn-icon-end-event-link',
  MessageEndEvent: 'bpmn-icon-end-event-message',
  MultipleEndEvent: 'bpmn-icon-end-event-multiple',
  EndEvent: 'bpmn-icon-end-event-none',
  SignalEndEvent: 'bpmn-icon-end-event-signal',
  TerminateEndEvent: 'bpmn-icon-end-event-terminate',
  EventSubProcess: 'bpmn-icon-event-subprocess-expanded',
  ComplexGateway: 'bpmn-icon-gateway-complex',
  EventBasedGateway: 'bpmn-icon-gateway-eventbased',
  ExclusiveGateway: 'bpmn-icon-gateway-xor',
  Gateway: 'bpmn-icon-gateway-none',
  InclusiveGateway: 'bpmn-icon-gateway-or',
  ParallelGateway: 'bpmn-icon-gateway-parallel',
  Group: 'bpmn-icon-group',
  CancelIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-cancel',
  CompensateIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-compensation',
  ConditionalIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-condition',
  ErrorIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-error',
  EscalationIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-escalation',
  LinkIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-link',
  MessageIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-message',
  MultipleIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-multiple',
  ConditionalIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-condition',
  EscalationIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-escalation',
  MessageIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-message',
  MultipleIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-multiple',
  ParallelIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-parallel-multiple',
  SignalIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-signal',
  TimerIntermediateCatchEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-timer',
  ParallelMultipleIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-parallel-multiple',
  SignalIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-signal',
  TimerIntermediateCatchEvent: 'bpmn-icon-intermediate-event-catch-timer',
  IntermediateThrowEvent: 'bpmn-icon-intermediate-event-none',
  CompensateIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-compensation',
  EscalationIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-escalation',
  LinkIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-link',
  MessageIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-message',
  MultipleIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-multiple',
  SignalIntermediateThrowEvent: 'bpmn-icon-intermediate-event-throw-signal',
  Lane: 'bpmn-icon-lane',
  ManualTask: 'bpmn-icon-manual-task',
  MessageFlow: 'bpmn-icon-connection-multi',
  Participant: 'bpmn-icon-participant',
  Process: 'bpmn-icon-service',
  ReceiveTask: 'bpmn-icon-receive-task',
  ScriptTask: 'bpmn-icon-script-task',
  SendTask: 'bpmn-icon-send-task',
  ServiceTask: 'bpmn-icon-service-task',
  CompensateStartEvent: 'bpmn-icon-start-event-compensation',
  ConditionalStartEvent: 'bpmn-icon-start-event-condition',
  ErrorStartEvent: 'bpmn-icon-start-event-error',
  EscalationStartEvent: 'bpmn-icon-start-event-escalation',
  MessageStartEvent: 'bpmn-icon-start-event-message',
  MultipleStartEvent: 'bpmn-icon-start-event-multiple',
  ConditionalStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-condition',
  EscalationStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-escalation',
  MessageStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-message',
  MultipleStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-multiple',
  ParallelMultipleStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-parallel-multiple',
  SignalStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-signal',
  TimerStartEventNonInterrupting: 'bpmn-icon-start-event-non-interrupting-timer',
  CancelBoundaryEvent: 'bpmn-icon-intermediate-event-catch-cancel',
  CompensateBoundaryEvent: 'bpmn-icon-intermediate-event-catch-compensation',
  ConditionalBoundaryEvent: 'bpmn-icon-intermediate-event-catch-condition',
  ErrorBoundaryEvent: 'bpmn-icon-intermediate-event-catch-error',
  EscalationBoundaryEvent: 'bpmn-icon-intermediate-event-catch-escalation',
  LinkBoundaryEvent: 'bpmn-icon-intermediate-event-catch-link',
  MessageBoundaryEvent: 'bpmn-icon-intermediate-event-catch-message',
  MultipleBoundaryEvent: 'bpmn-icon-intermediate-event-catch-multiple',
  BoundaryEvent: 'bpmn-icon-intermediate-event-none',
  ConditionalBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-condition',
  EscalationBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-escalation',
  MessageBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-message',
  MultipleBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-multiple',
  ParallelBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-parallel-multiple',
  SignalBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-signal',
  TimerBoundaryEventNonInterrupting: 'bpmn-icon-intermediate-event-catch-non-interrupting-timer',
  ParallelMultipleBoundaryEvent: 'bpmn-icon-intermediate-event-catch-parallel-multiple',
  SignalBoundaryEvent: 'bpmn-icon-intermediate-event-catch-signal',
  TimerBoundaryEvent: 'bpmn-icon-intermediate-event-catch-timer',
  StartEvent: 'bpmn-icon-start-event-none',
  ParallelMultipleStartEvent: 'bpmn-icon-start-event-parallel-multiple',
  SignalStartEvent: 'bpmn-icon-start-event-signal',
  TimerStartEvent: 'bpmn-icon-start-event-timer',
  CollapsedSubProcess: 'bpmn-icon-subprocess-collapsed',
  CollapsedAdHocSubProcess: 'bpmn-icon-subprocess-collapsed',
  ExpandedSubProcess: 'bpmn-icon-subprocess-expanded',
  ExpandedAdHocSubProcess: 'bpmn-icon-subprocess-expanded',
  Task: 'bpmn-icon-task',
  TextAnnotation: 'bpmn-icon-text-annotation',
  Transaction: 'bpmn-icon-transaction',
  UserTask: 'bpmn-icon-user-task',
}

export function getBpmnIcon(type?: string) {
  if (!type) {
    return 'bpmn-icon-service'
  }
  if (type.startsWith('bpmn:')) {
    type = type.replace('bpmn:', '')
  }
  return iconsByType[type]
}

export function getDocumentation(businessObject: any) {
  return businessObject?.documentation?.[0]?.text || null
}

export function getListenerType(extension: any) {
  if (!extension) {
    return null
  }
  else if (extension.class) {
    return 'class'
  }
  else if (extension.expression) {
    return 'expression'
  }
  else if (extension.delegateExpression) {
    return 'delegateExpression'
  }
  else {
    return null
  }
}

export function getListener(extension: any) {
  const _type = extension.$attrs?._type || getListenerType(extension)
  const _value = extension.$attrs?._value || extension.class || extension.expression || extension.delegateExpression

  return {
    _type,
    _value,
    class: extension.class,
    event: extension.event,
    expression: extension.expression,
    delegateExpression: extension.delegateExpression,
    script: extension.script,
  }
}

export function getConditionExpression(businessObject: any) {
  const attr = businessObject?.conditionExpression?.$attrs || {}

  let _type = 'none'
  if (businessObject?.conditionExpression?.language) {
    _type = 'script'
  }
  else if (businessObject?.conditionExpression?.body) {
    _type = 'expression'
  }

  let _scriptType = ''
  if (businessObject?.conditionExpression?.resource) {
    _scriptType = 'external'
  }
  else if (businessObject?.conditionExpression?.body) {
    _scriptType = 'inline'
  }

  return {
    _type: attr._type || _type,
    _scriptType: attr._scriptType || _scriptType,
    body: businessObject?.conditionExpression?.body || '',
    resource: businessObject?.conditionExpression?.resource || '',
    language: businessObject?.conditionExpression?.language || '',
  }
}

export function getImplementation(element: any) {
  const attr = element?.$attrs || {}
  const expression = element?.expression || ''
  const delegateExpression = element?.delegateExpression || ''
  const classValue = element?.class || ''
  const resultVariable = element?.resultVariable || ''

  let _implementationType = attr?._implementationType

  if (!_implementationType) {
    if (expression) {
      _implementationType = 'expression'
    }
    else if (delegateExpression) {
      _implementationType = 'delegateExpression'
    }
    else if (classValue) {
      _implementationType = 'class'
    }
    else {
      _implementationType = 'none'
    }
  }

  let _implementationValue = attr?._implementationValue
  if (!_implementationValue) {
    _implementationValue = expression || delegateExpression || classValue || ''
  }

  return {
    _implementationType,
    _implementationValue,
    expression,
    delegateExpression,
    class: classValue,
    resultVariable,
  }
}
