
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
export default function History(){
  const sessions=useStore(s=>s.sessions)
  return (
    <div className="min-h-screen max-w-[1000px] mx-auto px-8 py-8">
      <Link to="/dashboard" className="text-sm text-zinc-500">← Dashboard</Link>
      <h1 className="text-3xl font-semibold mt-4">Session History</h1>
      <div className="mt-6 grid gap-3">
        {sessions.length===0 && <Card>No sessions yet. <Link to="/new-session"><Button size="sm" className="ml-2">Start first</Button></Link></Card>}
        {sessions.map(s=><Link key={s.id} to={`/report/${s.id}`}><Card hover><div className="flex justify-between items-center"><div><div className="font-medium">{s.title}</div><div className="text-xs text-zinc-500">{s.scenario} • {s.date} • {s.duration}s</div></div><div className="text-sm font-bold w-10 h-10 rounded-full bg-white text-black grid place-items-center">{s.score}</div></div></Card></Link>)}
      </div>
    </div>
  )
}
