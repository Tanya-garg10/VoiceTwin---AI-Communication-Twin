import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Orb } from '../components/Orb'
import { Mic, Zap, Target, Brain, BarChart3, Shield, ArrowRight, Sparkles, Flame, Play, Users, Briefcase, CheckCircle, Radio, ChevronRight, MessageSquare, Clock, TrendingUp, Award, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function Landing(){
  return (
    <div className="min-h-screen bg-[#050507] overflow-x-hidden">
      {/* Subtle background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b7bff]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#5ef2c8]/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#8b7bff]/3 rounded-full blur-[100px]" />
      </div>

      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-between px-4 sm:px-8 py-6 max-w-[1400px] mx-auto"
      >
        <div className="flex items-center gap-3 font-semibold tracking-tight">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-zinc-200 text-black grid place-items-center font-bold shadow-lg"
          >
            V
          </motion.div>
          <span className="bg-gradient-to-r from-white to-[#8b7bff] bg-clip-text text-transparent text-lg">VoiceTwin</span>
        </div>
        <div className="flex gap-3">
          <Link to="/auth"><Button variant="ghost" className="hidden sm:block text-zinc-400 hover:text-white">Sign in</Button></Link>
          <Link to="/auth">
            <Button gradient className="group shadow-[0_0_30px_rgba(139,123,255,0.3)] hover:shadow-[0_0_40px_rgba(139,123,255,0.4)] text-sm">
              Start Voice Session
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Premium Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <motion.div variants={itemVariants} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs mb-8"
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-zinc-400">Agora Conversation AI</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Real-time Voice</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-[52px] leading-[1.1] font-bold tracking-tight mb-6">
            Your voice.<br />
            <span className="bg-gradient-to-r from-[#8b7bff] via-[#b8adff] to-[#8b7bff] bg-clip-text text-transparent">Your context.</span><br />
            Your AI twin.
          </h1>
          
          <p className="text-[16px] sm:text-[18px] text-zinc-400 mt-6 max-w-[480px] leading-relaxed">
            Practice the conversations that matter with a real-time AI communication twin that adapts to how you communicate.
          </p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link to="/auth" className="flex-1">
              <Button size="lg" gradient className="w-full shadow-[0_0_40px_rgba(139,123,255,0.3)] hover:shadow-[0_0_50px_rgba(139,123,255,0.4)]">
                <Mic className="w-4 h-4 mr-2" />
                Start a Voice Session
              </Button>
            </Link>
            <Link to="/auth" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                Explore Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-500">Real-time voice</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-500">Context-aware</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-500">Personalized</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b7bff]/20 to-[#5ef2c8]/15 rounded-full blur-[80px]" />
            <Orb state="IDLE" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Conversation Modes */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Practice every conversation</h2>
          <p className="text-zinc-400 text-sm">Choose a mode and start practicing with your AI twin</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Target, title: 'Interview', desc: 'Technical & HR rounds', color: 'from-blue-500 to-cyan-400' },
            { icon: Mic, title: 'Presentation', desc: 'Public speaking practice', color: 'from-purple-500 to-pink-400' },
            { icon: Users, title: 'Meeting', desc: 'Client & team discussions', color: 'from-emerald-500 to-teal-400' },
            { icon: Briefcase, title: 'Client Pitch', desc: 'Sales & negotiations', color: 'from-amber-500 to-orange-400' },
            { icon: MessageSquare, title: 'Networking', desc: 'Professional conversations', color: 'from-rose-500 to-pink-400' },
            { icon: Flame, title: 'Pressure Mode', desc: 'High-intensity challenges', color: 'from-red-500 to-orange-400' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to="/auth">
                <Card hover className="h-full group cursor-pointer">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                  <p className="text-zinc-500 text-xs">{feature.desc}</p>
                  <ChevronRight className="w-4 h-4 text-zinc-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Flow */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your communication, understood</h2>
          <p className="text-zinc-400 text-sm">From context to insights in real-time</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Brain, title: 'Your Context', desc: 'Share your background, goals, and communication style' },
            { icon: Sparkles, title: 'AI Understands', desc: 'Your twin learns and adapts to how you communicate' },
            { icon: Mic, title: 'Real-time Conversation', desc: 'Practice naturally with voice-first interaction' },
            { icon: BarChart3, title: 'Personalized Insights', desc: 'Get detailed feedback and improvement suggestions' }
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <Card className="h-full">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#8b7bff]" />
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#8b7bff]/30 to-transparent" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
      >
        <Card className="bg-gradient-to-br from-white/[0.02] to-transparent border-white/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 text-[#8b7bff]" />
                <span className="text-[#8b7bff] text-sm font-medium">Powered by Agora</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Real-time voice conversation AI
              </h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                VoiceTwin combines Agora Conversation AI with intelligent context understanding to enable natural, real-time voice interactions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-300 text-sm">Ultra-low latency voice streaming</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-300 text-sm">AI-powered conversation understanding</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-300 text-sm">Adaptive follow-up questions</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#8b7bff]/15 to-[#5ef2c8]/10 flex items-center justify-center">
                  <Radio className="w-20 h-20 text-[#8b7bff]/60" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#5ef2c8]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#5ef2c8]" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
      >
        <Card className="bg-gradient-to-br from-[#8b7bff]/10 to-transparent border-[#8b7bff]/20 text-center py-16 px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to transform your communication?
          </h2>
          <p className="text-zinc-400 text-sm max-w-[500px] mx-auto mb-8">
            Start practicing with your AI Communication Twin today and master the conversations that matter most.
          </p>
          <Link to="/auth">
            <Button size="lg" gradient className="shadow-[0_0_40px_rgba(139,123,255,0.3)] hover:shadow-[0_0_50px_rgba(139,123,255,0.4)]">
              <Mic className="w-4 h-4 mr-2" />
              Start Your First Session
            </Button>
          </Link>
        </Card>
      </motion.section>

      {/* Footer */}
      <footer className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-12 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white text-black grid place-items-center font-bold text-sm">V</div>
            <span className="text-zinc-500 text-sm">VoiceTwin</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <Shield className="w-3 h-3" />
            <span>Your communication data is used to personalize your experience.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}