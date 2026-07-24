import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { getDb } from '$lib/server/db';
import { projects } from '$lib/server/db/tebex.schema';
import { encryptSecret } from '$lib/server/tebex/crypto';
import { getWebstoreInformation, TebexPluginApiError } from '$lib/server/tebex/plugin-client';
import { getHeadlessWebstore, TebexHeadlessApiError } from '$lib/server/tebex/headless-client';
import { connectStoreForm } from './schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		connectStoreForm: await superValidate(zod4(connectStoreForm), { id: 'connectStore' })
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(connectStoreForm), { id: 'connectStore' });

		if (!form.valid) {
			return fail(400, { connectStoreForm: form });
		}

		let info;
		try {
			info = await getWebstoreInformation(form.data.secretKey);
		} catch (error) {
			if (!(error instanceof TebexPluginApiError)) console.error('[tebex.connect]', error);
			const errorMessage =
				error instanceof TebexPluginApiError
					? error.message
					: 'Could not verify these keys with Tebex, please try again.';
			message(form, errorMessage, { status: 400 });
			return fail(400, { connectStoreForm: form });
		}

		if (String(info.account.id) !== form.data.projectId) {
			message(form, "This secret key doesn't belong to the project ID you entered.", {
				status: 400
			});
			return fail(400, { connectStoreForm: form });
		}

		let webstore;
		try {
			webstore = await getHeadlessWebstore(form.data.publicToken);
		} catch (error) {
			if (!(error instanceof TebexHeadlessApiError)) console.error('[tebex.connect]', error);
			const errorMessage =
				error instanceof TebexHeadlessApiError
					? error.message
					: 'Could not verify the public token with Tebex, please try again.';
			message(form, errorMessage, { status: 400 });
			return fail(400, { connectStoreForm: form });
		}

		if (String(webstore.id) !== form.data.projectId) {
			message(form, "This public token doesn't belong to the project ID you entered.", {
				status: 400
			});
			return fail(400, { connectStoreForm: form });
		}

		const db = getDb(event.platform!.env.DB);
		try {
			await db.insert(projects).values({
				userId: event.locals.user!.id,
				name: info.account.name,
				publicToken: form.data.publicToken,
				secretKeyEnc: await encryptSecret(form.data.secretKey),
				tebexAccountId: form.data.projectId,
				currency: info.account.currency?.iso_4217
			});
		} catch (error) {
			console.error('[tebex.connect]', error);
			message(form, 'This store is already connected.', { status: 400 });
			return fail(400, { connectStoreForm: form });
		}

		return redirect(302, '/dashboard');
	}
};
