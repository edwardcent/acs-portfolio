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
//   0– 300  static: minifig centered, arm down
// 300– 800  arm raises
// 800–1100  static: arm up, centered        ← Frame 2 hold
//1100–1500  minifig moves right + grows large, crops off edges
//1500–1800  static: minifig locked right    ← Frame 3 hold
//1800–2100  text 1 slides in from left
//2100–2400  static: text 1 readable
//2400–2650  text 1 fades out
//2650–2950  text 2 fades in
//2950–3300  static: text 2 readable
//3300       sticky section ends — page scrolls normally into project list

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Arm
  const armP = prog(scrollY, 300, 800);
  const frame = clamp(Math.floor(armP * TOTAL_FRAMES), 0, TOTAL_FRAMES - 1) + 1;

  // Minifig move: centered → right, small → large+cropped
  const moveP = ease(prog(scrollY, 1100, 1500));

  // Horizontal: image center goes from 50vw → 105vw (crops off right)
  const figCX = 50 + (105 - 50) * moveP;
  // Vertical: image center goes from 50vh → 110vh (crops off bottom)
  const figCY = 50 + (110 - 50) * moveP;
  // Height: 480px → 1100px
  const figH = 480 + (1100 - 480) * moveP;

  // Text 1
  const t1P = ease(prog(scrollY, 1800, 2100));
  const t1Out = prog(scrollY, 2400, 2650);
  const t1Opacity = t1P * (1 - t1Out);
  const t1X = (1 - t1P) * -60;

  // Text 2
  const t2Opacity = ease(prog(scrollY, 2650, 2950));

  return (
    <>
      <Nav />

      {/* Sticky scroll section — 3300px of scroll drive the animation */}
      <div style={{ height: '3300px', position: 'relative' }}>
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
            left: `${figCX}vw`,
            top: `${figCY}vh`,
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
            width: 'min(500px, 44vw)',
            opacity: t1Opacity,
            pointerEvents: 'none',
          }}>
            <p style={{
              fontSize: 'clamp(20px, 2.2vw, 32px)',
              fontWeight: '700',
              lineHeight: 1.3,
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
            width: 'min(500px, 44vw)',
            opacity: t2Opacity,
            pointerEvents: t2Opacity > 0.5 ? 'auto' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(20px, 2.2vw, 32px)',
              fontWeight: '700',
              lineHeight: 1.3,
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
      </div>

      {/* ── Project list — static, physically below sticky section ── */}
      <div id="projects" style={{ background: '#fff', paddingBottom: '120px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 40px 12px',
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

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
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
