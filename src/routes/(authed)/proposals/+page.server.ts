import { extractPaginationParams } from '$lib/pagination';
import prisma from '$lib/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { extractOrderingParamsForProposals } from '$lib/ordering';
import { extractQueryParameters } from '$lib/query';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import type { Prisma } from '@prisma/client';

export const load = (async ({ url }) => {
	const { limit, skip } = extractPaginationParams(url.searchParams);
	if (limit > 100) {
		error(400, 'Too much object was requested');
	}
	const query = extractQueryParameters(url.searchParams);
	const ordering = extractOrderingParamsForProposals(url.searchParams);
	const orderBy: Prisma.ProposalOrderByWithRelationInput = {};
	if (ordering === 'author') {
		orderBy['author'] = {
			name: 'asc'
		};
	} else if (ordering in orderBy) {
		orderBy[ordering as keyof Prisma.ProposalOrderByWithRelationInput] = 'asc';
	}

	const args: Prisma.ProposalFindManyArgs<DefaultArgs> = {
		include: {
			author: true,
			implementer: true,
			proposer: true,
			attachments: true
		},
		take: limit,
		skip: skip,
		where: {
			OR: [
				{
					title: {
						contains: query
					}
				},
				{
					author: {
						name: {
							contains: query
						}
					}
				}
			]
		},
		orderBy
	};

	const [proposals, totalItems] = await prisma.$transaction([
		prisma.proposal.findMany(args),
		prisma.proposal.count({ where: args.where })
	]);

	return {
		totalItems,
		proposals
	};
}) satisfies PageServerLoad;

export const actions = {
	default: ({ url }) => {
		url.searchParams.set('shit', '1');
	}
} satisfies Actions;
