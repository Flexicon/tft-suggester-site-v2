<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import '../app.css';
	import logo from '$lib/nav-logo.png';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { buildTime, versionHash } = data;
	const appName = 'TFT Suggester';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

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
	<h1 class="text-lg">
		<a href="/" class="flex items-center gap-2">
			<img width="40px" height="40px" alt="App logo" src={logo} />
			<span>{appName}</span>
		</a>
	</h1>
</div>

<main class="flex flex-col min-h-[calc(100vh-3.25rem)]">
	<div class="w-[1150px] 2xl:w-[1340px] max-w-full m-auto flex-auto">
		<div class="my-12 mx-6">
			<slot />
		</div>
	</div>

	<Footer {buildTime} {versionHash} />
</main>
