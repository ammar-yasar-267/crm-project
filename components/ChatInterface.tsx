"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizontal, User2, Bot, Loader2 } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import { sendAgentResponse } from '@/lib/api';

export function ChatInterface() {
  const [response, setResponse] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    simulationId, 
    messages, 
    addMessage, 
    customerPersona,
    setCurrentEvaluation,
    setFinalEvaluation,
    isLoading,
    setIsLoading,
    isComplete,
    setIsComplete
  } = useSimulation();

  useEffect(() => {
    // Scroll to bottom when messages update
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim() || !simulationId || isLoading || isComplete) return;
    
    // Add agent message to chat
    const agentMessage = {
      role: 'agent',
      speaker: 'You',
      text: response,
      timestamp: new Date().toISOString(),
    };
    addMessage(agentMessage);
    
    // Clear input
    setResponse('');
    
    // Focus back on textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
    
    try {
      setIsLoading(true);
      
      // Send to API
      const result = await sendAgentResponse(simulationId, response);
      
      // Update evaluation
      setCurrentEvaluation(result.evaluation);
      
      // Add customer response if provided
      if (result.customer_response) {
        const customerMessage = {
          role: 'customer',
          speaker: customerPersona?.customer_name || 'Customer',
          text: result.customer_response,
          timestamp: new Date().toISOString(),
        };
        addMessage(customerMessage);
      }
      
      // Handle conversation completion
      if (result.conversation_complete) {
        setIsComplete(true);
        if (result.final_evaluation) {
          setFinalEvaluation(result.final_evaluation);
        }
      }
    } catch (error) {
      console.error('Failed to send response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] border rounded-lg overflow-hidden bg-card">
      <div className="bg-muted py-3 px-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <User2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">
              {customerPersona?.customer_name || 'Customer'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {customerPersona?.platform || 'Platform'}
            </p>
          </div>
        </div>
      </div>
      
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] ${message.role === 'agent' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <CardContent className="p-3">
                  <div className="text-xs mb-1 flex items-center gap-1">
                    {message.role === 'agent' ? (
                      <>
                        <span>{message.speaker}</span>
                        <User2 className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <span>{message.speaker}</span>
                        <Bot className="w-3 h-3" />
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <Card className="max-w-[80%] bg-muted">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Customer is typing...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response..."
            className="resize-none min-h-[80px]"
            disabled={isLoading || isComplete}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!response.trim() || isLoading || isComplete}
            className="mt-auto h-10 w-10"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </form>
        {isComplete && (
          <p className="text-sm text-muted-foreground mt-2">
            This conversation is complete. Check your evaluation results.
          </p>
        )}
      </div>
    </div>
  );
}