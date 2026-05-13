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
// hangers-bot-1      304/203   Custom hangers bottom row, left stack top
// hangers-bot-2      304/203   Custom hangers bottom row, left stack bottom
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
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px',
          }}>
            <span style={{
              fontSize: '11px', color: '#888',
              letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.5,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>{label}</span>
          </div>
        )}
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

export default function ParkFrequency() {
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
        <Img label="hero-left" aspect="1/1" />
        <Img label="hero-center" aspect="1/1" />
        <Img label="hero-right" aspect="555/453" />
      </div>

      {/* ── CLIENT BRIEF ──────────────────────────────────────────────────────
          Left: text
          Right: landscape photo
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Client Brief</H>
          <P>Frequency Worldwide - now Park, is a Toronto-based clothing brand with a strong online presence and growing retail ambition.</P>
          <P>The relationship started with a gifted table lighter — one of the owners had been liking my work and asked what I could do for them. Our first conversations covered home goods, branded lighters, and concrete trays. We discussed different uses of the brand&apos;s logos and the question of how a clothing brand becomes part of a customer&apos;s home and daily life.</P>
        </div>
        <Img label="brief" aspect="726/300" />
      </div>

      {/* ── CUSTOM HANGERS ────────────────────────────────────────────────────
          Left: text
          Right: 2×2 grid with stacked bottom-left
            Top row: hangers-top-1 | hangers-top-2
            Bottom row: [hangers-bot-1 / hangers-bot-2 stacked] | hangers-bot-right
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Custom Hangers</H>
          <P>I provided some mockups but paused the request for trays and custom concrete lighters because I was phasing out the material in favour of aluminum.</P>
          <P>I knew the brand was thinking about retail and how to stand out on a rack so I came back with a custom laser-cut metal hanger shaped from one of the brand&apos;s logos.</P>
          <P>The idea came from a question I&apos;ve asked myself in previous work — what does the form of this logo lend itself to? The logo peeks out of the neck hole when in use. Infusing it into an otherwise overlooked feature in retail.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          {/* Top row */}
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
            <div style={{ flex: '351' }}><Img label="hangers-top-1" aspect="351/335" /></div>
            <div style={{ flex: '336' }}><Img label="hangers-top-2" aspect="1/1" /></div>
          </div>
          {/* Bottom row: left stack + right */}
          <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
            <div style={{ flex: '304', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
              <Img label="hangers-bot-1" aspect="304/203" />
              <Img label="hangers-bot-2" aspect="304/203" />
            </div>
            <div style={{ flex: '383' }}>
              <Img label="hangers-bot-right" aspect="383/203" />
            </div>
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
          <H>Atlanta Pop-Up Shop Build</H>
          <P>The hangers led into a bigger ask. Frequency had a pop-up at the Atlanta Streetwear Convention in two months and wanted a booth that did three things: stood out, built a world at a glance, and could be reused for future events.</P>
          <P>We landed on a pvc pipe structure the two owners could assemble themselves with my instructions. I accounted for steel-rod reinforcements, branded canvas panels, a plywood table top for transactions, and the custom hangers running the length of the racks.</P>
          <P>To make the build possible without me there, I produced full assembly documentation — exploded views, joint counts, colour-coded pipe length legend for cutting. The banners shipped to their Airbnb; the hardware order was waiting at the nearest Home Depot. They built it themselves inside their Airbnb and reassembled on site.</P>
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="popup-l1" aspect="328/194" />
            <Img label="popup-l2" aspect="328/194" />
            <Img label="popup-l3" aspect="328/194" />
            <Img label="popup-l4" aspect="328/194" />
            <Img label="popup-l5" aspect="328/194" />
          </div>
          {/* Right column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="popup-r1" aspect="328/194" />
            <Img label="popup-r2" aspect="328/194" />
            <Img label="popup-r3" aspect="328/194" />
            <Img label="popup-r4" aspect="328/194" />
            <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP }}>
              <div style={{ flex: 1 }}><Img label="popup-r5" aspect="156/196" /></div>
              <div style={{ flex: 1 }}><Img label="popup-r6" aspect="156/196" /></div>
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
          <P>
            Frequency rebranded to Park in late 2025. When I brought them my production-ready aluminum{' '}
            <Link href="/work/table-lighters#final-product" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>table lighter</Link>
            , they ordered the entire first run — with the Park logo in place of the standard ACS mark.
          </P>
          <P>The lighters are being seeded to friends of the brand and offered as in-real-life exclusives at pop-up events. This product aligned with Park&apos;s broader effort to translate a clothing brand into a world of objects.</P>
        </div>
        <Img label="lighters" aspect="1/1" />
      </div>

    </div>
  );
}
