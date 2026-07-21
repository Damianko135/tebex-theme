<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { NavItem, SocialLink } from '../types.js';

	let {
		ref = $bindable(null),
		class: className,
		appName,
		navItems = [],
		socialLinks = [],
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		appName: string;
		navItems?: NavItem[];
		socialLinks?: SocialLink[];
	} = $props();

	const year = new Date().getFullYear();
</script>

<footer
	bind:this={ref}
	data-slot="footer"
	class={cn('w-full border-t bg-background', className)}
	{...restProps}
>
	<div
		class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between"
	>
		<p>
			<a href={resolve('/')} class="font-medium text-foreground hover:underline">{appName}</a>
			<span class="ms-1">© {year}. All rights reserved.</span>
		</p>

		{#if navItems.length}
			<nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
				{#each navItems as item (item.href)}
					<a href={resolve(item.href)} class="hover:text-foreground">
						{item.label}
					</a>
				{/each}
			</nav>
		{/if}

		{#if socialLinks.length}
			<div class="flex items-center gap-1">
				{#each socialLinks as link (link.href)}
					<Button
						href={link.href}
						target="_blank"
						rel="noreferrer noopener"
						variant="ghost"
						size="icon"
						aria-label={link.label}
					>
						<link.icon />
					</Button>
				{/each}
			</div>
		{/if}
	</div>
</footer>
