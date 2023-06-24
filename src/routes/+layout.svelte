<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { buildTime, versionHash } = data;

	const appName = 'TFT Suggester';
</script>

<svelte:head>
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
