'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

const TOTAL_FRAMES = 10;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function progress(scroll: number, start: number, end: number) {
  return clamp((scroll - start) / (end - start), 0, 1);
}
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Scroll zones ────────────────────────────────────────────────
// 0–200       static hold: minifig centered, arm down
// 200–700     arm raises (frames 1→10), minifig centered
// 700–1000    static hold: arm up, minifig centered (Frame 2)
// 1000–1350   minifig moves → bottom-right + zooms
// 1350–1600   static hold: minifig locked bottom-right (Frame 3)
// 1600–1900   text block 1 slides in from left
// 1900–2200   static hold: text 1 readable
// 2200–2450   text 1 fades out
// 2450–2750   text 2 fades in, nav appears
// 2750–3000   static hold: text 2 readable
// 3000–3300   project list fades in
// TOTAL HEIGHT: 5000px

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Arm animation
  const armProgress = progress(scrollY, 200, 700);
  const frameIndex = clamp(Math.floor(armProgress * TOTAL_FRAMES), 0, TOTAL_FRAMES - 1);
  const currentFrame = frameIndex + 1;

  // Minifig move to bottom-right
  const moveP = easeInOut(progress(scrollY, 1000, 1350));

  // Position: center (50vw, 50vh) → bottom-right
  const figLeft = 50 + (78 - 50) * moveP;   // vw
  const figTop  = 50 + (82 - 50) * moveP;   // vh
  // Size: 320px centered → 220px corner
  const figWidth = 320 + (220 - 320) * moveP;

  // Text block 1
  const text1SlideP = easeInOut(progress(scrollY, 1600, 1900));
  const text1FadeOutP = progress(scrollY, 2200, 2450);
  const text1Opacity = text1SlideP * (1 - text1FadeOutP);
  const text1X = (1 - text1SlideP) * -80; // slides in from left (px offset)

  // Text block 2
  const text2Opacity = easeInOut(progress(scrollY, 2450, 2750));
  const navOpacity = progress(scrollY, 2600, 2850);

  // Projects
  const projectsOpacity = easeInOut(progress(scrollY, 3000, 3300));

  return (
    <>
      <Nav />

      {/* Tall scroll container */}
      <div style={{ height: '5200px', position: 'relative' }}>

        {/* Sticky viewport — everything animated lives here */}
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
            left: `${figLeft}vw`,
            top: `${figTop}vh`,
            transform: 'translate(-50%, -50%)',
            width: `${figWidth}px`,
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <img
              src={`/images/arm-${currentFrame}.png`}
              alt="ACS mascot"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Text block 1 */}
          <div style={{
            position: 'absolute',
            left: '8vw',
            top: '50%',
            transform: `translateY(-50%) translateX(${text1X}px)`,
            width: 'min(420px, 40vw)',
            opacity: text1Opacity,
            pointerEvents: 'none',
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.75,
              color: '#0a0a0a',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>
              Hello! My name's Edward Centorame — a designer focused on both
              product and brand. I've been operating as{' '}
              <strong>All Conditions Studio</strong> since 2020, and I graduate
              from Toronto Metropolitan University's New Media BFA in May 2026.
            </p>
          </div>

          {/* Text block 2 */}
          <div style={{
            position: 'absolute',
            left: '8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(420px, 40vw)',
            opacity: text2Opacity,
            pointerEvents: text2Opacity > 0.5 ? 'auto' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.75,
              color: '#0a0a0a',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}>
              My focus is on how design shapes the world people live in. If
              you'd like to see some examples of my work, have a look through
              the selection below. Every project contains a world of context —
              if you'd like to go deeper on any of them, or connect on something
              new, feel free to{' '}
              <Link href="/contact" style={{ textDecoration: 'underline', pointerEvents: 'auto' }}>
                reach out
              </Link>
              . I'm friendly, let's chat.
            </p>

            {/* Nav below text 2 */}
            <div style={{
              marginTop: '32px',
              opacity: navOpacity,
              display: 'flex',
              gap: '28px',
            }}>
              {[
                { href: '#projects', label: 'projects' },
                { href: '/about', label: 'about' },
                { href: '/contact', label: 'contact' },
              ].map(({ href, label }) => (
                <a key={href} href={href} style={{
                  fontSize: '13px',
                  color: '#0a0a0a',
                  letterSpacing: '0.03em',
                  textDecoration: 'none',
                  pointerEvents: 'auto',
                }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Project list — sits in scroll flow after sticky section */}
        <div
          id="projects"
          style={{
            position: 'absolute',
            top: '3500px',
            left: 0,
            right: 0,
            opacity: projectsOpacity,
            paddingBottom: '120px',
          }}
        >
          {/* Interaction toggle */}
          <div style={{
            maxWidth: '1100px',
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
