
import { Router } from 'express'
const router=Router()
let twinStore:any={personality:'Professional', convStyle:'Conversational', coaching:'Balanced', difficulty:'Intermediate'}
router.get('/', (_: any, res: any)=>res.json(twinStore))
router.put('/', (req: any, res: any)=>{ twinStore={...twinStore,...req.body}; res.json(twinStore)})
export default router
