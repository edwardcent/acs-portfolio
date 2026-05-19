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

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const src = images[idx];
  const hasPrev = idx > 0;
  const hasNext = idx < images.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIdx(i => Math.min(images.length - 1, i + 1));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, images.length]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'zoom-out', padding: '40px',
    }}>
      <img src={src} alt="" onClick={(e) => e.stopPropagation()} style={{
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
      {hasPrev && (
        <button onClick={(e) => { e.stopPropagation(); setIdx(i => i - 1); }} style={{
          position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none',
          color: '#fff', fontSize: '40px', cursor: 'pointer',
          lineHeight: 1, padding: '8px 12px', opacity: 0.7,
        }} aria-label="Previous">‹</button>
      )}
      {hasNext && (
        <button onClick={(e) => { e.stopPropagation(); setIdx(i => i + 1); }} style={{
          position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none',
          color: '#fff', fontSize: '40px', cursor: 'pointer',
          lineHeight: 1, padding: '8px 12px', opacity: 0.7,
        }} aria-label="Next">›</button>
      )}
    </div>
  );
}

// ─── Image component ──────────────────────────────────────────────────────────

function Img({ label, aspect = '1/1', images, myIndex }: { label: string; aspect?: string; images: string[]; myIndex: number }) {
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
      {lightbox && loaded && <Lightbox images={images} startIndex={myIndex} onClose={close} />}
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
  const ALL_IMAGES = [
    '/images/studio-s-timetron/hero.jpg',
    '/images/studio-s-timetron/ref-left.jpg',
    '/images/studio-s-timetron/ref-right.jpg',
    '/images/studio-s-timetron/ref-bottom.jpg',
    '/images/studio-s-timetron/process-a1.jpg',
    '/images/studio-s-timetron/process-a2.jpg',
    '/images/studio-s-timetron/process-a3.jpg',
    '/images/studio-s-timetron/process-b1.jpg',
    '/images/studio-s-timetron/process-b2.jpg',
    '/images/studio-s-timetron/process-b3.jpg',
    '/images/studio-s-timetron/process-c1.jpg',
    '/images/studio-s-timetron/process-c2.jpg',
    '/images/studio-s-timetron/process-c3.jpg',
    '/images/studio-s-timetron/final-left.jpg',
    '/images/studio-s-timetron/final-right-1.jpg',
    '/images/studio-s-timetron/final-right-2.jpg',
  ];

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
        <Img label="hero" aspect="1482/494" images={ALL_IMAGES} myIndex={0} />
      </div>

      {/* ── REFERENCE / GOAL ──────────────────────────────────────────────────
          Left: text
          Right: 2 squares top row + 1 wide landscape below
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Design Brief</H>
          <P>Create a functional wearable timepiece referencing late-90s esoteric watch design, specifically the Seiko H-Timetron&apos;s computer-inspired aesthetic. Project scope: technically functional watch for desk use, not ruggedized for daily wear. Focus on design and assembly rather than waterproofing or durability.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="ref-left" aspect="1/1" images={ALL_IMAGES} myIndex={1} /></div>
            <div style={{ flex: 1 }}><Img label="ref-right" aspect="1/1" images={ALL_IMAGES} myIndex={2} /></div>
          </div>
          <Img label="ref-bottom" aspect="701/229" images={ALL_IMAGES} myIndex={3} />
        </div>
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────────
          Left: text
          Right: 3×3 grid of square images
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Design Process</H>
          <P>Started with sketches and renderings to establish proportions and component relationships. CAD modeling in [software name]. I salvaged a digital module from a $15 Casio watch, and reverse-engineered the cavity dimensions for precise fit. Then designed a custom 3D-printed band to unify the body and strap aesthetically.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-a1" aspect="1/1" images={ALL_IMAGES} myIndex={4} /></div>
            <div style={{ flex: 1 }}><Img label="process-a2" aspect="1/1" images={ALL_IMAGES} myIndex={5} /></div>
            <div style={{ flex: 1 }}><Img label="process-a3" aspect="1/1" images={ALL_IMAGES} myIndex={6} /></div>
          </div>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-b1" aspect="1/1" images={ALL_IMAGES} myIndex={7} /></div>
            <div style={{ flex: 1 }}><Img label="process-b2" aspect="1/1" images={ALL_IMAGES} myIndex={8} /></div>
            <div style={{ flex: 1 }}><Img label="process-b3" aspect="1/1" images={ALL_IMAGES} myIndex={9} /></div>
          </div>
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: 1 }}><Img label="process-c1" aspect="1/1" images={ALL_IMAGES} myIndex={10} /></div>
            <div style={{ flex: 1 }}><Img label="process-c2" aspect="1/1" images={ALL_IMAGES} myIndex={11} /></div>
            <div style={{ flex: 1 }}><Img label="process-c3" aspect="1/1" images={ALL_IMAGES} myIndex={12} /></div>
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
            <H>Final Prototype</H>
            <P>Fully functional 3D-printed prototype. The current build is less impact-resistant than machined metal or cast resin and lacks a sufficient water seal. Future production versions would require metal or resin casting with tighter tolerances and proper sealing. The project provided hands-on experience in watch design, component integration, and prototype assembly. Currently functions as my desk clock.</P>
          </div>
          <Img label="final-left" aspect="575/619" images={ALL_IMAGES} myIndex={13} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <Img label="final-right-1" aspect="1/1" images={ALL_IMAGES} myIndex={14} />
          <Img label="final-right-2" aspect="1/1" images={ALL_IMAGES} myIndex={15} />
        </div>
      </div>

    </div>
  );
}
