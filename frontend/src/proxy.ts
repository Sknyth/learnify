import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function proxy(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const payload = token ? verifyToken(token) : null
	const isAuthed = !!payload
	const { pathname } = req.nextUrl
	const isAuthPage = pathname.startsWith('/signIn') || pathname.startsWith('/signUp')

	if (!isAuthed && !isAuthPage && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
		return NextResponse.redirect(new URL('/signIn', req.url))
	}
	if (isAuthed && isAuthPage) return NextResponse.redirect(new URL('/dashboard/myCourses', req.url))
	if (pathname.startsWith('/admin') && payload?.role !== 'ADMIN') {
		return NextResponse.redirect(new URL('/dashboard/myCourses', req.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/admin/:path*', '/signIn', '/signUp'],
}
