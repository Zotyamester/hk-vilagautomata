<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

	let colorScheme = $state('light');

	function adjustColorScheme(darkModePreferenceMatch: boolean) {
		colorScheme = darkModePreferenceMatch ? 'dark' : 'light';
		document.documentElement.setAttribute('data-bs-theme', colorScheme);
	}

	onMount(() => {
		adjustColorScheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			adjustColorScheme(event.matches);
		});
	});

	const routes = [
		{ name: 'Szavazások', path: '/votes' },
		{ name: 'Előterjesztések', path: '/proposals' },
		{ name: 'Beszámolók', path: '/reports' },
		{ name: 'Felhasználók', path: '/users' }
	];

	let activeRoute = $derived(routes.find((r) => page.url.pathname.startsWith(r.path)));
	let activePath = $derived(activeRoute?.path);
	let activeName = $derived(activeRoute?.name);
</script>

<svelte:head>
	<title>
		{activeName || 'Főoldal'} | Világautomata
	</title>
</svelte:head>

<header>
	<nav class="navbar navbar-expand-sm fixed-top bg-body-tertiary">
		<div class="container-fluid">
			<a href="/" class="navbar-brand">
				{#if colorScheme === 'light'}
					<img src="/hk-light-mode.svg" alt="vik.hk" width="32" />
				{:else}
					<img src="/hk-dark-mode.svg" alt="vik.hk" width="32" />
				{/if}
			</a>
			<button
				type="button"
				class="navbar-toggler"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto">
					{#each routes as route}
						<li class="nav-item">
							<a
								href={route.path}
								class="nav-link {route.path === activePath ? 'active' : ''}"
								aria-current={route.path === activePath}
							>
								{route.name}
							</a>
						</li>
					{/each}
				</ul>
				<ul class="navbar-nav d-flex ms-auto">
					<li><hr class="navbar-divider" /></li>
					<li class="nav-item">
						<a href="/users/{data.user.id}" class="nav-link text-center text-white">{data.user.name}</a>
					</li>
					<li class="nav-item align-self-center">
						<form action="/auth/?/logout" method="post">
							<button type="submit" class="btn btn-outline-warning btn-sm" aria-label="Kijelentkezés">
								<i class="fa-solid fa-right-from-bracket"></i>
							</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>

<main id="main" class="container mb-4">
	<div class="row">
		{@render children()}
	</div>
</main>

<style>
	main#main {
		margin-top: 5rem;
	}
</style>
