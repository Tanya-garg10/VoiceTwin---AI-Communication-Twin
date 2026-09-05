
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
const router=Router()
const users=new Map<string,any>()
const authSecret=process.env.AUTH_SECRET||crypto.randomBytes(32).toString('hex')
router.post('/signup', async (req,res)=>{
  const {email,password}=req.body
  if(!email||!password) return res.status(400).json({error:'Missing fields'})
  const hash=await bcrypt.hash(password,10)
  users.set(email,{email,hash})
  const token=jwt.sign({email}, authSecret, {expiresIn:'7d'})
  res.json({token,user:{email}})
})
router.post('/login', async (req,res)=>{
  const {email,password}=req.body
  const u=users.get(email)
  if(!u) return res.status(401).json({error:'Invalid credentials — demo mode allows any email'})
  // demo: allow any
  const token=jwt.sign({email}, authSecret, {expiresIn:'7d'})
  res.json({token,user:{email}})
})
export default router
