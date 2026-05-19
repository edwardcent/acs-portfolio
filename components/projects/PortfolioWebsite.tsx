'use client';

// ─── Image files ──────────────────────────────────────────────────────────────
// Drop into public/images/portfolio-website/
//
// hero-1        1/1        Hero screenshot 1
// hero-2        1/1        Hero screenshot 2
// hero-3        1/1        Hero screenshot 3
// landing       716/428    Landing sequence screenshot
// process-l1    1/1        Process left column, image 1
// process-l2    1/1        Process left column, image 2
// process-l     1/1        Process left column, GIF (auto-loops)
// process-r1    257/401    Process right column, image 1
// process-r2    215/343    Process right column, image 2
// process-r     258/369    Process right column, GIF (auto-loops)

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
  const src = `/images/portfolio-website/${label}.png`;
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div onClick={open} style={{
        width: '100%', aspectRatio: aspect,
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        flexShrink: 0, position: 'relative', cursor: 'zoom-in',
      }}>
        <img src={src} alt={label}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        />
      </div>
      {lightbox && <Lightbox images={images} startIndex={myIndex} onClose={close} />}
    </>
  );
}

// ─── Gif component ────────────────────────────────────────────────────────────
// GIFs auto-loop natively — no play button, just the looping image.
// Click opens lightbox where it also loops.

