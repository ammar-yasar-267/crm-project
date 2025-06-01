"use client";

import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useSimulation } from '@/context/SimulationContext';
import { getTopics, getPlatforms, startSimulation } from '@/lib/api';

export function StartSimulation() {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { startSimulation: contextStartSimulation, isActive } = useSimulation();

  useEffect(() => {
    async function fetchOptions() {
      try {
        setIsLoading(true);
        const [topicsData, platformsData] = await Promise.all([
          getTopics(),
          getPlatforms()
        ]);
        
        setTopics(topicsData);
        setPlatforms(platformsData);
        setError(null);
      } catch (err) {
        setError('Failed to load options. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const handleStartSimulation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const simulationData = await startSimulation(
        selectedTopic || undefined, 
        selectedPlatform || undefined
      );
      
      contextStartSimulation(simulationData);
      setIsOpen(false);
      
      // Reset selections for next time
      setSelectedTopic('');
      setSelectedPlatform('');
    } catch (err) {
      setError('Failed to start simulation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsOpen(true)}
          disabled={isActive}
        >
          {isActive ? 'Simulation in Progress' : 'Start Simulation'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Start New Simulation</DialogTitle>
          <DialogDescription>
            Choose a topic and platform to begin your customer service training simulation.
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
              disabled={isLoading}
            >
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
              disabled={isLoading}
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleStartSimulation} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              'Start Simulation'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}