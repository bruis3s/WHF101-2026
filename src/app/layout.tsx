import type { Metadata } from 'next';
import './globals.css';
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

export const metadata: Metadata = {
  title: 'HAF WERKS — Explorative Architecture, Objects and Spatial Design Practice',
  description: 'HAF Werks is an explorative architecture, objects and spatial design practice based in Cirendeu, Tangerang Selatan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <HeaderNav />
          <div className="texture-wrapper">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
