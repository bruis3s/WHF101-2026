'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/werks', label: 'Werks' },
  { href: '/information', label: 'Information' },
  { href: '/archive', label: 'Archive' },
];

interface NavbarProps {
  sanityModalOpen?: boolean;
  onToggleSanityModal?: () => void;
}

export function Navbar({ sanityModalOpen, onToggleSanityModal }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="hairline-bottom"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: scrolled
            ? 'rgba(248, 247, 244, 0.96)'
            : 'rgba(248, 247, 244, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'background-color 0.2s ease',
        }}
      >
        <div
          className="page-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Studio Identity */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: '15px',
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
              }}
            >
              HAF WERKS
            </span>
            <span
              className="tech-label"
              style={{ fontSize: '9px', color: 'var(--accent-terracotta)' }}
            >
              STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    borderBottom: active ? '1px solid var(--text-primary)' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/studio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
            >
              CMS ↗
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  backgroundColor: 'var(--text-primary)',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    menuOpen && i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : menuOpen && i === 2
                      ? 'translateY(-6.5px) rotate(-45deg)'
                      : menuOpen && i === 1
                      ? 'scaleX(0)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: 'rgba(248,247,244,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-hairline)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display: 'none',
        }}
      >
        <div style={{ padding: '24px var(--padding-canvas)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/studio"
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '8px 16px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              backgroundColor: 'var(--text-primary)',
              color: '#fff',
              borderRadius: '2px',
              textDecoration: 'none',
            }}
          >
            CMS ↗
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </>
  );
}
