<script lang="ts">
	import { theme } from '$lib/theme';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Bejelentkezés | Világautomata</title>
</svelte:head>

<main id="main" class="container">
	<section class="text-center my-4">
		{#if $theme.colorScheme === 'light'}
			<img src="/hk-light-mode.svg" class="img-fluid" alt="vik.hk" width="128" />
		{:else}
			<img src="/hk-dark-mode.svg" class="img-fluid" alt="vik.hk" width="128" />
		{/if}
	</section>

	{@render children()}
</main>
