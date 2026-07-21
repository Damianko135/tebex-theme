import type { Component } from 'svelte';
import type { Pathname } from '$app/types';

export type NavItem = {
	label: string;
	href: Pathname;
};

export type SocialLink = {
	label: string;
	href: string;
	icon: Component;
};
