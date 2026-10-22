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
    const patchData: Record<string, any> = {};

    if (body.title !== undefined) patchData.title = body.title;
    if (body.code !== undefined) patchData.code = body.code;
    if (body.slug !== undefined) patchData.slug = { _type: 'slug', current: body.slug };
    if (body.projectType !== undefined) patchData.projectType = body.projectType;
    if (body.location !== undefined) patchData.location = body.location;
    if (body.year !== undefined) patchData.year = body.year;
    if (body.show !== undefined) patchData.show = Boolean(body.show);
    if (body.subtitle !== undefined) patchData.subtitle = body.subtitle;
    if (body.client !== undefined) patchData.client = body.client;
    if (body.description !== undefined) {
      patchData.description = Array.isArray(body.description) ? body.description : [body.description];
    }
    if (body.coverImageUrl !== undefined) patchData.coverImageUrl = body.coverImageUrl;

    await writeClient.patch(id).set(patchData).commit();
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Failed to update project in Sanity:', err);
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await writeClient.delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Failed to delete project in Sanity:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete' }, { status: 500 });
  }
}
