import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hafwerks2026';

function isAuthed(req: NextRequest) {
  return req.cookies.get('admin_auth')?.value === ADMIN_PASSWORD;
}

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nkh7cpkt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// PUT /api/admin/projects/[id]/layout — Save the block layout as JSON blob
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { blocks } = await req.json();

  try {
    // Store as JSON string in 'builderLayout' text field
    const serialized = typeof blocks === 'string' ? blocks : JSON.stringify(blocks);
    await writeClient.patch(id).set({ builderLayout: serialized }).commit();
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Sanity layout save error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/admin/projects/[id]/layout — Update other fields
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    await writeClient.patch(id).set(body).commit();
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
