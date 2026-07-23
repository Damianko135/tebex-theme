<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { authClient } from '$lib/auth-client';

	let signingOut = $state(false);

	async function signOut() {
		signingOut = true;
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => goto(resolve('/'), { invalidateAll: true }),
				onError: ({ error }) => {
					toast.error(error.message || 'Failed to sign out, please try again.');
					signingOut = false;
				}
			}
		});
	}
</script>

<Button variant="ghost" size="sm" onclick={signOut} disabled={signingOut}>
	{#if signingOut}
		<Spinner data-icon="inline-start" />
	{/if}
	Sign out
</Button>
