<script lang="ts">
	import Icon from '@iconify/svelte';
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
		<li class="flex items-center gap-1">
			<button
				class="text-red-500 hover:text-red-600 hover:underline"
				on:click={() => dispatch('deselect', champ)}
			>
				<Icon icon="mdi:close-circle" />
			</button>
			<span>{champ.name}</span>
		</li>
	{/each}
</ul>
