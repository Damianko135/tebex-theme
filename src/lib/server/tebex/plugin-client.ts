const PLUGIN_API_BASE = 'https://plugin.tebex.io';

export class TebexPluginApiError extends Error {
	constructor(
		message: string,
		public status?: number
	) {
		super(message);
		this.name = 'TebexPluginApiError';
	}
}

export interface TebexWebstoreInformation {
	account: {
		id: number | string;
		name: string;
		currency?: { iso_4217?: string };
		domain?: string;
	};
}

export async function getWebstoreInformation(secretKey: string): Promise<TebexWebstoreInformation> {
	let response: Response;
	try {
		response = await fetch(`${PLUGIN_API_BASE}/information`, {
			headers: { 'X-Tebex-Secret': secretKey }
		});
	} catch {
		throw new TebexPluginApiError('Could not reach Tebex');
	}

	if (!response.ok) {
		if (response.status === 401 || response.status === 403) {
			throw new TebexPluginApiError('Invalid secret key', response.status);
		}
		throw new TebexPluginApiError(`Tebex returned ${response.status}`, response.status);
	}

	return response.json();
}
