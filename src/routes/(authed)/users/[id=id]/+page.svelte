<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';

	let { data, form } = $props();

	let isEditorAuthorized = data.user.is_admin || data.user.id === data.editedUser.id;
</script>

<article>
	<h1>{data.editedUser.name} felhasználó {isEditorAuthorized ? 'módosítása' : 'megtekintése'}</h1>

	<UserForm
		{form}
		initialUser={data.editedUser}
		editingUser={data.user}
		primaryAction={{ url: '', name: 'Mentés' }}
		secondaryAction={{ url: '/users', name: 'Mégsem' }}
	/>
</article>
