export type Message = { role: 'user' | 'assistant'; text: string; lesson?: number };

// Older saves lack timestamps. Preserve each lesson's message order and merge
// legacy conversations in curriculum order, once, into the shared feed.
export function continuousChats(chats: Record<string, Message[]>): Record<string, Message[]> {
  if (Object.keys(chats).length === 1 && Array.isArray(chats.all)) return chats;
  const legacy = Object.entries(chats).filter(([key]) => key !== 'all').sort(([a],[b]) => Number(a)-Number(b));
  return { all: [...legacy.flatMap(([key,messages]) => messages.map(message => ({ ...message, lesson: message.lesson ?? Number(key) }))), ...(chats.all || [])] };
}
