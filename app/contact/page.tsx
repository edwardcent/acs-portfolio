'use client';
import Nav from '@/components/Nav';

export default function Contact() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '32px' }}>Contact</p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#333', marginBottom: '20px' }}>
          Available for full-time roles, contract work, and commissions.
        </p>
        <a href="mailto:edwardcentorame@gmail.com" style={{ fontSize: '14px', color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: '1px' }}>
          edwardcentorame@gmail.com
        </a>
        <p style={{ fontSize: '14px', color: '#888', marginTop: '32px' }}>Toronto, Ontario</p>
      </div>
    </>
  );
}
