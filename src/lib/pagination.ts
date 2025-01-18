export function injectPaginationParams(
	params: URLSearchParams,
	limit: number,
	skip: number
): URLSearchParams {
	const newParams = new URLSearchParams(params);
	newParams.set('limit', limit.toString());
	newParams.set('skip', skip.toString());
	return newParams;
}

export function extractPaginationParams(searchParams: URLSearchParams) {
	const limit = Math.max(1, parseInt(searchParams.get('limit') || '5'));
	const skip = Math.max(0, parseInt(searchParams.get('skip') || '0'));
	return { limit, skip };
}
