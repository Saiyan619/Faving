import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/login')
  
  const token = request.cookies.get('jwt')?.value
  
  // Debug logging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Path:', request.nextUrl.pathname)
    console.log('[Middleware] Has JWT cookie:', !!token)
    console.log('[Middleware] All cookies:', request.cookies.getAll().map(c => c.name))
  }

  if (isProtectedRoute) {
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

  // Allow login page to load without redirect
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login']
}