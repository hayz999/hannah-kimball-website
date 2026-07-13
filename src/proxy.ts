import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { sessionOptions } from '@/lib/session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin/login')) {
    const session = request.cookies.get(sessionOptions.cookieName);
    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
