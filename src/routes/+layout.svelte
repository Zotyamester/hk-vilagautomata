<script lang="ts">
	import { theme } from '$lib/theme';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	let { children }: { children: Snippet } = $props();

	function adjustColorScheme(darkModePreferenceMatch: boolean) {
		theme.update((t) => {
			t.setColorScheme(darkModePreferenceMatch ? 'dark' : 'light');
			return t;
		});
		document.documentElement.setAttribute('data-bs-theme', $theme.colorScheme);
	}

	onMount(() => {
		adjustColorScheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			adjustColorScheme(event.matches);
		});
	});
</script>

<svelte:head>
	<title>Világautomata</title>
</svelte:head>

{@render children()}
