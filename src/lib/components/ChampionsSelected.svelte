<script lang="ts">
	import type { Champion } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selected: Champion[];
</script>

{#if selected.length}
	<p>Selected:</p>
{/if}

<ul>
	{#each selected as champ}
		<li>
			<span>{champ.name}</span>
			<button
				class="text-blue-500 hover:text-blue-800 hover:underline"
				on:click={() => dispatch('deselect', champ)}>x</button
			>
		</li>
	{/each}
</ul>
