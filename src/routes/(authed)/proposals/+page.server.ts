import { extractPaginationParams } from '$lib/pagination';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const { limit, skip } = extractPaginationParams(url.searchParams);
	if (limit > 100) {
		error(400, 'Too much object was requested');
	}

	const totalItems = await prisma.proposal.count();
	const proposals = await prisma.proposal.findMany({
		include: {
			author: true,
			implementer: true,
			proposer: true,
			attachments: true
		},
		take: limit,
		skip: skip
	});

	return {
		totalItems,
		proposals
	};
}) satisfies PageServerLoad;
