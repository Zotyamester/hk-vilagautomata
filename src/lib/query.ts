import { refreshPaginationParams } from './pagination';

export function debounce(callback: Function, wait = 300) {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
}

export function injectQueryParameters(
	params: URLSearchParams,
	query: string,
	refreshPagination: boolean | undefined
): URLSearchParams {
	const newParams = refreshPagination
		? refreshPaginationParams(params)
		: new URLSearchParams(params);
	newParams.set('q', query);
	return newParams;
}

export function extractQueryParameters(searchParams: URLSearchParams) {
	const query = searchParams.get('q') || '';
	return query;
}
