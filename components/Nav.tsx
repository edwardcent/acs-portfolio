'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'All' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #e8e8e8',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
    }}>
      <nav style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left: nav links */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: '13px',
                  color: active ? '#0a0a0a' : '#888',
                  fontWeight: active ? '500' : '400',
                  letterSpacing: '0.01em',
                  transition: 'color 0.15s',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Center: name */}
        <Link
          href="/"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.02em',
            color: '#0a0a0a',
          }}
        >
          edward centorame
        </Link>
      </nav>
    </header>
  );
}
