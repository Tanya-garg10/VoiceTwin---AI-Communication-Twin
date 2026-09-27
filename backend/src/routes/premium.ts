import express from 'express'

const router = express.Router()

// Validate OpenAI API key
router.post('/validate', async (req, res) => {
  try {
    const { apiKey } = req.body
    
    if (!apiKey || !apiKey.startsWith('sk-')) {
      return res.status(400).json({ valid: false, error: 'Invalid API key format' })
    }

    // Basic validation - in production, you'd want to make a test call to OpenAI
    const isValid = apiKey.length > 20 && apiKey.startsWith('sk-')
    
    res.json({ 
      valid: isValid,
      features: isValid ? [
        'advanced_ai_models',
        'priority_processing',
        'custom_twins',
        'unlimited_sessions'
      ] : []
    })
  } catch (error) {
    console.error('Premium validation error:', error)
    res.status(500).json({ error: 'Validation failed' })
  }
})

// Get premium features status
router.get('/features', (req, res) => {
  const hasApiKey = !!process.env.OPENAI_API_KEY
  
  res.json({
    premium: hasApiKey,
    features: hasApiKey ? [
      'advanced_ai_models',
      'priority_processing',
      'custom_twins',
      'unlimited_sessions'
    ] : []
  })
})

export default router