export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
}

export interface SuggestedQuestion {
  label: string
  query: string
}

export const GREETING_MESSAGE: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi Tomer 👋\nI'm your Berry Assistant.\nAsk me about berries, flavors, firmness, or stats.",
}

export const SUGGESTION_GROUPS: SuggestedQuestion[][] = [
  [
    { label: 'Which berry is the smoothest?', query: 'Which berry is the smoothest?' },
    { label: 'What is the biggest berry?', query: 'What is the biggest berry?' },
    { label: 'What is the smallest berry?', query: 'What is the smallest berry?' },
    { label: 'Highest gift power?', query: 'Which berry has the highest gift power?' },
  ],
  [
    { label: 'Show me spicy berries', query: 'Show me spicy berries' },
    { label: 'Show me sweet berries', query: 'Show me sweet berries' },
    { label: 'Show me sour berries', query: 'Show me sour berries' },
    { label: 'Show me dry berries', query: 'Show me dry berries' },
    { label: 'Show me bitter berries', query: 'Show me bitter berries' },
  ],
  [
    { label: 'Very soft berries', query: 'Show me very soft berries' },
    { label: 'Soft berries', query: 'Show me soft berries' },
    { label: 'Hard berries', query: 'Show me hard berries' },
    { label: 'Very hard berries', query: 'Show me very hard berries' },
    { label: 'Super hard berries', query: 'Show me super hard berries' },
  ],
  [
    { label: 'Compare Cheri and Chesto', query: 'Compare Cheri and Chesto' },
    { label: 'What can you help with?', query: 'What can you help me with?' },
  ],
]

export const GROUP_LABELS = ['Stats', 'Flavors', 'Firmness', 'Compare & Help'] as const
