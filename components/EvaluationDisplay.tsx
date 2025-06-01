"use client";

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, ThumbsUp, Zap, BookOpen, BarChart3 } from "lucide-react";
import { useSimulation } from '@/context/SimulationContext';
import { Badge } from "@/components/ui/badge";

export function EvaluationDisplay() {
  const [activeTab, setActiveTab] = useState("overview");
  const { currentEvaluation, finalEvaluation, isComplete } = useSimulation();

  if (!currentEvaluation) {
    return null;
  }

  // Format score as percentage
  const formatScore = (score: number) => `${Math.round(score * 100)}%`;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "text-green-500";
    if (score >= 0.4) return "text-yellow-500";
    return "text-red-500";
  };

  // Progress bar color based on score
  const getProgressColor = (score: number) => {
    if (score >= 0.7) return "bg-green-500";
    if (score >= 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300">
      <CardHeader className="bg-muted pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance Evaluation
          {isComplete && (
            <Badge className="ml-2 bg-blue-500">Final</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Feedback on your customer service interaction
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 px-6 pt-2 bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="improvement">Improvement</TabsTrigger>
        </TabsList>

        <CardContent className="p-4">
          <TabsContent value="overview" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Overall Score</h3>
              <span className={`text-xl font-bold ${getScoreColor(currentEvaluation.overall_score)}`}>
                {formatScore(currentEvaluation.overall_score)}
              </span>
            </div>

            <Progress 
              value={currentEvaluation.overall_score * 100} 
              className="h-2"
              indicatorClassName={getProgressColor(currentEvaluation.overall_score)}
            />

            <div className="grid gap-3 mt-4">
              {Object.entries(currentEvaluation.criteria_scores).map(([key, score]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {key === "problem_resolution" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {key === "customer_satisfaction" && <ThumbsUp className="h-4 w-4 text-blue-500" />}
                    {key === "agent_empathy" && <BookOpen className="h-4 w-4 text-purple-500" />}
                    {key === "technical_accuracy" && <Zap className="h-4 w-4 text-yellow-500" />}
                    {key === "communication_clarity" && <BookOpen className="h-4 w-4 text-cyan-500" />}
                    
                    <span className="text-sm capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={score * 100} 
                      className="h-2 w-24"
                      indicatorClassName={getProgressColor(score)}
                    />
                    <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                      {formatScore(score)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {finalEvaluation && isComplete && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Final Assessment</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-xs text-muted-foreground">Resolution</h4>
                    <p className="font-medium">
                      {finalEvaluation.resolution_successful ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Successful
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1">
                          <XCircle className="h-4 w-4" />
                          Unsuccessful
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-xs text-muted-foreground">CSAT Estimate</h4>
                    <p className="font-medium flex items-center gap-1">
                      <span className={getScoreColor(finalEvaluation.estimated_csat / 5)}>
                        {finalEvaluation.estimated_csat.toFixed(1)}/5.0
                      </span>
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-xs text-muted-foreground">Efficiency</h4>
                    <p className="font-medium">
                      {formatScore(finalEvaluation.conversation_efficiency)}
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-xs text-muted-foreground">Conversation Turns</h4>
                    <p className="font-medium">{finalEvaluation.conversation_turns}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="feedback" className="mt-0 space-y-4">
            <div>
              <h3 className="font-medium text-green-500 flex items-center gap-1 mb-2">
                <ThumbsUp className="h-4 w-4" />
                Strengths
              </h3>
              <ul className="space-y-1">
                {currentEvaluation.feedback.strengths.length > 0 ? (
                  currentEvaluation.feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">No strengths identified yet.</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-red-500 flex items-center gap-1 mb-2">
                <AlertTriangle className="h-4 w-4" />
                Areas for Improvement
              </h3>
              <ul className="space-y-1">
                {currentEvaluation.feedback.weaknesses.length > 0 ? (
                  currentEvaluation.feedback.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">No weaknesses identified.</li>
                )}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="improvement" className="mt-0">
            <h3 className="font-medium mb-2">Suggestions for Improvement</h3>
            <ul className="space-y-2">
              {currentEvaluation.improvement_suggestions.map((suggestion, index) => (
                <li key={index} className="bg-muted p-3 rounded-lg text-sm">
                  <div className="flex gap-2">
                    <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">
                      {index + 1}
                    </span>
                    <span>{suggestion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}