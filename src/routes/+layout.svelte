<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	const appName = 'TFT Suggester';
</script>

<svelte:head>
	{#if $page.data.title}
		<title>{$page.data.title} - {appName}</title>
	{:else}
		<title>{appName}</title>
	{/if}
</svelte:head>

<h1 class="p-4 text-xl bg-zinc-700 text-white">{appName}</h1>

<div class="w-[1200px] max-w-full m-auto">
	<div class="my-12 mx-6">
		<slot />
	</div>
</div>
