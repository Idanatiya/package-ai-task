export type ChatMessageItem = {
  id: string
  direction: 'INCOMING' | 'OUTGOING'
  incoming: boolean
  from: string
  initials: string
  text: string
  entityType: string
  created: string
}

/** The searchable fields of a message, in the order they render. */
export type SearchableField = 'from' | 'text'

export type SearchMatch = {
  messageId: string
  field: SearchableField
  /** Which hit this is within that one field, matching highlightIndex at render time. */
  occurrence: number
}
