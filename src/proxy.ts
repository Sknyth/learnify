import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function proxy(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const isAuthed = token && verifyToken(token)

	const isAuthPage = req.nextUrl.pathname.startsWith('/signIn') || req.nextUrl.pathname.startsWith('/signUp')
	const isProtectedPage = req.nextUrl.pathname.startsWith('/dashboard')

	if (!isAuthed && isProtectedPage) {
		return NextResponse.redirect(new URL('/signIn', req.url))
	}

	if (isAuthed && isAuthPage) {
		return NextResponse.redirect(new URL('/dashboard/myCourses', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/signIn', '/signUp'],
}