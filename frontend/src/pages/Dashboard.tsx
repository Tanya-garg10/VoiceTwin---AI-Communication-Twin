import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { Mic, Flame, History, Sparkles, User, ArrowRight, Target, Brain, Briefcase, Users, TrendingUp, Clock, Award, Zap, Play, LayoutDashboard, MessageSquare, BarChart3, Settings, ChevronRight, Activity, Crown } from 'lucide-react'

export default function Dashboard(){
  const profile=useStore(s=>s.profile)
  const sessions=useStore(s=>s.sessions)
  const twin=useStore(s=>s.twin)
  const user=useStore(s=>s.user)
  const avg = sessions.length? Math.round(sessions.reduce((a,s)=>a+s.score,0)/sessions.length):0
  const totalMinutes = sessions.length? Math.round(sessions.reduce((a,s)=>a+s.duration,0)/60):0

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const sidebarItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', active: true },
    { to: '/new-session', icon: Mic, label: 'Practice' },
    { to: '/history', icon: History, label: 'Sessions' },
    { to: '/dna', icon: BarChart3, label: 'Insights' },
    { to: '/twin', icon: Brain, label: 'Communication Twin' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ]

  const quickModes = [
    { mode: 'interview', label: 'Interview', icon: Target, desc: 'Technical & HR' },
    { mode: 'presentation', label: 'Presentation', icon: Mic, desc: 'Public speaking' },
    { mode: 'meeting', label: 'Meeting', icon: Users, desc: 'Client & Team' },
    { mode: 'pitch', label: 'Client Pitch', icon: Briefcase, desc: 'Sales & Negotiation' }
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
              <div className="text-sm font-medium truncate">{profile?.name || user?.email || 'User'}</div>
              <div className="text-xs text-zinc-500">
                {user?.isPremium ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Crown size={12} />
                    Premium
                  </span>
                ) : 'Free Plan'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">{avg}/100</span>
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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white to-zinc-200 text-black grid place-items-center font-bold text-xs">V</div>
            <span className="bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent font-semibold text-sm">VoiceTwin</span>
          </div>
          <Link to="/settings">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b7bff]/20 to-[#5ef2c8]/20 flex items-center justify-center border border-white/10">
              <User size={16} className="text-[#8b7bff]" />
            </div>
          </Link>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {greeting()}, {profile?.name || 'there'}.
            </h1>
            <p className="text-zinc-400">Ready to sharpen your communication?</p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b7bff]/10 rounded-full blur-[60px]" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
                  <p className="text-zinc-400 text-sm mb-4">Choose a mode and begin practicing with your AI twin</p>
                  <div className="flex flex-wrap gap-2">
                    {quickModes.map((mode) => (
                      <Link key={mode.mode} to="/new-session">
                        <Button variant="secondary" size="sm" className="text-xs">
                          {mode.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8b7bff]/20 to-[#5ef2c8]/15 flex items-center justify-center">
                      <Mic className="w-10 h-10 text-[#8b7bff]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#5ef2c8]/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-[#5ef2c8]" />
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/new-session" className="absolute bottom-4 right-4">
                <Button size="sm" gradient className="shadow-[0_0_30px_rgba(139,123,255,0.3)]">
                  Start Voice Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Daily Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold">Today's Communication Mission</h3>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">
                    "Explain your project to a non-technical person in 30 seconds"
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>30 sec challenge</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>+50 XP</span>
                    </div>
                  </div>
                </div>
                <Link to="/new-session">
                  <Button size="sm" className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-amber-500/30">
                    Start Challenge
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Communication Twin Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Your Communication Twin</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">Status</span>
                    <span className="text-xs text-[#8b7bff]">Personalized</span>
                  </div>
                </div>
                <Link to="/twin">
                  <Button variant="ghost" size="sm">
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Clarity', value: 86 },
                  { label: 'Confidence', value: 79 },
                  { label: 'Relevance', value: 91 },
                  { label: 'Conciseness', value: 74 }
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold text-[#8b7bff]">{metric.value}</div>
                    <div className="text-xs text-zinc-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Sessions</h3>
              <Link to="/history">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            {sessions.length === 0 ? (
              <Card className="text-center py-12">
                <Activity className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                <div className="text-zinc-500 text-sm mb-4">No practice sessions yet</div>
                <Link to="/new-session">
                  <Button gradient size="sm">Start Your First Session</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-2">
                {sessions.slice(0, 3).map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Link to={`/report/${s.id}`}>
                      <Card hover className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b7bff]/15 to-[#5ef2c8]/10 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-[#8b7bff]" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{s.title}</div>
                            <div className="text-xs text-zinc-500">{s.scenario} • {s.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#8b7bff]">{s.score}/100</div>
                            <div className="text-xs text-zinc-500">{Math.floor(s.duration / 60)}m</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs text-zinc-500">Score</span>
              </div>
              <div className="text-2xl font-bold">{avg}</div>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs text-zinc-500">Time</span>
              </div>
              <div className="text-2xl font-bold">{totalMinutes}m</div>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs text-zinc-500">Sessions</span>
              </div>
              <div className="text-2xl font-bold">{sessions.length}</div>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs text-zinc-500">Streak</span>
              </div>
              <div className="text-2xl font-bold">{Math.min(sessions.length, 7)}d</div>
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
            { to: '/history', icon: History, label: 'Sessions' },
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