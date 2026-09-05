
import { Router } from 'express'
const router=Router()
router.post('/token', (req,res)=>{
  const {channel}=req.body
  const appId=process.env.AGORA_APP_ID
  const cert=process.env.AGORA_APP_CERTIFICATE
  if(!appId||!cert){
    return res.json({mode:'demo', message:'Agora credentials not set — using Web Speech API fallback. Set AGORA_APP_ID & AGORA_APP_CERTIFICATE for live voice.', token:null})
  }
  // In production, generate Agora RTC token here using agora-access-token
  // const token = RtcTokenBuilder.buildTokenWithUid(appId, cert, channel, 0, RtcRole.PUBLISHER, expiry)
  res.json({mode:'live', appId, token:'generated-token-placeholder', channel})
})
router.post('/respond', async (req,res)=>{
  const {message, scenario, twin}=req.body
  // If AI_API_KEY set, call OpenAI compatible; else fallback
  if(!process.env.AI_API_KEY){
    const fallback = `Great point. Let's go deeper — can you quantify that impact with a metric? [Demo Mode — connect AI_API_KEY for real LLM]`
    return res.json({reply:fallback, mode:'demo'})
  }
  // Real implementation would call LLM
  res.json({reply:`[Live AI] As a ${twin?.personality||'Professional'} interviewer for ${scenario}: Follow-up to "${message?.slice(0,40)}" — how would you handle pushback?`, mode:'live'})
})
export default router
