<script lang="ts">
	import { untrack } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { signUpForm } from './schema';

	let { data }: { data: SuperValidated<Infer<typeof signUpForm>> } = $props();

	const form = superForm(
		untrack(() => data),
		{
			id: 'signUp',
			validators: zod4Client(signUpForm)
		}
	);

	const { form: formData, errors, enhance, message, submitting, delayed } = form;
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your details to get started.</Card.Description>
	</Card.Header>

	<form method="POST" action="?/signUp" use:enhance>
		<Card.Content class="flex flex-col gap-4">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input {...props} autocomplete="name" autofocus bind:value={$formData.name} />
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

			{#if $message || $errors._errors}
				<p role="alert" class="text-sm text-destructive">
					{$message ?? $errors._errors?.join(', ')}
				</p>
			{/if}
		</Card.Content>

		<Card.Footer>
			<Button type="submit" class="w-full" disabled={$submitting}>
				{#if $delayed}
					<LoaderCircleIcon class="animate-spin" />
				{/if}
				Sign up
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
