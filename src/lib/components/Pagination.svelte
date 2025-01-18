<script lang="ts">
	import { page } from '$app/state';
	import { extractPaginationParams, injectPaginationParams } from '$lib/pagination';

	let { totalItems }: { totalItems: number } = $props();

	let { limit, skip } = $derived(extractPaginationParams(page.url.searchParams));

	let totalPages = $derived(Math.ceil(totalItems / limit));
	let thisPage = $derived(Math.floor(skip / limit));
	let prevPage = $derived(thisPage - 1);
	let nextPage = $derived(thisPage + 1);
</script>

<section>
	<nav aria-label="Navigáció az oldalak között">
		<ul class="pagination justify-content-center">
			<li class="page-item {prevPage < 0 ? 'disabled' : ''}">
				<a
					class="page-link"
					href="?{injectPaginationParams(
						page.url.searchParams,
						limit,
						prevPage * limit
					).toString()}"
					tabindex="-1">Previous</a
				>
			</li>
			{#each Array(totalPages) as _, idx (idx)}
				<li
					class="page-item {idx === thisPage ? 'active' : ''}"
					aria-current={idx === thisPage ? 'page' : 'false'}
				>
					<a
						class="page-link"
						href="?{injectPaginationParams(page.url.searchParams, limit, idx * limit).toString()}"
						>{idx + 1}</a
					>
				</li>
			{/each}
			<li class="page-item {nextPage >= totalPages ? 'disabled' : ''}">
				<a
					class="page-link"
					href="?{injectPaginationParams(
						page.url.searchParams,
						limit,
						nextPage * limit
					).toString()}">Next</a
				>
			</li>
		</ul>
	</nav>
</section>
