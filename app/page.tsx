'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: '48px' }}>
      {projects.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={i}
          isHovered={hovered === project.slug}
          anyHovered={hovered !== null}
          onEnter={() => setHovered(project.slug)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
}

function ProjectRow({
  project, index, isHovered, anyHovered, onEnter, onLeave,
}: {
  project: typeof projects[0];
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const bgColors = ['#d4d0cb','#c8c4be','#dedad4','#c0bbb4','#e0dcd6','#cac6bf','#d8d4ce','#bfbbb4'];
  const bg = bgColors[index % bgColors.length];

  return (
    <Link href={`/work/${project.slug}`} style={{ display: 'block' }}>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ borderBottom: '1px solid #e8e8e8', overflow: 'hidden' }}
      >
        {/* Collapsed title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: isHovered ? '0px' : '56px',
          opacity: isHovered ? 0 : anyHovered ? 0.3 : 1,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
          pointerEvents: isHovered ? 'none' : 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#0a0a0a', letterSpacing: '0.01em' }}>
              {project.title}
            </span>
            <span style={{ fontSize: '12px', color: '#aaa' }}>{project.category}</span>
          </div>
          <span style={{ fontSize: '12px', color: '#aaa' }}>{project.year}</span>
        </div>

        {/* Expanded card */}
        <div style={{
          height: isHovered ? '400px' : '0px',
          opacity: isHovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '400px' }}>
            {/* Image side */}
            <div style={{
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Image
              </span>
            </div>
            {/* Info side */}
            <div style={{
              background: '#f7f6f4',
              borderLeft: '1px solid #e8e8e8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px',
            }}>
              <div>
                <p style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {project.category}
                </p>
                <h2 style={{ fontSize: '22px', fontWeight: '500', lineHeight: '1.25', color: '#0a0a0a', marginBottom: '14px' }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.65' }}>
                  {project.description}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>{project.year}</span>
                <span style={{ fontSize: '12px', color: '#0a0a0a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View project
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
