import { JWT_EXPIRES_IN } from '$env/static/private';
import prisma from '$lib/prisma';
import type { User } from '@prisma/client';
import type { Cookies } from '@sveltejs/kit';
import { signJWT } from './token';

export async function createUserWithGoogle(
	google_id: string,
	email: string,
	name: string
): Promise<User | null> {
	const user = await prisma.user.create({
		data: {
			google_id,
			email,
			name
		}
	});
	return user;
}

export async function getUserByGoogleId(google_id: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: {
			google_id: google_id
		}
	});
	return user;
}

export async function setAuthToken(user: User, cookies: Cookies) {
	const id = user.id;

	const token = await signJWT({ sub: id.toString() }, { exp: `${JWT_EXPIRES_IN}m` });
	const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

	cookies.set('Authorization', `Bearer ${token}`, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'strict',
		maxAge: tokenMaxAge
	});
}

export function removeAuthToken(locals: App.Locals, cookies: Cookies) {
	locals.user = null;

	cookies.delete('Authorization', {
		path: '/',
		secure: import.meta.env.PROD
	});
}
