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

<div class="py-3 px-2 bg-zinc-800 text-white">
	<h1 class="text-lg">{appName}</h1>
</div>

<div class="w-[1150px] 2xl:w-[1340px] max-w-full m-auto">
	<div class="my-12 mx-6">
		<slot />
	</div>
</div>
