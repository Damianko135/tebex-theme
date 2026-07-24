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
	import { connectStoreForm } from './schema';

	let { data }: { data: SuperValidated<Infer<typeof connectStoreForm>> } = $props();

	const form = superForm(
		untrack(() => data),
		{
			id: 'connectStore',
			validators: zod4Client(connectStoreForm),
			onUpdated: ({ form }) => {
				if (form.message) toast.error(form.message);
			}
		}
	);

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Connect a store</Card.Title>
		<Card.Description>
			Enter your Tebex store's public token and secret key to connect it.
		</Card.Description>
	</Card.Header>

	<form method="POST" use:enhance>
		<Card.Content class="flex flex-col gap-4">
			<Form.Field {form} name="projectId">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Project ID</Form.Label>
						<Input {...props} autofocus bind:value={$formData.projectId} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="publicToken">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Public token</Form.Label>
						<Input {...props} autofocus bind:value={$formData.publicToken} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="secretKey">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Secret key</Form.Label>
						<Input {...props} type="password" bind:value={$formData.secretKey} />
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
				Connect
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
