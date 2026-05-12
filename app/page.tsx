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
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('resize', check); window.removeEventListener('scroll', onScroll); };
  }, []);

  return isMobile
    ? <MobileHome scrollY={scrollY} hovered={hovered} setHovered={setHovered} interactionOn={interactionOn} setInteractionOn={setInteractionOn} />
    : <DesktopHome scrollY={scrollY} hovered={hovered} setHovered={setHovered} interactionOn={interactionOn} setInteractionOn={setInteractionOn} />;
}

// ─────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────
//    0–  600  static: arm down
//  600– 1800  arm raises
// 1800– 2800  HOLD: arm up
// 2800– 3400  minifig moves right
// 3400– 4400  HOLD: minifig right
// 4400– 5000  text 1 slides in
// 5000– 6000  HOLD: text 1
// 6000– 6400  text 1 fades out
// 6400– 7000  text 2 fades in
// 7000– 8000  HOLD: text 2
// 8000– 8600  text 2 fades out → project list fades in
// 8600– 9600  HOLD: project list (minifig stays right)

function DesktopHome({ scrollY, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const armP  = prog(scrollY, 600, 1800);
  const frame = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;
  const moveP = ease(prog(scrollY, 2800, 3400));
  const figTX = moveP * 25;
  const figTY = moveP * 5;
  const t1P      = ease(prog(scrollY, 4400, 5000));
  const t1Out    = prog(scrollY, 6000, 6400);
  const t1Opacity = t1P * (1 - t1Out);
  const t1X      = (1 - t1P) * -60;
  const t2In     = ease(prog(scrollY, 6400, 7000));
  const transP   = ease(prog(scrollY, 8000, 8600)); // 0→1 drives both text2 out and proj in
  const t2Opacity = t2In * (1 - transP);
  const t2SlideY  = transP * -160; // px — text slides up as it fades
  const projOpacity = transP;
  const projSlideY  = (1 - transP) * 160; // px — list starts below, slides up into place

  return (
    <>
      <Nav />
      <div style={{ height: '10500px', position: 'relative' }}>
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
  return (
    <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ borderTop: isFirst ? 'none' : '1px solid #ccc' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', padding: '8px 0 4px' }}>
          <span style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: '700', color: '#0a0a0a' }}>{project.title}</span>
          <span style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#999', whiteSpace: 'nowrap', flexShrink: 0 }}>{project.year}</span>
        </div>
        <div style={{ paddingBottom: '4px' }}>
          <span style={{ fontSize: 'clamp(10px, 1.1vw, 12px)', color: '#999' }}>{project.category}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: isHovered ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
          <div style={{ overflow: 'hidden' }}>
            <img src={`/images/${project.image}`} alt={project.title} style={{ width: '100%', aspectRatio: '1719 / 594', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #ccc' }} />
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// MOBILE
// ─────────────────────────────────────────────
// Scroll zones:
//    0–  300  static: minifig centered, arm down
//  300–  700  arm raises
//  700– 1000  static hold: arm up, minifig centered
// 1000– 1400  minifig zooms larger (stays centered)
// 1400– 1800  static hold: minifig large
// 1800– 2100  text 1 fades in above minifig
// 2100– 3100  static hold: text 1 readable
// 3100– 3400  text 1 fades out → text 2 fades in
// 3400– 4400  static hold: text 2 readable
// then project list below

function MobileHome({ scrollY, hovered, setHovered, interactionOn, setInteractionOn }: any) {
  const armP  = prog(scrollY, 300, 700);
  const frame = clamp(Math.round(armP * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1) + 1;

  // Phase 1: arm raises, minifig centered (0–700)
  // Phase 2: static hold (700–1100)
  // Phase 3: minifig moves to bottom half — translate down only, NO size change (1100–1500)
  const moveP = ease(prog(scrollY, 1300, 1900));

  // Text phases
  const t1P      = ease(prog(scrollY, 2200, 2600));
  const t1Out    = prog(scrollY, 4200, 4600);
  const t1Opacity = t1P * (1 - t1Out);
  const t2Opacity = ease(prog(scrollY, 4200, 4600));

  // Minifig:
  // Phase 1: centered (top:50%, transform: translate(-50%,-50%))
  // Phase 3: shifted down so it sits in bottom 55% of screen
  // We move the center point from 50vh to 72vh — pure translateY, no size change
  const figCenterY = 50 + (88 - 50) * moveP; // vh — crops bottom half off screen when text shows

  return (
    <>
      <Nav />
      <div style={{ height: '6000px', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Minifig — anchored bottom-right, crops off both edges */}
          <div style={{
            position: 'absolute',
            right: '-8vw',
            bottom: '-35vh',
            width: '85vw',
            flexShrink: 0,
            pointerEvents: 'none',
            zIndex: 5,
          }}>
            <img src={`/images/arm-${frame}.png`} alt="ACS mascot" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Text zone — strictly top 42vh, overflow hidden so it can never reach minifig */}
          <div style={{
            position: 'absolute', left: '6vw', right: '6vw',
            top: '14vh', height: '32vh', zIndex: 20, background: '#fff',
            overflow: 'hidden',
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
  return (
    <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      {/* Border wraps the entire row including expanded image */}
      <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{
        borderTop: isFirst ? 'none' : '1px solid #ccc',
      }}>
        {/* Header: title, category, year */}
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
        {/* Expandable image */}
        <div style={{ display: 'grid', gridTemplateRows: isHovered ? '1fr' : '0fr', transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
          <div style={{ overflow: 'hidden' }}>
            <img src={`/images/${project.image}`} alt={project.title} style={{ width: '100%', aspectRatio: '1719 / 594', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
        {/* Bottom border always travels with content */}
        <div style={{ borderBottom: '1px solid #ccc' }} />
      </div>
    </Link>
  );
}
