'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

const TOTAL_FRAMES = 10;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function prog(scroll: number, start: number, end: number) {
  return clamp((scroll - start) / (end - start), 0, 1);
}
function ease(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ── Scroll zones ──────────────────────────────────────────────────
//   0– 300  static hold: minifig centered small, arm down
// 300– 800  arm raises (frames 1→10), minifig stays centered
// 800–1100  static hold: arm fully up, minifig centered   ← Frame 2
//1100–1500  minifig moves right + grows to fill right half ← → Frame 3
//1500–1800  static hold: minifig locked right, left empty
//1800–2100  text block 1 fades+slides in from left         ← Frame 4
//2100–2400  static hold: text 1 readable
//2400–2650  text 1 fades out
//2650–2950  text 2 fades in                                ← Frame 5/6
//2950–3200  static hold: text 2 readable
//3200–3500  project list scrolls into view                 ← Frame 7
// Total height: 5500px

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Arm animation ──
  const armP = prog(scrollY, 300, 800);
  const frame = clamp(Math.floor(armP * TOTAL_FRAMES), 0, TOTAL_FRAMES - 1) + 1;

  // ── Minifig position ──
  // Centered small → right side large (crops off bottom/right)
  const moveP = ease(prog(scrollY, 1100, 1500));

  // Start: centered horizontally, vertically centered in viewport
  // End: right-anchored, cropped — matches mockup frames 3-7
  // We use left% for horizontal center of the image
  const figCenterX_start = 50;   // vw — centered
  const figCenterX_end   = 88;   // vw — right side, allows cropping off right edge
  const figCenterX = figCenterX_start + (figCenterX_end - figCenterX_start) * moveP;

  // Vertical: centered → bottom-anchored (crops off bottom)
  const figBottom_start = 50;   // vh from top (transform handles centering)
  const figBottom_end   = 108;  // vh — pushes bottom below viewport
  const figCenterY = figBottom_start + (figBottom_end - figBottom_start) * moveP;

  // Size: moderate centered → large right
  const figH_start = 520;  // px height when centered
  const figH_end   = 900;  // px height when right/large — crops off edges
  const figH = figH_start + (figH_end - figH_start) * moveP;

  // ── Text block 1 ──
  const t1P = ease(prog(scrollY, 1800, 2100));
  const t1FadeOut = prog(scrollY, 2400, 2650);
  const t1Opacity = t1P * (1 - t1FadeOut);
  const t1X = (1 - t1P) * -50;

  // ── Text block 2 ──
  const t2Opacity = ease(prog(scrollY, 2650, 2950));

  // ── Projects ──
  const projOpacity = ease(prog(scrollY, 3200, 3500));

  return (
    <>
      <Nav />

      <div style={{ height: '5500px', position: 'relative' }}>

        {/* Sticky viewport */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>

          {/* LEGO minifig */}
          <div style={{
            position: 'absolute',
            left: `${figCenterX}vw`,
            top: `${figCenterY}vh`,
            transform: 'translate(-50%, -50%)',
            height: `${figH}px`,
            width: 'auto',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <img
              src={`/images/arm-${frame}.png`}
              alt="ACS mascot"
              style={{ height: '100%', width: 'auto', display: 'block' }}
            />
          </div>

          {/* Text block 1 */}
          <div style={{
            position: 'absolute',
            left: '10vw',
            top: '50%',
            transform: `translateY(-50%) translateX(${t1X}px)`,
            width: 'min(520px, 45vw)',
            opacity: t1Opacity,
            pointerEvents: 'none',
          }}>
            <p style={{
              fontSize: 'clamp(22px, 2.4vw, 34px)',
              fontWeight: '700',
              lineHeight: 1.25,
              color: '#0a0a0a',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>
              Hello, my name is Edward Centorame.{' '}
              <span style={{ fontWeight: '400' }}>
                I'm a passionate designer focusing on both product and brand. I have been operating as
                All Conditions Studio since 2020, and graduate from Toronto Metropolitan University's
                New Media (BFA) in May 2026!
              </span>
            </p>
          </div>

          {/* Text block 2 */}
          <div style={{
            position: 'absolute',
            left: '10vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(520px, 45vw)',
            opacity: t2Opacity,
            pointerEvents: t2Opacity > 0.5 ? 'auto' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(22px, 2.4vw, 34px)',
              fontWeight: '700',
              lineHeight: 1.25,
              color: '#0a0a0a',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>
              My focus is on how design shapes the world that people live in.{' '}
              <span style={{ fontWeight: '400' }}>
                Please look through this selection of my work below. Every project I work on feels
                like it contains a world of context, so if you'd like to discuss any of these projects
                in more depth, or if you'd like to discuss a new project, feel free to reach out to me{' '}
                <Link href="/contact" style={{ textDecoration: 'none', borderBottom: '2px solid #0a0a0a', pointerEvents: 'auto' }}>
                  (here)
                </Link>
                , I'm friendly, let's chat!
              </span>
            </p>
          </div>

        </div>

        {/* Project list */}
        <div
          id="projects"
          style={{
            position: 'absolute',
            top: '3700px',
            left: 0,
            right: 0,
            opacity: projOpacity,
            paddingBottom: '120px',
          }}
        >
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 40px 12px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.04em', userSelect: 'none' }}>
              interaction
            </span>
            <button
              onClick={() => setInteractionOn(v => !v)}
              style={{
                width: '28px', height: '16px', borderRadius: '8px', border: 'none',
                background: interactionOn ? '#0a0a0a' : '#ccc',
                position: 'relative', cursor: 'pointer', padding: 0,
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: '2px',
                left: interactionOn ? '14px' : '2px',
                width: '12px', height: '12px', borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s', display: 'block',
              }} />
            </button>
          </div>

          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px' }}>
            {projects.map((project, i) => {
              const isOpen = interactionOn ? hovered === project.slug : true;
              return (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  isFirst={i === 0}
                  isLast={i === projects.length - 1}
                  isHovered={isOpen}
                  onEnter={() => interactionOn && setHovered(project.slug)}
                  onLeave={() => interactionOn && setHovered(null)}
                />
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}

function ProjectRow({
  project, isFirst, isLast, isHovered, onEnter, onLeave,
}: {
  project: typeof projects[0];
  isFirst: boolean;
  isLast: boolean;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div style={{
          display: 'flex', alignItems: 'center', padding: '10px 0', gap: '12px',
          borderTop: isFirst ? 'none' : '1px solid #ccc',
          borderBottom: isLast ? '1px solid #ccc' : 'none',
        }}>
          <span style={{ fontSize: 'clamp(12px, 1.4vw, 15px)', fontWeight: '700', color: '#0a0a0a', whiteSpace: 'nowrap' }}>
            {project.title}
          </span>
          <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#999' }}>
            {project.category}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 'clamp(11px, 1.2vw, 13px)', color: '#999', whiteSpace: 'nowrap' }}>
            {project.year}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateRows: isHovered ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <img
              src={`/images/${project.image}`}
              alt={project.title}
              style={{ width: '100%', aspectRatio: '1719 / 594', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
