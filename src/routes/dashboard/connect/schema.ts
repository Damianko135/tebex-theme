import { z } from 'zod';

export const connectStoreForm = z.object({
	publicToken: z.string().min(1, 'Public token is required'),
	secretKey: z.string().min(1, 'Secret key is required')
});

export type ConnectStoreForm = typeof connectStoreForm;
