<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';

	let { data } = $props();
</script>

<article>
	<h1>{data.editedUser.name} felhasználó módosítása</h1>
    
	<UserForm user={data.editedUser} action={{ url: '', name: 'Mentés' }} />
</article>
