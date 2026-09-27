import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { ArrowLeft, Brain, Sparkles, Target, Mic, Flame, Users, Briefcase, MessageSquare, TrendingUp, Clock, Award, Zap, Play, ChevronRight, LayoutDashboard, Settings, BarChart3, User, Activity, Globe, FileText, Lightbulb, AlertCircle } from 'lucide-react'

export default function TwinStudio(){
  const twin = useStore(s => s.twin)
  const setTwin = useStore(s => s.setTwin)
  const profile = useStore(s => s.profile)

  const personalities: Array<'Professional'|'Friendly'|'Challenging'|'Supportive'|'Strict'|'Analytical'> = ['Professional', 'Friendly', 'Challenging', 'Supportive', 'Strict', 'Analytical']
  const convStyles: Array<'Concise'|'Detailed'|'Storytelling'|'Direct'|'Conversational'> = ['Concise', 'Detailed', 'Storytelling', 'Direct', 'Conversational']
  const difficulties: Array<'Beginner'|'Intermediate'|'Advanced'|'Expert'> = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  const communicationMetrics = {
    clarity: 86,
    confidence: 79,
    relevance: 91,
    conciseness: 74,
    technicalDepth: 82,
    pacing: 78
  }

  const strengths = [
    'Strong technical explanations',
    'Relevant examples',
    'Clear structure',
    'Good use of analogies'
  ]

  const areasToImprove = [
    'Reduce filler words',
    'More concise answers',
    'Add measurable results',
    'Improve pacing'
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
            {[
              { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
              { to: '/new-session', icon: Mic, label: 'Practice' },
              { to: '/history', icon: BarChart3, label: 'Sessions' },
              { to: '/dna', icon: Activity, label: 'Insights' },
              { to: '/twin', icon: Brain, label: 'Communication Twin', active: true },
              { to: '/settings', icon: Settings, label: 'Settings' }
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  item.active 
                    ? 'bg-[#8b7bff]/10 text-[#8b7bff]' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b7bff]/20 to-[#5ef2c8]/20 flex items-center justify-center">
              <User size={16} className="text-[#8b7bff]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{profile?.name || 'User'}</div>
              <div className="text-xs text-zinc-500">Communication Score</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">82/100</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp size={12} />
              8%
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-40">
          <Link to="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
            <Brain size={16} className="text-[#8b7bff]" />
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Communication Twin Profile</h1>
            <p className="text-zinc-400">Your personalized AI communication assistant</p>
          </motion.div>

          {/* Communication Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Communication Metrics</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(communicationMetrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-[#8b7bff]">{value}</div>
                    <div className="text-xs text-zinc-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Profile Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Profile Context</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Role</span>
                  <span>{profile?.role || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Experience</span>
                  <span>{profile?.experience || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Goal</span>
                  <span className="text-right max-w-[200px]">{profile?.goal || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Language</span>
                  <span>English</span>
                </div>
              </div>
              <Link to="/onboarding" className="mt-4 block">
                <Button variant="secondary" size="sm" className="w-full">
                  Edit Profile
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Twin Configuration</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Personality</span>
                  <span className="text-[#8b7bff]">{twin.personality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Style</span>
                  <span>{twin.convStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Difficulty</span>
                  <span>{twin.difficulty}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                  <Sparkles className="w-3 h-3 text-[#8b7bff]" />
                  <span>AI adapts to your communication patterns</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Strengths & Areas to Improve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold">Strengths</h3>
              </div>
              <div className="space-y-2">
                {strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span className="text-zinc-300">{strength}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold">Areas to Improve</h3>
              </div>
              <div className="space-y-2">
                {areasToImprove.map((area, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <span className="text-zinc-300">{area}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Twin Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Customize Twin Behavior</h3>
              </div>

              <div className="space-y-6">
                {/* Personality */}
                <div>
                  <div className="text-sm text-zinc-500 mb-3">Personality</div>
                  <div className="flex flex-wrap gap-2">
                    {personalities.map((p) => (
                      <button
                        key={p}
                        onClick={() => setTwin({ ...twin, personality: p as 'Professional'|'Friendly'|'Challenging'|'Supportive'|'Strict'|'Analytical' })}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          twin.personality === p
                            ? 'bg-[#8b7bff]/20 text-[#8b7bff] border border-[#8b7bff]/30'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation Style */}
                <div>
                  <div className="text-sm text-zinc-500 mb-3">Conversation Style</div>
                  <div className="flex flex-wrap gap-2">
                    {convStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setTwin({ ...twin, convStyle: style as 'Concise'|'Detailed'|'Storytelling'|'Direct'|'Conversational' })}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          twin.convStyle === style
                            ? 'bg-[#8b7bff]/20 text-[#8b7bff] border border-[#8b7bff]/30'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <div className="text-sm text-zinc-500 mb-3">Difficulty Level</div>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setTwin({ ...twin, difficulty: diff as 'Beginner'|'Intermediate'|'Advanced'|'Expert' })}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          twin.difficulty === diff
                            ? 'bg-[#8b7bff]/20 text-[#8b7bff] border border-[#8b7bff]/30'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#8b7bff]" />
                <h3 className="font-semibold">Start Practice Session</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Target, label: 'Interview' },
                  { icon: Mic, label: 'Presentation' },
                  { icon: Users, label: 'Meeting' },
                  { icon: Flame, label: 'Pressure Mode' }
                ].map((mode) => (
                  <Link key={mode.label} to="/new-session">
                    <Button variant="secondary" size="sm" className="w-full">
                      <mode.icon className="w-4 h-4 mr-2" />
                      {mode.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </Card>
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
              <item.icon size={18} className={item.to === '/twin' ? 'text-[#8b7bff]' : 'text-zinc-500'} />
              <span className="text-[10px] text-zinc-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}