import type { Component } from 'svelte';

export type PreloadData = 'hover' | 'tap' | 'off';
export type PreloadCode = 'eager' | 'viewport' | 'hover' | 'tap' | 'off';

export type NavItem = {
	label: string;
	/** Already resolved via `resolve()` - use directly as an `href`. */
	href: string;
	preloadData?: PreloadData;
	preloadCode?: PreloadCode;
};

export type SocialLink = {
	label: string;
	href: string;
	icon: Component;
};
