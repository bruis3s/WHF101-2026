'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
  slug?: string;
  code?: string;
  projectType?: string;
  year?: string;
  location?: string;
  show?: boolean;
  _createdAt?: string;
}

export function AdminProjectsClient({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const router = useRouter();

  async function toggleVisibility(id: string, currentShow: boolean) {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show: !currentShow }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p._id === id ? { ...p, show: !currentShow } : p))
        );
      }
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div style={{ padding: '32px 40px', color: '#fff' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}
      >
        <div>
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
            {projects.length} Projects
          </div>
          <h1
            style={{
              fontWeight: 700,
              fontSize: '28px',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Projects
          </h1>
        </div>
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
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          New Project
        </Link>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          No projects yet.{' '}
          <Link href="/admin/projects/new" style={{ color: '#b86043' }}>
            Add your first project.
          </Link>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 80px 120px 80px',
              padding: '10px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'monospace',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            <span>Title / Code</span>
            <span>Type</span>
            <span>Location</span>
            <span>Year</span>
            <span>Visibility</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {projects.map((project, i) => (
            <div
              key={project._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 120px 80px 120px 80px',
                padding: '16px 20px',
                borderBottom:
                  i < projects.length - 1
                    ? '1px solid rgba(255,255,255,0.04)'
                    : 'none',
                alignItems: 'center',
              }}
            >
              {/* Title */}
              <div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: 500, marginBottom: '2px' }}>
                  {project.title}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {project.code}
                </div>
              </div>

              {/* Type */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {project.projectType || '—'}
              </div>

              {/* Location */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.location || '—'}
              </div>

              {/* Year */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {project.year || '—'}
              </div>

              {/* Visibility Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => toggleVisibility(project._id, project.show !== false)}
                  disabled={togglingId === project._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    backgroundColor:
                      project.show !== false
                        ? 'rgba(34, 197, 94, 0.12)'
                        : 'rgba(245, 158, 11, 0.12)',
                    color:
                      project.show !== false ? '#22c55e' : '#f59e0b',
                    border: '1px solid',
                    borderColor:
                      project.show !== false
                        ? 'rgba(34, 197, 94, 0.3)'
                        : 'rgba(245, 158, 11, 0.3)',
                    borderRadius: '2px',
                    cursor: togglingId === project._id ? 'wait' : 'pointer',
                    opacity: togglingId === project._id ? 0.5 : 1,
                    transition: 'all 0.15s',
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor:
                        project.show !== false ? '#22c55e' : '#f59e0b',
                      flexShrink: 0,
                    }}
                  />
                  {project.show !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <Link
                  href={`/admin/projects/${project._id}`}
                  style={{
                    padding: '5px 10px',
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
                {project.slug && (
                  <Link
                    href={`/werks/${project.slug}`}
                    target="_blank"
                    style={{
                      padding: '5px 8px',
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      backgroundColor: 'transparent',
                      color: 'rgba(255,255,255,0.3)',
                      textDecoration: 'none',
                      borderRadius: '2px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    ↗
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
