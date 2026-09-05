
import { Router } from 'express'
const router=Router()
let twinStore:any={personality:'Professional', convStyle:'Conversational', coaching:'Balanced', difficulty:'Intermediate'}
router.get('/', (_,res)=>res.json(twinStore))
router.put('/', (req,res)=>{ twinStore={...twinStore,...req.body}; res.json(twinStore)})
export default router
