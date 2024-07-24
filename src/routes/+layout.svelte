<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	export let data: LayoutData;

	const { buildTime, versionHash } = data;

	const appName = 'TFT Suggester';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegisteredSW() {
					console.log('SW registered!');
				},
				onRegisterError(error) {
					console.error('SW registration error:', error);
				},
			});
		}
	});

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifestLink}
	{#if $page.data.title}
		<title>{$page.data.title} - {appName}</title>
	{:else}
		<title>{appName}</title>
	{/if}
</svelte:head>

<div class="py-3 px-4 bg-stone-800 text-white">
	<h1 class="text-lg"><a href="/">{appName}</a></h1>
</div>

<main class="flex flex-col min-h-[calc(100vh-3.25rem)]">
	<div class="w-[1150px] 2xl:w-[1340px] max-w-full m-auto flex-auto">
		<div class="my-12 mx-6">
			<slot />
		</div>
	</div>

	<Footer {buildTime} {versionHash} />
</main>
