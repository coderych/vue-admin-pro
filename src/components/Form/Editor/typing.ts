import type { AiEditor } from 'aieditor'

export interface EditorInst {
  getInstance: () => AiEditor | null
}
