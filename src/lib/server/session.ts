import { encodeBase32 } from '@oslojs/encoding';
import type { Session, User } from '@prisma/client';
import type { Cookies } from '@sveltejs/kit';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import prisma from '$lib/prisma';

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

export async function createSession(token: string, user: User): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = await prisma.session.create({
		data: {
			id: sessionId,
			userId: user.id,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
		}
	});
	return session;
}

export async function validateSessionToken(
	token: string
): Promise<(Session & { user: User }) | null> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		},
		include: {
			user: true
		}
	});
	if (!session) {
		return null;
	}

	if (Date.now() >= session.expiresAt.getTime()) {
		await prisma.session.delete({
			where: {
				id: session.id
			}
		});
		return null;
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 7) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
		await prisma.session.update({
			where: {
				id: session.id
			},
			data: {
				expiresAt: session.expiresAt
			}
		});
	}

	return session;
}

export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({
		where: {
			id: sessionId
		}
	});
}

export async function invalidateUserSessions(userId: number) {
	await prisma.session.deleteMany({
		where: {
			userId
		}
	});
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(cookies: Cookies) {
	cookies.delete('session', {
		path: '/'
	});
}
