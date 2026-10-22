'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.045,
        smoothWheel: true,
        wheelMultiplier: 1.25,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
