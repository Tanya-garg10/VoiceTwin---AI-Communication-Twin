
import { TwinConfig, UserProfile, Message } from '../types'

const fillerList = ['um','uh','like','you know','so','actually','basically','literally','kind of','sort of']

export function analyzeText(text:string){
  const words = text.trim().split(/\s+/).filter(Boolean)
  const fillerCount = fillerList.reduce((acc,f)=> acc + (text.toLowerCase().match(new RegExp('\\b'+f+'\\b','g'))||[]).length,0)
  const wpm = words.length // per utterance estimate
  const clarity = Math.max(40, 100 - fillerCount*8 - (words.length>40?10:0))
  const confidence = Math.max(35, 95 - fillerCount*6 - (text.includes('?')?5:0))
  return {words:words.length, fillerCount, clarity, confidence, wpm}
}

export function generateTwinPrompt(profile:UserProfile|null, twin:TwinConfig, scenario:string, context:any){
  return `You are VoiceTwin, a ${twin.personality} ${scenario} partner. User role: ${profile?.role||'professional'}. Goal: ${profile?.goal||scenario}. Difficulty: ${twin.difficulty}. Coaching: ${twin.coaching}. Be concise, adaptive, realistic.`
}

const questionBank: Record<string,string[]> = {
  'HR Interview': ["Tell me about yourself.","Why do you want this role at {company}?","Describe a challenging situation and how you handled it.","Where do you see yourself in 5 years?","What are your strengths and weaknesses?","Why should we hire you?"],
  'Technical Interview': ["Explain the difference between REST and GraphQL.","How would you design a scalable chat system?","Walk me through your recent project architecture.","What is a closure in JavaScript?","How do you handle race conditions?"],
  'Presentation': ["What's the core message of your presentation?","Who is your audience and what do they care about?","Can you give me the 30-second hook?","What objection might your audience have?"],
  'Sales Pitch': ["What's the main value prop?","Who are you selling to?","Handle this: 'It's too expensive'.","Why should I choose you over competitor?"],
  'Negotiation': ["What's your target outcome?","What is your BATNA?","I think your offer is too high. Convince me otherwise.","We need 20% discount or we walk."],
  'Public Speaking': ["Open with something that grabs attention.","You lost your place, recover.","Audience looks bored, what do you do?","Wrap with a memorable close."],
  'Team Meeting': ["What's the meeting objective?","We are over budget, propose a solution.","Your teammate disagrees, how do you respond?"],
  'Client Meeting': ["Client: We are not happy with progress.","How will you ensure delivery?","Budget cut 30%, what now?"],
  'Custom': ["Tell me more about your scenario.","What outcome are you aiming for?","Let's role-play that situation."]
}

export function getNextQuestion(scenario:string, history:Message[], performance:number){
  const bank = questionBank[scenario] || questionBank['Custom']
  const idx = Math.min(history.filter(m=>m.role==='twin').length, bank.length-1)
  let q = bank[idx] || bank[0]
  if(performance>80) q += " (Let's go deeper — be specific with metrics.)"
  if(performance<50) q += " Take your time, structure your answer: Context → Action → Result."
  return q
}

export function generateFeedback(messages:Message[]){
  const userMsgs = messages.filter(m=>m.role==='user')
  const avgWords = userMsgs.reduce((a,m)=>a+m.text.split(' ').length,0)/(userMsgs.length||1)
  const totalFiller = userMsgs.reduce((a,m)=>a+analyzeText(m.text).fillerCount,0)
  const clarity = userMsgs.reduce((a,m)=>a+analyzeText(m.text).clarity,0)/(userMsgs.length||1)
  const confidence = userMsgs.reduce((a,m)=>a+analyzeText(m.text).confidence,0)/(userMsgs.length||1)
  const score = Math.round((clarity*0.4+confidence*0.3+(avgWords>10&&avgWords<35?85:65)*0.3))
  return {
    overall: score,
    metrics: {clarity: Math.round(clarity), confidence: Math.round(confidence), pace: avgWords<15?'Slow':avgWords>35?'Fast':'Good', filler: totalFiller, conciseness: avgWords>35?52: avgWords<12?70:84, engagement: Math.round(60+Math.random()*35), structure: Math.round(clarity*0.9), responseQuality: Math.round((clarity+confidence)/2)},
    strengths: ["Clear opening","Good structure","Confident tone"].slice(0,2+Math.floor(Math.random()*2)),
    improvements: [ totalFiller>3?"Reduce filler words":"Add more concrete examples", avgWords>35?"Be more concise":"Expand with STAR framework"].slice(0,2),
    suggestions: ["Start with headline, then 2 supporting points","Replace 'um' with a 1-sec pause","End each answer with a result metric"],
    mirror: { before: userMsgs[0]?.text?.slice(0,120) || "Long explanation with repeated points and filler words", after: "Structured answer: Context → Action → Result in under 30 seconds with a clear metric." }
  }
}
