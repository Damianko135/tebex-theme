<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
	import LightToggle from '$lib/components/light-toggle.svelte';
	import { APP_NAME } from '$lib/constants.js';
	import { nav } from '../nav-items.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

	const isMobile = new IsMobile();
	let mobileOpen = $state(false);

	$effect(() => {
		if (!isMobile.current) mobileOpen = false;
	});
</script>

<header
	bind:this={ref}
	data-slot="header"
	class={cn(
		'sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60',
		className
	)}
	{...restProps}
>
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
		<a href={resolve('/')} class="shrink-0 text-sm font-semibold">
			{APP_NAME}
		</a>

		{#if nav.items.length}
			<NavigationMenu.Root viewport={false} class="hidden md:flex">
				<NavigationMenu.List>
					{#each nav.items as item (item.href)}
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={item.href}
								data-active={page.url.pathname === item.href}
								data-sveltekit-preload-data={item.preloadData}
								data-sveltekit-preload-code={item.preloadCode}
							>
								{item.label}
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					{/each}
				</NavigationMenu.List>
			</NavigationMenu.Root>
		{/if}

		<div class="flex shrink-0 items-center gap-2">
			<ButtonGroup.Root>
				<LightToggle />
				{#if page.data.user}
					<!--
						A full-reload link rather than a client-side authClient.signOut()
						call: entering /logout via a fresh document load guarantees every
						piece of client-side state (stores, in-memory caches) is discarded,
						rather than relying on invalidateAll() to catch everything.
					-->
					<Button href={resolve('/logout')} data-sveltekit-reload variant="ghost" size="sm">
						Sign out
					</Button>
				{:else}
					<Button
						href={resolve('/sign-in')}
						data-sveltekit-preload-data="off"
						variant="ghost"
						size="sm"
					>
						Login
					</Button>
				{/if}
			</ButtonGroup.Root>

			{#if nav.items.length}
				<Sheet.Root bind:open={mobileOpen}>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="md:hidden"
								aria-label="Open menu"
							>
								<MenuIcon />
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>{APP_NAME}</Sheet.Title>
							<Sheet.Description class="sr-only">Site navigation</Sheet.Description>
						</Sheet.Header>
						<nav class="flex flex-col gap-1 px-4 pb-4">
							{#each nav.items as item (item.href)}
								<!-- eslint-disable svelte/no-navigation-without-resolve -- item.href is already resolve()d in nav-items.ts -->
								<a
									href={item.href}
									data-sveltekit-preload-data={item.preloadData}
									data-sveltekit-preload-code={item.preloadCode}
									class={cn(
										'rounded-lg px-3 py-2 text-sm hover:bg-muted',
										page.url.pathname === item.href && 'bg-muted/50 font-medium'
									)}
									onclick={() => (mobileOpen = false)}
								>
									{item.label}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			{/if}
		</div>
	</div>
</header>
