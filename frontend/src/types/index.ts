
export type TwinPersonality = 'Professional'|'Friendly'|'Challenging'|'Supportive'|'Strict'|'Analytical'
export type ScenarioType = 'HR Interview'|'Technical Interview'|'Presentation'|'Team Meeting'|'Client Meeting'|'Sales Pitch'|'Negotiation'|'Public Speaking'|'Custom'
export type SessionState = 'IDLE'|'LISTENING'|'THINKING'|'SPEAKING'|'ANALYZING'|'ERROR'
export interface UserProfile {
  name:string; role:string; experience:'Entry'|'Mid'|'Senior'|'Lead'; goal:string;
  commStyle:string[]; improveAreas:string[]; targetScenario:ScenarioType;
}
export interface TwinConfig {
  personality:TwinPersonality; convStyle:string; coaching:string; difficulty:'Beginner'|'Intermediate'|'Advanced'|'Expert'; voice:string;
}
export interface Message { id:string; role:'user'|'twin'; text:string; ts:number; score?:number }
export interface Session {
  id:string; scenario:ScenarioType; title:string; date:string; duration:number; score:number;
  messages:Message[]; metrics:any; feedback:any;
}
