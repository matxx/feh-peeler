export const GENERIC_ERROR_TEXT = 'Une erreur est survenue'
export const GENERIC_ERROR_TEXT_THAT_WILL_BE_CORRECTED =
  'Une erreur inconnue est survenue, nous en avons été informés et allons la corriger dans les plus brefs délais.'
export const GENERIC_ERROR_TEXT_DETAILED =
  "Une erreur inconnue est survenue, nous en avons été informés et allons la corriger dans les plus brefs délais. Il peut s'agir d'une erreur temporaire, vous pouvez réessayer dans quelques minutes."

export const MODES = ['multi-line', 'vertical']

export interface IOptions {
  text: string
  color?: string
  mode?: string
  timeout?: number
}
