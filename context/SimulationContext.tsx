"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  CustomerPersona, 
  EvaluationScore, 
  FinalEvaluation, 
  Message,
  SimulationStart
} from '@/types';

interface SimulationContextType {
  isActive: boolean;
  simulationId: string | null;
  customerPersona: CustomerPersona | null;
  initialQuery: string | null;
  messages: Message[];
  currentEvaluation: EvaluationScore | null;
  finalEvaluation: FinalEvaluation | null;
  isLoading: boolean;
  isComplete: boolean;
  
  startSimulation: (simulation: SimulationStart) => void;
  addMessage: (message: Message) => void;
  setCurrentEvaluation: (evaluation: EvaluationScore) => void;
  setFinalEvaluation: (evaluation: FinalEvaluation) => void;
  endSimulation: () => void;
  setIsLoading: (loading: boolean) => void;
  setIsComplete: (complete: boolean) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [customerPersona, setCustomerPersona] = useState<CustomerPersona | null>(null);
  const [initialQuery, setInitialQuery] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationScore | null>(null);
  const [finalEvaluation, setFinalEvaluation] = useState<FinalEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startSimulation = (simulation: SimulationStart) => {
    setSimulationId(simulation.simulation_id);
    setCustomerPersona(simulation.customer_persona);
    setInitialQuery(simulation.initial_query);
    
    // Add initial message from customer
    const initialMessage: Message = {
      role: 'customer',
      speaker: simulation.customer_persona.customer_name,
      text: simulation.initial_query,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([initialMessage]);
    setIsActive(true);
    setIsComplete(false);
    setCurrentEvaluation(null);
    setFinalEvaluation(null);
  };

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const endSimulation = () => {
    setIsActive(false);
    setSimulationId(null);
    setCustomerPersona(null);
    setInitialQuery(null);
    setMessages([]);
    setCurrentEvaluation(null);
    setFinalEvaluation(null);
    setIsComplete(false);
  };

  const value = {
    isActive,
    simulationId,
    customerPersona,
    initialQuery,
    messages,
    currentEvaluation,
    finalEvaluation,
    isLoading,
    isComplete,
    
    startSimulation,
    addMessage,
    setCurrentEvaluation,
    setFinalEvaluation,
    endSimulation,
    setIsLoading,
    setIsComplete,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}