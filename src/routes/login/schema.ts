import { z } from 'zod';

export const signInForm = z.object({
	email: z.email(),
	password: z.string().min(8).max(50)
});

export const signUpForm = z
	.object({
		name: z.string().min(2).max(50),
		email: z.email(),
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export type SignUpForm = typeof signUpForm;
export type SignInForm = typeof signInForm;
