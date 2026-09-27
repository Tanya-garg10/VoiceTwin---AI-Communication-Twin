import { motion } from 'framer-motion'

interface VoiceWaveformProps {
  isSpeaking: boolean
  isListening: boolean
  className?: string
}

export function VoiceWaveform({ isSpeaking, isListening, className = '' }: VoiceWaveformProps) {
  const bars = 24

  return (
    <div className={`flex items-center justify-center gap-[3px] h-16 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = 4
        const speakingHeight = 8 + Math.sin(Date.now() / 200 + i * 0.5) * 12
        const listeningHeight = 6 + Math.random() * 18
        const idleHeight = 4

        const height = isSpeaking
          ? speakingHeight
          : isListening
            ? listeningHeight
            : idleHeight

        return (
          <motion.div
            key={i}
            animate={{ height }}
            transition={{ duration: 0.1 }}
            className="w-[3px] bg-white/80 rounded-full"
            style={{
              opacity: 0.4 + i * 0.02,
              minHeight: baseHeight
            }}
          />
        )
      })}
    </div>
  )
}

interface MinimalVoiceIndicatorProps {
  state: 'LISTENING' | 'SPEAKING' | 'THINKING' | 'IDLE'
  className?: string
}

export function MinimalVoiceIndicator({ state, className = '' }: MinimalVoiceIndicatorProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {state === 'LISTENING' && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-white/5 border-2 border-[#8b7bff]/30 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-[#8b7bff]/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#8b7bff]" />
          </div>
        </motion.div>
      )}

      {state === 'SPEAKING' && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-white/5 border-2 border-emerald-500/30 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500" />
          </div>
        </motion.div>
      )}

      {state === 'THINKING' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full bg-white/5 border-2 border-amber-500/30 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
          </div>
        </motion.div>
      )}

      {state === 'IDLE' && (
        <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/20" />
          </div>
        </div>
      )}
    </div>
  )
}