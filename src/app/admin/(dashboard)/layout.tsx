import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Admin — HAF WERKS',
  robots: 'noindex,nofollow',
};

export const instant = false;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hafwerks2026';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');

  if (auth?.value !== ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
