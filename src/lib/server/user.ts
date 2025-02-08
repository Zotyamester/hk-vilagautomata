import prisma from '$lib/prisma';
import type { User } from '@prisma/client';

export async function createUserWithGoogle(
	google_id: string,
	email: string,
	name: string,
	picture: string
): Promise<User | null> {
	const user = await prisma.user.create({
		data: {
			google_id,
			email,
			name,
			picture_url: picture
		}
	});
	return user;
}

export async function getUserByGoogleId(google_id: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: {
			google_id: google_id
		}
	});
	return user;
}

export async function updateUser(
	id: number,
	name: string | undefined,
	picture_url: string | undefined,
	wiki_name: string | undefined,
	has_mandate: boolean | undefined,
	is_admin: boolean | undefined,
	is_active: boolean | undefined
) {
	await prisma.user.update({
		where: {
			id
		},
		data: {
			name,
			picture_url,
			wiki_name,
			has_mandate,
			is_admin,
			is_active
		}
	});
}

function isValidURL(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

export function validateUserUpdate(
	name: string | undefined,
	picture_url: string | undefined,
	wiki_name: string | undefined
) {
	const errors: Record<string, string> = {};

	if (!name || name.length < 3 || name.length > 50) {
		errors.name = 'A névnek 3 és 50 karakter között kell lennie';
	}
	if (picture_url && !isValidURL(picture_url)) {
		errors.profile_url = 'Érvénytelen URL';
	}
	if (wiki_name && (wiki_name.length < 3 || wiki_name.length > 50)) {
		errors.wiki_name = 'A Wiki felhasználónévnek 3 és 50 karakter között kell lennie';
	}

	if (Object.keys(errors).length > 0) {
		return errors;
	}

	return {};
}
