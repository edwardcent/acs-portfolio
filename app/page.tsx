'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{x:number,y:number,a:number}[]>([]);
  const rafRef = useRef<number>(0);

  // Cursor trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      if (!interactionOn) return;
      trailRef.current.push({ x: e.clientX, y: e.clientY, a: 1 });
      if (trailRef.current.length > 28) trailRef.current.shift();
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (interactionOn) {
        const trail = trailRef.current;
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          const r = t * 5;
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,10,10,${t * 0.18})`;
          ctx.fill();
        }
      } else {
        trailRef.current = [];
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [interactionOn]);

  return (
    <>
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
      }} />
      <Nav interactionEnabled={interactionOn} onToggle={() => setInteractionOn(v => !v)} />
      <div style={{ paddingTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 40px 80px' }}>
          {projects.map((project, i) => {
            const isFirst = i === 0;
            const isLast = i === projects.length - 1;
            const isOpen = interactionOn ? hovered === project.slug : true;
            return (
              <ProjectRow
                key={project.slug}
                project={project}
                isFirst={isFirst}
                isLast={isLast}
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
        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
          gap: '12px',
          borderTop: isFirst ? 'none' : '1px solid #ccc',
          borderBottom: isLast ? '1px solid #ccc' : 'none',
        }}>
          <span style={{
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            fontWeight: '700',
            color: '#0a0a0a',
            whiteSpace: 'nowrap',
          }}>
            {project.title}
          </span>
          <span style={{
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            color: '#999',
          }}>
            {project.category}
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            color: '#999',
            whiteSpace: 'nowrap',
          }}>
            {project.year}
          </span>
        </div>

        {/* Image */}
        <div style={{
          display: 'grid',
          gridTemplateRows: isHovered ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <img
              src={`/images/${project.image}`}
              alt={project.title}
              style={{
                width: '100%',
                aspectRatio: '1719 / 594',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
