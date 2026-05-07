'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid #e8e8e8',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Same max-width and padding as content */}
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
          {[
            { href: '/', label: 'projects' },
            { href: '/about', label: 'about' },
            { href: '/contact', label: 'contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '13px',
                color: pathname === href ? '#0a0a0a' : '#999',
                fontWeight: '400',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link href="/" style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#0a0a0a',
        }}>
          edward centorame
        </Link>
      </nav>
    </header>
  );
}
