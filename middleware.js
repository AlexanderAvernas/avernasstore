import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';

  // Matcha exakt på domän, t.ex. utan www
  if (hostname === 'margaretaavernas.se') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Lägg till detta om du använder App Router (Next.js 13+)
export const config = {
  matcher: ['/', '/((?!_next|static|.*\\..*).*)'], // matchar allt förutom Next.js-filer och assets
};
