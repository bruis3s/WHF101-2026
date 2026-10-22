'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MediaUploader } from './MediaUploader';

const PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Installation',
  'Interior',
  'Cultural',
  'Research',
  'Product',
];

interface Project {
  _id: string;
  title: string;
  code?: string;
  slug?: string;
  projectType?: string;
  location?: string;
  year?: string;
  show?: boolean;
  subtitle?: string;
  client?: string;
  description?: string[] | string;
  coverImageUrl?: string;
}

export function ProjectEditClient({ project }: { project: Project }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const initialDescription = Array.isArray(project.description)
    ? project.description.join('\n\n')
    : project.description || '';

  const [form, setForm] = useState({
    title: project.title || '',
    code: project.code || '',
    slug: project.slug || '',
    projectType: project.projectType || 'Residential',
    location: project.location || '',
    year: project.year || '',
    show: project.show !== false,
    subtitle: project.subtitle || '',
    client: project.client || '',
    description: initialDescription,
    coverImageUrl: project.coverImageUrl || '',
  });

  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!form.title || !form.code) {
      setError('Title and Project ID are required.');
      return;
    }
    setSaving(true);
    setError('');
    setSaveStatus('idle');

    const paragraphs = form.description
      ? form.description.split('\n\n').filter(Boolean)
      : [];

    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          description: paragraphs,
        }),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to save changes.');
        setSaveStatus('error');
      }
    } catch {
      setError('Failed to save changes.');
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/admin/projects');
      } else {
        setError('Failed to delete project.');
        setDeleting(false);
      }
    } catch {
      setError('Failed to delete project.');
      setDeleting(false);
    }
  }

  return (
    <div style={{ padding: '32px 40px', color: '#fff', maxWidth: '820px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Link
            href="/admin/projects"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px',
            }}
          >
            ← Back to Projects
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: '26px',
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: 0,
              }}
            >
              {form.title || 'Untitled Project'}
            </h1>
            {form.code && (
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#b86043',
                  backgroundColor: 'rgba(184,96,67,0.15)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  letterSpacing: '0.06em',
                }}
              >
                {form.code}
              </span>
            )}
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                padding: '2px 8px',
                borderRadius: '10px',
                backgroundColor: form.show ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                color: form.show ? '#22c55e' : 'rgba(255,255,255,0.4)',
                border: '1px solid',
                borderColor: form.show ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {form.show ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {form.slug && (
            <Link
              href={`/werks/${form.slug}`}
              target="_blank"
              style={{
                padding: '8px 14px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s',
              }}
            >
              Preview Live ↗
            </Link>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            style={{
              padding: '8px 20px',
              backgroundColor:
                saveStatus === 'saved'
                  ? '#22c55e'
                  : saveStatus === 'error'
                  ? '#ef4444'
                  : '#b86043',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: saving ? 'wait' : 'pointer',
              fontWeight: 600,
              transition: 'background-color 0.2s',
            }}
          >
            {saving
              ? 'Saving…'
              : saveStatus === 'saved'
              ? '✓ Changes Saved'
              : saveStatus === 'error'
              ? 'Error Saving'
              : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '4px',
            color: '#ef4444',
            fontFamily: 'monospace',
            fontSize: '11px',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      {/* Form sections */}
      <form onSubmit={handleSave}>
        {/* Core Identity */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '20px',
          }}
        >
          <SectionLabel>Core Identity</SectionLabel>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Field
              label="Project Title *"
              value={form.title}
              onChange={(v) => set('title', v)}
              placeholder="e.g. Timber Pavilion, Josei House"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field
                label="Project ID / Ref Code *"
                value={form.code}
                onChange={(v) => set('code', v)}
                placeholder="e.g. WHF101-2026"
                mono
              />
              <Field
                label="URL Slug"
                value={form.slug}
                onChange={(v) => set('slug', v)}
                placeholder="timber-pavilion"
                mono
              />
            </div>

            {/* Project Type */}
            <div>
              <label style={labelStyle}>Project Type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set('projectType', type)}
                    style={{
                      padding: '5px 12px',
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      border: '1px solid',
                      borderColor:
                        form.projectType === type ? '#b86043' : 'rgba(255,255,255,0.1)',
                      backgroundColor:
                        form.projectType === type ? 'rgba(184,96,67,0.15)' : 'transparent',
                      color: form.projectType === type ? '#b86043' : 'rgba(255,255,255,0.4)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field
                label="Location"
                value={form.location}
                onChange={(v) => set('location', v)}
                placeholder="Jakarta, Indonesia"
              />
              <Field
                label="Year"
                value={form.year}
                onChange={(v) => set('year', v)}
                placeholder="2026"
              />
            </div>

            <Field
              label="Client / Commission"
              value={form.client}
              onChange={(v) => set('client', v)}
              placeholder="e.g. Private Residence, HAF Foundation"
            />

            <Field
              label="Core Architectural Statement / Subtitle"
              value={form.subtitle}
              onChange={(v) => set('subtitle', v)}
              placeholder="A brief philosophical or tectonic statement…"
              multiline
            />

            {/* Visibility Toggle */}
            <div>
              <label style={labelStyle}>Visibility on Werks Page</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => set('show', !form.show)}
                  style={{
                    position: 'relative',
                    width: '40px',
                    height: '22px',
                    backgroundColor: form.show ? '#22c55e' : 'rgba(255,255,255,0.1)',
                    borderRadius: '11px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: form.show ? '21px' : '3px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      transition: 'left 0.2s',
                    }}
                  />
                </button>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: form.show ? '#22c55e' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {form.show ? 'Visible on Werks page' : 'Hidden from Werks page'}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Media */}
          <SectionLabel>Cover Media (Thumbnail)</SectionLabel>
          <div style={{ padding: '24px' }}>
            <MediaUploader
              value={form.coverImageUrl}
              onChange={(url) => set('coverImageUrl', url)}
              type="image"
              label="Cover Image (Saved locally to /public/uploads)"
            />
          </div>

          {/* Project Narrative */}
          <SectionLabel>Project Narrative & Description</SectionLabel>
          <div style={{ padding: '24px' }}>
            <Field
              label="Narrative Paragraphs (separate paragraphs with blank lines)"
              value={form.description}
              onChange={(v) => set('description', v)}
              placeholder="Describe the architectural concept, materials, structural intent, and context…"
              multiline
              rows={6}
            />
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 24px',
              backgroundColor:
                saveStatus === 'saved'
                  ? '#22c55e'
                  : saveStatus === 'error'
                  ? '#ef4444'
                  : '#b86043',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: saving ? 'wait' : 'pointer',
              fontWeight: 600,
              transition: 'background-color 0.2s',
            }}
          >
            {saving
              ? 'Saving Changes…'
              : saveStatus === 'saved'
              ? '✓ All Changes Saved'
              : 'Save Project'}
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div
        style={{
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '4px',
          backgroundColor: 'rgba(239,68,68,0.03)',
          overflow: 'hidden',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'rgba(239,68,68,0.08)',
            borderBottom: '1px solid rgba(239,68,68,0.15)',
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#ef4444',
            fontWeight: 600,
          }}
        >
          Danger Zone
        </div>
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              Delete Project
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
              Permanently remove this project and its media from the studio database.
            </div>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              padding: '8px 16px',
              backgroundColor: confirmDelete ? '#ef4444' : 'transparent',
              border: '1px solid #ef4444',
              borderRadius: '3px',
              color: confirmDelete ? '#fff' : '#ef4444',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: deleting ? 'wait' : 'pointer',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            {deleting
              ? 'Deleting…'
              : confirmDelete
              ? 'Confirm Delete?'
              : 'Delete Project'}
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'monospace',
  fontSize: '9px',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '6px',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '10px 24px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'monospace',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#b86043',
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  mono = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
  mono?: boolean;
  rows?: number;
}) {
  const commonStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '2px',
    padding: '9px 12px',
    color: '#fff',
    fontFamily: mono ? 'monospace' : 'inherit',
    fontSize: '12px',
    outline: 'none',
    boxSizing: 'border-box',
    lineHeight: 1.5,
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{ ...commonStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={commonStyle}
        />
      )}
    </div>
  );
}
