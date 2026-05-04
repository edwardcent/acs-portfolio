import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: project ? `${project.title} — Edward Centorame` : 'Edward Centorame' };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === params.slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <div style={{ paddingTop: '48px' }}>
      {/* Project header */}
      <div style={{
        padding: '48px 24px 32px',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <p style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {project.category}
          </p>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: '500', lineHeight: '1.2', color: '#0a0a0a' }}>
            {project.title}
          </h1>
        </div>
        <span style={{ fontSize: '13px', color: '#888' }}>{project.year}</span>
      </div>

      {/* Content area — placeholder for Illustrator artboard sections */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {project.sections.length === 0 ? (
          <PlaceholderContent project={project} />
        ) : (
          project.sections.map((section, i) => (
            <div key={i}>{/* Section renderer goes here */}</div>
          ))
        )}
      </div>

      {/* Prev / Next navigation */}
      <div style={{
        borderTop: '1px solid #e8e8e8',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        marginTop: '80px',
      }}>
        {prev ? (
          <Link href={`/work/${prev.slug}`} style={{
            padding: '32px 24px',
            borderRight: '1px solid #e8e8e8',
            display: 'block',
          }}>
            <p style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              ← Previous
            </p>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#0a0a0a' }}>{prev.title}</p>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/work/${next.slug}`} style={{
            padding: '32px 24px',
            textAlign: 'right',
            display: 'block',
          }}>
            <p style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Next →
            </p>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#0a0a0a' }}>{next.title}</p>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

// Temporary placeholder layout until real content/images are wired in
function PlaceholderContent({ project }: { project: typeof projects[0] }) {
  return (
    <div style={{ padding: '64px 0' }}>
      {/* Hero image strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px',
        marginBottom: '80px',
      }}>
        {[0,1,2,3].map((n) => (
          <div key={n} style={{
            aspectRatio: '4/3',
            background: n % 2 === 0 ? '#e8e6e2' : '#d4d0ca',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.08em' }}>Image {n+1}</span>
          </div>
        ))}
      </div>

      {/* Text + image section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'start',
        marginBottom: '80px',
      }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}>
            Reference / Goal
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#333', marginBottom: '16px' }}>
            {project.description}
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555' }}>
            Project content coming soon — drop your Illustrator exports and copy here to populate each section.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2px',
        }}>
          {[0,1,2,3].map((n) => (
            <div key={n} style={{
              aspectRatio: '1',
              background: n % 2 === 0 ? '#dedad4' : '#cac6bf',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
