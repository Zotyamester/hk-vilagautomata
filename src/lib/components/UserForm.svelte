<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@prisma/client';

	let {
		form,
		initialUser,
		editingUser,
		primaryAction,
		secondaryAction
	}: { form; initialUser: User; editingUser: User; primaryAction: any; secondaryAction: any } =
		$props();
	let user = $state(initialUser);
	let isEditorAuthorized = editingUser.is_admin || editingUser.id === initialUser.id;
	console.log(isEditorAuthorized);
</script>

<form class="row g-3" action={primaryAction.url} method="post" use:enhance>
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
		<input
			type="name"
			class="form-control"
			id="name"
			name="name"
			value={user.name}
			disabled={!isEditorAuthorized}
		/>
	</div>
	<div class="col-md-8">
		<label for="pictureUrl" class="form-label">Profilkép URL</label>
		<input
			type="text"
			class="form-control"
			id="pictureUrl"
			name="pictureUrl"
			placeholder="https://gravatar.com/avatar/am9obmQ="
			bind:value={user.picture_url}
			disabled={!isEditorAuthorized}
		/>
	</div>
	<div class="col-md-4">
		<label for="wikiName" class="form-label">Wiki felhasználónév</label>
		<div class="input-group mb-3">
			<div class="input-group-text" id="wikiNameMarker">@</div>
			<input
				type="text"
				class="form-control {form?.errors?.wikiName ? 'is-invalid' : ''}"
				id="wikiName"
				name="wikiName"
				placeholder="johnd"
				aria-label="Wiki felhasználónév"
				aria-describedby="wikiNameMarker"
				bind:value={user.wiki_name}
				disabled={!isEditorAuthorized}
			/>
			{#if form?.errors?.wikiName}
				<div class="invalid-feedback">
					{form.errors.wikiName}
				</div>
			{/if}
		</div>
	</div>

	<div class="col-md-4">
		<div class="form-check">
			<input
				type="checkbox"
				class="form-check-input"
				role="switch"
				id="hasMandate"
				name={editingUser.is_admin ? 'hasMandate' : ''}
				bind:checked={user.has_mandate}
				disabled={!editingUser.is_admin}
			/>
			<label class="form-check-label" for="hasMandate">Mandátumos</label>
		</div>
		<div class="form-check">
			<input
				type="checkbox"
				class="form-check-input"
				role="switch"
				id="isAdmin"
				name={editingUser.is_admin ? 'isAdmin' : ''}
				bind:checked={user.is_admin}
				disabled={!editingUser.is_admin}
			/>
			<label class="form-check-label" for="isAdmin">Admin</label>
		</div>
		<div class="form-check">
			<input
				type="checkbox"
				class="form-check-input"
				role="switch"
				id="isActive"
				name={editingUser.is_admin ? 'isActive' : ''}
				bind:checked={user.is_active}
				disabled={!editingUser.is_admin}
			/>
			<label class="form-check-label" for="isActive">Aktív</label>
		</div>
	</div>

	<div class="col-12 mt-3">
		{#if isEditorAuthorized}
			<button type="submit" class="btn btn-success">{primaryAction.name}</button>
		{/if}
		<a href={secondaryAction.url} class="btn btn-danger">{secondaryAction.name}</a>
	</div>
</form>
