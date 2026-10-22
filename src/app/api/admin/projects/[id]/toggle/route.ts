import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hafwerks2026';

function isAuthed(req: NextRequest) {
  const cookieHeader = req.cookies.get('admin_auth');
  return cookieHeader?.value === ADMIN_PASSWORD;
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
  const { show } = await req.json();

  try {
    await writeClient.patch(id).set({ show }).commit();
    return NextResponse.json({ ok: true, show });
  } catch (err: any) {
    console.error('Sanity toggle error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
