'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  interactionEnabled: boolean;
  onToggle: () => void;
}

export default function Nav({ interactionEnabled, onToggle }: NavProps) {
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
            <Link key={href} href={href} style={{
              fontSize: '13px',
              color: pathname === href ? '#0a0a0a' : '#999',
              fontWeight: '400',
            }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Interaction toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.04em' }}>
              interaction
            </span>
            <button
              onClick={onToggle}
              style={{
                width: '28px',
                height: '16px',
                borderRadius: '8px',
                border: 'none',
                background: interactionEnabled ? '#0a0a0a' : '#ccc',
                position: 'relative',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: interactionEnabled ? '14px' : '2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          <Link href="/" style={{ fontSize: '14px', fontWeight: '700', color: '#0a0a0a' }}>
            edward centorame
          </Link>
        </div>
      </nav>
    </header>
  );
}
