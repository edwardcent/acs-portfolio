'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/park-frequency/<label>.jpg
// Grey labelled placeholder shown until the file exists.
//
// hero-left          1/1       Left square hero image
// hero-center        1/1       Center square hero image
// hero-right         555/453   Right landscape hero image
// brief              726/300   Client brief landscape photo
// hangers-top-1      351/335   Custom hangers top row, left image
// hangers-top-2      1/1       Custom hangers top row, right image
// hangers-bot-left   304/203   Custom hangers bottom row, left image
// hangers-bot-right  383/203   Custom hangers bottom row, right image
// popup-l1           328/194   Pop-up left column, image 1
// popup-l2           328/194   Pop-up left column, image 2
// popup-l3           328/194   Pop-up left column, image 3
// popup-l4           328/194   Pop-up left column, image 4
// popup-l5           328/194   Pop-up left column, image 5
// popup-r1           328/194   Pop-up right column, image 1
// popup-r2           328/194   Pop-up right column, image 2
// popup-r3           328/194   Pop-up right column, image 3
// popup-r4           328/194   Pop-up right column, image 4
// popup-r5           156/196   Pop-up right column, bottom row left
// popup-r6           156/196   Pop-up right column, bottom row right
// lighters           1/1       Branded table lighters hero image

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

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

