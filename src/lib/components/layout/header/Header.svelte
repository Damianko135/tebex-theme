<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { NavItem } from '../types.js';

	let {
		ref = $bindable(null),
		class: className,
		appName,
		navItems = [],
		actions,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		appName: string;
		navItems?: NavItem[];
		actions?: Snippet;
	} = $props();

	let mobileOpen = $state(false);
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
			{appName}
		</a>

		{#if navItems.length}
			<NavigationMenu.Root viewport={false} class="hidden md:flex">
				<NavigationMenu.List>
					{#each navItems as item (item.href)}
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={resolve(item.href)}
								data-active={page.url.pathname === resolve(item.href)}
							>
								{item.label}
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					{/each}
				</NavigationMenu.List>
			</NavigationMenu.Root>
		{/if}

		<div class="flex shrink-0 items-center gap-2">
			{@render actions?.()}

			{#if navItems.length}
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
							<Sheet.Title>{appName}</Sheet.Title>
							<Sheet.Description class="sr-only">Site navigation</Sheet.Description>
						</Sheet.Header>
						<nav class="flex flex-col gap-1 px-4 pb-4">
							{#each navItems as item (item.href)}
								<a
									href={resolve(item.href)}
									class={cn(
										'rounded-lg px-3 py-2 text-sm hover:bg-muted',
										page.url.pathname === resolve(item.href) && 'bg-muted/50 font-medium'
									)}
									onclick={() => (mobileOpen = false)}
								>
									{item.label}
								</a>
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			{/if}
		</div>
	</div>
</header>
