import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
