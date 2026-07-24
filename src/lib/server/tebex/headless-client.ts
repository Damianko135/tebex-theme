import type { components } from '$lib/tebex/headless/schema';

const HEADLESS_API_BASE = 'https://headless.tebex.io/api/accounts';

export class TebexHeadlessApiError extends Error {
	constructor(
		message: string,
		public status?: number
	) {
		super(message);
		this.name = 'TebexHeadlessApiError';
	}
}

export async function getHeadlessWebstore(
	publicToken: string
): Promise<components['schemas']['Webstore']> {
	let response: Response;
	try {
		response = await fetch(`${HEADLESS_API_BASE}/${encodeURIComponent(publicToken)}`);
	} catch {
		throw new TebexHeadlessApiError('Could not reach Tebex');
	}

	if (!response.ok) {
		if (response.status === 404) {
			throw new TebexHeadlessApiError('Invalid public token', response.status);
		}
		throw new TebexHeadlessApiError(`Tebex returned ${response.status}`, response.status);
	}

	const body = (await response.json()) as components['schemas']['WebstoreResponse'];
	if (!body.data) {
		throw new TebexHeadlessApiError('Tebex returned an unexpected response');
	}
	return body.data;
}
