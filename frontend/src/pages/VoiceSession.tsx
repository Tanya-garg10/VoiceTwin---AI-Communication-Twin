
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Orb } from '../components/Orb'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Message } from '../types'
import { analyzeText, getNextQuestion, generateFeedback } from '../lib/aiEngine'
import { useStore } from '../lib/store'
import { Mic, MicOff, PhoneOff } from 'lucide-react'

export default function VoiceSession(){
  const {id}=useParams()
  const nav=useNavigate()
  const twin=useStore(s=>s.twin)
  const profile=useStore(s=>s.profile)
  const addSession=useStore(s=>s.addSession)
  const scenarioData = JSON.parse(localStorage.getItem('vt_current_scenario')||'{}')
  const scenario = scenarioData.scenario || 'HR Interview'
  const isPressure = scenarioData.isPressure

  const [state,setState]=useState('IDLE')
  const [messages,setMessages]=useState<Message[]>([])
  const [input,setInput]=useState('')
  const [listening,setListening]=useState(false)
  const [liveMetrics,setLiveMetrics]=useState({confidence:72, clarity:78, pace:'Good', filler:0, engagement:'High'})
  const [timer,setTimer]=useState(0)
  const recogRef=useRef<any>(null)

  useEffect(()=>{
    const t=setInterval(()=>setTimer(x=>x+1),1000)
    return ()=>clearInterval(t)
  },[])

  useEffect(()=>{
    // initial twin question
    const q = getNextQuestion(scenario, [], 70)
    setMessages([{id:'1', role:'twin', text: (isPressure?'[Pressure] ': '')+q, ts:Date.now()}])
    setState('LISTENING')
    // setup Web Speech API
    const SR:any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if(SR){
      const r=new SR(); r.continuous=false; r.interimResults=false; r.lang='en-US'
      r.onresult=(e:any)=>{ const txt=e.results[0][0].transcript; handleUserMessage(txt)}
      r.onend=()=>setListening(false)
      recogRef.current=r
    }
  },[])

  const handleUserMessage=(text:string)=>{
    const analysis=analyzeText(text)
    const userMsg:Message={id:Date.now().toString(), role:'user', text, ts:Date.now()}
    setMessages(m=>[...m,userMsg])
    setLiveMetrics({confidence: analysis.confidence, clarity: analysis.clarity, pace: analysis.words>35?'Fast':analysis.words<10?'Slow':'Good', filler: liveMetrics.filler+analysis.fillerCount, engagement: analysis.confidence>75?'High':'Medium'})
    setState('THINKING')
    setTimeout(()=>{
      const perf = (analysis.clarity+analysis.confidence)/2
      const nextQ = getNextQuestion(scenario, [...messages,userMsg], perf)
      const twinMsg:Message={id:(Date.now()+1).toString(), role:'twin', text: nextQ, ts:Date.now()}
      setMessages(m=>[...m,twinMsg])
      setState('LISTENING')
      // TTS
      if('speechSynthesis' in window){
        const u=new SpeechSynthesisUtterance(nextQ)
        u.onstart=()=>setState('SPEAKING')
        u.onend=()=>setState('LISTENING')
        speechSynthesis.speak(u)
      }
    }, 900 + Math.random()*600)
  }

  const toggleListen=()=>{
    if(!recogRef.current){ alert('SpeechRecognition not supported in this browser. Type your answer below.'); return }
    if(listening){ recogRef.current.stop(); setListening(false)}
    else { recogRef.current.start(); setListening(true); setState('LISTENING')}
  }

  const endSession=()=>{
    const feedback = generateFeedback(messages)
    const sess={id:id!, scenario, title: scenario+' • '+(scenarioData.ctx?.role||'Session'), date:new Date().toLocaleDateString(), duration:timer, score:feedback.overall, messages, metrics:feedback.metrics, feedback}
    addSession(sess)
    nav(`/report/${id}`)
  }

  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10"><div className="text-sm">{scenario} • {Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')} {isPressure && <span className="ml-2 px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-[10px]">PRESSURE</span>}</div><div className="flex gap-2"><Button size="sm" variant="secondary" onClick={endSession}><PhoneOff className="w-4 h-4 mr-2"/>End</Button></div></div>
      <div className="flex-1 grid lg:grid-cols-[260px_1fr_300px] gap-0">
        <div className="border-r border-white/10 p-4 space-y-4 hidden lg:block">
          <Card><div className="text-xs text-zinc-500">Objective</div><div className="text-sm mt-1">{scenarioData.ctx?.jd?.slice(0,80)||'Ace the conversation with confidence'}</div></Card>
          <Card><div className="text-xs text-zinc-500">Difficulty</div><div className="mt-2 w-full h-2 bg-white/10 rounded-full"><div className="h-2 bg-white rounded-full" style={{width: twin.difficulty==='Beginner'?'25%': twin.difficulty==='Intermediate'?'55%': twin.difficulty==='Advanced'?'80%':'95%'}}/></div><div className="text-xs mt-1">{twin.difficulty} {isPressure && '+ Pressure'}</div></Card>
          <Card><div className="text-xs text-zinc-500">Twin Memory</div><div className="text-xs mt-1 text-zinc-400">User tends to use filler words. Coaching: Balanced → supportive prompts.</div></Card>
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <Orb state={state as any} speaking={state==='SPEAKING' || listening} level={liveMetrics.filler/10}/>
          <div className="mt-10 w-full max-w-[560px] space-y-3 max-h-[220px] overflow-auto">
            {messages.slice(-6).map(m=><div key={m.id} className={`p-3 rounded-2xl text-sm ${m.role==='user'?'bg-white text-black ml-12':'glass mr-12'}`}><span className="text-[10px] opacity-60 mr-2">{m.role==='user'?'YOU':'TWIN'}</span>{m.text}</div>)}
          </div>
          <div className="flex items-center gap-3 mt-8">
            <Button onClick={toggleListen} className={listening?'bg-red-500 text-white':''}>{listening?<MicOff className="w-4 h-4 mr-2"/>:<Mic className="w-4 h-4 mr-2"/>}{listening?'Stop Listening':'Start Speaking'}</Button>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter' && input.trim()){ handleUserMessage(input); setInput('')}}} placeholder="Or type your answer..." className="w-[260px] h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm outline-none"/>
          </div>
          <div className="text-[11px] text-zinc-600 mt-3">Agora SDK integration ready: set VITE_AGORA_APP_ID & backend AGORA_APP_CERTIFICATE. Demo uses Web Speech API.</div>
        </div>
        <div className="border-l border-white/10 p-4 space-y-3 hidden lg:block">
          <div className="text-xs tracking-widest text-zinc-500">LIVE INSIGHTS</div>
          <Card className="py-3"><div className="flex justify-between text-xs"><span>Confidence</span><span>{liveMetrics.confidence}%</span></div><div className="h-1 bg-white/10 rounded-full mt-2"><div className="h-1 bg-[#5ef2c8] rounded-full" style={{width: liveMetrics.confidence+'%'}}/></div></Card>
          <Card className="py-3"><div className="flex justify-between text-xs"><span>Clarity</span><span>{liveMetrics.clarity}%</span></div><div className="h-1 bg-white/10 rounded-full mt-2"><div className="h-1 bg-[#8b7bff] rounded-full" style={{width: liveMetrics.clarity+'%'}}/></div></Card>
          <Card className="py-3 text-xs"><div>Pace: {liveMetrics.pace}</div><div>Filler: {liveMetrics.filler}</div><div>Engagement: {liveMetrics.engagement}</div></Card>
          <Card className="bg-[#8b7bff]/10 border-[#8b7bff]/20 text-xs">Adaptive: performance {(liveMetrics.clarity+liveMetrics.confidence)/2>75?'↑ increasing difficulty':'→ supportive'}</Card>
        </div>
      </div>
    </div>
  )
}
