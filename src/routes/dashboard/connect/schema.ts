import { z } from 'zod';

export const connectStoreForm = z.object({
	projectId: z.string().regex(/^\d+$/, "Project ID must be your Tebex store's numeric account ID"),
	publicToken: z.string().min(1, 'Public token is required'),
	secretKey: z.string().min(1, 'Secret key is required')
});

export type ConnectStoreForm = typeof connectStoreForm;
