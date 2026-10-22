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

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, code, slug, projectType, location, year, show, subtitle, client, coverImageUrl } = body;

  if (!title || !code || !slug) {
    return NextResponse.json({ error: 'title, code, and slug are required' }, { status: 400 });
  }

  try {
    const doc = await writeClient.create({
      _type: 'project',
      title,
      code,
      slug: { _type: 'slug', current: slug },
      projectType,
      location,
      year,
      show: show !== false,
      subtitle,
      client,
      coverImageUrl: coverImageUrl || undefined,
      layoutRows: [],
    });
    return NextResponse.json(doc);
  } catch (err: any) {
    console.error('Sanity create error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
