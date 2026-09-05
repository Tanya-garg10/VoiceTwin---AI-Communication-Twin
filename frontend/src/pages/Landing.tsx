
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Orb } from '../components/Orb'
import { Mic, Zap, Target, Brain, BarChart3, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="min-h-screen bg-[#08080a] overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 py-6 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2 font-semibold tracking-tight"><div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center">V</div>VoiceTwin</div>
        <div className="flex gap-3"><Link to="/auth"><Button variant="ghost">Sign in</Button></Link><Link to="/auth"><Button>Build My Twin</Button></Link></div>
      </nav>

      <section className="max-w-[1280px] mx-auto px-8 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs mb-6"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>Live Voice AI • Agora Powered • Demo Mode Ready</div>
          <h1 className="text-[56px] leading-[0.95] font-[600] tracking-tight">Meet Your<br/>Communication<br/><span className="text-[#8b7bff]">Twin.</span></h1>
          <p className="text-[18px] text-zinc-400 mt-6 max-w-[480px] leading-relaxed">Practice interviews, presentations, meetings and high-stakes conversations with an AI that adapts to the way you communicate.</p>
          <div className="flex gap-3 mt-8"><Link to="/auth"><Button size="lg">Build My Twin</Button></Link><Link to="/dashboard"><Button size="lg" variant="secondary">Try a Live Session</Button></Link></div>
          <div className="grid grid-cols-3 gap-6 mt-14 border-t border-white/10 pt-8">
            <div><div className="text-2xl font-semibold">12k+</div><div className="text-xs text-zinc-500">Sessions practiced</div></div>
            <div><div className="text-2xl font-semibold">+38%</div><div className="text-xs text-zinc-500">Avg confidence boost</div></div>
            <div><div className="text-2xl font-semibold">4.9/5</div><div className="text-xs text-zinc-500">User rating</div></div>
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <Orb state="LISTENING" speaking/>
          <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-[420px]">
            <Card className="py-4"><div className="text-xs text-zinc-500">Confidence</div><div className="text-xl">78% <span className="text-emerald-400 text-xs">↑ 12%</span></div></Card>
            <Card className="py-4"><div className="text-xs text-zinc-500">Clarity</div><div className="text-xl">84% <span className="text-emerald-400 text-xs">↑ 8%</span></div></Card>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <h2 className="text-3xl font-semibold max-w-[600px]">People don't improve communication by reading tips alone. They improve by practicing.</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Card><div className="text-zinc-500 text-sm mb-3">Traditional way</div><ul className="space-y-2 text-zinc-400 text-sm"><li>✗ Watch YouTube advice</li><li>✗ Memorize generic answers</li><li>✗ Freeze in real conversation</li></ul></Card>
          <Card className="border-[#8b7bff]/30"><div className="text-[#8b7bff] text-sm mb-3">VoiceTwin way</div><ul className="space-y-2 text-sm"><li>✓ Real-time voice role-play</li><li>✓ Adaptive difficulty & pressure mode</li><li>✓ Personalized feedback & Mirror</li></ul></Card>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-10">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {k:'1',t:'Define Your Goal',d:'Role, scenario, communication style'},
            {k:'2',t:'Meet Your Twin',d:'Personality, coaching, difficulty'},
            {k:'3',t:'Practice in Real Time',d:'Voice, waveform, live insights'},
            {k:'4',t:'Get Personalized Feedback',d:'Score, Mirror, DNA & memory'},
          ].map(s=> <Card key={s.k}><div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center text-sm font-bold mb-4">{s.k}</div><div className="font-medium">{s.t}</div><div className="text-sm text-zinc-500 mt-1">{s.d}</div></Card>)}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-16">
        <h3 className="text-2xl font-semibold mb-6">Built for high-stakes moments</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {icon:Target,title:'Interview',desc:'HR, technical, behavioral with Pressure Mode'},
            {icon:Mic,title:'Presentation',desc:'Structure, hook, objection handling'},
            {icon:Brain,title:'Negotiation',desc:'BATNA, pushback, concessions'},
            {icon:Zap,title:'Sales Pitch',desc:'Value prop, pricing objections'},
            {icon:BarChart3,title:'Public Speaking',desc:'Pace, filler, engagement'},
            {icon:Shield,title:'Difficult Conversation',desc:'Empathy + assertiveness practice'},
          ].map(c=> <Card key={c.title} hover><c.icon className="w-5 h-5 mb-3 text-[#8b7bff]"/><div className="font-medium">{c.title}</div><div className="text-sm text-zinc-500 mt-1">{c.desc}</div></Card>)}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-20 text-center">
        <h2 className="text-[40px] font-semibold leading-tight">Your next conversation<br/>deserves a rehearsal.</h2>
        <div className="mt-8 flex justify-center"><Link to="/auth"><Button size="lg" className="px-12">Create My Twin</Button></Link></div>
        <div className="text-xs text-zinc-600 mt-6">Practice real conversations. Build real confidence.</div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-600">© 2026 VoiceTwin • Futuristic Communication Intelligence • Demo Mode Available</footer>
    </div>
  )
}
