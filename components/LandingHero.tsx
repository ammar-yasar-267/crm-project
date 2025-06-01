import Image from 'next/image';
import { Container } from './ui/container';
import { StartSimulation } from './StartSimulation';

export function LandingHero() {
  return (
    <div className="py-16 md:py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2 animate-fade-in">
              Professional CRM Training
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master the Art of <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Customer Service</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Train your team with realistic customer service simulations. 
              Receive instant feedback, improve your skills, and deliver 
              exceptional customer experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <StartSimulation />
              
              <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                Learn More
              </a>
            </div>
            
            <div className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">KL</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">MR</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">SB</div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Join 2,000+ agents</span>
                  <span className="text-muted-foreground"> already improving their skills</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative rounded-xl overflow-hidden shadow-xl border">
              <Image 
                src="https://images.pexels.com/photos/7709018/pexels-photo-7709018.jpeg" 
                alt="Customer service representative helping a customer" 
                width={600}
                height={400}
                className="object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}