
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { ScenarioType } from '../types'

export default function Onboarding(){
  const [step,setStep]=useState(0)
  const [data,setData]=useState<any>({name:'Aarav', role:'Product Manager', experience:'Mid', goal:'Ace my upcoming interviews', commStyle:['Confident','Concise'], improveAreas:['Confidence','Filler words'], targetScenario:'HR Interview' as ScenarioType})
  const setProfile=useStore(s=>s.setProfile)
  const nav=useNavigate()

  return (
    <div className="min-h-screen max-w-[720px] mx-auto px-8 py-12">
      <div className="text-sm text-zinc-500 mb-2">Step {step+1}/4</div>
      <div className="h-1 bg-white/10 rounded-full mb-8"><div className="h-1 bg-white rounded-full transition-all" style={{width: ((step+1)/4*100)+'%'}}/></div>
      {step===0 && <Card><h2 className="text-2xl font-semibold mb-6">Let's build your Twin</h2>
        <label className="text-sm">Your name</label><input value={data.name} onChange={e=>setData({...data,name:e.target.value})} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 mt-2 mb-4"/>
        <label className="text-sm">Professional role</label><input value={data.role} onChange={e=>setData({...data,role:e.target.value})} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 mt-2 mb-4"/>
        <label className="text-sm">Experience</label><select value={data.experience} onChange={e=>setData({...data,experience:e.target.value})} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 mt-2"><option>Entry</option><option>Mid</option><option>Senior</option><option>Lead</option></select>
      </Card>}
      {step===1 && <Card><h2 className="text-xl font-semibold mb-4">Communication style</h2><div className="flex flex-wrap gap-2">{['Confident','Concise','Friendly','Analytical','Persuasive','Professional'].map(s=><button key={s} onClick={()=>setData({...data,commStyle: data.commStyle.includes(s)? data.commStyle.filter((x:string)=>x!==s):[...data.commStyle,s]})} className={`px-4 py-2 rounded-full border text-sm ${data.commStyle.includes(s)?'bg-white text-black':'bg-white/5 border-white/10'}`}>{s}</button>)}</div><h3 className="mt-6 font-medium">Improve areas</h3><div className="flex flex-wrap gap-2 mt-2">{['Confidence','Clarity','Conciseness','Filler words','Pace','Structure','Vocabulary','Assertiveness'].map(s=><button key={s} onClick={()=>setData({...data,improveAreas: data.improveAreas.includes(s)? data.improveAreas.filter((x:string)=>x!==s):[...data.improveAreas,s]})} className={`px-4 py-2 rounded-full border text-sm ${data.improveAreas.includes(s)?'bg-[#8b7bff] text-white border-[#8b7bff]':'bg-white/5 border-white/10'}`}>{s}</button>)}</div></Card>}
      {step===2 && <Card><h2 className="text-xl font-semibold mb-4">Target scenario</h2><div className="grid grid-cols-2 gap-3">{(['HR Interview','Technical Interview','Presentation','Sales Pitch','Negotiation','Public Speaking','Team Meeting','Client Meeting','Custom'] as ScenarioType[]).map(s=><button key={s} onClick={()=>setData({...data,targetScenario:s})} className={`p-4 rounded-xl border text-left ${data.targetScenario===s?'bg-white text-black':'bg-white/5 border-white/10'}`}><div className="font-medium text-sm">{s}</div></button>)}</div></Card>}
      {step===3 && <Card><h2 className="text-xl font-semibold mb-2">Goal</h2><textarea value={data.goal} onChange={e=>setData({...data,goal:e.target.value})} className="w-full h-24 rounded-xl bg-white/5 border border-white/10 p-4 mt-2"/><div className="mt-6 p-4 rounded-xl bg-[#8b7bff]/10 border border-[#8b7bff]/20 text-sm">Your Twin will remember: <b>{data.improveAreas.join(', ')}</b> and adapt future sessions via Twin Memory.</div></Card>}
      <div className="flex justify-between mt-6"><Button variant="ghost" onClick={()=>setStep(Math.max(0,step-1))}>Back</Button>{step<3?<Button onClick={()=>setStep(step+1)}>Continue</Button>:<Button onClick={()=>{setProfile(data); nav('/twin')}}>Build My Twin</Button>}</div>
    </div>
  )
}
