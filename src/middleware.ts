import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Check if request is targeting the admin subdomain (e.g. admin.spmgeosolutions.com)
  const isAdminSubdomain = hostname.startsWith('admin.');

  if (isAdminSubdomain) {
    // If hitting root admin.spmgeosolutions.com/, rewrite directly to /admin
    if (url.pathname === '/') {
      url.pathname = '/admin';
      return NextResponse.rewrite(url);
    }

    // If accessing admin subpages without /admin prefix
    if (
      !url.pathname.startsWith('/admin') &&
      !url.pathname.startsWith('/_next') &&
      !url.pathname.startsWith('/api') &&
      !url.pathname.includes('.')
    ) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.png|icon.png).*)',
  ],
};
