import { desc, eq, and } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { projects } from '$lib/server/db/tebex.schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, platform }) => {
	const db = getDb(platform!.env.DB);
	const stores = await db.query.projects.findMany({
		where: eq(projects.userId, locals.user!.id),
		orderBy: desc(projects.createdAt)
	});

	return { stores };
};

export const actions: Actions = {
	disconnect: async ({ request, locals, platform }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (typeof id !== 'string' || !id) {
			return fail(400, { error: 'Missing store id' });
		}

		const db = getDb(platform!.env.DB);
		await db.delete(projects).where(and(eq(projects.id, id), eq(projects.userId, locals.user!.id)));
	}
};
