'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { projects } from '@/lib/projects';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [interactionOn, setInteractionOn] = useState(true);

  return (
    <>
      <Nav />

      {/* Interaction toggle — fixed, right-aligned to content column */}
      <div style={{
        position: 'fixed',
        top: '64px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1100px',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 99,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
        }}>
          <span style={{
            fontSize: '11px',
            color: '#aaa',
            letterSpacing: '0.04em',
            userSelect: 'none',
          }}>
            interaction
          </span>
          <button
            onClick={() => setInteractionOn(v => !v)}
            style={{
              width: '28px',
              height: '16px',
              borderRadius: '8px',
              border: 'none',
              background: interactionOn ? '#0a0a0a' : '#ccc',
              position: 'relative',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute',
              top: '2px',
              left: interactionOn ? '14px' : '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
              display: 'block',
            }} />
          </button>
        </div>
      </div>

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
