<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { toast } from 'svelte-sonner';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { authClient } from '$lib/auth-client';

	onMount(() => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => goto(resolve('/'), { invalidateAll: true }),
				onError: ({ error }) => {
					toast.error(error.message || 'Failed to sign out, please try again.');
					goto(resolve('/'));
				}
			}
		});
	});
</script>

<div class="mx-auto flex h-full flex-1 flex-col items-center justify-center gap-4 px-4">
	<Spinner class="size-8" />
	<p class="text-sm text-muted-foreground">Signing you out…</p>
</div>
