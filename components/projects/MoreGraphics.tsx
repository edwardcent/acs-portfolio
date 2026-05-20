'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/more-graphics/<label>.jpg
//
// 01   Row 1, col 1  — 1:1 square
// 02   Row 1, col 2  — 1:1 square
// 03   Row 1, col 3  — 1:1 square
// 04   Row 1, col 4  — 1:1 square
// 05   Row 2, col 1  — 1:1 square (full width)
// 06   Row 2, col 2  — 1:1 square (full width)
// 07   Row 2, col 3  — 1:1 square (full width)
// 08   Row 2, col 4  — 1:1 square
// 09   Row 3, col 1  — 1:1 square (vertically centered in taller row)
// 10   Row 3, col 2  — portrait 372:466
// 11   Row 3, col 3  — portrait 372:466
// 12   Row 3, col 4  — 1:1 square (vertically centered in taller row)
// 13   Row 4, col 1  — 1:1 square (full width)
// 14   Row 4, col 2  — 1:1 square (~84% column width, horizontally centered)
// 15   Row 4, col 3  — 1:1 square (full width)
// 16   Row 4, col 4  — 1:1 square (full width)

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
  const src = `/images/more-graphics/${label}.jpg`;
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

// ─── Component ────────────────────────────────────────────────────────────────

const GAP = '5px';

export default function MoreGraphics() {
  const ALL_IMAGES = Array.from({ length: 16 }, (_, i) =>
    `/images/more-graphics/${String(i + 1).padStart(2, '0')}.jpg`
  );

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: GAP }}>

        {/* ── ROW 1 — all square, full column width ───────────────────────── */}
        <Img label="01" aspect="1/1" images={ALL_IMAGES} myIndex={0} />
        <Img label="02" aspect="1/1" images={ALL_IMAGES} myIndex={1} />
        <Img label="03" aspect="1/1" images={ALL_IMAGES} myIndex={2} />
        <Img label="04" aspect="1/1" images={ALL_IMAGES} myIndex={3} />

        {/* ── ROW 2 — all square, full column width ───────────────────────── */}
        <Img label="05" aspect="1/1" images={ALL_IMAGES} myIndex={4} />
        <Img label="06" aspect="1/1" images={ALL_IMAGES} myIndex={5} />
        <Img label="07" aspect="1/1" images={ALL_IMAGES} myIndex={6} />
        <Img label="08" aspect="1/1" images={ALL_IMAGES} myIndex={7} />

        {/* ── ROW 3 — square (centered) | portrait | portrait | square (centered)
            Row height is driven by the portrait images (aspect 372:466).
            The square images in col 1 and col 4 are vertically centered within that taller row.
        */}
        <div style={{ alignSelf: 'center' }}>
          <Img label="09" aspect="1/1" images={ALL_IMAGES} myIndex={8} />
        </div>
        <Img label="10" aspect="372/466" images={ALL_IMAGES} myIndex={9} />
        <Img label="11" aspect="372/466" images={ALL_IMAGES} myIndex={10} />
        <div style={{ alignSelf: 'center' }}>
          <Img label="12" aspect="1/1" images={ALL_IMAGES} myIndex={11} />
        </div>

        {/* ── ROW 4 — square | smaller centered square | square | square
            Col 2 image is ~83.8% of column width (312px vs 372px in Figma), centered.
        */}
        <Img label="13" aspect="1/1" images={ALL_IMAGES} myIndex={12} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '83.8%' }}>
            <Img label="14" aspect="1/1" images={ALL_IMAGES} myIndex={13} />
          </div>
        </div>
        <Img label="15" aspect="1/1" images={ALL_IMAGES} myIndex={14} />
        <Img label="16" aspect="1/1" images={ALL_IMAGES} myIndex={15} />

      </div>
    </div>
  );
}
