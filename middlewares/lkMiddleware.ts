import { NextResponse, type NextRequest } from 'next/server'

export function lkMiddleware(request: NextRequest) {
 const accessToken = request.cookies.get('accessToken')
 if (!accessToken) {
     return NextResponse.redirect(new URL('/auth/login', request.url))
 }
 return NextResponse.next()
}

export const config = {
	matcher: '/lk/:path*'
}
