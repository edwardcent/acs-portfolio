'use client';
import Nav from '@/components/Nav';
import { useState } from 'react';

export default function About() {
  const [on, setOn] = useState(true);
  return (
    <>
      <Nav interactionEnabled={on} onToggle={() => setOn(v=>!v)} />
      <div style={{ paddingTop: '48px', maxWidth: '640px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '32px' }}>About</p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#333', marginBottom: '20px' }}>
          Edward Centorame is a Toronto-based designer working across product, brand, and graphics.
          Operating as All Conditions Studio since 2020, designing and producing objects independently
          and on commission for clients including Warner Music, MakeWay, and Park (formerly Frequency Worldwide).
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#333', marginBottom: '20px' }}>
          Background spans manufacturing, apparel, and brand-side work — CAD, mould making, fabrication,
          retail design, and small-batch production.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#333' }}>
          BFA New Media, Toronto Metropolitan University — The Creative School. Expected May 2026.
        </p>
      </div>
    </>
  );
}
