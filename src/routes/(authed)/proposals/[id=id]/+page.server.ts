import prisma from '$lib/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const proposal = await prisma.proposal.findUniqueOrThrow({
		where: {
			id: Number(params.id)
		}
	});

	return {
		proposal
	};
}) satisfies PageServerLoad;

export const actions = {
	edit: async ({ params, locals }) => {
		//
	},
	delete: async ({ params, locals }) => {
		if (!locals.user) return;

		try {
			await prisma.proposal.delete({
				include: {
					author: true
				},
				where: {
					id: Number(params.id),
					OR: [
						{
							author: {
								id: locals.user.id
							}
						},
						{
							author: {
								is_admin: true
							}
						}
					]
				}
			});
		} catch {
			throw redirect(403, "Insufficient permissions");
		}
	}
} satisfies Actions;