function Gif({ label, aspect = '1/1', images, myIndex }: { label: string; aspect?: string; images: string[]; myIndex: number }) {
  const src = `/images/portfolio-website/${label}.gif`;
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <div onClick={open} style={{
        width: '100%', aspectRatio: aspect,
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        flexShrink: 0, position: 'relative', cursor: 'zoom-in',
      }}>
        <img src={src} alt={label} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
        }} />
      </div>
      {lightbox && <Lightbox images={images} startIndex={myIndex} onClose={close} />}
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

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '18px', margin: '0 0 10px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSend = useCallback(async () => {
    if (!message.trim() || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setStatus('sent');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, [message, status]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 600, lineHeight: 1.2, color: '#0a0a0a', margin: '0 0 2px' }}>
          Have a comment on my website?
        </p>
        <p style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 600, lineHeight: 1.2, color: '#0a0a0a', margin: 0 }}>
          I&apos;d like to hear it!
        </p>
      </div>
      <textarea
        value={message}
        onChange={e => { setMessage(e.target.value); if (status !== 'idle') setStatus('idle'); }}
        placeholder="leave a message here..."
        disabled={status === 'sent'}
        rows={5}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: '#ebebeb',
          border: 'none',
          borderRadius: '12px',
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#0a0a0a',
          fontFamily: 'inherit',
          resize: 'none',
          outline: 'none',
          boxSizing: 'border-box',
          display: 'block',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
        {status === 'error' && (
          <p style={{ fontSize: '13px', color: '#c00', margin: 0 }}>Something went wrong — try again.</p>
        )}
        <button
          onClick={handleSend}
          disabled={status === 'sending' || status === 'sent' || !message.trim()}
          style={{
            background: 'none', border: 'none', padding: '4px 0',
            fontSize: '14px', fontWeight: 700,
            color: status === 'sent' ? '#888' : '#0a0a0a',
            cursor: (status === 'sent' || !message.trim()) ? 'default' : 'pointer',
            fontFamily: 'inherit',
            opacity: !message.trim() && status === 'idle' ? 0.3 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {status === 'sending' ? '...' : status === 'sent' ? 'sent ✓' : 'send'}
        </button>
      </div>
    </div>
  );
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const SECTION_MB = '48px';
const IMG_GAP = '8px';
const COL_GAP = '40px';

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioWebsite() {
  const ALL_IMAGES = [
    '/images/portfolio-website/hero-1.png',
    '/images/portfolio-website/hero-2.png',
    '/images/portfolio-website/hero-3.png',
    '/images/portfolio-website/landing.png',
    '/images/portfolio-website/process-l1.png',
    '/images/portfolio-website/process-l2.png',
    '/images/portfolio-website/process-l.gif',
    '/images/portfolio-website/process-r1.png',
    '/images/portfolio-website/process-r2.png',
    '/images/portfolio-website/process-r.gif',
  ];

  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          3 equal-width screenshots in a row
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: IMG_GAP, alignItems: 'center', marginBottom: SECTION_MB }}>
        <Img label="hero-1" aspect="1/1" images={ALL_IMAGES} myIndex={0} />
        <Img label="hero-2" aspect="483/425" images={ALL_IMAGES} myIndex={1} />
        <Img label="hero-3" aspect="1/1" images={ALL_IMAGES} myIndex={2} />
      </div>

      {/* ── GOAL ──────────────────────────────────────────────────────────────
          Left: text
          Right: "edwardcentora.me" styled as a logo — same container shape as
                 other pages' logo images but rendered as text
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Goal</H>
          <P>I outgrew Adobe Portfolio&apos;s constraints and needed full control over layout and interaction design. The solution: design in Figma, develop with AI-assisted tooling, deploy via Vercel.</P>
        </div>
        <div style={{
          width: '100%', aspectRatio: '519/231',
          background: '#fff', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: 'clamp(14px, 1.8vw, 24px)',
            fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em',
          }}>
            edwardcentora.me
          </span>
        </div>
      </div>

      {/* ── THE LANDING SEQUENCE ──────────────────────────────────────────────
          Left: text
          Right: single screenshot
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>The Landing Sequence</H>
          <P>I built the project navigation and pages first as a straightforward portfolio. Once the site was functional, I realized it needed a moment before the work that says who I am and welcomes the visitor onto the page.</P>
          <P>Animating the Lego minifig came to mind immediately — it&apos;s a symbol of ubiquitous design that I use to represent myself online often. The custom graphic on his shirt is there to remind you this isn&apos;t Lego.ca.</P>
        </div>
        <Img label="landing" aspect="716/428" images={ALL_IMAGES} myIndex={3} />
      </div>

      {/* ── PRODUCTION PROCESS ────────────────────────────────────────────────
          Left: text + bullet list
          Right: 2 sub-columns
            Left sub:  process-l1 (square), process-l2 (square), process-l.gif (square)
            Right sub: process-r1 (portrait), process-r2 (portrait), process-r.gif (portrait)
          GIFs are at the bottom of each column and auto-loop.
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Production Process</H>
          <P>I shot a stop-motion sequence of the minifigure on a white backdrop, then added the shirt graphic to each frame in Photoshop. From there, I sketched interaction flows, built keyframe mockups in Figma, and prototyped the animation timing and UI behavior before implementation.</P>
          <P>The Figma file holds the full site structure: design system, interactive project menu, adaptive page layouts, and responsive breakpoints across all screen sizes. The design translated directly into production through a design-to-code workflow.</P>
          <P>Using the domain — edwardcentora.me — was the last detail I added to the site.</P>
          <UL items={[
            'Stop-motion photography and motion design in Photoshop and Lightroom',
            'Interaction design and prototyping in Figma',
            'Design systems and component library development',
            'Responsive layout design (mobile, tablet, desktop)',
            'Animation timing and micro-interactions',
          ]} />
        </div>
        <div className="tl-img-row" style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub: wider col (~62%) — 3 squares */}
          <div style={{ flex: '418', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="process-l1" aspect="1/1" images={ALL_IMAGES} myIndex={4} />
            <Img label="process-l2" aspect="1/1" images={ALL_IMAGES} myIndex={5} />
            <div style={{ paddingLeft: '10px' }}>
              <Gif label="process-l" aspect="1/1" images={ALL_IMAGES} myIndex={6} />
            </div>
          </div>
          {/* Right sub: narrower col (~38%) — 3 portraits */}
          <div style={{ flex: '258', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="process-r1" aspect="257/401" images={ALL_IMAGES} myIndex={7} />
            <Img label="process-r2" aspect="215/343" images={ALL_IMAGES} myIndex={8} />
            <div style={{ paddingLeft: '10px' }}>
              <Gif label="process-r" aspect="258/369" images={ALL_IMAGES} myIndex={9} />
            </div>
          </div>
        </div>
      </div>

      {/* ── OUTCOME ───────────────────────────────────────────────────────────
          Left: text
          Right: contact form — message is committed to the repo via GitHub API
      */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Outcome</H>
          <P>A portfolio site that reflects my design philosophy and shapes how my work is presented. Full creative control, refined interactions, fast iteration cycles, and a workflow that lets me focus on design without code constraints.</P>
        </div>
        <ContactForm />
      </div>

    </div>
  );
}
