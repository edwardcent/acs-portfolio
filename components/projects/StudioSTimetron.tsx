'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/studio-s-timetron/<label>.jpg
// Grey placeholder shown until the file exists.
//
// hero           1482/494  Full-width hero image
// ref-left       1/1       Reference section top-left square
// ref-right      1/1       Reference section top-right square
// ref-bottom     701/229   Reference section bottom landscape
// process-a1     1/1       Process grid row 1, image 1
// process-a2     1/1       Process grid row 1, image 2
// process-a3     1/1       Process grid row 1, image 3
// process-b1     1/1       Process grid row 2, image 1
// process-b2     1/1       Process grid row 2, image 2
// process-b3     1/1       Process grid row 2, image 3
// process-c1     1/1       Process grid row 3, image 1
// process-c2     1/1       Process grid row 3, image 2
// process-c3     1/1       Process grid row 3, image 3
// final-left     575/619   Final product left column image (portrait)
// final-right-1  1/1       Final product right column, top square
// final-right-2  1/1       Final product right column, bottom square

import { useState, useEffect, useCallback } from 'react';

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'zoom-out', padding: '40px',
    }}>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
        borderRadius: '8px', cursor: 'default',
        boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
      }} />
      <button onClick={onClose} style={{
        position: 'fixed', top: '20px', right: '24px',
        background: 'none', border: 'none',
        color: '#fff', fontSize: '28px', cursor: 'pointer',
        lineHeight: 1, padding: '4px 8px', opacity: 0.7,
      }} aria-label="Close">×</button>
    </div>
  );
}

// ─── Image component ──────────────────────────────────────────────────────────

function Img({ label, aspect = '1/1' }: { label: string; aspect?: string }) {
  const src = `/images/studio-s-timetron/${label}.jpg`;
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div
        onClick={loaded ? open : undefined}
        style={{
          width: '100%', aspectRatio: aspect,
          background: '#e0ddd8', borderRadius: '12px', overflow: 'hidden',
          flexShrink: 0, position: 'relative', cursor: loaded ? 'zoom-in' : 'default',
        }}
      >
        <img
          src={src}
          alt={label}
          onLoad={() => setLoaded(true)}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center', display: 'block',
            opacity: loaded ? 1 : 0, transition: 'opacity 0.2s',
          }}
        />
      </div>
      {lightbox && loaded && <Lightbox src={src} alt={label} onClose={close} />}
    </>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 700, fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.05,
      textTransform: 'uppercase', letterSpacing: '-0.01em',
      color: '#0a0a0a', margin: '0 0 14px',
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 12px' }}>{children}</p>;
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const SECTION_MB = '48px';
const IMG_GAP = '8px';
const COL_GAP = '40px';

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudioSTimetron() {
  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          Full-width landscape image
      */}
      <div style={{ marginBottom: SECTION_MB }}>
        <Img label="hero" aspect="1482/494" />
      </div>

      {/* ── REFERENCE / GOAL ──────────────────────────────────────────────────
          Left: text
          Right: 2 squares top row + 1 wide landscape below
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Reference / Goal</H>
          <P>The Studio S-Timetron is a concept watch based on the Seiko H-Timetron, a digital watch released in 1999 designed around the look and feel of an early personal computer — with rounded corners and a dot-matrix display. I came across the original online after finding a vintage L.L. Bean compass keychain; my brain put the two together.</P>
          <P>The goal was a technically wearable and functional watch, that felt like it came out in the same era of esoteric watch design. Making it robust and waterproof was out of the scope for this project, and I planned on it living on my desk as a timepiece.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="ref-left" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="ref-right" aspect="1/1" /></div>
          </div>
          <Img label="ref-bottom" aspect="701/229" />
        </div>
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────────
          Left: text
          Right: 3×3 grid of square images
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Design Process</H>
          <P>I started with quick sketches and renderings to lock in proportions and the relationship between components. Once the form was settled, I moved to CAD.</P>
          <P>For the display, I used the module from a $15 Casio digital watch. I replicated the cavity from the Casio so the module had a perfect fit.</P>
          <P>I could have used an off-the-shelf strap, but designed and printed my own — a multi-link 3D printed strap that tied the body and band into a single visual system.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-a1" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-a2" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-a3" aspect="1/1" /></div>
          </div>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-b1" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-b2" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-b3" aspect="1/1" /></div>
          </div>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-c1" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-c2" aspect="1/1" /></div>
            <div style={{ flex: 1 }}><Img label="process-c3" aspect="1/1" /></div>
          </div>
        </div>
      </div>

      {/* ── FINAL PRODUCT ─────────────────────────────────────────────────────
          Left column: text block + portrait image stacked
          Right column: 2 square images stacked
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: IMG_GAP }}>
          <div>
            <H>Final Product</H>
            <P>The final product is a fully functional prototype. The 3D printed body is less impact-resistant than a machined metal or cast resin equivalent, and the seal (or lack thereof) isn&apos;t rated for water.</P>
            <P>A future version could be machined or cast with tighter tolerances and a proper internal seal. While I do not plan on iterating on this specific design; the experience has taught me a lot about watch design.</P>
            <P>The Watch now sits on my shelf — as a glanceable clock.</P>
          </div>
          <Img label="final-left" aspect="575/619" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <Img label="final-right-1" aspect="1/1" />
          <Img label="final-right-2" aspect="1/1" />
        </div>
      </div>

    </div>
  );
}
