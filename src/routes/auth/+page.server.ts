import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { removeAuthToken, setAuthToken } from '$lib/server/user';

export const load = (async ({ locals, url }) => {
	const redirectTo = url.searchParams.get('redirectTo');
	if (locals.user) {
		throw redirect(302, redirectTo ?? '/');
	}
	return {
		redirectTo
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, url }) => {
		const user = await prisma.user.findFirstOrThrow(); // dummy, TODO: ...
		await setAuthToken(user, cookies);
		
		const redirectTo = url.searchParams.get('redirectTo');
		console.log(redirectTo);
		throw redirect(302, redirectTo ?? '/');
	},
	logout: ({ cookies, locals }) => {
		removeAuthToken(locals, cookies);
		throw redirect(302, '/');
	}
} satisfies Actions;

