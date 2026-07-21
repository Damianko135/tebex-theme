<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signUpForm } from './schema';

	let { data }: { data: SuperValidated<Infer<typeof signUpForm>> } = $props();

	const form = superForm(data, {
		id: 'signUp',
		validators: zod4Client(signUpForm)
	});

	const { form: formData, errors, enhance, message } = form;
</script>

<form method="POST" action="?/signUp" use:enhance class="space-y-4">
	<div class="space-y-1 text-center">
		<h1 class="text-xl font-semibold">Create an account</h1>
		<p class="text-sm text-muted-foreground">Enter your details to get started.</p>
	</div>

	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} autocomplete="name" bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} type="email" autocomplete="email" bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input
					{...props}
					type="password"
					autocomplete="new-password"
					bind:value={$formData.password}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="confirmPassword">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Confirm password</Form.Label>
				<Input
					{...props}
					type="password"
					autocomplete="new-password"
					bind:value={$formData.confirmPassword}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if $message}
		<p class="text-sm text-destructive">{$message}</p>
	{/if}
	{#if $errors._errors}
		<p class="text-sm text-destructive">{$errors._errors.join(', ')}</p>
	{/if}

	<Form.Button class="w-full">Sign up</Form.Button>
</form>
