import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';

  // Matcha både med och utan www
  if (
    hostname === 'margaretaavernas.se' ||
    hostname === 'www.margaretaavernas.se'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 👇 Gör så att middleware körs på alla paths (för App Router + Next.js 13+)
export const config = {
  matcher: ['/', '/((?!_next|static|.*\\..*).*)'],
};
