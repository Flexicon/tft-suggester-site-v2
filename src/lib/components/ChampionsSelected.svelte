<script lang="ts">
	import type { Champion } from '$lib/types';

	export let selected: Champion[];
</script>

{#if selected.length}
	<p>Selected:</p>
{/if}

<ul>
	{#each selected as champ}
		<li>{champ.name}</li>
	{/each}
</ul>
