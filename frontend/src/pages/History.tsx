import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Clock, TrendingUp, Target, Flame, ArrowLeft, Filter, BarChart3, User, Mic, Users } from 'lucide-react'

export default function History(){
  const sessions=useStore(s=>s.sessions)
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const avgScore = sessions.length > 0 ? Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length) : 0
  const totalDuration = sessions.length > 0 ? Math.round(sessions.reduce((a, s) => a + s.duration, 0) / 60) : 0
  const bestScore = sessions.length > 0 ? Math.max(...sessions.map(s => s.score)) : 0

  return (
    <div className="min-h-screen bg-[#08080a] pb-20 lg:pb-0">
      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#08080a]/80 backdrop-blur-lg sticky top-0 z-40">
        <Link to="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
          <BarChart3 size={16} className="text-[#8b7bff]" />
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#08080a]/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="flex items-center gap-2 font-semibold">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center">V</div>
            <span className="bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent">VoiceTwin</span>
          </Link>
          <span className="text-zinc-500">/</span>
          <span className="text-[#8b7bff]">History</span>
        </div>
        <div className="flex gap-1">
          {[
            { to: '/dashboard', label: 'Home' },
            { to: '/new-session', label: 'Practice' },
            { to: '/twin', label: 'Twin Studio' },
            { to: '/dna', label: 'Insights' },
            { to: '/settings', label: 'Settings' }
          ].map((item) => (
            <Link key={item.to} to={item.to}>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
          <User size={16} className="text-[#8b7bff]" />
        </div>
      </nav>

      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="text-sm text-zinc-500 flex items-center gap-2 mb-4 hidden lg:flex">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <h1 className="text-2xl lg:text-3xl font-semibold">Session History</h1>
          <p className="text-zinc-400 mt-2 text-sm">Review your past practice sessions and track your progress over time.</p>
        </motion.div>

        {sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Mic className="w-8 h-8 text-zinc-500" />
              </div>
              <div className="text-zinc-500 mb-4">No practice sessions yet</div>
              <Link to="/new-session">
                <Button className="shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)]">
                  Start Your First Session
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Summary Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <Card>
                <div className="text-xs text-zinc-500">Total Sessions</div>
                <div className="text-2xl font-semibold bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent">{sessions.length}</div>
              </Card>
              <Card>
                <div className="text-xs text-zinc-500">Average Score</div>
                <div className="text-2xl font-semibold bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent">{avgScore}</div>
              </Card>
              <Card>
                <div className="text-xs text-zinc-500">Total Time</div>
                <div className="text-2xl font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#8b7bff]" />
                  {totalDuration}m
                </div>
              </Card>
              <Card>
                <div className="text-xs text-zinc-500">Best Score</div>
                <div className="text-2xl font-semibold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">{bestScore}</div>
              </Card>
            </motion.div>

            {/* Filter Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-[#8b7bff] border-[#8b7bff]/30">
                  All Sessions
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-400">
                  Interview
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-400">
                  Presentation
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-400">
                  Pressure Mode
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Session Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {sortedSessions.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <Link to={`/report/${s.id}`}>
                    <Card hover className="h-full cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {s.scenario.includes('Interview') && <Target className="w-4 h-4 text-blue-400" />}
                            {s.scenario.includes('Presentation') && <Mic className="w-4 h-4 text-purple-400" />}
                            {s.scenario.includes('Meeting') && <Users className="w-4 h-4 text-green-400" />}
                            {s.isPressure && <Flame className="w-4 h-4 text-red-400" />}
                          </div>
                          <div className="text-sm font-medium">{s.title}</div>
                          <div className="text-xs text-zinc-500 mt-1">
                            {s.scenario} • {s.date}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-white text-black grid place-items-center text-lg font-bold">
                            {s.score}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                        <Clock className="w-3 h-3" />
                        {Math.floor(s.duration / 60)}:{String(s.duration % 60).padStart(2, '0')}
                        <span>•</span>
                        <span>{s.messages.length} exchanges</span>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <div className="text-xs text-zinc-400 mb-1">Main Feedback</div>
                        <div className="text-sm text-zinc-300 line-clamp-2">
                          {s.feedback?.recommendation || 'Great session! Keep practicing to improve your communication skills.'}
                        </div>
                      </div>

                      {s.isPressure && (
                        <div className="mt-3 inline-flex px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-[10px]">
                          🔥 Pressure Mode
                        </div>
                      )}
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#08080a]/90 backdrop-blur-lg border-t border-white/10 z-30">
        <div className="flex items-center justify-around py-2">
          {[
            { to: '/dashboard', icon: Mic, label: 'Home' },
            { to: '/new-session', icon: Target, label: 'Practice' },
            { to: '/twin', icon: Flame, label: 'Twin' },
            { to: '/history', icon: BarChart3, label: 'History' }
          ].map((item) => (
            <Link key={item.to} to={item.to} className="flex flex-col items-center gap-1 px-3 py-2">
              <item.icon size={20} className={item.to === '/history' ? 'text-[#8b7bff]' : 'text-zinc-400'} />
              <span className="text-[10px] text-zinc-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}