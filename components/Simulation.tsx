"use client";

import { useSimulation } from '@/context/SimulationContext';
import { ChatInterface } from './ChatInterface';
import { EvaluationDisplay } from './EvaluationDisplay';
import { Button } from './ui/button';
import { RotateCcw } from 'lucide-react';
import { StartSimulation } from './StartSimulation';

export function Simulation() {
  const { isActive, endSimulation, customerPersona, currentEvaluation } = useSimulation();

  if (!isActive) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to improve your customer service skills?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Start a simulation to practice handling real customer inquiries and receive instant feedback.
        </p>
        <StartSimulation />
      </div>
    );
  }

  return (
    <div className="py-8">
      {customerPersona && (
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name:</p>
              <p className="font-medium">{customerPersona.customer_name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email:</p>
              <p className="font-medium">{customerPersona.customer_email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Platform:</p>
              <p className="font-medium">{customerPersona.platform}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Issue Category:</p>
              <p className="font-medium capitalize">{customerPersona.issue_category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Communication Style:</p>
              <p className="font-medium capitalize">{customerPersona.communication_style}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Frustration Level:</p>
              <p className="font-medium">{customerPersona.frustration_level}/10</p>
            </div>
          </div>
          {customerPersona.background && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-muted-foreground mb-1">Background:</p>
              <p className="text-sm">{customerPersona.background}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ChatInterface />
        </div>
        <div className="lg:col-span-2">
          {currentEvaluation ? (
            <EvaluationDisplay />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted rounded-lg p-8 text-center">
              <div>
                <h3 className="text-xl font-medium mb-2">Waiting for First Response</h3>
                <p className="text-muted-foreground text-sm">
                  Respond to the customer to see your evaluation here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          onClick={endSimulation}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          End Simulation & Start New
        </Button>
      </div>
    </div>
  );
}