'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHome) {
      sessionStorage.setItem('scrollTo', 'projects');
      router.push('/');
      return;
    }
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 8600, behavior: 'smooth' });
    }
  };

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
          <a href="/" onClick={handleHome} style={{
            fontSize: '13px',
            color: isHome ? '#0a0a0a' : '#999',
            fontWeight: '400',
            cursor: 'pointer',
            textDecoration: 'none',
          }}>
            home
          </a>
          <a href="/#projects" onClick={handleProjects} style={{
            fontSize: '13px',
            color: '#999',
            fontWeight: '400',
            cursor: 'pointer',
            textDecoration: 'none',
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

        <a href="/" onClick={handleHome} style={{
          fontSize: '14px', fontWeight: '700', color: '#0a0a0a',
          textDecoration: 'none', cursor: 'pointer',
        }}>
          edward centorame
        </a>
      </nav>
    </header>
  );
}