function Img({ label, aspect = '1/1', fit = 'cover', images, myIndex }: { label: string; aspect?: string; fit?: 'cover' | 'contain'; images: string[]; myIndex: number }) {
  const src = `/images/park-frequency/${label}.jpg`;
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

export default function ParkFrequency() {
  const ALL_IMAGES = [
    '/images/park-frequency/hero-left.jpg',
    '/images/park-frequency/hero-center.jpg',
    '/images/park-frequency/hero-right.jpg',
    '/images/park-frequency/brief.jpg',
    '/images/park-frequency/hangers-top-1.jpg',
    '/images/park-frequency/hangers-top-2.jpg',
    '/images/park-frequency/hangers-bot-left.jpg',
    '/images/park-frequency/hangers-bot-right.jpg',
    '/images/park-frequency/popup-l1.jpg',
    '/images/park-frequency/popup-l2.jpg',
    '/images/park-frequency/popup-l3.jpg',
    '/images/park-frequency/popup-l4.jpg',
    '/images/park-frequency/popup-l5.jpg',
    '/images/park-frequency/popup-r1.jpg',
    '/images/park-frequency/popup-r2.jpg',
    '/images/park-frequency/popup-r3.jpg',
    '/images/park-frequency/popup-r4.jpg',
    '/images/park-frequency/popup-r5.jpg',
    '/images/park-frequency/popup-r6.jpg',
    '/images/park-frequency/lighters.jpg',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          3-column grid — two squares + one landscape
          hero-left (1/1) | hero-center (1/1) | hero-right (555/453)
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '452fr 452fr 555fr', gap: IMG_GAP, marginBottom: SECTION_MB }}>
        <Img label="hero-left" aspect="1/1" images={ALL_IMAGES} myIndex={0} />
        <Img label="hero-center" aspect="1/1" images={ALL_IMAGES} myIndex={1} />
        <Img label="hero-right" aspect="555/453" images={ALL_IMAGES} myIndex={2} />
      </div>

      {/* ── CLIENT BRIEF ──────────────────────────────────────────────────────
          Left: text
          Right: landscape photo
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Client Brief</H>
          <P>Park (formerly Frequency Worldwide), Toronto-based clothing brand transitioning from online to retail, commissioned branded products and a pop-up retail build. Initial discussions explored brand extension into home goods. Relationship evolved into ongoing product design partnership spanning custom retail hardware, pop-up booth systems, and branded merchandise.</P>
        </div>
        <Img label="brief" aspect="726/300" images={ALL_IMAGES} myIndex={3} />
      </div>

      {/* ── CUSTOM HANGERS ────────────────────────────────────────────────────
          Left: text
          Right: 2×2 grid with stacked bottom-left
            Top row: hangers-top-1 | hangers-top-2
            Bottom row: [hangers-bot-1 / hangers-bot-2 stacked] | hangers-bot-right
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Custom Retail Hangers</H>
          <P>Proposed laser-cut metal hangers shaped from brand&apos;s logo mark as retail differentiation strategy. Design emerged from functional question: what form does this logo lend itself to? Logo-shaped hanger creates brand visibility at point-of-sale, visible through garment neckline when displayed. Demonstrates brand application to overlooked retail touchpoints.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          {/* Top row */}
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: '351' }}><Img label="hangers-top-1" aspect="351/335" images={ALL_IMAGES} myIndex={4} /></div>
            <div style={{ flex: '336' }}><Img label="hangers-top-2" aspect="1/1" images={ALL_IMAGES} myIndex={5} /></div>
          </div>
          {/* Bottom row */}
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: '304' }}><Img label="hangers-bot-left" aspect="304/203" images={ALL_IMAGES} myIndex={6} /></div>
            <div style={{ flex: '383' }}><Img label="hangers-bot-right" aspect="383/203" images={ALL_IMAGES} myIndex={7} /></div>
          </div>
        </div>
      </div>

      {/* ── ATLANTA POP-UP SHOP BUILD ──────────────────────────────────────────
          Left: text
          Right: 2 columns of 5 stacked images each
            Right col last row: 2 side-by-side portrait images
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Atlanta Pop-Up Booth (Remote Assembly)</H>
          <P>Designed modular PVC pipe structure for Atlanta Streetwear Convention with two-week lead time. System requirements: visually distinctive, brand-coherent, reusable, client-assemblable without designer present.</P>
          <P>Solution: PVC frame with some internal steel-rod reinforcements, branded canvas panels, plywood transaction surface, custom branded hangers. Produced complete assembly documentation: exploded views, joint counts, colour-coded pipe cutting guide. Hardware order staged at local Home Depot; canvas shipped to client Airbnb. Client assembled in accommodation, disassembled for transport, reassembled on-site independently.</P>
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="popup-l1" aspect="328/194" images={ALL_IMAGES} myIndex={8} />
            <Img label="popup-l2" aspect="328/194" images={ALL_IMAGES} myIndex={9} />
            <Img label="popup-l3" aspect="328/194" images={ALL_IMAGES} myIndex={10} />
            <Img label="popup-l4" aspect="328/194" images={ALL_IMAGES} myIndex={11} />
            <Img label="popup-l5" aspect="328/194" images={ALL_IMAGES} myIndex={12} />
          </div>
          {/* Right column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="popup-r1" aspect="328/194" images={ALL_IMAGES} myIndex={13} />
            <Img label="popup-r2" aspect="328/194" images={ALL_IMAGES} myIndex={14} />
            <Img label="popup-r3" aspect="328/194" images={ALL_IMAGES} myIndex={15} />
            <Img label="popup-r4" aspect="328/194" images={ALL_IMAGES} myIndex={16} />
            <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
              <div style={{ flex: 1 }}><Img label="popup-r5" aspect="156/196" images={ALL_IMAGES} myIndex={17} /></div>
              <div style={{ flex: 1 }}><Img label="popup-r6" aspect="156/196" images={ALL_IMAGES} myIndex={18} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BRANDED TABLE LIGHTERS ────────────────────────────────────────────
          Left: text (bold "table lighter" links to /work/table-lighters#final-product)
          Right: square image
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Branded Table Lighters</H>
          <P>Following the Park rebrand, client ordered a production run of aluminum <Link href="/work/table-lighters#final-product" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>table lighters</Link> with Park logo replacing standard ACS mark. Product seeded to brand collaborators and offered as IRL-exclusive at pop-up events. Supports Park&apos;s strategy to extend clothing brand into lifestyle object ecosystem.</P>
        </div>
        <Img label="lighters" aspect="1/1" images={ALL_IMAGES} myIndex={19} />
      </div>

    </div>
  );
}
