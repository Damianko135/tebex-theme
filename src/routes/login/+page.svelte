<script lang="ts">
	import SignInForm from './signin-form.svelte';
	import SignUpForm from './signup-form.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	let mode = $state<'signIn' | 'signUp'>('signIn');
</script>

<div class="mx-auto flex h-full max-w-sm flex-1 flex-col justify-center gap-4 px-4">
	{#if mode === 'signIn'}
		<SignInForm data={data.signInForm} />
		<p class="text-center text-sm text-muted-foreground">
			Don't have an account?
			<Button variant="link" size="sm" class="h-auto p-0" onclick={() => (mode = 'signUp')}>
				Sign up
			</Button>
		</p>
	{:else}
		<SignUpForm data={data.signUpForm} />
		<p class="text-center text-sm text-muted-foreground">
			Already have an account?
			<Button variant="link" size="sm" class="h-auto p-0" onclick={() => (mode = 'signIn')}>
				Sign in
			</Button>
		</p>
	{/if}
</div>
