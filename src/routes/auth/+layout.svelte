<script lang="ts">
    import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

    let { children }: {  children: Snippet } = $props();

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
</script>

<svelte:head>
	<title>
		Világautomata
	</title>
</svelte:head>

<main id="main" class="container">
    <section class="text-center my-4">
        {#if colorScheme === 'light'}
            <img src="/hk-light-mode.svg" class="img-fluid" alt="vik.hk" width="128" />
        {:else}
            <img src="/hk-dark-mode.svg" class="img-fluid" alt="vik.hk" width="128" />
        {/if}
    </section>
    
    {@render children()}
</main>
