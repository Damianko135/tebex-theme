<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signInForm } from './schema';

	let { data }: { data: SuperValidated<Infer<typeof signInForm>> } = $props();

	const form = superForm(data, {
		id: 'signIn',
		validators: zod4Client(signInForm)
	});

	const { form: formData, errors, enhance, message } = form;
</script>

<form method="POST" action="?/signIn" use:enhance class="space-y-4">
	<div class="space-y-1 text-center">
		<h1 class="text-xl font-semibold">Sign in</h1>
		<p class="text-sm text-muted-foreground">Enter your email and password to continue.</p>
	</div>

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
					autocomplete="current-password"
					bind:value={$formData.password}
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

	<Form.Button class="w-full">Sign in</Form.Button>
</form>
