import prisma from '$lib/prisma';
import { verifyJWT } from '$lib/server/token';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log(`[DEBUG]: ${event.url.pathname}`);
	
	const token = event.cookies.get('Authorization')?.split(' ')[1];
	if (token) {
		const { sub } = await verifyJWT<{ sub: string }>(token);

		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(sub)
			}
		});
		if (!user) {
			redirect(401, 'Invalid access token');
		}

		event.locals.user = user;
	}

	return await resolve(event);
};
