'use client';
import Nav from '@/components/Nav';
import TableLighters from '@/components/projects/TableLighters';

export default function TableLightersPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: '48px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '32px 40px 0',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            borderBottom: '1px solid #ccc',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
              <h1 style={{ fontSize: '15px', fontWeight: '700', color: '#0a0a0a' }}>Table Lighter</h1>
              <span style={{ fontSize: '13px', color: '#999' }}>product design, packaging, branding</span>
            </div>
            <span style={{ fontSize: '13px', color: '#999' }}>2023–2026</span>
          </div>
        </div>
        <TableLighters />
      </div>
    </>
  );
}
