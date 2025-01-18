import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { extractPaginationParams } from '$lib/pagination';

export const load = (async ({ url }) => {
	const { limit, skip } = extractPaginationParams(url.searchParams);
	if (limit > 100) {
		error(400, 'Too much object was requested');
	}

	const totalItems = await prisma.user.count();
	const users = await prisma.user.findMany({
		include: {
			sessions: true
		},
		take: limit,
		skip: skip
	});
	return {
		totalItems,
		users
	};
}) satisfies PageServerLoad;
