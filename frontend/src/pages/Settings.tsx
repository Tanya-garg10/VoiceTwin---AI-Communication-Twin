import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { ArrowLeft, Shield, Trash2, LogOut, AlertTriangle, Settings as SettingsIcon, User, Database, BarChart3, Mic, Target, Flame, Key, Crown, Sparkles, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Settings(){
  const setUser=useStore(s=>s.setUser)
  const profile=useStore(s=>s.profile)
  const [apiKey, setApiKey] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // Load API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('vt_openai_api_key')
    if (savedKey) {
      setApiKey(savedKey)
      setIsPremium(true)
    }
  }, [])
  
  const handleResetDemo = () => {
    localStorage.clear()
    location.href = '/'
  }

  const handleClearSessions = () => {
    localStorage.removeItem('vt_sessions')
    localStorage.removeItem('vt_twin')
    location.reload()
  }

  const handleDeleteProfile = () => {
    if (confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
      localStorage.removeItem('vt_profile')
      localStorage.removeItem('vt_user')
      setUser(null)
      location.href = '/'
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('vt_user')
    location.href = '/'
  }

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('vt_openai_api_key', apiKey.trim())
      setIsPremium(true)
      alert('API Key saved successfully! Premium features are now enabled.')
    }
  }

  const handleRemoveApiKey = () => {
    if (confirm('Are you sure you want to remove your API key? Premium features will be disabled.')) {
      localStorage.removeItem('vt_openai_api_key')
      setApiKey('')
      setIsPremium(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#08080a] pb-20 lg:pb-0">
      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#08080a]/80 backdrop-blur-lg sticky top-0 z-40">
        <Link to="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
          <SettingsIcon size={16} className="text-[#8b7bff]" />
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
          <span className="text-[#8b7bff]">Settings</span>
        </div>
        <div className="flex gap-1">
          {[
            { to: '/dashboard', label: 'Home' },
            { to: '/new-session', label: 'Practice' },
            { to: '/twin', label: 'Twin Studio' },
            { to: '/dna', label: 'Insights' },
            { to: '/history', label: 'History' }
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

      <div className="max-w-[700px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="text-sm text-zinc-500 flex items-center gap-2 mb-4 hidden lg:flex">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <h1 className="text-2xl lg:text-3xl font-semibold">Settings</h1>
          <p className="text-zinc-400 mt-2 text-sm">Manage your profile, data, and privacy preferences.</p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Profile</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Name</span>
                <span>{profile?.name || 'Not set'}</span>
              </div>
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
            </div>
            <Link to="/onboarding" className="mt-4 block">
              <Button variant="secondary" size="sm">
                Edit Profile
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Premium Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Card className={`relative overflow-hidden premium-card ${isPremium ? 'premium-card-active premium-glow' : ''}`}>
            {isPremium && (
              <>
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[60px]" />
              </>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                {isPremium ? (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-5 h-5 text-amber-400 premium-feature-icon" />
                  </motion.div>
                ) : (
                  <Sparkles className="w-5 h-5 text-[#8b7bff]" />
                )}
                <h3 className="font-medium">
                  {isPremium ? (
                    <span className="text-gradient-premium">Premium Active</span>
                  ) : (
                    'Upgrade to Premium'
                  )}
                </h3>
                {isPremium && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 premium-badge"
                  >
                    PRO
                  </motion.span>
                )}
              </div>
              
              {isPremium ? (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400">
                    Your OpenAI API key is configured. Premium features are now enabled.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Sparkles, text: 'Advanced AI Models' },
                      { icon: Sparkles, text: 'Priority Processing' },
                      { icon: Sparkles, text: 'Custom Twins' },
                      { icon: Sparkles, text: 'Unlimited Sessions' }
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <feature.icon className="w-4 h-4 text-amber-400 premium-feature-icon" />
                        <span className="text-zinc-300">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    className="border-red-500/30 text-red-300 hover:bg-red-500/20 w-full"
                    onClick={handleRemoveApiKey}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Remove API Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400">
                    Add your OpenAI API key to unlock premium features and advanced AI capabilities.
                  </p>
                  <div className="space-y-3">
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full premium-input rounded-lg pl-10 pr-10 py-2.5 text-sm"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showApiKey ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        gradient
                        className="w-full shadow-[0_0_30px_rgba(139,123,255,0.3)] btn-ultra-premium"
                        onClick={handleSaveApiKey}
                        disabled={!apiKey.trim()}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Enable Premium
                      </Button>
                    </motion.div>
                  </div>
                  <p className="text-xs text-zinc-500 text-center">
                    Your API key is stored locally and never shared with third parties.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Data Management</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              All data is stored locally in Demo Mode. Backend PostgreSQL integration is ready for production.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                onClick={handleClearSessions}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Sessions
              </Button>
              <Button
                variant="secondary"
                className="border-red-500/30 text-red-300 hover:bg-red-500/20"
                onClick={handleResetDemo}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Privacy</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              Twin Memory can be deleted at any time. No raw conversations are sent without your consent.
              VoiceTwin is a Communication Twin — it learns communication preferences, not your identity.
            </p>
            <Button
              variant="secondary"
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
              onClick={handleDeleteProfile}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete My Data
            </Button>
          </Card>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <LogOut className="w-5 h-5 text-[#8b7bff]" />
              <h3 className="font-medium">Account</h3>
            </div>
            <Button
              onClick={handleLogout}
              className="w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Card className="bg-white/5">
            <div className="text-xs text-zinc-500 space-y-2">
              <div className="flex justify-between">
                <span>Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Backend</span>
                <span>Express / PostgreSQL Ready</span>
              </div>
              <div className="flex justify-between">
                <span>Voice AI</span>
                <span>Agora Conversation AI</span>
              </div>
              <div className="flex justify-between">
                <span>Database</span>
                <span>Supabase Ready</span>
              </div>
            </div>
          </Card>
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
              <item.icon size={20} className={item.to === '/settings' ? 'text-[#8b7bff]' : 'text-zinc-400'} />
              <span className="text-[10px] text-zinc-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}