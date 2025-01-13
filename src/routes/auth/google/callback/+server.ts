import type { RequestHandler } from './$types';
import { google } from '$lib/server/oauth';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeIdToken } from 'arctic';

import type { OAuth2Tokens } from 'arctic';
import { createUserWithGoogle, getUserByGoogleId, setAuthToken } from '$lib/server/user';
import { error } from 'console';

export const GET: RequestHandler = async (event) => {
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

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

	let user = await getUserByGoogleId(googleId);
	if (!user) {
		user = await createUserWithGoogle(googleId, email, name);
		if (!user) {
			throw error('Registration error');
		}
		console.log(`[DEBUG]: registration was successful`);
	}
	
	await setAuthToken(user, event.cookies);
	console.log(`[DEBUG]: authentication with G was successful`);
	console.log(`cookies: ${event.cookies.get('token')}`);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
};
