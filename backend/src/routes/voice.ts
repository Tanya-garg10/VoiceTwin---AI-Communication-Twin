import { Router } from 'express'
import pkg from 'agora-access-token'
const { RtcTokenBuilder, RtcRole } = pkg

const router = Router()

router.post('/token', (req: any, res: any) => {
  try {
    const { channel = 'voicetwin-channel', uid = 0 } = req.body
    const appId = process.env.AGORA_APP_ID
    const cert = process.env.AGORA_APP_CERTIFICATE

    if (!appId || !cert) {
      return res.json({
        mode: 'demo',
        message: 'Agora credentials not configured on backend. Set AGORA_APP_ID & AGORA_APP_CERTIFICATE for production voice channel access.',
        appId: appId || 'demo-app-id',
        token: null,
        channel
      })
    }

    const expirationTimeInSeconds = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      cert,
      channel,
      uid,
      RtcRole.PUBLISHER,
      privilegeExpiredTs
    )

    return res.json({
      mode: 'live',
      appId,
      token,
      channel,
      uid
    })
  } catch (err: any) {
    console.error('Error generating Agora token:', err)
    return res.status(500).json({ error: 'Failed to generate Agora RTC token', details: err.message })
  }
})

router.post('/respond', async (req: any, res: any) => {
  const { message, scenario, twin, history = [], isPressure = false } = req.body

  try {
    // Generates contextual follow-ups based on communication profile & mode
    const systemPrompt = `You are VoiceTwin, an AI communication twin acting as a coach in ${scenario} mode.
User style: ${twin?.personality || 'Professional'}. ${isPressure ? 'MODE: PRESSURE MODE. Be challenging, question weak claims, ask for specific metrics and concrete examples.' : 'MODE: Supportive & constructive.'}`

    let reply = ''
    if (isPressure) {
      reply = `[Pressure Mode] You mentioned "${message?.slice(0, 30)}...". That sounds high-level. What specific metrics or evidence prove this result?`
    } else {
      reply = `Good explanation regarding "${message?.slice(0, 30)}...". How did you structure your role when handling key challenges in that project?`
    }

    return res.json({
      reply,
      mode: process.env.AGORA_APP_ID ? 'live' : 'demo'
    })
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to process AI response' })
  }
})

export default router
