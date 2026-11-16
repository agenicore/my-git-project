export type ChatPart = { text: string; href?: string };
export function chatParts(text: string): ChatPart[] {
 const pattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>"\]]+)/g;
 const parts: ChatPart[] = []; let end = 0;
 for (const match of text.matchAll(pattern)) {
  const start = match.index!;
  if (start > end) parts.push({text:text.slice(end,start)});
  const raw = match[2] || match[3]; let href = raw;
  if (!match[2]) {
   href = href.replace(/[.,!?;:]+$/, '');
   while (href.endsWith(')') && (href.match(/\)/g)||[]).length > (href.match(/\(/g)||[]).length) href = href.slice(0,-1);
  }
  try {
   const url = new URL(href);
   if (!['https:','http:'].includes(url.protocol) || url.username || url.password) throw Error();
   parts.push({text:match[1] || href,href});
   if (!match[2] && raw.length > href.length) parts.push({text:raw.slice(href.length)});
  } catch { parts.push({text:match[0]}); }
  end = start+match[0].length;
 }
 if (end < text.length) parts.push({text:text.slice(end)});
 return parts;
}
