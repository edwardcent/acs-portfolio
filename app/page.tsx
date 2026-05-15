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
// DESKTOP TUNER
// ─────────────────────────────────────────────

const DEFAULT_CFG = {
  totalHeight: 5675,
  armStart:     200, armEnd:    1000,
  moveStart:   1500, moveEnd:   1900,
  t1Start:     1700, t1End:     2000,
  t1OutStart:  2500, t1OutEnd:  2600,
  t2Start:     2575, t2End:     2875,
  transStart:  3375, transEnd:  3675,
};
type Cfg = typeof DEFAULT_CFG;

function Tuner({ cfg, setCfg }: { cfg: Cfg; setCfg: (c: Cfg) => void }) {
  const [open, setOpen] = useState(true);
  const set = (k: keyof Cfg, v: number) => setCfg({ ...cfg, [k]: v });
  const field = (label: string, k: keyof Cfg) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
      <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap' }}>{label}</span>
      <input type="number" value={cfg[k]} step={100}
        onChange={e => set(k, Number(e.target.value))}
        style={{ width: '72px', fontSize: '11px', padding: '2px 4px', border: '1px solid #ddd', borderRadius: '3px', textAlign: 'right' }} />
    </div>
  );
  const copyValues = () => {
    const out = Object.entries(cfg).map(([k, v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(out).then(() => alert('Copied!'));
  };

  return (
    <div style={{
      position: 'fixed', top: '60px', right: '12px', zIndex: 9999,
      background: '#fff', border: '1px solid #ddd', borderRadius: '8px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)', width: '220px',
      fontFamily: 'monospace',
    }}>
      <div onClick={() => setOpen(o => !o)} style={{
        padding: '8px 12px', cursor: 'pointer', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        borderBottom: open ? '1px solid #eee' : 'none',
      }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0a0a0a' }}>⚙ Keyframe Tuner</span>
        <span style={{ fontSize: '11px', color: '#999' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '10px 12px' }}>
          {field('totalHeight', 'totalHeight')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          {field('armStart', 'armStart')}
          {field('armEnd', 'armEnd')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          {field('moveStart', 'moveStart')}
          {field('moveEnd', 'moveEnd')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          {field('t1Start', 't1Start')}
          {field('t1End', 't1End')}
          {field('t1OutStart', 't1OutStart')}
          {field('t1OutEnd', 't1OutEnd')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          {field('t2Start', 't2Start')}
          {field('t2End', 't2End')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          {field('transStart', 'transStart')}
          {field('transEnd', 'transEnd')}
          <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={copyValues} style={{ flex: 1, fontSize: '11px', padding: '4px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', background: '#f5f5f5' }}>Copy values</button>
            <button onClick={() => setCfg(DEFAULT_CFG)} style={{ flex: 1, fontSize: '11px', padding: '4px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', background: '#f5f5f5' }}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────

function DesktopHome({ scrollY, winW, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const [cfg, setCfg] = useState<Cfg>(DEFAULT_CFG);

  const armP  = prog(scrollY, cfg.armStart, cfg.armEnd);
  const frame = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;
  const moveP = ease(prog(scrollY, cfg.moveStart, cfg.moveEnd));
  const figTX = moveP * Math.min(25, 22000 / Math.max(winW, 1));
  const figTY = moveP * 5;
  const t1P      = ease(prog(scrollY, cfg.t1Start, cfg.t1End));
  const t1Out    = prog(scrollY, cfg.t1OutStart, cfg.t1OutEnd);
  const t1Opacity = t1P * (1 - t1Out);
  const t1X      = (1 - t1P) * -60;
  const t2In     = ease(prog(scrollY, cfg.t2Start, cfg.t2End));
  const transP   = ease(prog(scrollY, cfg.transStart, cfg.transEnd));
  const t2Opacity = t2In * (1 - transP);
  const t2SlideY  = transP * -160;
  const projOpacity = transP;
  const projSlideY  = (1 - transP) * 160;

  return (
    <>
      <Nav />
      <Tuner cfg={cfg} setCfg={setCfg} />
      <div style={{ height: `${cfg.totalHeight}px`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Minifig */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(calc(-50% + ${figTX}vw), calc(-50% + ${figTY}vh))`,
            height: '75vh', width: 'auto', pointerEvents: 'none', zIndex: 10,
          }}>
            <img src={`/images/arm-${frame}.png`} alt="ACS mascot" style={{ height: '100%', width: 'auto', display: 'block' }} />
          </div>

          {/* Text 1 */}
          <div style={{ position: 'absolute', left: '10vw', top: '50%', transform: `translateY(-50%) translateX(${t1X}px)`, width: 'min(420px, 38vw)', opacity: t1Opacity, pointerEvents: 'none' }}>
            <p style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
              Hello, my name is Edward Centorame.{' '}
              <span style={{ fontWeight: '400' }}>I'm a designer and storyteller focused on product and brand. I've been operating as All Conditions Studio since 2020, and I'm graduating from Toronto Metropolitan University's The Creative School — where I studied the intersection of art and technology.</span>
            </p>
          </div>

          {/* Text 2 */}
          <div style={{ position: 'absolute', left: '10vw', top: '50%', transform: `translateY(calc(-50% + ${t2SlideY}px))`, width: 'min(420px, 38vw)', opacity: t2Opacity, pointerEvents: t2Opacity > 0.1 ? 'auto' : 'none' }}>
            <p style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
              I am obsessed with how design shapes the world we live in.{' '}
              <span style={{ fontWeight: '400' }}>Below this you'll find some examples of my work for you to look through. Each project I work on contains a world of context and problem solving, if you'd like to discuss any of these projects in more depth or discuss a new project, feel free to reach out to me{' '}
                <Link href="/contact" style={{ textDecoration: 'none', borderBottom: '2px solid #0a0a0a', fontWeight: '700', pointerEvents: 'auto' }}>here</Link>, I'm friendly, let's chat!
              </span>
            </p>
          </div>

          {/* Project list — fades in over left column, minifig stays right */}
          <div style={{
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
// 1760– 2000  text 1 fades in
// 2000– 2400  STATIC HOLD: text 1 readable
// 2400– 2560  text 1 fades out
// 2560– 2800  text 2 fades in
// 2800– 3200  STATIC HOLD: text 2 readable
// 3200+       project list below  (container height: 3443px)

function MobileHome({ scrollY, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const armP  = prog(scrollY, 240, 720);
  const frame = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;

  const moveP = ease(prog(scrollY, 1120, 1360));

  const t1P      = ease(prog(scrollY, 1760, 2000));
  const t1Out    = prog(scrollY, 2400, 2560);
  const t1Opacity = t1P * (1 - t1Out);
  const t2Opacity = ease(prog(scrollY, 2560, 2800));

  // Minifig: centered → bottom quarter crops off
  const figCenterY = 50 + (81 - 50) * moveP; // vh

  return (
    <>
      <Nav />
      <div style={{ height: 'calc(3400px + 100vh)', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Minifig — centered then moves down, bottom quarter crops */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: `${figCenterY}vh`,
            transform: 'translate(-50%, -50%)',
            width: '85vw',
            flexShrink: 0,
            pointerEvents: 'none',
            zIndex: 5,
          }}>
            <img src={`/images/arm-${frame}.png`} alt="ACS mascot" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Text zone — auto-height so it doesn't cover more of the minifig than the text needs */}
          <div style={{
            position: 'absolute', left: '6vw', right: '6vw',
            top: '10vh', zIndex: 20,
            background: `rgba(255,255,255,${Math.max(t1Opacity, t2Opacity)})`,
          }}>
            {/* Text 1 */}
            <div style={{ position: 'absolute', inset: 0, opacity: t1Opacity, pointerEvents: 'none' }}>
              <p style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
                Hello, my name is Edward Centorame.{' '}
                <span style={{ fontWeight: '400' }}>I'm a designer and storyteller focused on product and brand. I've been operating as All Conditions Studio since 2020, and I'm graduating from Toronto Metropolitan University's The Creative School — where I studied the intersection of art and technology.</span>
              </p>
            </div>

            {/* Text 2 */}
            <div style={{ position: 'absolute', inset: 0, opacity: t2Opacity, pointerEvents: t2Opacity > 0.5 ? 'auto' : 'none' }}>
              <p style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '700', lineHeight: 1.3, color: '#0a0a0a' }}>
                I am obsessed with how design shapes the world we live in.{' '}
                <span style={{ fontWeight: '400' }}>Below this you'll find some examples of my work. Each project I work on contains a world of context and problem solving, if you'd like to discuss any of these projects in more depth or discuss a new project, feel free to reach out{' '}
                  <Link href="/contact" style={{ textDecoration: 'none', borderBottom: '2px solid #0a0a0a', fontWeight: '700', pointerEvents: 'auto' }}>here</Link>, I'm friendly, let's chat!
                </span>
              </p>
            </div>
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
