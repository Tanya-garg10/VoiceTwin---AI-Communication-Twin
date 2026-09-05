
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import twinRoutes from './routes/twin.js'
import sessionRoutes from './routes/sessions.js'
import voiceRoutes from './routes/voice.js'
dotenv.config()
const app=express()
app.use(cors({origin: process.env.FRONTEND_URL||'*'}))
app.use(express.json())
app.get('/api/health', (_,res)=>res.json({status:'ok', mode: process.env.AGORA_APP_ID?'live':'demo'}))
app.use('/api/auth', authRoutes)
app.use('/api/twin', twinRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/voice', voiceRoutes)
app.use((err:any,_:any,res:any,__:any)=>{ console.error(err); res.status(500).json({error:'Internal error'})})
const port=process.env.PORT||4000
app.listen(port, ()=>console.log(`Backend running on ${port} — ${process.env.AGORA_APP_ID?'Live':'Demo'} mode`))
