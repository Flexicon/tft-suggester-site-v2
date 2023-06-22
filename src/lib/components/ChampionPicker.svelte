<script lang="ts">
	import type { Champion } from '$lib/types';

	export let champions: Champion[];
</script>

<div class="champions-grid">
	{#each champions as champ}
		<div>
			<img src={champ.image} alt="" />
		</div>
	{/each}
</div>

<style lang="postcss">
	.champions-grid {
		@apply grid gap-1 grid-cols-4 mb-8 sm:grid-cols-8 md:grid-cols-10;
		@apply lg:grid-cols-12 xl:grid-cols-[repeat(14,minmax(0,1fr))];
	}
</style>
