import { Container } from './ui/container';
import { BarChart3, BarChart, LayoutGrid, MessageSquare, Award, Zap } from 'lucide-react';

export function FeatureSection() {
  return (
    <section id="features" className="py-16 bg-muted/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Training Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simulator provides all the tools you need to build exceptional customer service skills
            through practice, feedback, and continuous improvement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MessageSquare className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Realistic Conversations</h3>
            <p className="text-muted-foreground">
              Engage with AI-powered customers in realistic scenarios that mimic real-world challenges.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <LayoutGrid className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Platforms</h3>
            <p className="text-muted-foreground">
              Practice handling issues across different platforms and products to broaden your skills.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
            <p className="text-muted-foreground">
              Receive detailed feedback on your performance after each response to identify areas for improvement.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
            <p className="text-muted-foreground">
              Track key metrics like problem resolution, empathy, and technical accuracy to measure your growth.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diverse Scenarios</h3>
            <p className="text-muted-foreground">
              Practice with a wide range of customer issues, from account problems to technical troubleshooting.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Improvement Suggestions</h3>
            <p className="text-muted-foreground">
              Get actionable suggestions to enhance your communication skills and customer satisfaction scores.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}