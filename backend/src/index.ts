
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import twinRoutes from './routes/twin.js'
import sessionRoutes from './routes/sessions.js'
import voiceRoutes from './routes/voice.js'
import premiumRoutes from './routes/premium.js'
dotenv.config()
const app=express()
app.use(cors({origin: process.env.FRONTEND_URL||'*'}))
app.use(express.json())

// Root route
app.get('/', (_: any, res: any) => {
  res.json({
    message: 'VoiceTwin Premium Platform API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      twin: '/api/twin',
      sessions: '/api/sessions',
      voice: '/api/voice',
      premium: '/api/premium'
    }
  })
})

app.get('/api/health', (_: any, res: any)=>res.json({status:'ok', mode: process.env.AGORA_APP_ID?'live':'demo', platform: 'VoiceTwin - Premium AI Communication Platform'}))
app.use('/api/auth', authRoutes)
app.use('/api/twin', twinRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/voice', voiceRoutes)
app.use('/api/premium', premiumRoutes)
app.use((err:any,_:any,res:any,__:any)=>{ console.error(err); res.status(500).json({error:'Internal error'})})
const port=process.env.PORT||4000
app.listen(port, ()=>console.log(`VoiceTwin Premium Platform running on ${port} — ${process.env.AGORA_APP_ID?'Live':'Demo'} mode`))
