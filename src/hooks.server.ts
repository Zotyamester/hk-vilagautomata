import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from '$lib/server/user';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => { 
	console.log(`[DEBUG]: ${event.url}`);
	
	const token = event.cookies.get('session');
	if (token) {
		const session = await validateSessionToken(token);
		if (session) {
			setSessionTokenCookie(event.cookies, token, session.expiresAt);
		} else {
			deleteSessionTokenCookie(event.cookies);
		}

		event.locals.session = session;
	}

	return await resolve(event);
};
