'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: '16px',
              letterSpacing: '0.06em',
              color: '#fff',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            HAF WERKS
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#b86043',
            }}
          >
            Admin Dashboard
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontFamily: 'monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#ef4444',
                marginBottom: '12px',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#b86043',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p
          style={{
            marginTop: '24px',
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'center',
          }}
        >
          Default: hafwerks2026 — set ADMIN_PASSWORD env to change
        </p>
      </div>
    </div>
  );
}
