<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import { Header } from '$lib/components/layout/header';
	import { Footer } from '$lib/components/layout/footer';
	import type { NavItem } from '$lib/components/layout/types.js';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const appName = 'Tebex';
	const navItems: NavItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Login', href: '/login' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Toaster />
<div class="flex min-h-svh flex-col">
	<Header {appName} {navItems}>
		{#snippet actions()}
			<ModeToggle />
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
