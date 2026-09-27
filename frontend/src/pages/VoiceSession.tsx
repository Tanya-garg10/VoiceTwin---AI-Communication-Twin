import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Orb } from '../components/Orb'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { VoiceWaveform, MinimalVoiceIndicator } from '../components/VoiceWaveform'
import { Message } from '../types'
import { analyzeText, getNextQuestion, generateFeedback } from '../lib/aiEngine'
import { useStore } from '../lib/store'
import { saveSessionToFirebase } from '../lib/firebaseClient'
import { AgoraVoiceEngine } from '../lib/agoraClient'
import { Mic, MicOff, PhoneOff, Radio, Volume2, ArrowLeft, Clock, AlertTriangle, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VoiceSession() {
  const { id } = useParams()
  const nav = useNavigate()
  const twin = useStore((s) => s.twin)
  const addSession = useStore((s) => s.addSession)
  const scenarioData = JSON.parse(localStorage.getItem('vt_current_scenario') || '{}')
  const scenario = scenarioData.scenario || 'HR Interview'
  const isPressure = scenarioData.isPressure

  const [state, setState] = useState<'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING'>('IDLE')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [agoraActive, setAgoraActive] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [liveMetrics, setLiveMetrics] = useState({
    confidence: 72,
    clarity: 78,
    pace: 'Good',
    filler: 0,
    engagement: 'High'
  })
  const [timer, setTimer] = useState(0)
  const [pressureTimer, setPressureTimer] = useState(30)

  const agoraEngineRef = useRef<AgoraVoiceEngine | null>(null)
  const recogRef = useRef<any>(null)

  useEffect(() => {
    const t = setInterval(() => setTimer((x) => x + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // Pressure mode timer
  useEffect(() => {
    if (isPressure && pressureTimer > 0) {
      const t = setInterval(() => setPressureTimer((x) => x - 1), 1000)
      return () => clearInterval(t)
    }
  }, [isPressure, pressureTimer])

  // Initialize Agora RTC Voice Channel & Web Speech backup
  useEffect(() => {
    const channelName = `voicetwin-${id || Date.now()}`
    const engine = new AgoraVoiceEngine()
    agoraEngineRef.current = engine

    // Fetch Agora RTC Token from backend
    fetch('/api/voice/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: channelName, uid: 0 })
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.appId && data.appId !== 'demo-app-id') {
          const success = await engine.initClient(data.appId, channelName, data.token, 0, (vol, isAgent) => {
            setVolumeLevel(vol)
            if (isAgent) setState('SPEAKING')
          })
          if (success) {
            setAgoraActive(true)
          }
        }
      })
      .catch((err) => console.log('Backend voice endpoint demo mode active:', err))

    // Initial twin question
    const q = getNextQuestion(scenario, [], 70)
    setMessages([{ id: '1', role: 'twin', text: (isPressure ? '[Pressure Mode] ' : '') + q, ts: Date.now() }])
    setState('LISTENING')

    // Web Speech API setup for speech-to-text fallback
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      const r = new SR()
      r.continuous = false
      r.interimResults = false
      r.lang = 'en-US'
      r.onresult = (e: any) => {
        const txt = e.results[0][0].transcript
        handleUserMessage(txt)
      }
      r.onend = () => setListening(false)
      recogRef.current = r
    }

    return () => {
      engine.leave()
    }
  }, [])

  const handleUserMessage = (text: string) => {
    const analysis = analyzeText(text)
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setLiveMetrics({
      confidence: analysis.confidence,
      clarity: analysis.clarity,
      pace: analysis.words > 35 ? 'Fast' : analysis.words < 10 ? 'Slow' : 'Good',
      filler: liveMetrics.filler + analysis.fillerCount,
      engagement: analysis.confidence > 75 ? 'High' : 'Medium'
    })
    setState('THINKING')

    setTimeout(() => {
      const perf = (analysis.clarity + analysis.confidence) / 2
      const nextQ = getNextQuestion(scenario, [...messages, userMsg], perf)
      const twinMsg: Message = { id: (Date.now() + 1).toString(), role: 'twin', text: nextQ, ts: Date.now() }
      setMessages((m) => [...m, twinMsg])
      setState('LISTENING')

      // TTS audio output
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(nextQ)
        u.onstart = () => setState('SPEAKING')
        u.onend = () => setState('LISTENING')
        speechSynthesis.speak(u)
      }
    }, 900 + Math.random() * 600)
  }

  const toggleListen = () => {
    if (agoraActive && agoraEngineRef.current) {
      agoraEngineRef.current.setMute(listening)
      setListening(!listening)
      return
    }

    if (!recogRef.current) {
      alert('Speech Recognition is not supported on this browser. Please type your answer below.')
      return
    }
    if (listening) {
      recogRef.current.stop()
      setListening(false)
    } else {
      recogRef.current.start()
      setListening(true)
      setState('LISTENING')
    }
  }

  const endSession = async () => {
    if (agoraEngineRef.current) {
      await agoraEngineRef.current.leave()
    }

    const feedback = generateFeedback(messages)
    const sess = {
      id: id!,
      scenario,
      title: scenario + ' • ' + (scenarioData.ctx?.role || 'Session'),
      date: new Date().toLocaleDateString(),
      duration: timer,
      score: feedback.overall,
      messages,
      metrics: feedback.metrics,
      feedback
    }

    // Save to Zustand store
    addSession(sess)

    // Save to Firebase DB if configured
    await saveSessionToFirebase(
      {
        id: id!,
        scenario,
        title: sess.title,
        context: scenarioData.ctx || {},
        is_pressure: Boolean(isPressure),
        score: feedback.overall,
        duration: timer
      },
      messages,
      feedback.metrics,
      feedback
    )

    nav(`/report/${id}`)
  }

  const getStateText = () => {
    switch (state) {
      case 'LISTENING': return 'Listening...'
      case 'THINKING': return 'Thinking...'
      case 'SPEAKING': return 'Speaking...'
      default: return 'Ready'
    }
  }

  const getStateColor = () => {
    switch (state) {
      case 'LISTENING': return 'text-emerald-400'
      case 'THINKING': return 'text-amber-400'
      case 'SPEAKING': return 'text-[#8b7bff]'
      default: return 'text-zinc-400'
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b7bff]/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm hidden sm:block">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">{scenario}</div>
            {isPressure && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                <AlertTriangle className="w-3 h-3" />
                <span className="font-medium">Pressure Mode</span>
                <span className="text-zinc-500">•</span>
                <span className="font-mono">{pressureTimer}s</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
          </div>
          {agoraActive && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
              <Radio className="w-3 h-3 animate-pulse" />
              <span className="font-medium">Agora Live</span>
            </div>
          )}
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={endSession} 
            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Main Voice Session Area */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 relative">
          {/* Voice Orb */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b7bff]/20 to-[#5ef2c8]/15 rounded-full blur-[80px]" />
            <Orb state={state as any} speaking={state === 'SPEAKING' || listening} level={volumeLevel / 100 || liveMetrics.filler / 10} />
          </motion.div>

          {/* AI Status */}
          <div className="text-center mb-6">
            <div className="text-sm text-zinc-500 mb-1">AI Interviewer</div>
            <div className={`text-lg font-medium ${getStateColor()}`}>{getStateText()}</div>
          </div>

          {/* Voice Waveform */}
          <div className="mb-8">
            <VoiceWaveform isSpeaking={state === 'SPEAKING'} isListening={listening} />
          </div>

          {/* Transcript Panel */}
          <div className="w-full max-w-2xl space-y-3 max-h-[200px] overflow-auto px-2 mb-6">
            {messages.slice(-4).map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-white text-black ml-8 font-medium'
                    : 'bg-white/5 border border-white/10 mr-8'
                }`}
              >
                <span className={`text-[10px] font-bold tracking-wider mr-2 ${m.role === 'user' ? 'text-indigo-600' : 'text-emerald-400'}`}>
                  {m.role === 'user' ? 'YOU' : 'AI'}
                </span>
                {m.text}
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 w-full max-w-md">
            <Button
              onClick={toggleListen}
              className={`flex-1 h-14 rounded-full font-medium transition-all ${
                listening 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gradient-to-r from-[#8b7bff] to-[#b8adff] text-white shadow-[0_0_40px_rgba(139,123,255,0.3)]'
              }`}
            >
              {listening ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
              {listening ? 'Mute' : 'Speak'}
            </Button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleUserMessage(input)
                  setInput('')
                }
              }}
              placeholder="Type response..."
              className="flex-1 h-14 rounded-full bg-white/5 border border-white/10 px-5 text-sm outline-none focus:border-[#8b7bff]/50 transition-all text-white placeholder-zinc-500"
            />
          </div>

          <div className="text-xs text-zinc-600 mt-4 text-center">
            {agoraActive ? 'Agora Conversation AI • Live' : 'Demo Mode • AI Communication Twin'}
          </div>
        </div>

        {/* Right Panel - Live Transcript & Analysis */}
        <div className="border-l border-white/5 bg-black/20 p-4 hidden lg:block">
          <div className="space-y-4">
            {/* Live Transcript */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Live Transcript</span>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-auto">
                {messages.map((m) => (
                  <div key={m.id} className={`p-3 rounded-lg text-xs ${
                    m.role === 'user' ? 'bg-white/5 ml-4' : 'bg-white/[0.02] mr-4'
                  }`}>
                    <div className={`text-[10px] font-bold mb-1 ${m.role === 'user' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {m.role === 'user' ? 'YOU' : 'AI'}
                    </div>
                    <div className="text-zinc-300 leading-relaxed">{m.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Metrics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-[#8b7bff]" />
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Live Analysis</span>
              </div>
              <div className="space-y-3">
                <Card className="py-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-500">Confidence</span>
                    <span className="font-semibold text-emerald-400">{liveMetrics.confidence}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: liveMetrics.confidence + '%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </Card>
                <Card className="py-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-500">Clarity</span>
                    <span className="font-semibold text-[#8b7bff]">{liveMetrics.clarity}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#8b7bff] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: liveMetrics.clarity + '%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </Card>
                <Card className="py-2 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Pace</span>
                    <span className="font-medium">{liveMetrics.pace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Filler Words</span>
                    <span className="font-medium text-amber-400">{liveMetrics.filler}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Engagement</span>
                    <span className="font-medium text-emerald-400">{liveMetrics.engagement}</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Coaching Tip */}
            <Card className="bg-[#8b7bff]/10 border-[#8b7bff]/20 text-xs text-[#8b7bff]/90 leading-relaxed">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-4 h-4" />
                <span className="font-medium">Coaching Tip</span>
              </div>
              {(liveMetrics.clarity + liveMetrics.confidence) / 2 > 75 
                ? 'Strong articulation. Keep answers concise and focused.' 
                : 'Try structuring your answers using Situation → Action → Result format.'}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}