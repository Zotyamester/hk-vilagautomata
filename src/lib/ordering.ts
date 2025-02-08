import { refreshPaginationParams } from './pagination';

export function injectOrderingParams(
	params: URLSearchParams,
	ordering: string,
	refreshPagination: boolean | undefined
): URLSearchParams {
	const newParams = refreshPagination
		? refreshPaginationParams(params)
		: new URLSearchParams(params);
	newParams.set('ord', ordering);
	return newParams;
}

export function extractOrderingParamsForProposals(searchParams: URLSearchParams) {
	const ordering = searchParams.get('ord') || '';
	switch (ordering) {
		case 'author':
		case 'available_date':
		case 'end_date':
		case 'title':
		case 'proposition_date':
		case 'agenda_date':
			return ordering;
		default:
			return 'id';
	}
}

export function extractOrderingParamsForUsers(searchParams: URLSearchParams) {
	const ordering = searchParams.get('ord') || '';
	switch (ordering) {
		case 'id':
		case 'name':
			return ordering;
		default:
			return 'id';
	}
}

export function extractOrderingParamsForVotes(searchParams: URLSearchParams) {
	const ordering = searchParams.get('ord') || '';
	switch (ordering) {
		case 'id':
		case 'question':
		case 'author':
		case 'available_date':
		case 'end_date':
			return ordering;
		default:
			return 'id';
	}
}
