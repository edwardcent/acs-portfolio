'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

const TOTAL_FRAMES = 10;

function clamp(v: number, mn: number, mx: number) { return Math.min(Math.max(v, mn), mx); }
function prog(s: number, a: number, b: number) { return clamp((s - a) / (b - a), 0, 1); }
function ease(t: number) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [winW, setWinW] = useState(1200);
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);
  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 768); setWinW(window.innerWidth); };
    check();
    window.addEventListener('resize', check);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    const target = sessionStorage.getItem('scrollTo');
    if (target === 'projects') {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 8600, behavior: 'smooth' });
        }
      }, 80);
    }

    return () => { window.removeEventListener('resize', check); window.removeEventListener('scroll', onScroll); };
  }, []);

  return isMobile
    ? <MobileHome scrollY={scrollY} hovered={hovered} setHovered={setHovered} interactionOn={interactionOn} setInteractionOn={setInteractionOn} />
    : <DesktopHome scrollY={scrollY} winW={winW} hovered={hovered} setHovered={setHovered} interactionOn={interactionOn} setInteractionOn={setInteractionOn} />;
}

// ─────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────
//    0–  100  static: arm down
//  100–  700  arm raises
//  700– 1500  HOLD: arm up
// 1500– 1900  minifig moves right
// 1700– 2000  text slides in
// 2000– 2300  HOLD: text
// 2300– 2500  text out → project list in
// 2500– 4500  HOLD: project list

// ─── Scroll Editor ────────────────────────────────────────────────────────────

type EditorRow = { label: string; start: number; end: number };

