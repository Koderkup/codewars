import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from './stackHandler'
import { authMiddleware } from './authMiddleware'
import { lkMiddleware } from './lkMiddleware'

export const withAuth: MiddlewareFactory = next => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname
		if (pathname.startsWith('/lk')) {
			console.log('lk')
			const response = lkMiddleware(request)
			if (response) {
				return response
			}
        }
			if (pathname.startsWith('/auth')) {
				console.log('auth')
				const response = authMiddleware(request)
				if (response) {
					return response
				}
			}

			return next(request, _next)
	}
}
