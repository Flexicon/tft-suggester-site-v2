<script lang="ts">
	import type { Champion } from '$lib/types';

	export let selected: Champion[];
</script>

<p>Selected:</p>

<ul>
	{#each selected as champ}
		<li>{champ.name}</li>
	{/each}
</ul>
