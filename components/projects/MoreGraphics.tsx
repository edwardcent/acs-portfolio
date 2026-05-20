'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/more-graphics/<label>.jpg
// Named by row+col: first digit = row, second digit = col
//
// 11  12  13  14   Row 1 — all 1:1 square
// 21  22  23  24   Row 2 — all 1:1 square
// 31  32  33  34   Row 3 — 31 square (v-centered) | 32 portrait 372:466 | 33 portrait 372:466 | 34 square (v-centered)
// 41  42  43  44   Row 4 — 41 square | 42 square (~84% col width, centered) | 43 square | 44 square

import { useState, useEffect, useCallback } from 'react';

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ images, captions, startIndex, onClose }: { images: string[]; captions: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const src = images[idx];
  const caption = captions[idx];
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
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: 'zoom-out', padding: '40px',
      gap: '16px',
    }}>
      <img src={src} alt="" onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '100%', maxHeight: 'calc(100% - 60px)', objectFit: 'contain',
        borderRadius: '8px', cursor: 'default',
        boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
        flexShrink: 1,
      }} />
      {caption && (
        <p onClick={(e) => e.stopPropagation()} style={{
          color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: 500,
          textAlign: 'center', margin: 0, flexShrink: 0,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '0.01em',
        }}>{caption}</p>
      )}
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

function Img({ label, aspect = '1/1', images, captions, myIndex, ext = 'jpg', bg = '#e0ddd8', caption }: { label: string; aspect?: string; images: string[]; captions: string[]; myIndex: number; ext?: string; bg?: string; caption?: string }) {
  const src = `/images/more-graphics/${label}.${ext}`;
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div
        onClick={loaded ? open : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', aspectRatio: aspect,
          background: bg, borderRadius: '12px', overflow: 'hidden',
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
        {caption && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.52)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.18s ease',
            pointerEvents: 'none',
          }}>
            <p style={{
              color: '#fff', fontSize: '13px', fontWeight: 600,
              textAlign: 'center', lineHeight: 1.45, margin: 0,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>{caption}</p>
          </div>
        )}
      </div>
      {lightbox && loaded && <Lightbox images={images} captions={captions} startIndex={myIndex} onClose={close} />}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const GAP = '5px';

export default function MoreGraphics() {
  const ALL_CAPTIONS = [
    'personal Grateful Dead Land Rover illustration',
    'personal Grateful Dead Bart Simpson illustration',
    'personal Grateful Dead Porsche illustration',
    'personal Air Jordan 1 illustration',
    'personal Grateful Dead Polo Bear illustration',
    'personal Lego minifig mockup',
    'personal Lego minifig mockup',
    'ACS vintage basketball logo',
    'commissioned single cover',
    'ACS incense holder ad',
    'ACS incense holder ad',
    'commissioned Primeau logo',
    'ACS logo coloured',
    'commissioned Whine to Me logo mark',
    'concept Throwing Fits style Yankees logo',
    'ACS "recon" logo',
  ];

  const ALL_IMAGES = [
    '/images/more-graphics/11.jpg',
    '/images/more-graphics/12.jpg',
    '/images/more-graphics/13.jpg',
    '/images/more-graphics/14.png',
    '/images/more-graphics/21.jpg',
    '/images/more-graphics/22.jpg',
    '/images/more-graphics/23.png',
    '/images/more-graphics/24.jpg',
    '/images/more-graphics/31.png',
    '/images/more-graphics/32.jpg',
    '/images/more-graphics/33.jpg',
    '/images/more-graphics/34.jpg',
    '/images/more-graphics/41.png',
    '/images/more-graphics/42.png',
    '/images/more-graphics/43.jpg',
    '/images/more-graphics/44.png',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: GAP }}>

        {/* ── ROW 1 — all square, full column width ───────────────────────── */}
        <Img label="11" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={0}  caption="personal Grateful Dead Land Rover illustration" />
        <Img label="12" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={1}  caption="personal Grateful Dead Bart Simpson illustration" />
        <Img label="13" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={2}  caption="personal Grateful Dead Porsche illustration" />
        <Img label="14" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={3}  ext="png" caption="personal Air Jordan 1 illustration" />

        {/* ── ROW 2 — all square, full column width ───────────────────────── */}
        <Img label="21" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={4}  caption="personal Grateful Dead Polo Bear illustration" />
        <Img label="22" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={5}  caption="personal Lego minifig mockup" />
        <Img label="23" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={6}  ext="png" caption="personal Lego minifig mockup" />
        <Img label="24" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={7}  caption="ACS vintage basketball logo" />

        {/* ── ROW 3 — square (centered) | portrait | portrait | square (centered) */}
        <div style={{ alignSelf: 'center' }}>
          <Img label="31" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={8}  ext="png" caption="commissioned single cover" />
        </div>
        <Img label="32" aspect="372/466" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={9}  caption="ACS incense holder ad" />
        <Img label="33" aspect="372/466" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={10} caption="ACS incense holder ad" />
        <div style={{ alignSelf: 'center' }}>
          <Img label="34" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={11} caption="commissioned Primeau logo" />
        </div>

        {/* ── ROW 4 — square | smaller centered square | square | square */}
        <Img label="41" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={12} ext="png" bg="#fff" caption="ACS logo coloured" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '83.8%' }}>
            <Img label="42" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={13} ext="png" caption="commissioned Whine to Me logo mark" />
          </div>
        </div>
        <Img label="43" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={14} caption="concept Throwing Fits style Yankees logo" />
        <Img label="44" aspect="1/1" images={ALL_IMAGES} captions={ALL_CAPTIONS} myIndex={15} ext="png" caption={'ACS "recon" logo'} />

      </div>
    </div>
  );
}
