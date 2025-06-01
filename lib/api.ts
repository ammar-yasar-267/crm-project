import { AgentResponse, SimulationResponse, SimulationStart } from '@/types';

const API_BASE_URL = 'http://192.168.1.5:8000';

export async function getTopics(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/topics`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }
  
  return response.json();
}

export async function getPlatforms(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/platforms`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch platforms');
  }
  
  return response.json();
}

export async function startSimulation(topic?: string, platform?: string): Promise<SimulationStart> {
  const response = await fetch(`${API_BASE_URL}/api/simulations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, platform }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to start simulation');
  }
  
  return response.json();
}

export async function sendAgentResponse(
  simulationId: string, 
  responseText: string
): Promise<SimulationResponse> {
  const startTime = performance.now();
  
  const response = await fetch(`${API_BASE_URL}/api/simulations/${simulationId}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response_text: responseText,
      response_time_seconds: (performance.now() - startTime) / 1000,
    } as AgentResponse),
  });
  
  if (!response.ok) {
    throw new Error('Failed to process response');
  }
  
  return response.json();
}

export async function getConversationHistory(simulationId: string) {
  const response = await fetch(`${API_BASE_URL}/api/simulations/${simulationId}/history`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch conversation history');
  }
  
  return response.json();
}

export async function endSimulation(simulationId: string) {
  const response = await fetch(`${API_BASE_URL}/api/simulations/${simulationId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to end simulation');
  }
  
  return response.json();
}

export async function getSimulationEvaluation(simulationId: string) {
  const response = await fetch(`${API_BASE_URL}/api/simulations/${simulationId}/evaluation`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch simulation evaluation');
  }
  
  return response.json();
}