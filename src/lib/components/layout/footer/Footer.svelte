<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { SocialLink } from '../types.js';
	import { APP_NAME } from '$lib/constants.js';
	import { nav } from '../nav-items.js';

	let {
		ref = $bindable(null),
		class: className,
		socialLinks = [],
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
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
			<a href={resolve('/')} class="font-medium text-foreground hover:underline">{APP_NAME}</a>
			<span class="ms-1">© {year}. All rights reserved.</span>
		</p>

		{#if nav.items.length}
			<nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
				{#each nav.items as item (item.href)}
					<!-- eslint-disable svelte/no-navigation-without-resolve -- item.href is already resolve()d in nav-items.ts -->
					<a
						href={item.href}
						data-sveltekit-preload-data={item.preloadData}
						data-sveltekit-preload-code={item.preloadCode}
						class="hover:text-foreground"
					>
						{item.label}
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
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
