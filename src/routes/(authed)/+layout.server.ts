import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	console.log(`  [LAYOUT-DEBUG]: ${url}`);
	const session = locals.session;
	if (!session) {
		redirect(302, `/auth?redirectTo=${url.pathname}`);
	}

	return {
		user: session.user
	};
}) satisfies LayoutServerLoad;
