<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import SignInForm from './signin-form.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex h-full max-w-sm flex-1 flex-col justify-center gap-4 px-4">
	<SignInForm data={data.signInForm} />
	<p class="text-center text-sm text-muted-foreground">
		Don't have an account?
		<Button href={resolve('/sign-up')} variant="link" size="sm" class="h-auto p-0">Sign up</Button>
	</p>
</div>
