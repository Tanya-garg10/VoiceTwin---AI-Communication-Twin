
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ScenarioType } from '../types'
import { Link } from 'react-router-dom'

export default function NewSession(){
  const [params]=useSearchParams()
  const isPressure=params.get('mode')==='pressure'
  const [scenario,setScenario]=useState<ScenarioType>('HR Interview')
  const [ctx,setCtx]=useState({company:'Acme Corp', role:'Product Manager', jd:'Lead product strategy, roadmap, cross-functional collaboration', topic:'Q3 Roadmap', audience:'Leadership', objective:'Get buy-in', duration:'10'})
  const nav=useNavigate()

  return (
    <div className="min-h-screen max-w-[900px] mx-auto px-8 py-8">
      <Link to="/dashboard" className="text-sm text-zinc-500">← Dashboard</Link>
      <h1 className="text-3xl font-semibold mt-4">Configure Session</h1>
      {isPressure && <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-xs">🔥 Pressure Mode: rapid questioning, interruptions, skeptical interviewer</div>}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {(['HR Interview','Technical Interview','Presentation','Team Meeting','Client Meeting','Sales Pitch','Negotiation','Public Speaking','Custom'] as ScenarioType[]).map(s=><button key={s} onClick={()=>setScenario(s)} className={`p-4 rounded-2xl border text-left text-sm ${scenario===s?'bg-white text-black':'glass'}`}>{s}</button>)}
      </div>

      <Card className="mt-6">
        <h3 className="font-medium mb-4">Context for {scenario}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="text-xs text-zinc-500">Company / Audience</label><input value={ctx.company} onChange={e=>setCtx({...ctx,company:e.target.value})} className="w-full mt-1 h-11 rounded-xl bg-white/5 border border-white/10 px-4"/></div>
          <div><label className="text-xs text-zinc-500">Role / Topic</label><input value={ctx.role} onChange={e=>setCtx({...ctx,role:e.target.value})} className="w-full mt-1 h-11 rounded-xl bg-white/5 border border-white/10 px-4"/></div>
          <div className="md:col-span-2"><label className="text-xs text-zinc-500">Objective / Job Description</label><textarea value={ctx.jd} onChange={e=>setCtx({...ctx,jd:e.target.value})} className="w-full mt-1 h-24 rounded-xl bg-white/5 border border-white/10 p-3"/></div>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="font-medium mb-2">Pre-Conversation Brief (AI)</h3>
        <div className="text-sm text-zinc-400 space-y-2">
          <div>• Key objective: Show impact with metrics for {ctx.role} at {ctx.company}</div>
          <div>• Possible questions: Tell me about yourself, Why this company, Challenge story</div>
          <div>• Risks: rambling, weak close</div>
          <div>• Recommended tone: Confident, concise, STAR structured</div>
          <div>• Talking points: roadmap win, stakeholder alignment, 20% growth</div>
        </div>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={()=>{
          const id = Date.now().toString()
          localStorage.setItem('vt_current_scenario', JSON.stringify({id, scenario, ctx, isPressure}))
          nav(`/session/${id}`)
        }}>Start Voice Session</Button>
      </div>
    </div>
  )
}
