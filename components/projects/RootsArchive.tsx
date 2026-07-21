'use client';

import { useState, useEffect, useCallback } from 'react';

const B = '/images/roots';

const ALL_IMAGES = [
  `${B}/hero-01.png`,   // 0
  `${B}/hero-02.png`,   // 1
  `${B}/hero-03.png`,   // 2
  `${B}/brief.png`,     // 3
  `${B}/ref-01.jpeg`,   // 4
  `${B}/ref-02.jpeg`,   // 5
  `${B}/ref-03.jpeg`,   // 6
  `${B}/ref-04.jpeg`,   // 7
  `${B}/ref-05.jpeg`,   // 8
  `${B}/ref-06.jpeg`,   // 9
  `${B}/dir-01.png`,    // 10
  `${B}/dir-02.jpeg`,   // 11
  `${B}/dial-01.png`,   // 12
  `${B}/dial-02.png`,   // 13
  `${B}/dial-03.png`,   // 14
  `${B}/dial-04.png`,   // 15
  `${B}/logo-02.png`,   // 16
  `${B}/ig-01.png`,     // 17
  `${B}/ig-02.png`,     // 18
  `${B}/ig-03.png`,     // 19
  `${B}/ig-04.png`,     // 20
  `${B}/ig-05.png`,     // 21
  `${B}/ig-06.png`,     // 22
  `${B}/sign-01.png`,   // 23
  `${B}/sign-02.png`,   // 24
  `${B}/sign-03.png`,   // 25
  `${B}/sign-04.png`,   // 26
  `${B}/sign-05.png`,   // 27
];

function Lightbox({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const hasPrev = idx > 0;
  const hasNext = idx < ALL_IMAGES.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIdx(i => Math.min(ALL_IMAGES.length - 1, i + 1));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'zoom-out', padding: '40px',
    }}>
      <img src={ALL_IMAGES[idx]} alt="" onClick={e => e.stopPropagation()} style={{
        maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
        borderRadius: '8px', cursor: 'default',
        boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
      }} />
      <button onClick={onClose} style={{
        position: 'fixed', top: '20px', right: '24px',
        background: 'none', border: 'none', color: '#fff', fontSize: '28px',
        cursor: 'pointer', lineHeight: 1, padding: '4px 8px', opacity: 0.7,
      }}>×</button>
      {hasPrev && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => i - 1); }} style={{
          position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: '#fff', fontSize: '40px',
          cursor: 'pointer', lineHeight: 1, padding: '8px 12px', opacity: 0.7,
        }}>‹</button>
      )}
      {hasNext && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => i + 1); }} style={{
          position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: '#fff', fontSize: '40px',
          cursor: 'pointer', lineHeight: 1, padding: '8px 12px', opacity: 0.7,
        }}>›</button>
      )}
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 700, fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.05,
      textTransform: 'uppercase', letterSpacing: '-0.01em',
      color: '#0a0a0a', margin: '0 0 14px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 12px' }}>{children}</p>;
}

type ImgProps = {
  src: string;
  myIndex: number;
  aspect?: string;
  fit?: 'cover' | 'contain';
  crop?: React.CSSProperties;
  position?: string;
};

function Img({ src, myIndex, aspect = '1/1', fit = 'cover', crop, position = 'center' }: ImgProps) {
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  const imgStyle: React.CSSProperties = crop
    ? { position: 'absolute', display: 'block', maxWidth: 'none', ...crop }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, objectPosition: position, display: 'block' };

  return (
    <>
      <div onClick={open} style={{
        width: '100%', aspectRatio: aspect,
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        position: 'relative', flexShrink: 0, cursor: 'zoom-in',
      }}>
        <img src={src} alt="" style={imgStyle} />
      </div>
      {lightbox && <Lightbox startIndex={myIndex} onClose={close} />}
    </>
  );
}

function FullImg({ src, myIndex }: { src: string; myIndex: number }) {
  const [lightbox, setLightbox] = useState(false);
  const open = useCallback(() => setLightbox(true), []);
  const close = useCallback(() => setLightbox(false), []);

  return (
    <>
      <img src={src} alt="" onClick={open} style={{
        width: '100%', height: 'auto', display: 'block',
        borderRadius: '12px', background: '#fff', cursor: 'zoom-in',
      }} />
      {lightbox && <Lightbox startIndex={myIndex} onClose={close} />}
    </>
  );
}

const MB = '64px';
const GAP = '40px';
const IGAP = '8px';

