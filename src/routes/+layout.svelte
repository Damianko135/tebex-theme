<script lang="ts">
	import { goto } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import { toast } from 'svelte-sonner';
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import LightToggle from '$lib/components/light-toggle.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Header } from '$lib/components/layout/header';
	import { Footer } from '$lib/components/layout/footer';
	import type { NavItem } from '$lib/components/layout/types.js';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { authClient } from '$lib/auth-client';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const appName = 'Tebex';
	const navItems: NavItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Login', href: '/login' }
	];

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Toaster />
<div class="flex min-h-svh flex-col">
	<Header {appName} {navItems}>
		{#snippet actions()}
			<LightToggle />
			{#if data.user}
				<Button variant="ghost" size="sm" onclick={signOut} disabled={signingOut}>
					{#if signingOut}
						<LoaderCircleIcon class="animate-spin" />
					{/if}
					Sign out
				</Button>
			{:else}
				<Button href={resolve('/login')} variant="ghost" size="sm">Login</Button>
			{/if}
		{/snippet}
	</Header>
	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
	<Footer {appName} {navItems} />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>
