import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SimulationProvider } from '@/context/SimulationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BAAM CRM Training Simulator',
  description: 'Professional training tool for customer service representatives',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SimulationProvider>
          {children}
        </SimulationProvider>
      </body>
    </html>
  );
}