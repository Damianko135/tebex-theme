import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { APIError } from 'better-auth/api';
import { signInForm, signUpForm } from './schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}

	return {
		signInForm: await superValidate(zod4(signInForm), { id: 'signIn' }),
		signUpForm: await superValidate(zod4(signUpForm), { id: 'signUp' })
	};
};

export const actions: Actions = {
	signIn: async (event) => {
		const form = await superValidate(event, zod4(signInForm), { id: 'signIn' });

		if (!form.valid) {
			return fail(400, { signInForm: form });
		}

		try {
			await event.locals.auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password
				}
			});
		} catch (error) {
			if (!(error instanceof APIError)) console.error('[signIn]', error);
			const errorMessage =
				error instanceof APIError ? error.message : 'Unexpected error, please try again.';
			message(form, errorMessage, { status: 400 });
			return fail(400, { signInForm: form });
		}

		return redirect(302, '/');
	},

	signUp: async (event) => {
		const form = await superValidate(event, zod4(signUpForm), { id: 'signUp' });

		if (!form.valid) {
			return fail(400, { signUpForm: form });
		}

		try {
			await event.locals.auth.api.signUpEmail({
				body: {
					name: form.data.name,
					email: form.data.email,
					password: form.data.password
				}
			});
		} catch (error) {
			if (!(error instanceof APIError)) console.error('[signUp]', error);
			const errorMessage =
				error instanceof APIError ? error.message : 'Unexpected error, please try again.';
			message(form, errorMessage, { status: 400 });
			return fail(400, { signUpForm: form });
		}

		return redirect(302, '/');
	}
};
