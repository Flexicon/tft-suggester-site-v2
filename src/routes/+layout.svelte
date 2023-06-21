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

<div>
	<slot />
</div>
