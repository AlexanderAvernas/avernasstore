// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';

  // Om det är din riktiga domän, visa underhållssidan
  if (hostname.includes('margaretaavernas.se')) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // Annars, visa projektet som vanligt
  return NextResponse.next();
}
