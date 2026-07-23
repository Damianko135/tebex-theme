<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold">Your stores</h1>
			<p class="text-sm text-muted-foreground">Tebex stores connected to your account.</p>
		</div>
		<Button href={resolve('/dashboard/connect')}>Connect a store</Button>
	</div>

	{#if data.stores.length === 0}
		<Card.Root>
			<Card.Content class="py-10 text-center text-sm text-muted-foreground">
				No stores connected yet.
			</Card.Content>
		</Card.Root>
	{:else}
		<div class="flex flex-col gap-4">
			{#each data.stores as store (store.id)}
				<Card.Root>
					<Card.Header>
						<Card.Title>{store.name}</Card.Title>
						<Card.Description>
							{#if store.currency}{store.currency} ·
							{/if}Account {store.tebexAccountId ?? '—'}
						</Card.Description>
						<Card.Action>
							<form method="POST" action="?/disconnect" use:enhance>
								<input type="hidden" name="id" value={store.id} />
								<Button type="submit" variant="destructive" size="sm">Disconnect</Button>
							</form>
						</Card.Action>
					</Card.Header>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
