import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function proxy(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const payload = token ? verifyToken(token) : null
	const isAuthed = !!payload
	const isAdmin = payload?.role === 'ADMIN'

	const isAuthPage = req.nextUrl.pathname.startsWith('/signIn') || req.nextUrl.pathname.startsWith('/signUp')
	const isProtectedPage = req.nextUrl.pathname.startsWith('/dashboard')
	const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

	if (!isAuthed && (isProtectedPage || isAdminPage)) {
		return NextResponse.redirect(new URL('/signIn', req.url))
	}

	if (isAuthed && isAuthPage) {
		return NextResponse.redirect(new URL('/dashboard/myCourses', req.url))
	}

	if (!isAdmin && isAdminPage) {
		return NextResponse.redirect(new URL('/dashboard/myCourses', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/signIn', '/signUp', '/admin/:path*'],
}