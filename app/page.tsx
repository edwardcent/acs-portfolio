'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

const TOTAL_FRAMES = 10;

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Phase 1: arm raise (scroll 0 → 500)
  const armProgress = Math.min(Math.max(scrollY / 500, 0), 1);
  const frameIndex = Math.min(Math.floor(armProgress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
  const currentFrame = frameIndex + 1;

  // Phase 2: minifig moves center → right (scroll 400 → 750)
  const moveProgress = easeInOut(Math.min(Math.max((scrollY - 400) / 350, 0), 1));

  // Minifig position: centered (50vw) → right column (72vw)
  const figLeft = 50 + (72 - 50) * moveProgress;
  // Minifig size: 340px → 260px
  const figWidth = 340 + (260 - 340) * moveProgress;

  // Phase 3: text block 1 fades+slides in (scroll 550 → 820)
  const text1Progress = Math.min(Math.max((scrollY - 550) / 270, 0), 1);
  const text1SlideX = (1 - text1Progress) * -60;

  // Phase 4: text 1 fades out, text 2 fades in (scroll 1000 → 1250)
  const text1FadeOut = 1 - Math.min(Math.max((scrollY - 1000) / 220, 0), 1);
  const text2Opacity = Math.min(Math.max((scrollY - 1050) / 250, 0), 1);
  const navOpacity = Math.min(Math.max((scrollY - 1150) / 200, 0), 1);

  // Phase 5: project list fades in (scroll 1500 → 1750)
  const projectsOpacity = Math.min(Math.max((scrollY - 1500) / 250, 0), 1);

  return (
    <>
      <Nav />

      {/* Tall scroll container */}
      <div style={{ height: '4000px', position: 'relative' }}>

        {/* Sticky viewport */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}>

          {/* LEGO minifig */}
          <div style={{
            position: 'absolute',
            left: `${figLeft}%`,
            top: '50%',
            transform: 'translate(-50%, -52%)',
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
            left: 'calc(50% - 200px)',
            top: '50%',
            transform: `translate(-50%, -50%) translateX(${text1SlideX}px)`,
            width: 'min(400px, 38vw)',
            opacity: text1Progress * text1FadeOut,
            pointerEvents: 'none',
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.7,
              color: '#0a0a0a',
            }}>
              Hello! My name's Edward Centorame — a designer focused on both product and brand.
              I've been operating as <strong>All Conditions Studio</strong> since 2020, and I graduate
              from Toronto Metropolitan University's New Media BFA in May 2026.
            </p>
          </div>

          {/* Text block 2 */}
          <div style={{
            position: 'absolute',
            left: 'calc(50% - 200px)',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(400px, 38vw)',
            opacity: text2Opacity,
            pointerEvents: text2Opacity > 0.5 ? 'auto' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.7,
              color: '#0a0a0a',
            }}>
              My focus is on how design shapes the world people live in. If you'd like to see some
              examples of my work, have a look through the selection below. Every project contains
              a world of context — if you'd like to go deeper on any of them, or connect on something
              new, feel free to{' '}
              <Link href="/contact" style={{ textDecoration: 'underline' }}>reach out</Link>.
              I'm friendly, let's chat.
            </p>

            {/* Inline nav */}
            <div style={{
              marginTop: '28px',
              opacity: navOpacity,
              display: 'flex',
              gap: '24px',
            }}>
              {[
                { href: '#projects', label: 'projects' },
                { href: '/about', label: 'about' },
                { href: '/contact', label: 'contact' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontSize: '13px',
                    color: '#0a0a0a',
                    letterSpacing: '0.03em',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Project list — positioned in the scroll flow after sticky section ends */}
        <div
          id="projects"
          style={{
            position: 'absolute',
            top: '1900px',
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
