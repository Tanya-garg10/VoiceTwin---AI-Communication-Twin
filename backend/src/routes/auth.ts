import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

const router = Router()
const authSecret = process.env.AUTH_SECRET || crypto.randomBytes(32).toString('hex')

// Simple API key based authentication - makes platform accessible
router.post('/api-key', (req: any, res: any) => {
  const { apiKey } = req.body
  
  // Optional API key - if provided, give premium access
  if (apiKey && apiKey.length > 10) {
    const token = jwt.sign({ 
      email: 'premium-user', 
      isPremium: true,
      apiKey: apiKey.slice(0, 8) + '...' 
    }, authSecret, { expiresIn: '30d' })
    
    return res.json({ 
      token, 
      user: { 
        email: 'premium-user', 
        isPremium: true,
        plan: 'Premium',
        features: ['advanced_ai', 'priority_processing', 'custom_twins', 'unlimited_sessions']
      } 
    })
  }
  
  // Free access for everyone
  const token = jwt.sign({ 
    email: 'guest-user', 
    isPremium: false 
  }, authSecret, { expiresIn: '7d' })
  
  res.json({ 
    token, 
    user: { 
      email: 'guest-user', 
      isPremium: false,
      plan: 'Free',
      features: ['basic_twins', 'standard_sessions']
    } 
  })
})

// Quick guest access - no signup required
router.post('/guest', (req: any, res: any) => {
  const token = jwt.sign({ 
    email: 'guest-' + Date.now(), 
    isPremium: false 
  }, authSecret, { expiresIn: '1d' })
  
  res.json({ 
    token, 
    user: { 
      email: 'guest', 
      isPremium: false,
      plan: 'Free',
      features: ['basic_twins', 'standard_sessions']
    } 
  })
})

// Verify token
router.get('/verify', (req: any, res: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ valid: false })
  }
  
  try {
    const decoded = jwt.verify(token, authSecret)
    res.json({ valid: true, user: decoded })
  } catch (error) {
    res.status(401).json({ valid: false })
  }
})

export default router