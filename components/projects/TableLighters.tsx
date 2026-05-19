'use client';

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
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
        padding: '40px',
      }}
    >
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '8px',
          cursor: 'default',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '24px',
          background: 'none', border: 'none',
          color: '#fff', fontSize: '28px', cursor: 'pointer',
          lineHeight: 1, padding: '4px 8px',
          opacity: 0.7,
        }}
        aria-label="Close"
      >
        ×
      </button>
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

// ─── Video lightbox ───────────────────────────────────────────────────────────

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
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
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
        padding: '40px',
      }}
    >
      <video
        src={src}
        controls
        autoPlay
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '8px',
          cursor: 'default',
          boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '24px',
          background: 'none', border: 'none',
          color: '#fff', fontSize: '28px', cursor: 'pointer',
          lineHeight: 1, padding: '4px 8px',
          opacity: 0.7,
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

// ─── Video component ──────────────────────────────────────────────────────────
// Drop video files into public/images/table-lighters/ as <label>.mp4
// Drop a poster image as <label>-poster.jpg — shown until the user clicks play.

function Video({ label, aspect = '1/1' }: { label: string; aspect?: string }) {
  const src = `/images/table-lighters/${label}.mp4`;
  const poster = `/images/table-lighters/${label}-poster.jpg`;
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div
        onClick={open}
        style={{
          width: '100%',
          aspectRatio: aspect,
          background: '#e0ddd8',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        {/* Poster image */}
        <img
          src={poster}
          alt={label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Play button overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'rgba(255,255,255,0.88)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}>
            {/* Triangle play icon */}
            <div style={{
              width: 0, height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '16px solid #0a0a0a',
              marginLeft: '4px',
            }} />
          </div>
        </div>
      </div>
      {lightbox && <VideoLightbox src={src} onClose={close} />}
    </>
  );
}

// ─── Image component ─────────────────────────────────────────────────────────
// Drop image files into public/images/table-lighters/ with the matching label
// name, e.g. hero-braun-box.jpg. Shows a placeholder until the file exists.

function Img({ label, aspect = '1/1', images, myIndex }: { label: string; aspect?: string; images: string[]; myIndex: number }) {
  const src = `/images/table-lighters/${label}.jpg`;
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div
        onClick={open}
        style={{
          width: '100%',
          aspectRatio: aspect,
          background: '#e0ddd8',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
          cursor: 'zoom-in',
        }}
      >
        <img
          src={src}
          alt={label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      {lightbox && <Lightbox images={images} startIndex={myIndex} onClose={close} />}
    </>
  );
}

function RefImg({ label, style, images, myIndex }: { label: string; style: React.CSSProperties; images: string[]; myIndex: number }) {
  const src = `/images/table-lighters/${label}.jpg`;
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div
        onClick={open}
        style={{ position: 'absolute', background: '#e0ddd8', borderRadius: '12px', overflow: 'hidden', cursor: 'zoom-in', ...style }}
      >
        <img
          src={src}
          alt={label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      {lightbox && <Lightbox images={images} startIndex={myIndex} onClose={close} />}
    </>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 700,
      fontSize: 'clamp(20px, 2.2vw, 28px)',
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: '#0a0a0a',
      margin: '0 0 14px',
    }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 12px' }}>{children}</p>;
}

function SL({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', margin: '10px 0 2px' }}>{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '18px', margin: '0 0 10px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const SECTION_MB = '48px';
const IMG_GAP = '8px';
const COL_GAP = '40px';

// ─── Component ────────────────────────────────────────────────────────────────

export default function TableLighters() {
  const ALL_IMAGES = [
    '/images/table-lighters/hero-braun-box.jpg',
    '/images/table-lighters/hero-acs-logo.jpg',
    '/images/table-lighters/hero-concrete-v1.jpg',
    '/images/table-lighters/hero-concrete-v2.jpg',
    '/images/table-lighters/hero-aluminum-pair.jpg',
    '/images/table-lighters/ref-t2-box.jpg',
    '/images/table-lighters/ref-braun-lighters.jpg',
    '/images/table-lighters/ref-braun-cased.jpg',
    '/images/table-lighters/attempt-front.jpg',
    '/images/table-lighters/attempt-hollow.jpg',
    '/images/table-lighters/attempt-topview.jpg',
    '/images/table-lighters/attempt-cork.jpg',
    '/images/table-lighters/attempt-parts.jpg',
    '/images/table-lighters/revision-portrait-1.jpg',
    '/images/table-lighters/revision-landscape-1.jpg',
    '/images/table-lighters/revision-square-1.jpg',
    '/images/table-lighters/revision-square-2.jpg',
    '/images/table-lighters/revision-landscape-2.jpg',
    '/images/table-lighters/revision-portrait-2.jpg',
    '/images/table-lighters/final-lighters-pair.jpg',
    '/images/table-lighters/final-buttons-array.jpg',
    '/images/table-lighters/final-lighter-close.jpg',
    '/images/table-lighters/final-leather-base.jpg',
    '/images/table-lighters/final-technical-drawing.jpg',
    '/images/table-lighters/packaging-landscape.jpg',
    '/images/table-lighters/packaging-square-1.jpg',
    '/images/table-lighters/packaging-square-2.jpg',
    '/images/table-lighters/packaging-square-3.jpg',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          Col 1 (narrow): circle-clipped Braun box + ACS logo rect, stacked
          Col 2–3: tall portrait clips (concrete v1, v2)
          Col 4: large square (aluminum pair)
          Figma proportions: 266 : 327 : 327 : 523 → 1 : 1.23 : 1.23 : 1.97
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.23fr 1.23fr 1.97fr', gap: IMG_GAP, alignItems: 'stretch', marginBottom: SECTION_MB }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <Img label="hero-braun-box" aspect="1/1" images={ALL_IMAGES} myIndex={0} />
          <Img label="hero-acs-logo" aspect="1/1" images={ALL_IMAGES} myIndex={1} />
        </div>
        <Img label="hero-concrete-v1" aspect="2/3" images={ALL_IMAGES} myIndex={2} />
        <Img label="hero-concrete-v2" aspect="2/3" images={ALL_IMAGES} myIndex={3} />
        <Img label="hero-aluminum-pair" aspect="1/1" images={ALL_IMAGES} myIndex={4} />
      </div>

      {/* ── REFERENCE / GOAL ──────────────────────────────────────────────────
          Left: text
          Right: 3 overlapping images using Figma's exact inset percentages
            img1 (Braun T2 box):       top 2.18%  left 3.49%  right 48.63% bottom 42.34%
            img2 (black+yellow lighters): top 22.18% left 47.97% right 3.46%  bottom 21.53%
            img3 (Braun cased):        top 62.40% left 14.65% right 47.36% bottom 5.41%
          Container aspect ratio from Figma: 745 × 643 ≈ 1.158
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Design Brief</H>
          <P>Inspired by Dieter Rams&apos; iconic Braun T2 lighter, I designed a modern reinterpretation using a standard Bic as the replaceable ignition source. Design criteria: elevate the lighter experience, enable self-production with removable insert system, ensure durability through material and construction choices.</P>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '745/643', overflow: 'hidden' }}>
          <RefImg label="ref-t2-box"         style={{ top: '2.18%',  left: '3.49%',  right: '48.63%', bottom: '42.34%' }} images={ALL_IMAGES} myIndex={5} />
          <RefImg label="ref-braun-lighters" style={{ top: '22.18%', left: '47.97%', right: '3.46%',  bottom: '21.53%' }} images={ALL_IMAGES} myIndex={6} />
          <RefImg label="ref-braun-cased"    style={{ top: '62.40%', left: '14.65%', right: '47.36%', bottom: '5.41%'  }} images={ALL_IMAGES} myIndex={7} />
        </div>
      </div>

      {/* ── FIRST ATTEMPT ─────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns side by side
            Left sub: 2 stacked square clips (large concrete front + hollow)
            Right sub: 3 stacked squares (top-view, cork base, parts)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Prototype V1: Concrete Casting</H>
          <P>Initial prototypes used three-part 3D printed molds with removable Bic forms and custom stamped cork bases. The process validated overall dimensions and in-hand feel but revealed material limitations — Prototyping confirmed design direction but needed refinement.</P>
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'stretch' }}>
          {/* Left sub: 2 stacked (large square + medium square) */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
            <Img label="attempt-front" aspect="347/564" images={ALL_IMAGES} myIndex={8} />
            <Img label="attempt-hollow" aspect="1/1" images={ALL_IMAGES} myIndex={9} />
          </div>
          {/* Right sub: 3 stacked squares */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
            <Img label="attempt-topview" aspect="1/1" images={ALL_IMAGES} myIndex={10} />
            <Img label="attempt-cork" aspect="1/1" images={ALL_IMAGES} myIndex={11} />
            <Img label="attempt-parts" aspect="1/1" images={ALL_IMAGES} myIndex={12} />
          </div>
        </div>
      </div>

      {/* ── FIRST REVISION ────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns
            Left sub: tall portrait + landscape + square
            Right sub: square + landscape + portrait
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Prototype V2: Refined Concrete Production</H>
          <P>Redesigned silicone mold system with 3D-printed insert to accommodate Bic size variations. Achieved high surface finish and simplified production process. Sold direct-to-consumer and placed in Toronto independent retailers, with high-exposure TikTok content driving majority of sales. Repeat-customer feedback revealed concrete&apos;s fragility under impact — product pulled from market to redesign for durability.</P>
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="revision-portrait-1" aspect="3/4" images={ALL_IMAGES} myIndex={13} />
            <Img label="revision-landscape-1" aspect="4/3" images={ALL_IMAGES} myIndex={14} />
            <Img label="revision-square-1" aspect="1/1" images={ALL_IMAGES} myIndex={15} />
          </div>
          {/* Right sub */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="revision-square-2" aspect="1/1" images={ALL_IMAGES} myIndex={16} />
            <Img label="revision-landscape-2" aspect="4/3" images={ALL_IMAGES} myIndex={17} />
            <Img label="revision-portrait-2" aspect="3/4" images={ALL_IMAGES} myIndex={18} />
          </div>
        </div>
      </div>

      {/* ── FINAL PRODUCT ─────────────────────────────────────────────────────
          Anchor: #final-product */}
      <div id="final-product" style={{ scrollMarginTop: '64px' }} />
      {/* ─────────────────────────────────────────────────────────────────────
          Left: text
          Right col (vertical flex):
            Top grid (2 sub-cols):
              Left sub: square (lighters pair) + square (buttons array)
              Right sub: tall portrait (single lighter) + square (leather base)
            Bottom: technical drawing (landscape)
          Below the 2-col: full-width row of 2 large squares
      */}
      <div id="final-product" style={{ scrollMarginTop: '64px', marginBottom: SECTION_MB }}>
        <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: IMG_GAP }}>
          <div>
            <H>Final Product</H>
            <P>Shifted to CNC-machined aluminum for impact resistance and recyclability. Added mini size for smaller hands. Designed a new 3D-printed internal with a print-in-place magnetic button. Replaced stamped cork with custom wet-set debossed leather bases.</P>
            <P>Iterated 50+ button variations to achieve tactile satisfaction — final magnetic mechanism provides addictive push-eject interaction. First batch of units sold to previous concrete lighter customers via direct email outreach. Production-ready files completed for Toronto CNC manufacturing.</P>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            {/* Top: 2 sub-columns */}
            <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'stretch' }}>
              {/* Left sub: 2 squares */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
                <Img label="final-lighters-pair" aspect="1/1" images={ALL_IMAGES} myIndex={19} />
                <Img label="final-buttons-array" aspect="1/1" images={ALL_IMAGES} myIndex={20} />
              </div>
              {/* Right sub: tall portrait + square */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
                <Img label="final-lighter-close" aspect="3/4" images={ALL_IMAGES} myIndex={21} />
                <Img label="final-leather-base" aspect="1/1" images={ALL_IMAGES} myIndex={22} />
              </div>
            </div>
            {/* Bottom: technical drawing spans full right column width */}
            <Img label="final-technical-drawing" aspect="4/3" images={ALL_IMAGES} myIndex={23} />
          </div>
        </div>
        {/* Full-width 2-square row (Frame 45 in Figma) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IMG_GAP }}>
          <Video label="final-extra-1" aspect="1/1" />
          <Video label="final-extra-2" aspect="1/1" />
        </div>
      </div>

      {/* ── PACKAGING ─────────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns
            Left sub: landscape (411×348) + square (540×540)
            Right sub: square (302×302) + square (302×302)
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Packaging Design</H>
          <P>Unwrapping experience with zero glue — tuck tabs allow careful unraveling or a quick tear-through. Communicates product origin (Made in Toronto, Canada), manufacturer (All Conditions Studio), and quality positioning (&ldquo;Crafted with pride&rdquo;). Produced in-house using a printer/cutter system for rapid prototyping and small-batch production.</P>
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'stretch' }}>
          {/* Left sub: landscape + square */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
            <Img label="packaging-landscape" aspect="4/3" images={ALL_IMAGES} myIndex={24} />
            <Img label="packaging-square-1" aspect="1/1" images={ALL_IMAGES} myIndex={25} />
          </div>
          {/* Right sub: 2 squares */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP, justifyContent: 'space-between' }}>
            <Img label="packaging-square-2" aspect="1/1" images={ALL_IMAGES} myIndex={26} />
            <Img label="packaging-square-3" aspect="1/1" images={ALL_IMAGES} myIndex={27} />
          </div>
        </div>
      </div>

    </div>
  );
}
