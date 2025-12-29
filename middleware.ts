import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/login')
  
  // In production with cross-origin setup, cookies from backend API
  // are not accessible to Next.js middleware (they're on different domains)
  // So we skip middleware auth check and let client-side handle it
  const isProduction = process.env.NODE_ENV === 'production'
  const isCrossOrigin = process.env.NEXT_PUBLIC_API_URL?.includes('http') && 
                       !process.env.NEXT_PUBLIC_API_URL?.includes('localhost')
  
  // Only check cookies in development (same origin) or if same domain
  const shouldCheckCookies = !isProduction || !isCrossOrigin
  
  const token = request.cookies.get('jwt')?.value
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Path:', request.nextUrl.pathname)
    console.log('[Middleware] Has JWT cookie:', !!token)
    console.log('[Middleware] All cookies:', request.cookies.getAll().map(c => c.name))
    console.log('[Middleware] Should check cookies:', shouldCheckCookies)
  }

  if (isProtectedRoute) {
    // In production with cross-origin, skip middleware check
    // Client-side will handle auth via useUser() hook and axios interceptor
    if (!shouldCheckCookies) {
      return NextResponse.next()
    }
    
    // Development: Check cookie in middleware
    if (!token) {
      console.log('[Middleware] No token found, redirecting to login')
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      await jwtVerify(token, secret)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] Token verified, allowing access')
      }
      return NextResponse.next()
    } catch (error) {
      console.log('[Middleware] Token verification failed:', error)
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      const response = NextResponse.redirect(url)
      response.cookies.delete('jwt')
      return response
    }
  }

  // For login page: In production with cross-origin, we can't check cookies in middleware
  // Client-side will handle redirect if user is already logged in
  // (This is handled by the login page component checking useUser())
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login']
}