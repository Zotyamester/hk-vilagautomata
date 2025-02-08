<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import FileRef from '$lib/components/FileRef.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { injectOrderingParams } from '$lib/ordering';
	import { refreshPaginationParams } from '$lib/pagination';
	import { debounce, extractQueryParameters, injectQueryParameters } from '$lib/query';

	let { data } = $props();

	let query = $state(extractQueryParameters(page.url.searchParams));
</script>

<article>
	<section class="row g-2 mb-2">
		<h1 class="col-12 col-md-8 text-center text-md-start">
			<i class="fa-solid fa-file"></i>
			Előterjesztések
		</h1>
		<div class="col-12 col-md-4 d-md-flex justify-content-end align-items-center">
			<div class="row mx-0">
				<a href="/proposals/new" class="btn btn-success">
					<i class="fa-solid fa-plus"></i>
					Létrehozás
				</a>
			</div>
		</div>
	</section>

	<section class="row my-2">
		<div class="d-flex justify-content-center justify-content-md-end align-items-md-end w-100">
			<div class="btn-toolbar w-100" role="toolbar" aria-label="Eszköztár">
				<div class="input-group w-100">
					<div class="input-group-text" id="searchBar">
						<i class="fa-solid fa-magnifying-glass" title="Keresés"></i>
					</div>
					<input
						type="text"
						class="form-control"
						placeholder="Keresés"
						aria-label="Keresés"
						aria-describedby="searchBar"
						bind:value={query}
						onkeyup={debounce(() => {
							goto(`?${injectQueryParameters(page.url.searchParams, query, true)}`);
						})}
						autofocus
					/>
					<a
						href="?{refreshPaginationParams(page.url.searchParams)}"
						class="btn btn-primary"
						onclick={() => invalidateAll()}
						aria-label="Frissítés"
					>
						<i class="fa-solid fa-arrows-rotate"></i>
					</a>
					<button
						class="btn btn-primary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-label="Rendezés"
						aria-expanded="false"
					>
						<i class="fa-solid fa-list"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-end">
						<li>
							<a
								href="?{injectOrderingParams(
									page.url.searchParams,
									'proposition_date',
									true
								).toString()}"
								class="dropdown-item">Előterjesztés dátuma</a
							>
						</li>
						<li>
							<a
								href="?{injectOrderingParams(page.url.searchParams, 'title', true).toString()}"
								class="dropdown-item">Cím</a
							>
						</li>
						<li>
							<a
								href="?{injectOrderingParams(page.url.searchParams, 'proposer', true).toString()}"
								class="dropdown-item">Előterjesztő</a
							>
						</li>
						<li>
							<a
								href="?{injectOrderingParams(
									page.url.searchParams,
									'implementer',
									true
								).toString()}"
								class="dropdown-item">Végrehajtásért felelős</a
							>
						</li>
						<li>
							<a
								href="?{injectOrderingParams(
									page.url.searchParams,
									'agenda_date',
									true
								).toString()}"
								class="dropdown-item">Ülés dátuma</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="row">
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Előterjesztés dátuma</th>
						<th scope="col">Cím</th>
						<th scope="col">Előterjesztő</th>
						<th scope="col">Végrehajtásért felelős</th>
						<th scope="col">Ülés dátuma</th>
						<th scope="col">Készítette</th>
						<th scope="col">Mellékletek</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{#each data.proposals as proposal (proposal.id)}
						<tr>
							<th scope="row">{proposal.id}</th>
							<td>{proposal.proposition_date.toLocaleString()}</td>
							<td>{proposal.title}</td>
							<td>{proposal.proposer.name}</td>
							<td>{proposal.implementer.name}</td>
							<td>{proposal.agenda_date.toLocaleString()}</td>
							<td>{proposal.author.name}</td>
							<td>
								{#each proposal.attachments as attachment (attachment.id)}
									<div>
										<FileRef filename={attachment.file_name} />
										<a
											href="/{attachment.file_path}/{attachment.file_name}"
											class={attachment.is_hidden ? 'text-secondary' : ''}
										>
											{attachment.file_name}
										</a>
									</div>
								{/each}
							</td>
							<td>
								<div class="w-100 h-100 d-flex justify-content-end align-items-center">
									<form
										action="/proposals/{proposal.id}?/delete"
										method="post"
										class="btn-group"
										role="group"
										aria-label="Műveletek"
										use:enhance
									>
										<a
											href="/proposals/{proposal.id}"
											class="btn btn-primary"
											role="button"
											aria-label="Szerkesztés"
										>
											<i class="fa-solid fa-pen-to-square"></i>
										</a>
										<button type="submit" class="btn btn-danger" aria-label="Törlés">
											<i class="fa-solid fa-trash"></i>
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<Pagination totalItems={data.totalItems} />
</article>
