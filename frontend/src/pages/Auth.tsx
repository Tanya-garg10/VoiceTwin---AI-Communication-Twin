import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { Mic, ArrowRight, Sparkles, User, Shield, Crown, Zap } from 'lucide-react'

export default function Auth(){
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useStore(s => s.setUser)
  const nav = useNavigate()
  
  const handleGuestAccess = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      localStorage.setItem('vt_token', data.token)
      setUser(data.user)
      const hasProfile = !!localStorage.getItem('vt_profile')
      nav(hasProfile ? '/dashboard' : '/onboarding')
    } catch (error) {
      console.error('Guest access failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiKeyAccess = async () => {
    if (!apiKey.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      })
      const data = await response.json()
      localStorage.setItem('vt_token', data.token)
      setUser(data.user)
      const hasProfile = !!localStorage.getItem('vt_profile')
      nav(hasProfile ? '/dashboard' : '/onboarding')
    } catch (error) {
      console.error('API key access failed:', error)
    } finally {
      setIsLoading(false)
    }
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
          <p className="text-zinc-400 text-sm">Premium AI Communication Platform</p>
        </div>

        {/* Free Access Card */}
        <Card className="border-[#8b7bff]/30 bg-gradient-to-br from-[#15131f] to-[#0e0e10] mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
              <User className="w-4 h-4 text-[#8b7bff]" />
            </div>
            <div className="text-sm font-medium">Free Access</div>
          </div>

          <p className="text-xs text-zinc-400 mb-4">
            Start practicing immediately with basic AI twins and standard sessions.
          </p>

          <Button
            className="w-full shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)]"
            onClick={handleGuestAccess}
            disabled={isLoading}
          >
            {isLoading ? 'Accessing...' : 'Start Free Session'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Premium Access Card */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-[#1a1510] to-[#0e0e10] mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-medium text-amber-300">Premium Access</div>
          </div>

          <p className="text-xs text-zinc-400 mb-4">
            Unlock advanced AI models, priority processing, and unlimited sessions.
          </p>

          <div className="space-y-3">
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key (optional)"
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-amber-500 transition-colors"
            />
            <Button
              variant="secondary"
              className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
              onClick={handleApiKeyAccess}
              disabled={isLoading}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isLoading ? 'Verifying...' : 'Unlock Premium'}
            </Button>
          </div>
        </Card>

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