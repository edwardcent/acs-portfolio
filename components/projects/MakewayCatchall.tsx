'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/makeway/<label>.jpg
// Grey labelled placeholder is shown until the file exists.
//
// hero-left          1/1      Batch of catchalls on grey surface
// hero-center        1/1      Single catchall with incense + lighter
// hero-right         1/1      Catchalls with accessories (keys, balm, lighter)
// brief-logo         519/231  MakeWay wordmark logo
// process-left-top   343/280  Two oval prototypes stacked/angled
// process-left-bottom 333/181 Pill-shaped prototype
// process-right-top  343/201  Rectangular prototype
// process-right-bottom 340/265 Two silicone molds side by side
// production-top-left    1/1  Catchall with sage smudge bundle
// production-top-right   1/1  Catchall with incense sticks + lighter
// production-bottom-left  1/1 Multiple catchalls overhead (batch)
// production-bottom-right 1/1 Multiple catchalls arranged with accessories

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
  const src = `/images/makeway/${label}.jpg`;
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
            objectFit: 'cover', display: 'block',
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

export default function MakewayCatchall() {
  const ALL_IMAGES = [
    '/images/makeway/hero-left.jpg',
    '/images/makeway/hero-center.jpg',
    '/images/makeway/hero-right.jpg',
    '/images/makeway/brief-logo.jpg',
    '/images/makeway/process-left-top.jpg',
    '/images/makeway/process-left-bottom.jpg',
    '/images/makeway/process-right-top.jpg',
    '/images/makeway/process-right-bottom.jpg',
    '/images/makeway/production-top-left.jpg',
    '/images/makeway/production-top-right.jpg',
    '/images/makeway/production-bottom-left.jpg',
    '/images/makeway/production-bottom-right.jpg',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          3 equal-width square images
          hero-left | hero-center | hero-right
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: IMG_GAP, marginBottom: SECTION_MB }}>
        <Img label="hero-left" aspect="1/1" images={ALL_IMAGES} myIndex={0} />
        <Img label="hero-center" aspect="1/1" images={ALL_IMAGES} myIndex={1} />
        <Img label="hero-right" aspect="1/1" images={ALL_IMAGES} myIndex={2} />
      </div>

      {/* ── CLIENT BRIEF ──────────────────────────────────────────────────────
          Left: text
          Right: MakeWay wordmark logo (brief-logo.jpg)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Client Brief</H>
          <P>Toronto retailer and streetwear brand MakeWay commissioned a branded concrete catchall / incense holder after discovering my casting work on Instagram. Objective: create a functional branded object that extends brand presence into customers&apos; homes and daily routines.</P>
        </div>
        <Img label="brief-logo" aspect="519/231" images={ALL_IMAGES} myIndex={3} />
      </div>

      {/* ── DESIGN PROCESS ────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns
            Left sub: process-left-top (343/280) + process-left-bottom (333/181)
            Right sub: process-right-top (343/201) + process-right-bottom (340/265)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Design Process</H>
          <P>Presented form options to clients, produced 3D-printed prototypes with dimensional variations for in-hand evaluation. Finalized dimensions, wall height, embossment depth, and surface details collaboratively. Produced silicone molds for batch production.</P>
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub: 2 prototype shots */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="process-left-top" aspect="343/280" images={ALL_IMAGES} myIndex={4} />
            <Img label="process-left-bottom" aspect="333/181" images={ALL_IMAGES} myIndex={5} />
          </div>
          {/* Right sub: rectangular prototype + molds */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="process-right-top" aspect="343/201" images={ALL_IMAGES} myIndex={6} />
            <Img label="process-right-bottom" aspect="340/265" images={ALL_IMAGES} myIndex={7} />
          </div>
        </div>
      </div>

      {/* ── PRODUCTION ────────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns of square images
            Left sub:  production-top-left  + production-bottom-left
            Right sub: production-top-right + production-bottom-right
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Production &amp; Outcome</H>
          <P>The product has been in production since 2021 using the same silicone mold system. MakeWay owns the master models and molds; I produce batches on-demand.</P>
          <P>Available at MakeWay storefront and <a href="https://shopmakeway.co/products/makeway-concrete-catchall?srsltid=AfmBOoo6otRIcLJEKwZqso9k2SihbrUAMg7PrXgxOgUTE4WqW22efH-h" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>online</a>. Featured in Complex&apos;s <a href="https://www.complex.com/style/a/josh-walker/streetwear-gifts-for-canadians-2021" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>&ldquo;20 Gifts For Canadians Who Love Streetwear&rdquo;</a> (#6).</P>
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub: 2 square production shots */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="production-top-left" aspect="1/1" images={ALL_IMAGES} myIndex={8} />
            <Img label="production-bottom-left" aspect="1/1" images={ALL_IMAGES} myIndex={10} />
          </div>
          {/* Right sub: 2 square production shots */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="production-top-right" aspect="1/1" images={ALL_IMAGES} myIndex={9} />
            <Img label="production-bottom-right" aspect="1/1" images={ALL_IMAGES} myIndex={11} />
          </div>
        </div>
      </div>

    </div>
  );
}
