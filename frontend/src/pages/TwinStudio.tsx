
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { TwinPersonality } from '../types'
import { Orb } from '../components/Orb'
import { Link } from 'react-router-dom'
export default function TwinStudio(){
  const twin=useStore(s=>s.twin)
  const setTwin=useStore(s=>s.setTwin)
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10"><Link to="/dashboard" className="font-semibold">← VoiceTwin</Link><Link to="/dashboard"><Button size="sm">Dashboard</Button></Link></nav>
      <div className="max-w-[1100px] mx-auto px-8 py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-semibold">Twin Studio</h1>
          <p className="text-zinc-500 mt-2 text-sm">Configure personality, coaching intensity, difficulty. Preview is live.</p>
          <div className="mt-8 space-y-6">
            <Card><div className="text-sm font-medium mb-3">Twin Personality</div><div className="flex flex-wrap gap-2">{(['Professional','Friendly','Challenging','Supportive','Strict','Analytical'] as TwinPersonality[]).map(p=><button key={p} onClick={()=>setTwin({...twin,personality:p})} className={`px-4 py-2 rounded-full text-sm border ${twin.personality===p?'bg-white text-black':'bg-white/5 border-white/10'}`}>{p}</button>)}</div></Card>
            <Card><div className="text-sm font-medium mb-3">Conversation Style</div><div className="flex flex-wrap gap-2">{['Concise','Conversational','Formal','Direct','Supportive'].map(s=><button key={s} onClick={()=>setTwin({...twin,convStyle:s})} className={`px-3 py-2 rounded-full text-sm border ${twin.convStyle===s?'bg-white text-black':'bg-white/5 border-white/10'}`}>{s}</button>)}</div></Card>
            <Card><div className="text-sm font-medium mb-3">Coaching Intensity</div><div className="flex gap-2">{['Gentle','Balanced','Aggressive'].map(c=><button key={c} onClick={()=>setTwin({...twin,coaching:c})} className={`px-4 py-2 rounded-full text-sm border ${twin.coaching===c?'bg-[#8b7bff] text-white border-[#8b7bff]':'bg-white/5 border-white/10'}`}>{c}</button>)}</div></Card>
            <Card><div className="text-sm font-medium mb-3">Difficulty</div><div className="flex gap-2">{['Beginner','Intermediate','Advanced','Expert'].map(d=><button key={d} onClick={()=>setTwin({...twin,difficulty:d as any})} className={`px-4 py-2 rounded-full text-sm border ${twin.difficulty===d?'bg-white text-black':'bg-white/5 border-white/10'}`}>{d}</button>)}</div></Card>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Orb state="IDLE"/>
          <Card className="w-full mt-6"><div className="text-xs text-zinc-500">Preview • {twin.personality} • {twin.convStyle} • {twin.difficulty}</div><div className="mt-2 text-sm">Twin Memory will adapt: if you use filler words, difficulty lowers and coaching intensifies. Strong performance → pressure & depth increase.</div></Card>
          <Link to="/new-session" className="mt-6"><Button size="lg">Continue to Session Setup</Button></Link>
        </div>
      </div>
    </div>
  )
}
