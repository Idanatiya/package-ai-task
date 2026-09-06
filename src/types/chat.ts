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
