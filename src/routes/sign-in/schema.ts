import { z } from 'zod';

export const signInForm = z.object({
	email: z.email(),
	password: z.string().min(8).max(50)
});

export type SignInForm = typeof signInForm;
