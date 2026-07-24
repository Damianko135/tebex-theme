import { resolve } from '$app/paths';
import { page } from '$app/state';
import type { NavItem } from './types.js';

export const nav = {
	get items(): NavItem[] {
		return page.data.user
			? [
					{ label: 'Home', href: resolve('/') },
					// Primary destination for a signed-in user - worth preloading the
					// code eagerly so the transition feels instant.
					{ label: 'Dashboard', href: resolve('/dashboard'), preloadCode: 'eager' }
				]
			: [
					{ label: 'Home', href: resolve('/') },
					// Low-value to preload speculatively on every hover across the
					// site for visitors who never click it.
					{ label: 'Login', href: resolve('/sign-in'), preloadData: 'off' }
				];
	}
};
