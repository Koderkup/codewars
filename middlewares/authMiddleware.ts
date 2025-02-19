import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function authMiddleware(request: NextRequest) {
	const accessTokenCookie = request.cookies.get('accessToken')
	const refreshTokenCookie = request.cookies.get('refreshToken')
	const accessToken = accessTokenCookie ? accessTokenCookie.value : null
	const refreshToken = refreshTokenCookie ? refreshTokenCookie.value : null

	const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
	const isLKPage = request.nextUrl.pathname.startsWith('/lk')

	if (accessToken && refreshToken && isAuthPage) {
		return NextResponse.redirect(new URL('/lk', request.url))
	}

	if (!accessToken && !refreshToken) {
		if (isLKPage) {
			return NextResponse.redirect(new URL('/auth/login', request.url))
		}
		return NextResponse.next()
	}

	if (accessToken) {
		try {
			const res = NextResponse.next()
			res.cookies.set('accessToken', accessToken, { httpOnly: true })
			return res
		} catch (error) {
			console.error('Ошибка при верификации токена:', error)
		}
	}

	if (refreshToken) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/refreshAccessToken`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ refreshToken })
				}
			)

			if (!response.ok) {
				throw new Error('Ошибка при обновлении токенов')
			}

			const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
				await response.json()

			const res = NextResponse.next()
			res.cookies.set('accessToken', newAccessToken, { httpOnly: true })
			res.cookies.set('refreshToken', newRefreshToken, { httpOnly: true })
			return res
		} catch (refreshError) {
			console.error('Ошибка при обновлении токенов:', refreshError)
			return NextResponse.redirect(new URL('/auth/login', request.url))
		}
	}

	return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
	matcher: '/auth/:path*'
}
