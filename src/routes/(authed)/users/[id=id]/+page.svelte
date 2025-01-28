<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';

	let { data, form } = $props();
</script>

<article>
	<h1>{data.editedUser.name} felhasználó módosítása</h1>

	<UserForm
		{form}
		initialUser={data.editedUser}
		primaryAction={{ url: '', name: 'Mentés' }}
		secondaryAction={{ url: '/users', name: 'Mégsem' }}
	/>
</article>
