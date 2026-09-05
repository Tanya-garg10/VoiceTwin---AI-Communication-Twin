
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { useStore } from '../lib/store'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export default function ProfileDNA(){
  const profile=useStore(s=>s.profile)
  const sessions=useStore(s=>s.sessions)
  const chart = sessions.map((s,i)=>({name:`S${i+1}`, score:s.score, confidence:s.metrics?.confidence||70})).reverse()
  return (
    <div className="min-h-screen max-w-[1100px] mx-auto px-8 py-8">
      <Link to="/dashboard" className="text-sm text-zinc-500">← Dashboard</Link>
      <h1 className="text-3xl font-semibold mt-4">Your Communication DNA</h1>
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2"><h3 className="font-medium">Progress</h3><div className="h-[220px] mt-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={chart}><XAxis dataKey="name" stroke="#555"/><YAxis stroke="#555"/><Line dataKey="score" stroke="#8b7bff" strokeWidth={2} dot={false}/><Line dataKey="confidence" stroke="#5ef2c8" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></Card>
        <div className="space-y-4">
          <Card><div className="text-xs text-zinc-500">Style</div><div className="mt-2 flex flex-wrap gap-2">{profile?.commStyle?.map((s:string)=><span key={s} className="px-3 py-1 rounded-full bg-white text-black text-xs">{s}</span>)}</div></Card>
          <Card><div className="text-xs text-zinc-500">Strengths</div><div className="text-sm mt-1">Confident opening, structured answers when prompted</div></Card>
          <Card><div className="text-xs text-zinc-500">Twin Memory</div><div className="text-xs mt-1 text-zinc-400">• Uses filler 'actually' often<br/>• Performs best with Friendly twin<br/>• Needs work on conciseness &lt;30s<br/>• Pressure mode improves assertiveness</div></Card>
        </div>
      </div>
    </div>
  )
}
