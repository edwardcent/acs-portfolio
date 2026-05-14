'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/bmw-grateful-dead/<label>.jpg
// Grey placeholder shown until the file exists.
//
// hero-1        528/434   Hero left image (landscape)
// hero-2        528/434   Hero center image (landscape)
// hero-3        1/1       Hero right image (square)
// goal          730/428   Goal section image
// process       743/497   Process section image
// release-1     1/1       Release section left square
// release-2     1/1       Release section right square
// final-top     1378/495  Full-width top image
// final-bottom  1463/731  Full-width bottom image

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
  const src = `/images/bmw-grateful-dead/${label}.jpg`;
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

export default function BmwGratefulDead() {
  const ALL_IMAGES = [
    '/images/bmw-grateful-dead/hero-1.jpg',
    '/images/bmw-grateful-dead/hero-2.jpg',
    '/images/bmw-grateful-dead/hero-3.jpg',
    '/images/bmw-grateful-dead/goal.jpg',
    '/images/bmw-grateful-dead/process.jpg',
    '/images/bmw-grateful-dead/release-1.jpg',
    '/images/bmw-grateful-dead/release-2.jpg',
    '/images/bmw-grateful-dead/final-top.jpg',
    '/images/bmw-grateful-dead/final-bottom.jpg',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          3 images center-aligned: two landscapes + one square
          hero-1 (528/434) | hero-2 (528/434) | hero-3 (1/1)
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '528fr 528fr 412fr', gap: IMG_GAP, alignItems: 'center', marginBottom: SECTION_MB }}>
        <Img label="hero-1" aspect="528/434" images={ALL_IMAGES} myIndex={0} />
        <Img label="hero-2" aspect="528/434" images={ALL_IMAGES} myIndex={1} />
        <Img label="hero-3" aspect="1/1" images={ALL_IMAGES} myIndex={2} />
      </div>

      {/* ── GOAL ──────────────────────────────────────────────────────────────
          Left: text
          Right: landscape image
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Goal</H>
          <P>A self-initiated bootleg release: the combination came from a love of both the band and the brand. First I drew up the logo, but since I already owned one of the BMW shirts, I realized there was an opportunity to create a new product, without actually making a new product.</P>
        </div>
        <Img label="goal" aspect="730/428" images={ALL_IMAGES} myIndex={3} />
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────────
          Left: text
          Right: landscape image
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Process</H>
          <P>I sourced 15 of the same vintage BMW t-shirts, in deadstock-adjacent condition. I then referenced the variations of the original graphics sizes to create a graphic that would fit around all of them. I worked with a local print house to screen-print the Grateful Dead Steal Your Face stealie around the BMW logo.</P>
        </div>
        <Img label="process" aspect="743/497" images={ALL_IMAGES} myIndex={4} />
      </div>

      {/* ── RELEASE ───────────────────────────────────────────────────────────
          Left: text (center-aligned with image column)
          Right: 2 squares side by side
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'center', marginBottom: SECTION_MB }}>
        <div>
          <H>Release</H>
          <P>I created an 80s/90s style advertisement — since I was already posting Grateful Dead and BMW content I knew there would be interest.</P>
          <P>The release went great and sold out direct-to-consumer.</P>
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
          <div style={{ flex: 1 }}><Img label="release-1" aspect="1/1" images={ALL_IMAGES} myIndex={5} /></div>
          <div style={{ flex: 1 }}><Img label="release-2" aspect="1/1" images={ALL_IMAGES} myIndex={6} /></div>
        </div>
      </div>

      {/* ── FINAL ─────────────────────────────────────────────────────────────
          Two full-width images stacked
      */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
        <Img label="final-top" aspect="1378/495" images={ALL_IMAGES} myIndex={7} />
        <Img label="final-bottom" aspect="1463/731" images={ALL_IMAGES} myIndex={8} />
      </div>

    </div>
  );
}
