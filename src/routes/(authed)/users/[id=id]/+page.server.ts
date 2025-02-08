import prisma from '$lib/prisma';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { updateUser, validateUserUpdate } from '$lib/server/user';

export const load = (async ({ params }) => {
	const editedUser = await prisma.user.findUnique({
		where: {
			id: parseInt(params.id)
		}
	});
	if (!editedUser) {
		error(404, 'User not found');
	}

	return {
		editedUser
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ params, request, locals }) => {
		const id = parseInt(params.id ?? '');
		if (!locals.session.user.is_admin && locals.session.user.id !== id) {
			return fail(403, {
				error: 'Nincs jogosultságod ehhez a művelethez'
			});
		}

		const data = await request.formData();

		const name = String(data.get('name'));
		const picture_url = String(data.get('pictureUrl'));
		const wiki_name = String(data.get('wikiName'));
		const has_mandate =
			data.get('hasMandate') === null ? undefined : data.get('hasMandate') === 'on';
		const is_admin = data.get('isAdmin') === null ? undefined : data.get('isAdmin') === 'on';
		const is_active = data.get('isActive') === null ? undefined : data.get('isActive') === 'on';

		// Privilege check
		if (
			!locals.session.user.is_admin &&
			(has_mandate !== undefined || is_admin !== undefined || is_active !== undefined)
		) {
			return fail(403, {
				error: 'Nincs jogosultságod ehhez a művelethez'
			});
		}

		const errors = validateUserUpdate(name, picture_url, wiki_name);
		if (Object.keys(errors).length > 0) {
			console.log(`fail ${JSON.stringify(errors)}`);
			return fail(400, errors);
		}

		await updateUser(id, name, picture_url, wiki_name, has_mandate, is_admin, is_active);
		redirect(302, `/users/${id}`);
	}
} satisfies Actions;