function ScrollEditor({ rows, onChange, label }: { rows: EditorRow[]; onChange: (i: number, field: 'start' | 'end', val: number) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const lines = rows.map(r => `  ${r.label}: [${r.start}, ${r.end}]`).join('\n');
    const text = `// ${label}\n{\n${lines}\n}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  const inp: React.CSSProperties = {
    width: '64px', padding: '3px 6px', fontSize: '11px', fontFamily: 'monospace',
    border: '1px solid #ccc', borderRadius: '4px', background: '#fff', color: '#0a0a0a',
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'monospace' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        padding: '5px 10px', fontSize: '11px', background: '#0a0a0a', color: '#fff',
        border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'block', marginLeft: 'auto',
      }}>
        {open ? 'hide scroll editor' : 'scroll editor'}
      </button>
      {open && (
        <div style={{
          marginTop: '8px', background: 'rgba(255,255,255,0.96)', border: '1px solid #ccc',
          borderRadius: '8px', padding: '12px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          minWidth: '260px',
        }}>
          <p style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</p>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ fontSize: '10px', color: '#aaa', textAlign: 'left', paddingBottom: '6px', fontWeight: 400 }}>stage</th>
                <th style={{ fontSize: '10px', color: '#aaa', textAlign: 'center', paddingBottom: '6px', fontWeight: 400 }}>start</th>
                <th style={{ fontSize: '10px', color: '#aaa', textAlign: 'center', paddingBottom: '6px', fontWeight: 400 }}>end</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label}>
                  <td style={{ fontSize: '11px', color: '#0a0a0a', paddingRight: '12px', paddingBottom: '6px' }}>{r.label}</td>
                  <td style={{ paddingBottom: '6px', paddingRight: '6px' }}>
                    <input type="number" value={r.start} style={inp}
                      onChange={e => onChange(i, 'start', Number(e.target.value))} />
                  </td>
                  <td style={{ paddingBottom: '6px' }}>
                    <input type="number" value={r.end} style={inp}
                      onChange={e => onChange(i, 'end', Number(e.target.value))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button onClick={copy} style={{
              padding: '4px 10px', fontSize: '11px', background: copied ? '#2a2' : '#0a0a0a',
              color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.2s',
            }}>
              {copied ? 'copied!' : 'copy values'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────

function DesktopHome({ scrollY, winW, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const [kf, setKf] = useState([
    { label: 'arm',   start: 100,  end: 700  },
    { label: 'move',  start: 1500, end: 1900 },
    { label: 'text',  start: 1700, end: 2000 },
    { label: 'trans', start: 2300, end: 2500 },
  ]);

  const updateKf = (i: number, field: 'start' | 'end', val: number) =>
    setKf(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  const armP  = prog(scrollY, kf[0].start, kf[0].end);
  const frame = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;
  const moveP = ease(prog(scrollY, kf[1].start, kf[1].end));
  const figTX = moveP * Math.min(25, 22000 / Math.max(winW, 1));
  const figTY = moveP * 5;
  const t1P      = ease(prog(scrollY, kf[2].start, kf[2].end));
  const transP   = ease(prog(scrollY, kf[3].start, kf[3].end));
  const textOpacity = t1P * (1 - transP);
  const t1X      = (1 - t1P) * -60;
  const textSlideY = transP * -160;
  const projOpacity = transP;
  const projSlideY  = (1 - transP) * 160;

  return (
    <>
      <Nav />
      <ScrollEditor rows={kf} onChange={updateKf} label="desktop" />
      <div style={{ height: '4500px', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Minifig */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(calc(-50% + ${figTX}vw), calc(-50% + ${figTY}vh))`,
            height: '75vh', width: 'auto', pointerEvents: 'none', zIndex: 10,
          }}>
            <img src={`/images/arm-${frame}.png`} alt="ACS mascot" style={{ height: '100%', width: 'auto', display: 'block' }} />
          </div>

          {/* Text */}
          <div style={{ position: 'absolute', left: '10vw', top: '50%', transform: `translateY(calc(-50% + ${textSlideY}px)) translateX(${t1X}px)`, width: 'min(420px, 38vw)', opacity: textOpacity, pointerEvents: textOpacity > 0.1 ? 'auto' : 'none' }}>
            <p style={{ fontSize: 'clamp(15px, 1.5vw, 22px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
              I&apos;m Edward Centorame, a designer in Toronto.{' '}
              <span style={{ fontWeight: '400' }}>I make graphics, branded objects, and merchandise — mostly for artists and creative studios, sometimes for myself. I&apos;m finishing my BFA at TMU this month. If you want to talk about a project or working together, reach out{' '}
              <Link href="/contact" style={{ textDecoration: 'none', borderBottom: '2px solid #0a0a0a', fontWeight: '700', pointerEvents: 'auto' }}>here</Link>.</span>
            </p>
          </div>

          {/* Project list — fades in over left column, minifig stays right */}
          <div className="proj-list" style={{
            position: 'absolute', left: '10vw', top: '10vh',
            transform: `translateY(${projSlideY}px)`,
            width: 'min(520px, 44vw)',
            height: '80vh',
            overflowY: projOpacity > 0.1 ? 'auto' : 'hidden',
            opacity: projOpacity,
            pointerEvents: projOpacity > 0.1 ? 'auto' : 'none',
            zIndex: 20,
          }}>
            {/* Interaction toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.04em', userSelect: 'none' }}>interaction</span>
              <button onClick={() => setInteractionOn((v: boolean) => !v)} style={{ width: '28px', height: '16px', borderRadius: '8px', border: 'none', background: interactionOn ? '#0a0a0a' : '#ccc', position: 'relative', cursor: 'pointer', padding: 0, transition: 'background 0.2s', flexShrink: 0, pointerEvents: 'auto' }}>
                <span style={{ position: 'absolute', top: '2px', left: interactionOn ? '14px' : '2px', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', display: 'block' }} />
              </button>
            </div>
            {projects.map((project, i) => {
              const isOpen = interactionOn ? hovered === project.slug : true;
              return (
                <DesktopProjectRow key={project.slug} project={project} isFirst={i === 0}
                  isHovered={isOpen}
                  onEnter={() => interactionOn && setHovered(project.slug)}
                  onLeave={() => interactionOn && setHovered(null)} />
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

function DesktopProjectRow({ project, isFirst, isHovered, onEnter, onLeave }: any) {
  const inner = (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ borderTop: isFirst ? 'none' : '1px solid #ccc' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', padding: '8px 0 4px' }}>
        <span style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: '700', color: '#0a0a0a' }}>{project.title}</span>
        <span style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#999', whiteSpace: 'nowrap', flexShrink: 0 }}>{project.year}</span>
      </div>
      <div style={{ paddingBottom: '4px' }}>
        <span style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#999' }}>{project.category}</span>
      </div>
      {project.comingSoon ? (
        <div style={{ width: '100%', aspectRatio: '1719 / 594', background: '#e0ddd8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#aaa', fontStyle: 'italic' }}>Coming Soon</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateRows: isHovered ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
          <div style={{ overflow: 'hidden' }}>
            <img src={`/images/${project.image}`} alt={project.title} style={{ width: '100%', aspectRatio: '1719 / 594', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
      )}
      <div style={{ borderBottom: '1px solid #ccc' }} />
    </div>
  );
  return project.comingSoon
    ? <div style={{ display: 'block' }}>{inner}</div>
    : <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>{inner}</Link>;
}

// ─────────────────────────────────────────────
// MOBILE
// ─────────────────────────────────────────────
//    0–  240  static: minifig centered, arm down
//  240–  720  arm raises (10 frames)
//  720– 1120  STATIC HOLD: arm fully up, centered
// 1120– 1360  minifig moves down (bottom quarter crops off)
// 1360– 1760  STATIC HOLD: minifig locked in position
// 1760– 2000  text fades in
// 2000+       text holds → project list below

function MobileHome({ scrollY, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const [kf, setKf] = useState([
    { label: 'arm',  start: 240,  end: 720  },
    { label: 'move', start: 1120, end: 1360 },
    { label: 'text', start: 1760, end: 2000 },
  ]);

  const updateKf = (i: number, field: 'start' | 'end', val: number) =>
    setKf(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  const armP       = prog(scrollY, kf[0].start, kf[0].end);
  const frame      = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;
  const moveP      = ease(prog(scrollY, kf[1].start, kf[1].end));
  const textOpacity = ease(prog(scrollY, kf[2].start, kf[2].end));
  const figCenterY = 50 + (72 - 50) * moveP;

  return (
    <>
      <Nav />
      <ScrollEditor rows={kf} onChange={updateKf} label="mobile" />
      <div style={{ height: 'calc(3400px + 100vh)', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Minifig — centered then moves down */}
          <div style={{
            position: 'absolute', left: '50%', top: `${figCenterY}vh`,
            transform: 'translate(-50%, -50%)', width: '85vw',
            flexShrink: 0, pointerEvents: 'none', zIndex: 5,
          }}>
            <img src={`/images/arm-${frame}.png`} alt="ACS mascot" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Text */}
          <div style={{
            position: 'absolute', left: '6vw', right: '6vw', top: '10vh', zIndex: 20,
            opacity: textOpacity, pointerEvents: textOpacity > 0.5 ? 'auto' : 'none',
          }}>
            <p style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
              I&apos;m Edward Centorame, a designer in Toronto.{' '}
              <span style={{ fontWeight: '400' }}>I make graphics, branded objects, and merchandise — mostly for artists and creative studios, sometimes for myself. I&apos;m finishing my BFA at TMU this month. If you want to talk about a project or working together, reach out{' '}
              <Link href="/contact" style={{ textDecoration: 'none', borderBottom: '2px solid #0a0a0a', fontWeight: '700', pointerEvents: 'auto' }}>here</Link>.</span>
            </p>
          </div>

        </div>
      </div>
      <ProjectList hovered={hovered} setHovered={setHovered} interactionOn={interactionOn} setInteractionOn={setInteractionOn} isMobile={true} />
    </>
  );
}

