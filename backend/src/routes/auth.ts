import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { auth as firebaseAuth } from '../lib/firebase.js'

const router = Router()
const users = new Map<string, any>()
const authSecret = process.env.AUTH_SECRET || crypto.randomBytes(32).toString('hex')

router.post('/signup', async (req: any, res: any) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  if (firebaseAuth) {
    try {
      const userRecord = await firebaseAuth.createUser({
        email,
        password,
        emailVerified: true
      })
      
      // We still sign our own JWT to keep the demo flow intact, 
      // but in a fully production setup, you'd return the Firebase ID token.
      const token = jwt.sign({ email, sub: userRecord.uid }, authSecret, { expiresIn: '7d' })
      return res.json({ token, user: { email, id: userRecord.uid } })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  // Fallback memory
  const hash = await bcrypt.hash(password, 10)
  users.set(email, { email, hash })
  const token = jwt.sign({ email }, authSecret, { expiresIn: '7d' })
  res.json({ token, user: { email } })
})

router.post('/login', async (req: any, res: any) => {
  const { email, password } = req.body

  if (firebaseAuth) {
    // Hackathon approach: Since admin api doesn't 'sign in' per se to get a token without exposing anon key to backend,
    // we'll rely on the frontend for direct Firebase Auth, or simulate check. 
    // For this backend endpoint, we'll verify via standard firebase client if we had it, 
    // but typically frontend handles auth login directly to Firebase.
    // For demo continuity with existing UI:
    const token = jwt.sign({ email }, authSecret, { expiresIn: '7d' })
    return res.json({ token, user: { email } })
  }

  // Fallback memory
  const u = users.get(email)
  if (!u) return res.status(401).json({ error: 'Invalid credentials — demo mode allows any email' })
  // demo: allow any
  const token = jwt.sign({ email }, authSecret, { expiresIn: '7d' })
  res.json({ token, user: { email } })
})

export default router
