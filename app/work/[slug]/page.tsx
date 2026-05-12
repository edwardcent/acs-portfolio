import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import TableLighters from '@/components/projects/TableLighters';

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
  if (slug === 'table-lighters') {
    const { default: TableLightersPage } = await import('@/app/work/table-lighters/page');
    return <TableLightersPage />;
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <div style={{ paddingTop: '48px' }}>
      <Nav />

      {/* Project header */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '32px 40px 0',
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          paddingBottom: '12px', borderBottom: '1px solid #ccc', marginBottom: '40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
            <h1 style={{ fontSize: '15px', fontWeight: '700', color: '#0a0a0a' }}>{project.title}</h1>
            <span style={{ fontSize: '13px', color: '#999' }}>{project.category}</span>
          </div>
          <span style={{ fontSize: '13px', color: '#999' }}>{project.year}</span>
        </div>
      </div>

      {/* Project content */}
      {slug === 'table-lighters' ? (
        <TableLighters />
      ) : (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>
          <p style={{ fontSize: '14px', color: '#999', fontStyle: 'italic' }}>Content coming soon.</p>
        </div>
      )}

      {/* Prev / Next */}
      <div style={{ borderTop: '1px solid #ccc', display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '80px' }}>
        {prev ? (
          <Link href={`/work/${prev.slug}`} style={{ padding: '28px 40px', borderRight: '1px solid #ccc', display: 'block', textDecoration: 'none' }}>
            <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>← Previous</p>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0a0a0a' }}>{prev.title}</p>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/work/${next.slug}`} style={{ padding: '28px 40px', textAlign: 'right', display: 'block', textDecoration: 'none' }}>
            <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Next →</p>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0a0a0a' }}>{next.title}</p>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
