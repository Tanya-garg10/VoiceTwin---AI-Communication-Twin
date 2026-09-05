
POST /api/auth/signup {email,password} -> token
POST /api/auth/login
GET /api/twin, PUT /api/twin
POST /api/sessions, GET /api/sessions, GET /api/sessions/:id, POST /api/sessions/:id/end
POST /api/voice/token {channel} -> {mode, token}
POST /api/voice/respond {message, scenario, twin} -> {reply}
GET /api/health
