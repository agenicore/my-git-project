'use client';
import { useEffect, useRef, useState } from 'react';

type RecognitionResult = { isFinal: boolean; [index:number]: { transcript:string } };
type Recognition = {
 lang:string; continuous:boolean; interimResults:boolean;
 onstart:(()=>void)|null; onend:(()=>void)|null;
 onerror:((event:{error:string})=>void)|null;
 onresult:((event:{results:ArrayLike<RecognitionResult>})=>void)|null;
 start:()=>void; stop:()=>void; abort:()=>void;
};
type SpeechWindow = Window & { SpeechRecognition?:new()=>Recognition; webkitSpeechRecognition?:new()=>Recognition };

export function useDictation(text:string, setText:(value:string)=>void) {
 const [phase,setPhase]=useState<'idle'|'starting'|'listening'|'stopping'>('idle');
 const [error,setError]=useState('');
 const recognition=useRef<Recognition|null>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 function clearTimer(){if(timer.current){clearTimeout(timer.current);timer.current=null;}}
 useEffect(()=>()=>{clearTimer();const speech=recognition.current;recognition.current=null;if(speech){speech.onstart=null;speech.onend=null;speech.onerror=null;speech.onresult=null;speech.abort();}},[]);
 function stop(){const speech=recognition.current;if(!speech)return;setPhase('stopping');clearTimer();try{speech.stop();}catch{speech.abort();recognition.current=null;setPhase('idle');}}
 function toggle(){
  if(recognition.current){stop();return;}
  setError('');
  const browser=window as SpeechWindow;
  const Speech=browser.SpeechRecognition||browser.webkitSpeechRecognition;
  if(!Speech){setError('Voice input is not available in this browser. Open the app in Chrome, or click the message box and press Windows + H for Windows voice typing.');return;}
  if(text.length>=6000){setError('The message is full. Send or shorten it before dictating more.');return;}
  const prefix=text.trimEnd();
  const speech=new Speech();recognition.current=speech;
  speech.lang='en-US';speech.continuous=true;speech.interimResults=true;
  speech.onstart=()=>{if(recognition.current===speech)setPhase('listening');};
  speech.onresult=event=>{
   if(recognition.current!==speech)return;
   // Rebuild from the session results rather than appending interim words twice.
   const words=Array.from(event.results,result=>result[0]?.transcript||'').join(' ').trim();
   const draft=[prefix,words].filter(Boolean).join(' ');
   setText(draft.slice(0,6000));
   if(draft.length>=6000){setError('Message limit reached. Review the text before sending.');stop();}
  };
  speech.onerror=event=>{
   if(recognition.current!==speech)return;
   const errors:Record<string,string>={
    'not-allowed':'Microphone access was blocked. Allow the microphone in your browser’s site permissions, then try again.',
    'service-not-allowed':'This browser cannot use its speech service here. Try Chrome, or click the message box and press Windows + H.',
    'audio-capture':'No microphone is available. Check your microphone connection and Windows sound settings.',
    'no-speech':'No speech was detected. Click the microphone and try again.',
    'network':'The browser speech service could not connect. Try again, or use Windows + H in the message box.',
    'language-not-supported':'English dictation is not available in this browser. Try Windows + H in the message box.',
   };
   if(event.error!=='aborted')setError(errors[event.error]||'Dictation stopped. Your draft is still here; try again or type your message.');
  };
  speech.onend=()=>{if(recognition.current===speech){recognition.current=null;clearTimer();setPhase('idle');}};
  setPhase('starting');
  try{speech.start();timer.current=setTimeout(()=>{if(recognition.current===speech)stop();},60000);}
  catch{recognition.current=null;setPhase('idle');clearTimer();setError('Could not start dictation. Check microphone permissions and try again.');}
 }
 return {phase,active:phase!=='idle',error,toggle};
}
