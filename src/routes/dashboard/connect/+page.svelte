<script lang="ts">
	import ConnectForm from './connect-form.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex h-full max-w-sm flex-1 flex-col justify-center gap-4 px-4">
	<ConnectForm data={data.connectStoreForm} />
</div>
