<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import SignUpForm from './signup-form.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex h-full max-w-sm flex-1 flex-col justify-center gap-4 px-4">
	<SignUpForm data={data.signUpForm} />
	<p class="text-center text-sm text-muted-foreground">
		Already have an account?
		<Button href={resolve('/sign-in')} variant="link" size="sm" class="h-auto p-0">Sign in</Button>
	</p>
</div>
