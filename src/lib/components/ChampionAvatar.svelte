<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let champion: Champion;
	// export let cancellable: boolean = false;
	// export let selected: boolean = false;
	// export let noItems: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="champion-avatar cursor-pointer" on:click={() => dispatch('click')}>
	<img src={champion.image} alt={champion.name} title={champion.name} />
</div>
