<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';

	let { data } = $props();
</script>

<article>
	<h1 class="text-center text-md-start"><i class="fa-solid fa-user"></i> Felhasználók</h1>

	<section class="row row-cols-1 row-cols-lg-2">
		{#each data.users as user}
			<div class="col">
				<article class="card mb-3">
					<div class="row g-0">
						<div class="col-2 ps-3 d-flex justify-content-center align-items-center">
							{#if data.user.picture_url}
								<img
									src={user.picture_url}
									class="img-fluid rounded-circle"
									alt={user.name}
									crossorigin="anonymous"
									referrerpolicy="no-referrer"
								/>
							{/if}
						</div>
						<div class="col-10">
							<div class="card-body">
								<h5 class="card-title">
									<a href="/users/{user.id}">{user.name}</a>
									{#if user.sessions.length > 0}
										<i class="fa-solid fa-circle fs-6 text-success glow" title="Bejelentkezve"></i>
									{/if}
								</h5>
								<section class="d-flex flex-row">
									<div class="card-text text-muted flex-grow-1">{user.wiki_name}</div>
									<div class="align-self-end">
										{#if user.has_mandate}
											<i class="fa-solid fa-user-tie" title="Mandátumos"></i>
										{/if}
										{#if user.is_admin}
											<i class="fa-solid fa-server" title="Admin"></i>
										{/if}
										{#if user.is_active}
											<i class="fa-solid fa-circle-check" title="Aktív"></i>
										{/if}
									</div>
								</section>
							</div>
						</div>
					</div>
				</article>
			</div>
		{/each}
	</section>

	<Pagination totalItems={data.totalItems} />
</article>

<style>
	.glow {
		animation: pulse 1.6s infinite;
	}

	@keyframes pulse {
		0% {
			text-shadow: 0 0 2px rgb(25, 135, 84);
		}
		50% {
			text-shadow: 0 0 6px rgb(25, 135, 84);
		}
		100% {
			text-shadow: 0 0 2px rgb(25, 135, 84);
		}
	}
</style>
