<script lang="ts">
	import { page } from '$app/state';
	import type { User } from '@prisma/client';

	let {
		form,
		initialUser,
		primaryAction,
		secondaryAction
	}: { form; initialUser: User; primaryAction: any; secondaryAction: any } = $props();
	let user = $state(initialUser);
</script>

<form class="row g-3" action={primaryAction.url} method="post">
	<div class="col-md-6">
		<label for="email" class="form-label">E-mail cím</label>
		<input
			type="email"
			class="form-control"
			id="email"
			name="email"
			bind:value={user.email}
			disabled
			readonly
		/>
	</div>
	<div class="col-md-6">
		<label for="name" class="form-label">Név</label>
		<input type="name" class="form-control" id="name" name="name" value={user.name} />
	</div>
	<div class="col-md-8">
		<label for="pictureUrl" class="form-label">Profilkép URL</label>
		<input
			type="text"
			class="form-control"
			id="pictureUrl"
			placeholder="https://gravatar.com/avatar/am9obmQ="
			bind:value={user.picture_url}
		/>
	</div>
	<div class="col-md-4">
		<label for="wikiName" class="form-label">Wiki felhasználónév</label>
		<div class="input-group has-validation mb-3">
			<span class="input-group-text" id="wikiNameMarker">@</span>
			<input
				type="text"
				class="form-control {form?.errors?.wikiName ? 'is-invalid' : ''}"
				id="wikiName"
				name="wikiName"
				placeholder="johnd"
				aria-label="Wiki felhasználónév"
				aria-describedby="wikiNameMarker"
				bind:value={user.wiki_name}
			/>
			{#if form?.errors?.wikiName}
				<div class="invalid-feedback">
					{form.errors.wikiName}
				</div>
			{/if}
		</div>
	</div>

	<div class="col-sm-4 d-sm-flex justify-content-center">
		<div class="p-1 rounded border">
			<div class="form-check form-switch">
				<input
					type="checkbox"
					class="form-check-input"
					role="switch"
					id="hasMandate"
					name="hasMandate"
					bind:checked={user.has_mandate}
				/>
				<label class="form-check-label" for="hasMandate">Mandátumos</label>
			</div>
		</div>
	</div>
	<div class="col-sm-4 d-sm-flex justify-content-center">
		<div class="p-1 rounded border">
			<div class="form-check form-switch">
				<input
					type="checkbox"
					class="form-check-input"
					role="switch"
					id="isAdmin"
					name="isAdmin"
					bind:checked={user.is_admin}
				/>
				<label class="form-check-label" for="isAdmin">Admin</label>
			</div>
		</div>
	</div>
	<div class="col-sm-4 d-sm-flex justify-content-center">
		<div class="p-1 rounded border">
			<div class="form-check form-switch">
				<input
					type="checkbox"
					class="form-check-input"
					role="switch"
					id="isActive"
					name="isActive"
					bind:checked={user.is_active}
				/>
				<label class="form-check-label" for="isActive">Aktív</label>
			</div>
		</div>
	</div>

	<div class="col-12 mt-3">
		<button type="submit" class="btn btn-success">{primaryAction.name}</button>
		<a href={secondaryAction.url} class="btn btn-danger">{secondaryAction.name}</a>
	</div>
</form>
