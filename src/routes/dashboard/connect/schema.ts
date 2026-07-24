import { z } from 'zod';

export const connectStoreForm = z.object({
	projectId: z.string().min(1, 'Project ID is required'),
	publicToken: z.string().min(1, 'Public token is required'),
	secretKey: z.string().min(1, 'Secret key is required')
});

export type ConnectStoreForm = typeof connectStoreForm;
