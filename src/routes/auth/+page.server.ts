import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import {
	createSession,
	deleteSessionTokenCookie,
	invalidateSession,
	setSessionTokenCookie
} from '$lib/server/session';
import { generateSessionToken } from '$lib/server/session';

export const load = (async ({ locals, url }) => {
	const redirectTo = url.searchParams.get('redirectTo');
	if (locals.session) {
		redirect(302, redirectTo ?? '/');
	}

	return {
		redirectTo
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, url }) => {
		const user = await prisma.user.findFirstOrThrow(); // dummy, TODO: ...
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user);
		setSessionTokenCookie(cookies, sessionToken, session.expiresAt);

		const redirectTo = url.searchParams.get('redirectTo');
		redirect(302, redirectTo ?? '/');
	},

	logout: ({ cookies, locals }) => {
		if (!locals.session) {
			error(401);
		}

		invalidateSession(locals.session.id);
		deleteSessionTokenCookie(cookies);
		redirect(302, '/');
	}
} satisfies Actions;
