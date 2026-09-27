import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { Mic, ArrowRight, Sparkles, User, Shield } from 'lucide-react'

export default function Auth(){
  const [email,setEmail]=useState('demo@voicetwin.ai')
  const [mode,setMode]=useState<'login'|'signup'>('login')
  const setUser=useStore(s=>s.setUser)
  const nav=useNavigate()
  
  const handleAuth = () => {
    setUser({email})
    const hasProfile = !!localStorage.getItem('vt_profile')
    nav(hasProfile ? '/dashboard' : '/onboarding')
  }

  const handleDemo = () => {
    setUser({ email: 'demo@voicetwin.ai' })
    nav('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4 overflow-x-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b7bff]/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b7bff]/5 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px]"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-white text-black grid place-items-center text-2xl font-bold"
          >
            V
          </motion.div>
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Welcome to VoiceTwin</h1>
          <p className="text-zinc-400 text-sm">Your AI Communication Twin</p>
        </div>

        <Card className="border-[#8b7bff]/30 bg-gradient-to-br from-[#15131f] to-[#0e0e10]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#8b7bff]" />
            </div>
            <div className="text-sm font-medium">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#8b7bff] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 block mb-2">Password</label>
              <input
                type="password"
                defaultValue="demo1234"
                placeholder="•••••••••"
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#8b7bff] transition-colors"
              />
            </div>

            <Button
              className="w-full shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)]"
              onClick={handleAuth}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center">
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="text-sm font-medium text-emerald-300">Try Demo Mode</div>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Skip profile creation and start practicing immediately with simulated AI responses.
            </p>
            <Button
              variant="secondary"
              className="w-full border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
              onClick={handleDemo}
            >
              Try Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-600 mb-2">
            <Shield className="w-4 h-4" />
            <span>Privacy & Security</span>
          </div>
          <p className="text-xs text-zinc-600">
            Your communication profile is used to personalize your VoiceTwin experience.
            We do not store sensitive personal information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            ← Back to landing page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}