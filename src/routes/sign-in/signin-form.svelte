<script lang="ts">
	import { untrack } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Spinner } from '$lib/components/ui/spinner';
	import { signInForm } from './schema';

	let { data }: { data: SuperValidated<Infer<typeof signInForm>> } = $props();

	const form = superForm(
		untrack(() => data),
		{
			id: 'signIn',
			validators: zod4Client(signInForm),
			onUpdated: ({ form }) => {
				if (form.message) toast.error(form.message);
			}
		}
	);

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Sign in</Card.Title>
		<Card.Description>Enter your email and password to continue.</Card.Description>
	</Card.Header>

	<form method="POST" use:enhance>
		<Card.Content class="flex flex-col gap-4">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							type="email"
							autocomplete="email"
							autofocus
							bind:value={$formData.email}
						/>
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
		</Card.Content>

		<Card.Footer>
			<Button type="submit" class="w-full" disabled={$submitting}>
				{#if $delayed}
					<Spinner data-icon="inline-start" />
				{/if}
				Sign in
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
