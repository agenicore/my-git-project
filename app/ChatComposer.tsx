'use client';
import {useRef,useState} from 'react';
import {useDictation} from './useDictation';
export default function ChatComposer({busy,onSend}:{busy:boolean;onSend:(text:string,image?:string)=>Promise<boolean>}){
 const [text,setText]=useState('');const [image,setImage]=useState('');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const fileInput=useRef<HTMLInputElement>(null);
 const dictation=useDictation(text,setText);
 async function attach(file?:File){
  if(!file||busy||loading)return;
  setError('');
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){setError('Choose a PNG, JPEG, or WebP screenshot.');return;}
  if(file.size>10*1024*1024){setError('Choose an image smaller than 10 MB.');return;}
  setLoading(true);
  try{const bitmap=await createImageBitmap(file);try{
   if(bitmap.width*bitmap.height>40000000)throw Error('Image dimensions are too large. Crop the screenshot first.');
   const scale=Math.min(1,2000/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const context=canvas.getContext('2d');if(!context)throw Error('Unable to prepare image.');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);let prepared=canvas.toDataURL('image/jpeg',.92);if(prepared.length>4500000)prepared=canvas.toDataURL('image/jpeg',.75);if(prepared.length>4500000)throw Error('Image is too large. Crop it before attaching.');setImage(prepared);
  }finally{bitmap.close();}}
  catch(e){setError(e instanceof Error?e.message:'Could not read image. Try saving it as PNG.');}finally{setLoading(false);}
 }
 return <form className="chat-composer" onPaste={e=>{const file=Array.from(e.clipboardData.items).find(item=>item.type.startsWith('image/'))?.getAsFile();if(file){e.preventDefault();void attach(file);}}} onSubmit={async e=>{e.preventDefault();if(busy||loading||dictation.active||(!text.trim()&&!image))return;setError('');if(await onSend(text,image||undefined)){setText('');setImage('');}}}>
 {image&&<div className="attachment-preview"><img src={image} alt="Screenshot attached for AJ to review"/><span>Screenshot ready<br/><small>Sent when you press Send</small></span><button type="button" aria-label="Remove screenshot" disabled={busy} onClick={()=>setImage('')}>×</button></div>}
 {dictation.active&&<p className="dictation-status" role="status">{dictation.phase==='starting'?'Allow microphone access when your browser asks…':dictation.phase==='stopping'?'Finishing dictation…':'Listening… click the microphone again to stop. Review your text before sending.'}</p>}{dictation.error&&<p className="error" role="alert">{dictation.error}</p>}{loading&&<p role="status">Preparing screenshot…</p>}{error&&<p className="error" role="alert">{error}</p>}
 <div className="compose"><input type="file" accept="image/png,image/jpeg,image/webp" ref={fileInput} hidden onChange={e=>{void attach(e.target.files?.[0]);e.target.value='';}}/><button type="button" title="Attach screenshot (or paste with Ctrl+V)" aria-label="Attach screenshot" disabled={busy||loading} onClick={()=>fileInput.current?.click()}>＋</button><input aria-label="Ask AI instructor" placeholder={image?'Ask about this screenshot…':'Ask AJ or paste a screenshot…'} readOnly={dictation.active} maxLength={6000} value={text} onChange={e=>setText(e.target.value)}/><button type="button" className={`dictation-button ${dictation.active?'listening':''}`} title={dictation.active?'Stop dictation':'Dictate a message'} aria-label={dictation.active?'Stop dictation':'Start voice input'} aria-pressed={dictation.active} disabled={busy||loading||dictation.phase==='stopping'} onClick={dictation.toggle}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">{dictation.active?<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>:<><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/></>}</svg></button><button type="submit" aria-label="Send question" disabled={busy||loading||dictation.active||(!text.trim()&&!image)}>→</button></div></form>;
}
