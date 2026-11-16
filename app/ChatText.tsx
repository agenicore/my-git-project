import { chatParts } from '../lib/chat-links';
export default function ChatText({text}:{text:string}) {
 return <>{chatParts(text).map((part,index)=>part.href?<a key={index} href={part.href} target="_blank" rel="noopener noreferrer" className="chat-link">{part.text}</a>:<span key={index}>{part.text}</span>)}</>;
}
