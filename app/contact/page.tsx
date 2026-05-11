'use client';
import Nav from '@/components/Nav';

export default function Contact() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <p style={{ fontSize: '14px', lineHeight: '1.75', marginBottom: '8px' }}>
          I'm available for full-time roles, contract work, and commissions.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', marginBottom: '32px' }}>
          I'm also available to talk shop in general!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '14px' }}>
            <span style={{ color: '#999' }}>email: </span>
            <a href="mailto:edwardcentorame@gmail.com" style={{ borderBottom: '1px solid #0a0a0a', paddingBottom: '1px' }}>
              edwardcentorame@gmail.com
            </a>
          </p>
          <p style={{ fontSize: '14px' }}>
            <span style={{ color: '#999' }}>more work: </span>
            <a href="https://www.allconditions.studio" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid #0a0a0a', paddingBottom: '1px' }}>
              www.allconditions.studio
            </a>
          </p>
          <p style={{ fontSize: '14px' }}>
            <span style={{ color: '#999' }}>instagram: </span>
            @edwardcentorame @allconditions.studio
          </p>
        </div>
      </div>
    </>
  );
}
