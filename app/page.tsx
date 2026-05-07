'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: '64px', maxWidth: '1100px', margin: '0 auto', padding: '64px 40px 80px' }}>
      {projects.map((project) => (
        <ProjectRow
          key={project.slug}
          project={project}
          isHovered={hovered === project.slug}
          onEnter={() => setHovered(project.slug)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
}

function ProjectRow({
  project, isHovered, onEnter, onLeave,
}: {
  project: typeof projects[0];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ borderBottom: '1px solid #ccc' }}
    >
      {/* Title row — always visible, never moves */}
      <Link href={`/work/${project.slug}`} style={{ display: 'block' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
          gap: '12px',
        }}>
          <span style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#0a0a0a',
            whiteSpace: 'nowrap',
          }}>
            {project.title}
          </span>
          <span style={{
            fontSize: '13px',
            color: '#999',
            fontWeight: '400',
          }}>
            {project.category}
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '13px',
            color: '#999',
            fontWeight: '400',
            whiteSpace: 'nowrap',
          }}>
            {project.year}
          </span>
        </div>
      </Link>

      {/* Image — expands below the title row on hover */}
      <div style={{
        overflow: 'hidden',
        maxHeight: isHovered ? '420px' : '0px',
        transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ paddingBottom: '16px' }}>
          <img
            src={`/images/${project.image}`}
            alt={project.title}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
              maxHeight: '400px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
