
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Report(){
  const {id}=useParams()
  const sess = useStore(s=>s.sessions.find(x=>x.id===id))
  if(!sess) return <div className="p-20">Session not found. <Link to="/dashboard" className="underline">Dashboard</Link></div>
  const f=sess.feedback
  return (
    <div className="min-h-screen max-w-[1100px] mx-auto px-8 py-8">
      <Link to="/dashboard" className="text-sm text-zinc-500">← Dashboard</Link>
      <div className="flex items-start justify-between mt-4">
        <div><h1 className="text-3xl font-semibold">{sess.title}</h1><div className="text-sm text-zinc-500">{sess.scenario} • {sess.date} • {sess.duration}s</div></div>
        <div className="w-20 h-20 rounded-full bg-white text-black grid place-items-center text-2xl font-bold">{sess.score}</div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {Object.entries(f.metrics||{}).map(([k,v])=> <Card key={k}><div className="text-xs text-zinc-500 uppercase">{k}</div><div className="text-xl font-semibold mt-1">{String(v)}</div></Card>)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <Card><h3 className="font-medium mb-3">What You Did Well</h3><ul className="text-sm text-zinc-400 space-y-1">{f.strengths?.map((s:string)=><li key={s}>✓ {s}</li>)}</ul></Card>
        <Card><h3 className="font-medium mb-3">What Held You Back</h3><ul className="text-sm text-zinc-400 space-y-1">{f.improvements?.map((s:string)=><li key={s}>• {s}</li>)}</ul></Card>
      </div>

      <Card className="mt-6 border-[#8b7bff]/30"><h3 className="font-medium">Communication Mirror</h3><div className="grid md:grid-cols-2 gap-6 mt-4">
        <div><div className="text-xs text-zinc-500 mb-2">How you sounded</div><div className="p-3 rounded-xl bg-white/5 text-sm">{f.mirror?.before}</div></div>
        <div><div className="text-xs text-emerald-400 mb-2">How you could sound</div><div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm">{f.mirror?.after}</div></div>
      </div><div className="text-xs text-zinc-500 mt-3">Why better: shorter, structured STAR, ends with metric, no filler.</div></Card>

      <Card className="mt-6"><h3 className="font-medium mb-3">Try This Next Time</h3><ul className="text-sm text-zinc-400 space-y-2">{f.suggestions?.map((s:string)=><li key={s}>→ {s}</li>)}</ul></Card>

      <Card className="mt-6"><h3 className="font-medium mb-3">Smart Replay</h3><div className="space-y-2">{sess.messages?.filter(m=>m.role==='user').slice(0,3).map(m=><div key={m.id} className="flex justify-between p-3 rounded-xl bg-white/5 text-sm"><span>{m.text.slice(0,80)}</span><span className="text-xs px-2 py-1 rounded-full bg-white text-black">Review</span></div>)}</div></Card>

      <div className="flex gap-3 mt-8"><Link to="/new-session"><Button>Practice Again</Button></Link><Link to="/dashboard"><Button variant="secondary">Dashboard</Button></Link></div>
    </div>
  )
}
