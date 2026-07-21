<script lang="ts">
	import SignInForm from './form.svelte';
	import SignUpForm from './signup-form.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	let mode = $state<'signIn' | 'signUp'>('signIn');
</script>

<div class="mx-auto flex min-h-svh max-w-sm flex-col justify-center gap-6 px-4">
	{#if mode === 'signIn'}
		<SignInForm data={data.signInForm} />
		<p class="text-center text-sm text-muted-foreground">
			Don't have an account?
			<button
				type="button"
				class="text-foreground underline underline-offset-4"
				onclick={() => (mode = 'signUp')}
			>
				Sign up
			</button>
		</p>
	{:else}
		<SignUpForm data={data.signUpForm} />
		<p class="text-center text-sm text-muted-foreground">
			Already have an account?
			<button
				type="button"
				class="text-foreground underline underline-offset-4"
				onclick={() => (mode = 'signIn')}
			>
				Sign in
			</button>
		</p>
	{/if}
</div>
