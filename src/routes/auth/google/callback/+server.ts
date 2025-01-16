import type { RequestHandler } from './$types';
import { google } from '$lib/server/oauth';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeIdToken } from 'arctic';

import type { OAuth2Tokens } from 'arctic';
import {
	createSession,
	createUserWithGoogle,
	generateSessionToken,
	getUserByGoogleId,
	setSessionTokenCookie
} from '$lib/server/user';
import { error } from 'console';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const storedState = cookies.get('google_oauth_state') ?? null;
	const codeVerifier = cookies.get('google_code_verifier') ?? null;
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (storedState === null || codeVerifier === null || code === null || state === null) {
		return new Response('Please restart the process.', {
			status: 400
		});
	}
	if (storedState !== state) {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	const claims: object = decodeIdToken(tokens.idToken());
	const claimsParser = new ObjectParser(claims);

	const googleId = claimsParser.getString('sub');
	const name = claimsParser.getString('name');
	const email = claimsParser.getString('email');
	const picture = claimsParser.getString('picture');

	let user = await getUserByGoogleId(googleId);
	if (!user) {
		user = await createUserWithGoogle(googleId, email, name, picture);
		if (!user) {
			throw error('Registration error');
		}

		console.log(`[DEBUG]: registration was successful`);
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user);
	setSessionTokenCookie(cookies, sessionToken, session.expiresAt);

	console.log(`[DEBUG]: authentication with G was successful`);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
};
