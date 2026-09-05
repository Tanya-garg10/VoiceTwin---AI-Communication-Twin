
import { Router } from 'express'
const router=Router()
const sessions:any[]=[]
router.post('/', (req,res)=>{
  const s={id:Date.now().toString(), ...req.body, createdAt:new Date()}
  sessions.unshift(s)
  res.json(s)
})
router.get('/', (_,res)=>res.json(sessions))
router.get('/:id', (req,res)=>{ const s=sessions.find(x=>x.id===req.params.id); if(!s) return res.status(404).json({error:'not found'}); res.json(s)})
router.post('/:id/end', (req,res)=>{
  const idx=sessions.findIndex(x=>x.id===req.params.id)
  if(idx>=0){ sessions[idx]={...sessions[idx], ...req.body, endedAt:new Date()}; res.json(sessions[idx])}
  else res.status(404).json({error:'not found'})
})
export default router
