import { JWT_SECRET_KEY } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

export async function signJWT(payload: { sub: string }, options: { exp: string }): Promise<string> {
	const secret = new TextEncoder().encode(JWT_SECRET_KEY);
	const alg = 'HS256';
	return new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setExpirationTime(options.exp)
		.setIssuedAt()
		.setSubject(payload.sub)
		.sign(secret);
}

export async function verifyJWT<T>(token: string): Promise<T> {
	try {
		return (await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY))).payload as T;
	} catch (error) {
		console.log(error);
		throw new Error('Your token has expired.');
	}
}
