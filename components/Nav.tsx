'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid #e8e8e8',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <nav style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* home — always shows, scrolls to top of homepage */}
          <Link href="/" style={{
            fontSize: '13px',
            color: isHome ? '#0a0a0a' : '#999',
            fontWeight: '400',
          }}>
            home
          </Link>
          {/* projects — scrolls to #projects anchor on homepage */}
          <a href={isHome ? '#projects' : '/#projects'} style={{
            fontSize: '13px',
            color: '#999',
            fontWeight: '400',
            cursor: 'pointer',
          }}>
            projects
          </a>
          <Link href="/contact" style={{
            fontSize: '13px',
            color: pathname === '/contact' ? '#0a0a0a' : '#999',
            fontWeight: '400',
          }}>
            contact
          </Link>
        </div>

        <Link href="/" style={{ fontSize: '14px', fontWeight: '700', color: '#0a0a0a' }}>
          edward centorame
        </Link>
      </nav>
    </header>
  );
}
