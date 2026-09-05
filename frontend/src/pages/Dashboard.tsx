
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { Mic, Flame, History, Sparkles } from 'lucide-react'

export default function Dashboard(){
  const profile=useStore(s=>s.profile)
  const sessions=useStore(s=>s.sessions)
  const avg = sessions.length? Math.round(sessions.reduce((a,s)=>a+s.score,0)/sessions.length):0
  return (
    <div className="min-h-screen bg-[#08080a]">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10"><div className="font-semibold">VoiceTwin</div><div className="flex gap-2"><Link to="/twin"><Button variant="ghost" size="sm">Twin Studio</Button></Link><Link to="/settings"><Button variant="ghost" size="sm">Settings</Button></Link></div></nav>
      <div className="max-w-[1200px] mx-auto px-8 py-10">
        <h1 className="text-3xl font-semibold">Good evening, {profile?.name||'there'}.</h1>
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-[#15131f] to-[#0e0e10] border-[#8b7bff]/20">
            <div className="flex justify-between items-start"><div><div className="text-sm text-zinc-400">Your Communication Twin is ready</div><div className="text-2xl font-semibold mt-1">Start a practice session?</div><div className="text-sm text-zinc-500 mt-2">Twin Memory: remembers filler words, concise issues, best coaching style.</div></div><div className="w-12 h-12 rounded-full bg-[#8b7bff] grid place-items-center"><Mic className="w-6 h-6"/></div></div>
            <div className="flex gap-3 mt-6"><Link to="/new-session"><Button>Start Practice</Button></Link><Link to="/new-session?mode=pressure"><Button variant="secondary"><Flame className="w-4 h-4 mr-2"/>Pressure Mode</Button></Link></div>
          </Card>
          <div className="grid gap-4">
            <Card><div className="text-xs text-zinc-500">Sessions</div><div className="text-2xl font-semibold">{sessions.length}</div></Card>
            <Card><div className="text-xs text-zinc-500">Avg Score</div><div className="text-2xl font-semibold">{avg||'—'}</div></Card>
            <Card><div className="text-xs text-zinc-500">Twin</div><div className="text-sm">{useStore.getState().twin.personality} • {useStore.getState().twin.difficulty}</div></Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link to="/history"><Card hover><History className="w-5 h-5 mb-2"/><div className="font-medium">Session History</div><div className="text-sm text-zinc-500">{sessions.length} sessions</div></Card></Link>
          <Link to="/dna"><Card hover><Sparkles className="w-5 h-5 mb-2"/><div className="font-medium">Communication DNA</div><div className="text-sm text-zinc-500">Your style profile</div></Card></Link>
          <Link to={sessions[0]?`/report/${sessions[0].id}`:'/new-session'}><Card hover><div className="font-medium">Last Report</div><div className="text-sm text-zinc-500">{sessions[0]?.title || 'No sessions yet'}</div></Card></Link>
        </div>

        <div className="mt-10">
          <h3 className="font-medium mb-4">Recent sessions</h3>
          {sessions.length===0? <Card><div className="text-sm text-zinc-500">No practice sessions yet.</div><Link to="/new-session"><Button size="sm" className="mt-3">Start Your First Session</Button></Link></Card> :
          <div className="grid md:grid-cols-3 gap-4">{sessions.slice(0,6).map(s=><Link key={s.id} to={`/report/${s.id}`}><Card hover><div className="flex justify-between"><div className="text-sm font-medium">{s.title}</div><div className="text-xs bg-white text-black px-2 py-1 rounded-full">{s.score}</div></div><div className="text-xs text-zinc-500 mt-1">{s.scenario} • {s.date} • {s.duration}s</div></Card></Link>)}</div>}
        </div>
      </div>
    </div>
  )
}
