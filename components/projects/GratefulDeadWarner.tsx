'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/grateful-dead-warner/<label>.jpg
// Grey labelled placeholder shown until the file exists.
//
// hero-tshirts          993/559   Front + back blue t-shirt mockups side by side
// hero-bear             1/1       White t-shirt with bear illustration
// brief-logo            1/1       Steal Your Face logo (circular skull graphic)
// final-top-art         639/394   FRONT / BACK graphic art composite (dark bg)
// final-shirts          613/345   Two blue t-shirts front + back side by side
// final-bear-art        269/307   Bear character illustration (portrait)
// final-bear-shirt      1/1       White t-shirt with bear (square)

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

function Img({ label, aspect = '1/1', fit = 'cover' }: { label: string; aspect?: string; fit?: 'cover' | 'contain' }) {
  const src = `/images/grateful-dead-warner/${label}.jpg`;
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
            objectFit: fit, objectPosition: 'center', display: 'block',
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

export default function GratefulDeadWarner() {
  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          2:1 grid — wide tshirt pair + square bear shirt
          hero-tshirts (2fr) | hero-bear (1fr)
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: IMG_GAP, alignItems: 'center', marginBottom: SECTION_MB }}>
        <Img label="hero-tshirts" aspect="993/559" />
        <Img label="hero-bear" aspect="1/1" />
      </div>

      {/* ── CLIENT BRIEF ──────────────────────────────────────────────────────
          Left: text
          Right: Steal Your Face logo (square)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Client Brief</H>
          <P>As a fan of The Dead already making illustrations referencing them, getting the DM from someone on their team at Warner Music was an honour.</P>
          <P>They came across my work and reached out about licensing an existing illustration and commissioned a piece featuring a camper-van. They reached out to people like me in an effort to fill the merch line with work from genuine fans rather than commercial illustrators unfamiliar with the history of the band.</P>
        </div>
        <div style={{ width: '50%', margin: '0 auto' }}>
          <Img label="brief-logo" aspect="1/1" />
        </div>
      </div>

      {/* ── FINAL PRODUCT ─────────────────────────────────────────────────────
          Left: text
          Right column (vertical flex):
            Top stacked:
              final-top-art   639/394  FRONT + BACK graphic art
              final-shirts    613/345  Two blue t-shirts
            Bottom row (side by side):
              final-bear-art  269/307  Bear illustration (portrait)
              final-bear-shirt  1/1    White t-shirt with bear
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Final Product</H>
          <P>The client required a fast turnaround — both pieces delivered final on first pass, no revision rounds. I adapted an existing bear illustration, integrating space for the licensor&apos;s branding on the bear&apos;s shirt. The commissioned piece was a chrome rendition of the band&apos;s logo paired with a space van and smiling sun. On delivery we made one refinement, removing the black void to better cohese with the rest of the line. Both designs were licensed as official Grateful Dead merchandise and sold internationally.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          {/* Stacked landscapes */}
          <Img label="final-top-art" aspect="639/394" />
          <Img label="final-shirts" aspect="613/345" />
          {/* Side-by-side bottom row */}
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
            <div style={{ flex: '269', display: 'flex', flexDirection: 'column' }}>
              <Img label="final-bear-art" aspect="269/307" />
            </div>
            <div style={{ flex: '339', display: 'flex', flexDirection: 'column' }}>
              <Img label="final-bear-shirt" aspect="1/1" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
