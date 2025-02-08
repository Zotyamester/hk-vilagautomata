<script lang="ts">
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';

	let { data } = $props();

	let colorScheme = $derived(getContext('colorScheme')());
	let invertedColorScheme = $derived(colorScheme === 'dark' ? 'light' : 'dark');
</script>

<div class="row my-1">
	<form action="/auth/?/login" method="post" use:enhance>
		<div class="row">
			<button type="submit" class="btn btn-success">One Click Login</button>
		</div>
	</form>
</div>

<div class="row">
	<a href="/auth/google" class="btn btn btn-outline-{invertedColorScheme} my-1">
		<img src="/google-color.svg" alt="Google Logo" width="32" class="me-2" />
		<span>Folytatás Google-fiókkal</span>
	</a>
	<a href="/auth/microsoft" class="btn btn btn-outline-{invertedColorScheme} my-1">
		<img src="/microsoft-color.svg" alt="Microsoft Logo" width="32" class="me-2" />
		<span>Folytatás Microsoft-fiókkal</span>
	</a>
</div>
