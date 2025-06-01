import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LandingHero } from '@/components/LandingHero';
import { FeatureSection } from '@/components/FeatureSection';
// import { Simulation } from '@/components/Simulation';
import { Container } from '@/components/ui/container';

export default function Home() {
  return (
    <main>
      <Header />
      <LandingHero />
      <FeatureSection />
      
      <section className="py-16 bg-background">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Try the Simulator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start a simulation below to practice handling customer inquiries and
              receive detailed feedback on your performance.
            </p>
          </div>
          
          {/* <div className="mt-8">
            <Simulation />
          </div> */}
        </Container>
      </section>
      
      <Footer />
    </main>
  );
}