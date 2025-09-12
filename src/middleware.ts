import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, allow all requests to pass through
  // Auth protection will be handled at the component level
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/save-config/:path*']
}
