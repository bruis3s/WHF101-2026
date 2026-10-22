'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaUploader } from '@/components/admin/MediaUploader';

const PROJECT_TYPES = ['Residential', 'Commercial', 'Installation', 'Interior', 'Cultural', 'Research', 'Product'];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    code: '',
    projectType: 'Residential',
    location: '',
    year: new Date().getFullYear().toString(),
    show: true,
    subtitle: '',
    client: '',
    coverImageUrl: '',
  });

  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.code) {
      setError('Title and Project ID are required.');
      return;
    }
    setSaving(true);
    setError('');

    // Generate slug from title
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/projects/${data._id}`);
    } else {
      const err = await res.json();
      setError(err.error || 'Failed to create project.');
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: '32px 40px', color: '#fff', maxWidth: '720px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
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
          Projects → New
        </div>
        <h1
          style={{
            fontWeight: 700,
            fontSize: '24px',
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          Add Project
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '20px',
          }}
        >
          {/* Section: Core Identity */}
          <SectionLabel>Core Identity</SectionLabel>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Field
              label="Project Title *"
              value={form.title}
              onChange={(v) => set('title', v)}
              placeholder="e.g. Timber Pavilion, Josei House"
            />
            <Field
              label="Project ID *"
              value={form.code}
              onChange={(v) => set('code', v)}
              placeholder="e.g. WHF101-2026"
              mono
            />

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
                        form.projectType === type
                          ? '#b86043'
                          : 'rgba(255,255,255,0.1)',
                      backgroundColor:
                        form.projectType === type
                          ? 'rgba(184,96,67,0.15)'
                          : 'transparent',
                      color:
                        form.projectType === type
                          ? '#b86043'
                          : 'rgba(255,255,255,0.4)',
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
              label="Client"
              value={form.client}
              onChange={(v) => set('client', v)}
              placeholder="Client name or commission"
            />

            <Field
              label="Core Statement / Subtitle"
              value={form.subtitle}
              onChange={(v) => set('subtitle', v)}
              placeholder="A brief architectural statement…"
              multiline
            />

            {/* Show toggle */}
            <div>
              <label style={labelStyle}>Visibility on Werks</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '8px',
                }}
              >
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
                    color: form.show ? '#22c55e' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {form.show ? 'Visible on Werks page' : 'Hidden from Werks page'}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Cover Media */}
          <SectionLabel>Cover Media (Thumbnail)</SectionLabel>
          <div style={{ padding: '24px' }}>
            <MediaUploader
              value={form.coverImageUrl}
              onChange={(url) => set('coverImageUrl', url)}
              type="image"
              label="Cover Image (Saved locally to /public/uploads)"
            />
          </div>
        </div>

        {error && (
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#ef4444',
              marginBottom: '16px',
              padding: '10px 14px',
              backgroundColor: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '3px',
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              backgroundColor: '#b86043',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: saving ? 'wait' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Creating…' : 'Create Project & Edit Content →'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'monospace',
  fontSize: '9px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.3)',
  marginBottom: '6px',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '10px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'monospace',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(255,255,255,0.02)',
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
  mono = false,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
  multiline?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    color: '#fff',
    fontSize: mono ? '12px' : '13px',
    fontFamily: mono ? 'monospace' : 'inherit',
    outline: 'none',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '80px' : undefined,
    transition: 'border-color 0.15s',
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
        />
      )}
    </div>
  );
}
