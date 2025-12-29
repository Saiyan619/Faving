// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/login')
  
  const token = request.cookies.get('jwt')?.value

  if (isProtectedRoute) {
    if (!token) {
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    try {
      // Make sure JWT_SECRET is in your environment variables
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      // Token is invalid, clear it and redirect
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      const response = NextResponse.redirect(url)
      response.cookies.delete('jwt')
      return response
    }
  }

  if (isAuthPage && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      await jwtVerify(token, secret)
      // User is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch {
      // Invalid token, let them access login page
      const response = NextResponse.next()
      response.cookies.delete('jwt')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login']
}