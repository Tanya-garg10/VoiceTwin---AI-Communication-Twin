import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ScenarioType } from '../types'
import { motion } from 'framer-motion'
import { Target, Mic, Users, Briefcase, MessageSquare, Flame, ArrowLeft, Sparkles, Clock, Globe, AlertTriangle, ChevronRight } from 'lucide-react'

export default function NewSession(){
  const [params] = useSearchParams()
  const isPressure = params.get('mode') === 'pressure'
  const [scenario, setScenario] = useState<ScenarioType>('HR Interview')
  const [ctx, setCtx] = useState({
    company: 'Acme Corp', 
    role: 'Product Manager', 
    jd: 'Lead product strategy, roadmap, cross-functional collaboration', 
    topic: 'Q3 Roadmap', 
    audience: 'Leadership', 
    objective: 'Get buy-in', 
    duration: '10'
  })
  const [persona, setPersona] = useState('Professional')
  const [language, setLanguage] = useState('English')
  const nav = useNavigate()

  const conversationModes = [
    { type: 'HR Interview' as ScenarioType, icon: Target, label: 'Interview', desc: 'Technical & HR rounds', color: 'from-blue-500 to-cyan-400' },
    { type: 'Presentation' as ScenarioType, icon: Mic, label: 'Presentation', desc: 'Public speaking practice', color: 'from-purple-500 to-pink-400' },
    { type: 'Team Meeting' as ScenarioType, icon: Users, label: 'Meeting', desc: 'Client & team discussions', color: 'from-emerald-500 to-teal-400' },
    { type: 'Client Meeting' as ScenarioType, icon: Briefcase, label: 'Client Pitch', desc: 'Sales & negotiations', color: 'from-amber-500 to-orange-400' },
    { type: 'Networking' as ScenarioType, icon: MessageSquare, label: 'Networking', desc: 'Professional conversations', color: 'from-rose-500 to-pink-400' },
    { type: 'Technical Interview' as ScenarioType, icon: Target, label: 'Technical', desc: 'System design & coding', color: 'from-indigo-500 to-blue-400' }
  ]

  const personas = [
    { id: 'professional', label: 'Professional', desc: 'Formal and structured' },
    { id: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
    { id: 'technical', label: 'Technical', desc: 'Focus on depth and details' },
    { id: 'skeptical', label: 'Skeptical', desc: 'Challenging and critical' },
    { id: 'senior', label: 'Senior Executive', desc: 'Strategic and high-level' }
  ]

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'hinglish', label: 'Hinglish' }
  ]

  return (
    <div className="min-h-screen bg-[#050507] flex">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b7bff]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#5ef2c8]/3 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-40">
          <Link to="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            {isPressure && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                <AlertTriangle className="w-3 h-3" />
                <span className="font-medium">Pressure Mode</span>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Start a Voice Session</h1>
            <p className="text-zinc-400">Choose a conversation mode and configure your AI twin</p>
          </motion.div>

          {/* Conversation Modes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-semibold">Conversation Mode</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {conversationModes.map((mode) => (
                <button
                  key={mode.type}
                  onClick={() => setScenario(mode.type)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    scenario === mode.type
                      ? 'bg-[#8b7bff]/10 border-[#8b7bff]/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center`}>
                      <mode.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{mode.label}</div>
                      <div className="text-xs text-zinc-500">{mode.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Context Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Session Context</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Company / Audience</label>
                  <input 
                    value={ctx.company} 
                    onChange={e => setCtx({...ctx, company: e.target.value})} 
                    className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#8b7bff]/50 transition-all"
                    placeholder="e.g., Google, Startup ABC"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Role / Position</label>
                  <input 
                    value={ctx.role} 
                    onChange={e => setCtx({...ctx, role: e.target.value})} 
                    className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#8b7bff]/50 transition-all"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-500 mb-1 block">Job Description / Objective</label>
                  <textarea 
                    value={ctx.jd} 
                    onChange={e => setCtx({...ctx, jd: e.target.value})} 
                    className="w-full h-24 rounded-lg bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#8b7bff]/50 transition-all resize-none"
                    placeholder="Describe the role, responsibilities, or what you want to achieve..."
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Persona Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Interviewer Persona</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      persona === p.id
                        ? 'bg-[#8b7bff]/20 text-[#8b7bff] border border-[#8b7bff]/30'
                        : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Conversation Language</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      language === lang.id
                        ? 'bg-[#8b7bff]/20 text-[#8b7bff] border border-[#8b7bff]/30'
                        : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Conversation Brief */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">AI Conversation Brief</h3>
              </div>
              <div className="text-sm text-zinc-400 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-zinc-300">Key objective:</strong> Show impact with metrics for {ctx.role} at {ctx.company}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-zinc-300">Focus areas:</strong> Technical depth, communication clarity, problem-solving approach</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-zinc-300">Risks to avoid:</strong> Rambling, vague answers, lack of specific examples</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8b7bff] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-zinc-300">Recommended structure:</strong> STAR method (Situation, Task, Action, Result)</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pressure Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => {
                const newMode = !isPressure
                const url = new URL(window.location.href)
                if (newMode) {
                  url.searchParams.set('mode', 'pressure')
                } else {
                  url.searchParams.delete('mode')
                }
                window.location.href = url.toString()
              }}
              className={`w-full p-4 rounded-xl border transition-all ${
                isPressure
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className={`w-5 h-5 ${isPressure ? 'text-red-400' : 'text-zinc-500'}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">Pressure Mode</div>
                    <div className="text-xs text-zinc-500">
                      {isPressure ? 'Active - Challenging questions enabled' : 'Rapid questioning & time constraints'}
                    </div>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-all ${
                  isPressure ? 'bg-red-500/30' : 'bg-white/10'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-all ${
                    isPressure ? 'bg-red-400 translate-x-6' : 'bg-zinc-500'
                  }`} />
                </div>
              </div>
            </button>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              size="lg"
              gradient
              className="w-full shadow-[0_0_40px_rgba(139,123,255,0.3)] hover:shadow-[0_0_50px_rgba(139,123,255,0.4)]"
              onClick={() => {
                const id = Date.now().toString()
                localStorage.setItem('vt_current_scenario', JSON.stringify({
                  id, 
                  scenario, 
                  ctx, 
                  isPressure,
                  persona,
                  language
                }))
                nav(`/session/${id}`)
              }}
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Voice Session
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}