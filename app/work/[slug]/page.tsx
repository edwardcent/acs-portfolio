import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import TableLighters from '@/components/projects/TableLighters';
import MakewayCatchall from '@/components/projects/MakewayCatchall';
import GratefulDeadWarner from '@/components/projects/GratefulDeadWarner';
import ParkFrequency from '@/components/projects/ParkFrequency';
import StudioSTimetron from '@/components/projects/StudioSTimetron';
import BmwGratefulDead from '@/components/projects/BmwGratefulDead';
import AcsMarks from '@/components/projects/AcsMarks';
import PortfolioWebsite from '@/components/projects/PortfolioWebsite';
import MoreGraphics from '@/components/projects/MoreGraphics';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
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

  const routable = projects.filter((p) => !p.comingSoon);
  const idx = routable.findIndex((p) => p.slug === slug);
  const prev = routable[idx - 1] ?? null;
  const next = routable[idx + 1] ?? null;

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
      {slug === 'project_more_graphics' ? (
        <MoreGraphics />
      ) : slug === 'project_portfolio' ? (
        <PortfolioWebsite />
      ) : slug === 'table-lighters' ? (
        <TableLighters />
      ) : slug === 'makeway-catchall' ? (
        <MakewayCatchall />
      ) : slug === 'grateful-dead-warner' ? (
        <GratefulDeadWarner />
      ) : slug === 'park-frequency' ? (
        <ParkFrequency />
      ) : slug === 'studio-s-timetron' ? (
        <StudioSTimetron />
      ) : slug === 'bmw-grateful-dead' ? (
        <BmwGratefulDead />
      ) : slug === 'acs-marks' ? (
        <AcsMarks />
      ) : (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>
          <p style={{ fontSize: '14px', color: '#999', fontStyle: 'italic' }}>Content coming soon.</p>
        </div>
      )}

      {/* Prev / Next nav */}
      <div className="project-nav-grid" style={{ borderTop: '1px solid #ccc', display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '80px' }}>
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="project-nav-item" style={{
            padding: '24px 40px', borderRight: '1px solid #ccc',
            display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
          }}>
            <div style={{ width: '72px', height: '54px', borderRadius: '8px', overflow: 'hidden', background: '#e0ddd8', flexShrink: 0 }}>
              <img src={`/images/${prev.image}`} alt={prev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>← Previous</p>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#0a0a0a', marginBottom: '2px' }}>{prev.title}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>{prev.category}</p>
            </div>
          </Link>
        ) : (
          <Link href="/" className="project-nav-item" style={{
            padding: '24px 40px', borderRight: '1px solid #ccc',
            display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
          }}>
            <div>
              <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>← All Projects</p>
            </div>
          </Link>
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="project-nav-item project-nav-next" style={{
            padding: '24px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', textDecoration: 'none',
          }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Next →</p>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#0a0a0a', marginBottom: '2px' }}>{next.title}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>{next.category}</p>
            </div>
            <div style={{ width: '72px', height: '54px', borderRadius: '8px', overflow: 'hidden', background: '#e0ddd8', flexShrink: 0 }}>
              <img src={`/images/${next.image}`} alt={next.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </Link>
        ) : (
          <Link href="/" className="project-nav-item project-nav-next" style={{
            padding: '24px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', textDecoration: 'none',
          }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>All Projects →</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
