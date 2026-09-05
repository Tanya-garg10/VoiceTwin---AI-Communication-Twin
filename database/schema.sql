
-- VoiceTwin DB Schema (PostgreSQL)
CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE user_profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, name TEXT, role TEXT, experience TEXT, goal TEXT, comm_style TEXT[], improve_areas TEXT[], target_scenario TEXT, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE communication_twins (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, personality TEXT, conv_style TEXT, coaching TEXT, difficulty TEXT, voice TEXT, memory JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE sessions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id), twin_id UUID REFERENCES communication_twins(id), scenario TEXT, title TEXT, context JSONB, is_pressure BOOLEAN DEFAULT false, score INT, duration INT, created_at TIMESTAMPTZ DEFAULT now(), ended_at TIMESTAMPTZ);
CREATE TABLE messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID REFERENCES sessions(id) ON DELETE CASCADE, role TEXT, text TEXT, ts BIGINT, analysis JSONB);
CREATE TABLE session_metrics (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID REFERENCES sessions(id) ON DELETE CASCADE, clarity INT, confidence INT, pace TEXT, filler INT, conciseness INT, engagement INT, structure INT, response_quality INT);
CREATE TABLE feedback (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID REFERENCES sessions(id) ON DELETE CASCADE, strengths TEXT[], improvements TEXT[], suggestions TEXT[], mirror JSONB);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_messages_session ON messages(session_id);
