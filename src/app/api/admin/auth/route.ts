import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hafwerks2026';

// POST — authenticate with password and set admin_auth cookie
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_auth', ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

// DELETE — clear the admin_auth cookie (logout)
export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}