export default function RootsArchive() {
  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: IGAP, marginBottom: MB, alignItems: 'center' }}>
        <Img src={`${B}/hero-01.png`} myIndex={0} fit="contain" />
        <div style={{ width: '90%', margin: '0 auto' }}><FullImg src={`${B}/hero-02.png`} myIndex={1} /></div>
        <Img src={`${B}/hero-03.png`} myIndex={2} crop={{ height: '120.95%', left: '-10.32%', top: '-10.47%', width: '120.69%' }} />
      </div>

      {/* ── BRIEF / INSPO ────────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Brief / Inspo</H>
          <P>Every time I read GAP across someone's chest walking around Toronto, I wish it said ROOTS instead.</P>
          <P>What if Roots hosted an annual "archive sale" in Canada's major cities, selling mainline product, not outlet runoff, like jjjjound's recent Entrepôt, Stussy's archive sales, or Aritzia's warehouse sale? Both jjjjound and Aritzia move serious volume doing this. Event-based shopping is a recent phenomenon, and consumers enjoy it more than a trip to an outlet mall. This project explores what the branding for such an event could look like.</P>
        </div>
        <Img src={`${B}/brief.png`} myIndex={3} fit="contain" />
      </div>

      {/* ── PULLING REFERENCES ───────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Pulling References</H>
          <P>The idea for this sale is a celebration of Roots, so I decided to look back through their archive of designs; logos, photographs, and graphics.</P>
          <P>I wanted a reference point that feels distinctly Roots, but needed it to be something that brings out an older Roots energy. Photos of celebrities wearing the brand in the 80s and 90s are a way to instantly bring up a nostalgic feeling, but clearing those images would likely be an issue. As a fan of the brand, this part was a lot of fun.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/ref-01.jpeg`} myIndex={4} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-02.jpeg`} myIndex={5} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-03.jpeg`} myIndex={6} crop={{ height: '141.73%', left: '-2.92%', top: '0.02%', width: '106.06%' }} />
          <Img src={`${B}/ref-04.jpeg`} myIndex={7} fit="cover" />
          <Img src={`${B}/ref-05.jpeg`} myIndex={8} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-06.jpeg`} myIndex={9} fit="cover" />
        </div>
      </div>

      {/* ── FINDING DIRECTION ────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Finding Direction</H>
          <P>After finding a nice base of references in Roots reference books and some deep diving on their website and social media, I felt I had a solid starting ground — I needed something distinctively Roots, that isn't just their standard logo.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dir-01.png`} myIndex={10} fit="cover" />
          <Img src={`${B}/dir-02.jpeg`} myIndex={11} crop={{ height: '144.52%', left: '0', top: '-22.26%', width: '100%' }} />
        </div>
      </div>

      {/* ── DIALLING IT IN ───────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Dialling It In</H>
          <P>At this point I'm putting together options, while trying to decide if each city should have its own branding and playing with the idea of making a system for branding Roots' reference images.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dial-01.png`} myIndex={12} fit="contain" />
          <Img src={`${B}/dial-02.png`} myIndex={13} fit="contain" />
          <Img src={`${B}/dial-03.png`} myIndex={14} fit="contain" />
          <Img src={`${B}/dial-04.png`} myIndex={15} fit="contain" />
        </div>
      </div>

      {/* ── FINAL LOGO AND SYSTEM ────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Final Logo and System</H>
          <P>I decided the circular Roots logo would be the best in terms of getting the information across, being bi-lingual, and being recognizably Roots, while still feeling fresh in aesthetic. The system I created for plugging in photos to be branded for the event would allow other options to be tested easily, and gives the option of having city-specific branding.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/hero-01.png`} myIndex={0} fit="contain" />
          <Img src={`${B}/logo-02.png`} myIndex={16} fit="contain" />
        </div>
      </div>

      {/* ── MOCKUP IMAGES (INSTAGRAM) ────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Mockup Images (Instagram)</H>
          <P>I mentioned the issue of clearing photos, but I still played around with a handful before landing on the image with shoe boxes that feature loud Roots branding, and the beaver illustration in our Archive Sale logo. An issue I had with sourced photos was the overall layouts; but the look and feel still proved effective.</P>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP, marginBottom: IGAP }}>
            <Img src={`${B}/ig-01.png`} myIndex={17} fit="contain" />
            <Img src={`${B}/ig-02.png`} myIndex={18} fit="contain" />
            <Img src={`${B}/ig-03.png`} myIndex={19} fit="contain" />
            <Img src={`${B}/ig-04.png`} myIndex={20} fit="contain" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
            <Img src={`${B}/ig-05.png`} myIndex={21} aspect="9/16" fit="cover" />
            <Img src={`${B}/ig-06.png`} myIndex={22} aspect="9/16" fit="cover" />
          </div>
        </div>
      </div>

      {/* ── MOCKUP IMAGES (SIGNAGE) ──────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Mockup Images (Signage)</H>
          <P>After seeing how these logos look large scale I had a better understanding of how they get information across.</P>
          <P>After deciding on the singular logo, and the system for promotional content, I thought of a sticker pack of the alternate logos that could be given as a gift with purchase.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/sign-01.png`} myIndex={23} fit="cover" />
          <Img src={`${B}/sign-02.png`} myIndex={24} fit="cover" />
          <Img src={`${B}/sign-03.png`} myIndex={25} fit="cover" />
          <Img src={`${B}/sign-04.png`} myIndex={26} fit="cover" />
          <Img src={`${B}/hero-03.png`} myIndex={2} crop={{ height: '115.59%', left: '-5.47%', top: '-8.05%', width: '115.59%' }} />
          <Img src={`${B}/sign-05.png`} myIndex={27} fit="cover" />
        </div>
      </div>

      {/* ── FINAL DELIVERABLES ───────────────────────────────────────── */}
      <div>
        <H>Final Deliverables</H>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IGAP }}>
          <FullImg src={`${B}/hero-01.png`} myIndex={0} />
          <FullImg src={`${B}/hero-02.png`} myIndex={1} />
          <FullImg src={`${B}/hero-03.png`} myIndex={2} />
        </div>
      </div>

    </div>
  );
}
