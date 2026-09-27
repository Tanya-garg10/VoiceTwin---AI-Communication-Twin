import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { ArrowLeft, Sparkles, Target, Brain, TrendingUp, Clock, Award, Flame, BarChart3, User, Mic } from 'lucide-react'

export default function ProfileDNA(){
  const profile=useStore(s=>s.profile)
  const sessions=useStore(s=>s.sessions)
  const twin=useStore(s=>s.twin)

  // Generate chart data
  const chartData = sessions.length > 0 
    ? sessions.map((s,i)=>({name:`Week ${i+1}`, score:s.score, confidence:s.metrics?.confidence||70, clarity:s.metrics?.clarity||75})).reverse()
    : [
        { name: 'Week 1', score: 68, confidence: 65, clarity: 70 },
        { name: 'Week 2', score: 74, confidence: 72, clarity: 76 },
        { name: 'Week 3', score: 81, confidence: 78, clarity: 82 },
        { name: 'Week 4', score: 84, confidence: 80, clarity: 85 }
      ]

  const radarData = [
    { subject: 'Clarity', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.clarity || 75 : 75, fullMark: 100 },
    { subject: 'Confidence', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.confidence || 70 : 70, fullMark: 100 },
    { subject: 'Relevance', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.relevance || 72 : 72, fullMark: 100 },
    { subject: 'Conciseness', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.conciseness || 68 : 68, fullMark: 100 },
    { subject: 'Structure', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.structure || 74 : 74, fullMark: 100 },
    { subject: 'Technical', A: sessions.length > 0 ? sessions[sessions.length-1].metrics?.technicalDepth || 70 : 70, fullMark: 100 }
  ]

  const modeDistribution = [
    { mode: 'Interview', count: sessions.filter(s => s.scenario.includes('Interview')).length || 4 },
    { mode: 'Presentation', count: sessions.filter(s => s.scenario === 'Presentation').length || 2 },
    { mode: 'Meeting', count: sessions.filter(s => s.scenario.includes('Meeting')).length || 3 },
    { mode: 'Pressure', count: sessions.filter(s => s.isPressure).length || 2 }
  ]

  const avgScore = sessions.length > 0 ? Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length) : 78
  const totalMinutes = sessions.length > 0 ? Math.round(sessions.reduce((a, s) => a + s.duration, 0) / 60) : 45

  return (
    <div className="min-h-screen bg-[#08080a] pb-20 lg:pb-0">
      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#08080a]/80 backdrop-blur-lg sticky top-0 z-40">
        <Link to="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
          <Sparkles size={16} className="text-[#8b7bff]" />
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
          <span className="text-[#8b7bff]">Insights</span>
        </div>
        <div className="flex gap-1">
          {[
            { to: '/dashboard', label: 'Home' },
            { to: '/new-session', label: 'Practice' },
            { to: '/twin', label: 'Twin Studio' },
            { to: '/history', label: 'History' },
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

      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="text-sm text-zinc-500 flex items-center gap-2 mb-4 hidden lg:flex">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <h1 className="text-2xl lg:text-3xl font-semibold">Communication DNA</h1>
          <p className="text-zinc-400 mt-2 text-sm">Your unique communication style profile and progress tracking.</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#8b7bff]" />
              <span className="text-xs text-zinc-500">Overall Score</span>
            </div>
            <div className="text-2xl font-semibold bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent">{avgScore}</div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#8b7bff]" />
              <span className="text-xs text-zinc-500">Sessions</span>
            </div>
            <div className="text-2xl font-semibold">{sessions.length}</div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#8b7bff]" />
              <span className="text-xs text-zinc-500">Practice Time</span>
            </div>
            <div className="text-2xl font-semibold">{totalMinutes}m</div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#8b7bff]" />
              <span className="text-xs text-zinc-500">Streak</span>
            </div>
            <div className="text-2xl font-semibold">7 days</div>
          </Card>
        </motion.div>

        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <h3 className="font-medium mb-4">Score Progress Over Time</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Line type="monotone" dataKey="score" stroke="#8b7bff" strokeWidth={2} dot={{ fill: '#8b7bff' }} />
                  <Line type="monotone" dataKey="confidence" stroke="#5ef2c8" strokeWidth={2} dot={{ fill: '#5ef2c8' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Communication Style Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="font-medium mb-4">Communication Style Profile</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#71717a" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 10 }} />
                    <Radar name="Current" dataKey="A" stroke="#8b7bff" fill="#8b7bff" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Practice Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <h3 className="font-medium mb-4">Practice Distribution</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modeDistribution}>
                    <XAxis dataKey="mode" stroke="#71717a" fontSize={12} />
                    <YAxis stroke="#71717a" fontSize={12} />
                    <Bar dataKey="count" fill="#8b7bff" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Communication Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="border-[#8b7bff]/30 bg-gradient-to-br from-[#15131f] to-[#0e0e10]">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Your Communication Profile</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-zinc-500 mb-3">Communication Style</div>
                <div className="flex flex-wrap gap-2">
                  {(profile?.commStyle || ['Concise', 'Technical']).map((s:string) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-3">Preferred Language</div>
                <div className="flex flex-wrap gap-2">
                  {(profile?.preferredLanguage || ['English']).map((l:string) => (
                    <span key={l} className="px-3 py-1 rounded-full bg-[#8b7bff]/20 border border-[#8b7bff]/30 text-xs text-[#8b7bff]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-3">Current Goal</div>
                <div className="text-sm">{profile?.goal || 'Improve communication skills'}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-3">Experience Level</div>
                <div className="text-sm">{profile?.experience || 'Mid'}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Twin Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Twin Configuration</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-zinc-500">Personality</div>
                <div className="text-sm font-medium text-[#8b7bff]">{twin.personality}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Conversation Style</div>
                <div className="text-sm">{twin.convStyle}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Coaching</div>
                <div className="text-sm">{twin.coaching}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Difficulty</div>
                <div className="text-sm">{twin.difficulty}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Twin Memory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Twin Memory</h3>
            </div>
            <div className="text-xs text-zinc-400 space-y-2">
              <p>• User tends to use filler words like "actually" and "basically"</p>
              <p>• Performs best with {twin.personality} twin and {twin.coaching.toLowerCase()} coaching</p>
              <p>• Needs work on conciseness (target: answers under 60 seconds)</p>
              <p>• Pressure mode improves assertiveness by 15%</p>
              <p>• Technical explanations are strong when structured properly</p>
            </div>
          </Card>
        </motion.div>

        {/* Strengths and Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-2 gap-6 mb-6"
        >
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="font-medium">Top Strengths</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Technical knowledge and project explanations</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Problem-solving approach and critical thinking</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Confidence under pressure situations</span>
              </div>
            </div>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="font-medium">Improvement Areas</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>Answer structure and STAR method usage</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>Reducing filler words and pauses</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>Providing specific examples and metrics</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link to="/twin" className="flex-1">
            <Button variant="secondary" className="w-full sm:w-auto">
              <Brain className="w-4 h-4 mr-2" />
              Adjust Twin Settings
            </Button>
          </Link>
          <Link to="/new-session" className="flex-1">
            <Button className="w-full sm:w-auto shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)]">
              <Mic className="w-4 h-4 mr-2" />
              Practice Session
            </Button>
          </Link>
        </motion.div>
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
              <item.icon size={20} className={item.to === '/dna' ? 'text-[#8b7bff]' : 'text-zinc-400'} />
              <span className="text-[10px] text-zinc-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}