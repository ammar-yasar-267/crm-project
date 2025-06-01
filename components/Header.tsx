import { Headset } from 'lucide-react';
import { Container } from './ui/container';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headset className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">BAAM CRM</h1>
              <p className="text-xs opacity-80">Customer Service Training Simulator</p>
            </div>
          </div>
          
          <nav>
            <ul className="flex items-center gap-6">
              <li className="text-sm hover:text-white/80 transition-colors">
                <a href="#">Dashboard</a>
              </li>
              <li className="text-sm hover:text-white/80 transition-colors">
                <a href="#">Simulations</a>
              </li>
              <li className="text-sm hover:text-white/80 transition-colors">
                <a href="#">Resources</a>
              </li>
              <li className="text-sm hover:text-white/80 transition-colors">
                <a href="#">Help</a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}