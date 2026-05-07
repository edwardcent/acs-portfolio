'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: '48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 40px 80px' }}>
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
    <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}>

        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
          gap: '12px',
          borderTop: '1px solid #ccc',
        }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0a0a0a', whiteSpace: 'nowrap' }}>
            {project.title}
          </span>
          <span style={{ fontSize: '13px', color: '#999' }}>
            {project.category}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#999', whiteSpace: 'nowrap' }}>
            {project.year}
          </span>
        </div>

        {/* Image — slides down, uses aspect ratio of actual images (1719x594) */}
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
