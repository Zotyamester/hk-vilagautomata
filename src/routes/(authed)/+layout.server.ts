import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, url, locals }) => {
	console.log(`  [LAYOUT-DEBUG]: ${url.pathname}`);
	console.log(`  cookies: ${cookies.get('token')}`);
	const user = locals.user;
	if (!user) {
		redirect(302, `/auth?redirectTo=${url.pathname}`);
	}

	return {
		user
	};
}) satisfies LayoutServerLoad;
