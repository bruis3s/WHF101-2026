'use client';

import React, { useState, useRef } from 'react';

interface Props {
  value?: string;
  onChange: (url: string) => void;
  type?: 'image' | 'video' | 'any';
  label?: string;
  compact?: boolean;
}

export function MediaUploader({
  value,
  onChange,
  type = 'any',
  label,
  compact = false,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accept =
    type === 'image'
      ? 'image/png,image/jpeg,image/webp,image/svg+xml,image/avif,image/gif'
      : type === 'video'
      ? 'video/mp4,video/webm,video/quicktime,video/ogg'
      : 'image/*,video/*';

  async function handleFile(file: File) {
    if (!file) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      setError(err.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const isVideo =
    type === 'video' ||
    (value && (value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov')));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {label}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={onFileInputChange}
      />

      {/* If file already selected / uploaded */}
      {value ? (
        <div
          style={{
            position: 'relative',
            backgroundColor: '#181818',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '3px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Thumbnail Preview */}
          <div
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#000',
              borderRadius: '2px',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isVideo ? (
              <video
                src={value}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={value}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0, fontSize: '9px', fontFamily: 'monospace' }}>
            <div
              style={{
                color: '#fff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 600,
              }}
            >
              {value.split('/').pop()}
            </div>
            <div style={{ color: '#22c55e', marginTop: '2px' }}>✓ Uploaded to local</div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '4px 8px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '2px',
                color: '#fff',
                fontSize: '8px',
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              style={{
                padding: '4px 8px',
                backgroundColor: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '2px',
                color: '#ef4444',
                fontSize: '8px',
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone / Upload Trigger */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragging
              ? '1px dashed #b86043'
              : '1px dashed rgba(255,255,255,0.15)',
            backgroundColor: isDragging
              ? 'rgba(184, 96, 67, 0.1)'
              : 'rgba(255,255,255,0.02)',
            borderRadius: '3px',
            padding: compact ? '12px 8px' : '18px 12px',
            textAlign: 'center',
            cursor: uploading ? 'wait' : 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {uploading ? (
            <div style={{ color: '#b86043', fontSize: '10px', fontFamily: 'monospace' }}>
              Uploading to local…
            </div>
          ) : (
            <>
              <svg
                width={compact ? '18' : '22'}
                height={compact ? '18' : '22'}
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragging ? '#b86043' : 'rgba(255,255,255,0.4)'}
                strokeWidth="1.3"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div
                style={{
                  fontSize: '9px',
                  fontFamily: 'monospace',
                  color: '#fff',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                Click to upload or drag {type === 'video' ? 'video' : 'media'}
              </div>
              <div
                style={{
                  fontSize: '8px',
                  fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                Saved locally to /public/uploads
              </div>
            </>
          )}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div
          style={{
            color: '#ef4444',
            fontSize: '9px',
            fontFamily: 'monospace',
            marginTop: '2px',
          }}
        >
          ✕ {error}
        </div>
      )}

      {/* Optional fallback URL toggle */}
      <div style={{ marginTop: '2px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '8px',
            fontFamily: 'monospace',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          {showUrlInput ? 'Hide URL input' : 'Or paste direct URL'}
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... or https://..."
          style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '2px',
            padding: '5px 8px',
            color: '#fff',
            fontSize: '9px',
            fontFamily: 'monospace',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  );
}
