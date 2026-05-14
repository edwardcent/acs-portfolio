'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/acs-marks/<label>.jpg
// Grey placeholder shown until the file exists.
//
// hero          1474/462  Full-width hero image
// illustration  399/363   ACS marks illustration (beside text)
// mark-01       1/1       Grid image 1
// mark-02       1/1       Grid image 2
// mark-03       1/1       Grid image 3
// mark-04       1/1       Grid image 4
// mark-05       1/1       Grid image 5
// mark-06       1/1       Grid image 6
// mark-07       1/1       Grid image 7
// mark-08       1/1       Grid image 8
// mark-09       1/1       Grid image 9
// mark-10       1/1       Grid image 10
// mark-11       1/1       Grid image 11
// mark-12       1/1       Grid image 12

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
  const src = `/images/acs-marks/${label}.jpg`;
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

export default function AcsMarks() {
  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: SECTION_MB }}>
        <Img label="hero" aspect="1474/462" />
      </div>

      {/* ── LOGOS & OTHER MARKS ───────────────────────────────────────────────
          Left: text
          Right: ACS illustration (constrained, centered in column)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'center', marginBottom: SECTION_MB }}>
        <div>
          <H>Logos &amp; Other Marks</H>
          <P>These are logo marks and one off graphics I&apos;ve created for All Conditions Studio over the years. The marks pull from different influences — vintage athletics, garment tags, illustrations and simple typography — but each one is intended to feel like it belongs to the same studio.</P>
        </div>
        <div style={{ width: '60%', margin: '0 auto' }}>
          <Img label="illustration" aspect="399/363" />
        </div>
      </div>

      {/* ── MARK GRID ─────────────────────────────────────────────────────────
          4×3 grid of 12 square logo mark images
      */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: IMG_GAP }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Img key={i} label={`mark-${String(i + 1).padStart(2, '0')}`} aspect="1/1" />
        ))}
      </div>

    </div>
  );
}
