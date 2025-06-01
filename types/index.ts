export interface CustomerPersona {
  customer_name: string;
  customer_email: string;
  issue_category: string;
  platform: string;
  frustration_level: number;
  communication_style: string;
  persistence_level: number;
  knowledge_level: number;
  previous_interactions: number;
  background?: string;
  initial_frustration_level?: number;
}

export interface SimulationRequest {
  topic?: string;
  platform?: string;
}

export interface AgentResponse {
  response_text: string;
  response_time_seconds?: number;
}

export interface CriteriaScores {
  problem_resolution: number;
  customer_satisfaction: number;
  agent_empathy: number;
  technical_accuracy: number;
  communication_clarity: number;
}

export interface Feedback {
  strengths: string[];
  weaknesses: string[];
}

export interface EvaluationScore {
  overall_score: number;
  criteria_scores: CriteriaScores;
  feedback: Feedback;
  improvement_suggestions: string[];
}

export interface FinalEvaluation {
  conversation_turns: number;
  resolution_successful: boolean;
  estimated_csat: number;
  conversation_efficiency: number;
  assessment: string;
  detailed_feedback?: Record<string, any>;
}

export interface SimulationResponse {
  customer_response?: string;
  evaluation: EvaluationScore;
  conversation_complete: boolean;
  final_evaluation?: FinalEvaluation;
}

export interface SimulationStart {
  simulation_id: string;
  customer_persona: CustomerPersona;
  initial_query: string;
}

export interface Message {
  role: string;
  speaker: string;
  text: string;
  timestamp: string;
}

export interface ConversationHistory {
  simulation_id: string;
  customer_persona: CustomerPersona;
  conversation_history: Message[];
}