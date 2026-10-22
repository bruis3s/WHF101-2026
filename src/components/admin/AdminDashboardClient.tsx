'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  slug?: string;
  code?: string;
  projectType?: string;
  year?: string;
  show?: boolean;
  _updatedAt?: string;
}

interface Stats {
  total: number;
  visible: number;
  hidden: number;
}

export function AdminDashboardClient({
  projects,
  stats,
}: {
  projects: Project[];
  stats: Stats;
}) {
  const recent = projects.slice(0, 5);

  return (
    <div style={{ padding: '32px 40px', color: '#fff' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#b86043',
            marginBottom: '8px',
          }}
        >
          Overview
        </div>
        <h1
          style={{
            fontWeight: 700,
            fontSize: '28px',
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          marginBottom: '40px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {[
          { label: 'Total Projects', value: stats.total, color: '#fff' },
          { label: 'Published', value: stats.visible, color: '#22c55e' },
          { label: 'Hidden', value: stats.hidden, color: '#f59e0b' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              padding: '28px 24px',
              backgroundColor: '#1a1a1a',
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color,
                marginBottom: '8px',
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '16px',
          }}
        >
          Quick Actions
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/admin/projects/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#b86043',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '3px',
              transition: 'opacity 0.15s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            New Project
          </Link>
          <Link
            href="/admin/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '3px',
              transition: 'opacity 0.15s',
            }}
          >
            Manage Projects
          </Link>
          <Link
            href="/admin/archive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '3px',
              transition: 'opacity 0.15s',
            }}
          >
            Manage Archive
          </Link>
          <Link
            href="/studio"
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              border: '1px solid rgba(255,255,255,0.12)',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '3px',
              transition: 'opacity 0.15s',
            }}
          >
            Sanity Studio ↗
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      {recent.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '16px',
            }}
          >
            Recent Projects
          </div>
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {recent.map((project, i) => (
              <div
                key={project._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  borderBottom:
                    i < recent.length - 1
                      ? '1px solid rgba(255,255,255,0.04)'
                      : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor:
                        project.show !== false ? '#22c55e' : '#f59e0b',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>
                    {project.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {project.code}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {project.year}
                  </span>
                  <Link
                    href={`/admin/projects/${project._id}`}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      borderRadius: '2px',
                      transition: 'background 0.15s',
                    }}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
