// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// export async function middleware(request: NextRequest) {
//   const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
//   const isAuthPage = request.nextUrl.pathname.startsWith('/auth/login') // ✅ Changed
//   
//   const token = request.cookies.get('jwt')?.value
// 
//   if (isProtectedRoute) {
//     if (!token) {
//       const url = new URL('/auth/login', request.url)
//       url.searchParams.set('from', request.nextUrl.pathname)
//       return NextResponse.redirect(url)
//     }
// 
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//       await jwtVerify(token, secret)
//       return NextResponse.next()
//     } catch (error) {
//       const url = new URL('/auth/login', request.url)
//       url.searchParams.set('from', request.nextUrl.pathname)
//       return NextResponse.redirect(url)
//     }
//   }
// 
//   if (isAuthPage && token) {
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//       await jwtVerify(token, secret)
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     } catch {}
//   }
// 
//   return NextResponse.next()
// }

export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login']
}
