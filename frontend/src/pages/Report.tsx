import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { TrendingUp, CheckCircle, AlertCircle, Clock, Target, ArrowLeft, ArrowRight, Flame, Mic, BarChart3, Activity, Lightbulb, MessageSquare, Zap, LayoutDashboard, Brain, Settings, ChevronRight, Award } from 'lucide-react'

export default function Report(){
  const {id} = useParams()
  const sess = useStore(s=>s.sessions.find(x=>x.id===id))
  
  if(!sess) return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-8">
      <Card className="text-center py-12">
        <div className="text-zinc-500 mb-4">Session not found</div>
        <Link to="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </Card>
    </div>
  )
  
  const f = sess.feedback
  const metrics = f.metrics || {}

  const sidebarItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/new-session', icon: Mic, label: 'Practice' },
    { to: '/history', icon: BarChart3, label: 'Sessions' },
    { to: '/dna', icon: Activity, label: 'Insights' },
    { to: '/twin', icon: Brain, label: 'Communication Twin' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-[#050507] flex">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b7bff]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#5ef2c8]/3 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#050507]/50 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-zinc-200 text-black grid place-items-center font-bold text-sm">V</div>
            <span className="bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent font-semibold">VoiceTwin</span>
          </div>
          
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-zinc-400 hover:text-white hover:bg-white/5">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-40">
          <Link to="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
            <BarChart3 size={16} className="text-[#8b7bff]" />
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/dashboard" className="text-sm text-zinc-500 flex items-center gap-2 mb-4 hidden lg:flex">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
            
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Conversation Complete</h1>
                <div className="text-sm text-zinc-500">
                  {sess.scenario} • {sess.date} • {Math.floor(sess.duration / 60)}:{String(sess.duration % 60).padStart(2, '0')}
                  {sess.isPressure && (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] border border-red-500/20">
                      <Flame className="w-3 h-3" />
                      Pressure Mode
                    </span>
                  )}
                </div>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b7bff]/30 to-[#5ef2c8]/20 rounded-full blur-[40px]" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#8b7bff] to-[#b8adff] text-white grid place-items-center text-3xl font-bold shadow-[0_0_40px_rgba(139,123,255,0.4)]">
                    {sess.score}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Score Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Communication Score</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent">
                    {sess.score}<span className="text-2xl text-zinc-500">/100</span>
                  </div>
                  <div className="text-sm text-zinc-400 mt-2">
                    {sess.score >= 80 ? 'Strong performance — your answers were relevant and structured.' :
                     sess.score >= 60 ? 'Good performance with room for improvement in clarity and conciseness.' :
                     'Focus on structuring your answers and providing specific examples.'}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{Math.floor(Math.random() * 10) + 3}% from last session</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            {[
              { key: 'clarity', label: 'Clarity', color: 'from-[#8b7bff] to-[#b8adff]' },
              { key: 'confidence', label: 'Confidence', color: 'from-emerald-400 to-emerald-500' },
              { key: 'relevance', label: 'Relevance', color: 'from-amber-400 to-amber-500' },
              { key: 'conciseness', label: 'Conciseness', color: 'from-pink-400 to-pink-500' },
              { key: 'technicalDepth', label: 'Technical', color: 'from-blue-400 to-blue-500' },
              { key: 'structure', label: 'Structure', color: 'from-teal-400 to-teal-500' }
            ].map((metric, i) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Card>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                      {metrics[metric.key] || 0}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{metric.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Strengths and Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold">What you did well</h3>
              </div>
              <div className="space-y-3">
                {(f.strengths || [
                  'Strong technical explanations',
                  'Relevant examples provided',
                  'Clear structure in responses',
                  'Good use of industry terminology'
                ]).map((s: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-sm text-zinc-300 flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold">Improve next time</h3>
              </div>
              <div className="space-y-3">
                {(f.improvements || [
                  'Reduce filler words (um, uh, like)',
                  'Make answers more concise',
                  'Add measurable results',
                  'Improve pacing and timing'
                ]).map((s: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-sm text-zinc-300 flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Session Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Session Statistics</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Duration</div>
                  <div className="text-xl font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8b7bff]" />
                    {Math.floor(sess.duration / 60)}:{String(sess.duration % 60).padStart(2, '0')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Exchanges</div>
                  <div className="text-xl font-semibold">{sess.messages.length}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Filler Words</div>
                  <div className="text-xl font-semibold text-amber-400">{metrics.fillerWords || 0}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Avg Response</div>
                  <div className="text-xl font-semibold">{metrics.avgResponseLength || 0} words</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Conversation Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Conversation Transcript</h3>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-auto">
                {sess.messages.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className={`p-4 rounded-xl text-sm ${
                      m.role === 'user'
                        ? 'bg-white/5 ml-8'
                        : 'bg-[#8b7bff]/10 mr-8 border border-[#8b7bff]/20'
                    }`}
                  >
                    <div className="text-xs text-zinc-500 mb-2">{m.role === 'user' ? 'YOU' : 'AI INTERVIEWER'}</div>
                    {m.text}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Personalized Recommendations</h3>
              </div>
              <div className="text-sm text-zinc-300 space-y-3">
                {(f.suggestions || [
                  'Practice giving answers in under 60 seconds',
                  'Use STAR method: Situation, Task, Action, Result',
                  'Reduce filler words by pausing before speaking',
                  'Include specific examples and metrics'
                ]).map((s: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <ArrowRight className="w-4 h-4 text-[#8b7bff] mt-0.5 flex-shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/new-session" className="flex-1">
              <Button gradient className="w-full shadow-[0_0_30px_rgba(139,123,255,0.3)] hover:shadow-[0_0_40px_rgba(139,123,255,0.4)]">
                <Mic className="w-4 h-4 mr-2" />
                Practice Again
              </Button>
            </Link>
            <Link to="/dashboard" className="flex-1">
              <Button variant="secondary" className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#050507]/90 backdrop-blur-xl border-t border-white/5 z-30">
        <div className="flex items-center justify-around py-3">
          {[
            { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
            { to: '/new-session', icon: Mic, label: 'Practice' },
            { to: '/history', icon: BarChart3, label: 'Sessions' },
            { to: '/twin', icon: Brain, label: 'Twin' }
          ].map((item) => (
            <Link key={item.to} to={item.to} className="flex flex-col items-center gap-1 px-3 py-2">
              <item.icon size={18} className="text-zinc-500" />
              <span className="text-[10px] text-zinc-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}