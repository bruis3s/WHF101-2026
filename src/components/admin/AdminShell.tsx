'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" stroke="currentColor" strokeWidth="1.2" />
        <line x1="4" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" />
        <line x1="4" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1" />
        <line x1="4" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    href: '/admin/archive',
    label: 'Archive',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="4" width="12" height="9" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="1" width="12" height="4" stroke="currentColor" strokeWidth="1.2" />
        <line x1="5" y1="7.5" x2="9" y2="7.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    href: '/studio',
    label: 'Sanity Studio ↗',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? '220px' : '56px',
          flexShrink: 0,
          backgroundColor: '#141414',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {/* Logo / Top */}
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '60px',
          }}
        >
          {sidebarOpen && (
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                HAF WERKS
              </div>
              <div
                style={{
                  fontSize: '9px',
                  color: '#b86043',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '2px',
                }}
              >
                Admin
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <line x1="0" y1="1" x2="14" y2="1" stroke="currentColor" strokeWidth="1.2" />
              <line x1="0" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="0" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  backgroundColor: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                  borderLeft: active ? '2px solid #b86043' : '2px solid transparent',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              borderRadius: '2px',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5 1H1V11H11V7M7 1H11V5M11 1L6 6" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            {sidebarOpen && 'View Site'}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              color: 'rgba(255,255,255,0.3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5 6H11M9 4L11 6L9 8" stroke="currentColor" strokeWidth="1.1" />
              <path d="M7 1H1V11H7" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowX: 'hidden', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
