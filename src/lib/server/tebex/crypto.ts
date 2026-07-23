import { env } from '$env/dynamic/private';

const ALGORITHM = 'AES-GCM';
const IV_LENGTH = 12;

let keyPromise: Promise<CryptoKey> | undefined;

function getKey(): Promise<CryptoKey> {
	if (!keyPromise) {
		if (!env.TEBEX_ENCRYPTION_KEY) {
			throw new Error('TEBEX_ENCRYPTION_KEY is not set');
		}
		const raw = Uint8Array.from(atob(env.TEBEX_ENCRYPTION_KEY), (c) => c.charCodeAt(0));
		keyPromise = crypto.subtle.importKey('raw', raw, ALGORITHM, false, ['encrypt', 'decrypt']);
	}
	return keyPromise;
}

function toBase64(bytes: Uint8Array): string {
	return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string): Uint8Array {
	return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

export async function encryptSecret(plaintext: string): Promise<string> {
	const key = await getKey();
	const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const ciphertext = new Uint8Array(
		await crypto.subtle.encrypt({ name: ALGORITHM, iv }, key, new TextEncoder().encode(plaintext))
	);

	const combined = new Uint8Array(iv.length + ciphertext.length);
	combined.set(iv, 0);
	combined.set(ciphertext, iv.length);
	return toBase64(combined);
}

export async function decryptSecret(payload: string): Promise<string> {
	const key = await getKey();
	const combined = fromBase64(payload);
	const iv = combined.slice(0, IV_LENGTH);
	const ciphertext = combined.slice(IV_LENGTH);

	const plaintext = await crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, ciphertext);
	return new TextDecoder().decode(plaintext);
}