// ─────────────────────────────────────────────
// SHARED PROJECT LIST
// ─────────────────────────────────────────────
function ProjectList({ hovered, setHovered, interactionOn, setInteractionOn, isMobile }: any) {
  return (
    <div id="projects" style={{ background: '#fff', paddingBottom: '120px' }}>
      {!isMobile && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 12px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.04em', userSelect: 'none' }}>interaction</span>
          <button onClick={() => setInteractionOn((v: boolean) => !v)} style={{ width: '28px', height: '16px', borderRadius: '8px', border: 'none', background: interactionOn ? '#0a0a0a' : '#ccc', position: 'relative', cursor: 'pointer', padding: 0, transition: 'background 0.2s', flexShrink: 0 }}>
            <span style={{ position: 'absolute', top: '2px', left: interactionOn ? '14px' : '2px', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', display: 'block' }} />
          </button>
        </div>
      )}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '40px 24px 0' : '0 24px' }}>
        {projects.map((project, i) => {
          const isOpen = isMobile ? true : (interactionOn ? hovered === project.slug : true);
          return (
            <ProjectRow key={project.slug} project={project} isFirst={i === 0} isLast={i === projects.length - 1}
              isHovered={isOpen} onEnter={() => !isMobile && interactionOn && setHovered(project.slug)} onLeave={() => !isMobile && interactionOn && setHovered(null)} />
          );
        })}
      </div>
    </div>
  );
}

function ProjectRow({ project, isFirst, isLast, isHovered, onEnter, onLeave }: any) {
  const inner = (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ borderTop: isFirst ? 'none' : '1px solid #ccc' }}>
      <div style={{ padding: '10px 0 6px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: '700', color: '#0a0a0a' }}>
            {project.title}
          </span>
          <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#999', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {project.year}
          </span>
        </div>
        <div style={{ marginTop: '1px' }}>
          <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#999' }}>
            {project.category}
          </span>
        </div>
      </div>
      {project.comingSoon ? (
        <div style={{ width: '100%', aspectRatio: '1719 / 594', background: '#e0ddd8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#aaa', fontStyle: 'italic' }}>Coming Soon</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateRows: isHovered ? '1fr' : '0fr', transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
          <div style={{ overflow: 'hidden' }}>
            <img src={`/images/${project.image}`} alt={project.title} style={{ width: '100%', aspectRatio: '1719 / 594', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
      )}
      <div style={{ borderBottom: '1px solid #ccc' }} />
    </div>
  );
  return project.comingSoon
    ? <div style={{ display: 'block' }}>{inner}</div>
    : <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>{inner}</Link>;
}
