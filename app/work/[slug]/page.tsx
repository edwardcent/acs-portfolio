import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Edward Centorame` : 'Edward Centorame' };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;
  return (
    <div style={{ paddingTop: '48px' }}>
      <div style={{ padding: '48px 24px 32px', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{project.category}</p>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: '500', lineHeight: '1.2' }}>{project.title}</h1>
        </div>
        <span style={{ fontSize: '13px', color: '#888' }}>{project.year}</span>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555' }}>{project.description}</p>
      </div>
      <div style={{ borderTop: '1px solid #e8e8e8', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {prev ? <Link href={`/work/${prev.slug}`} style={{ padding: '32px 24px', borderRight: '1px solid #e8e8e8', display: 'block' }}><p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>← Previous</p><p style={{ fontSize: '14px', fontWeight: '500' }}>{prev.title}</p></Link> : <div />}
        {next ? <Link href={`/work/${next.slug}`} style={{ padding: '32px 24px', textAlign: 'right', display: 'block' }}><p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Next →</p><p style={{ fontSize: '14px', fontWeight: '500' }}>{next.title}</p></Link> : <div />}
      </div>
    </div>
  );
}
