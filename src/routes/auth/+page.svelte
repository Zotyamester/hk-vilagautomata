<script lang="ts">
	let { data } = $props();
</script>

<div class="row my-1">
	<form
		action="/auth/?/login"
		method="post"
	>
		<div class="row">
			<button type="submit" class="btn btn-success">One Click Login</button>
		</div>
	</form>
</div>

<div class="row">
	<a href="/auth/google" class="btn btn btn-outline-primary my-1">Login With Google</a>
	<a href="/auth/microsoft" class="btn btn btn-outline-secondary my-1">Login With Microsoft</a>
</div>
