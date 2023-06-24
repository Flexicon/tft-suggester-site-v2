<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let champion: Champion;
	export let cancellable: boolean = false;
	export let selected: boolean = false;
	export let noItems: boolean = false;

	function onClick() {
		dispatch('click');
	}
</script>

<div
	class={`champion-avatar c${champion.cost}`}
	class:selected
	on:click={onClick}
	on:keydown={onClick}
>
	{#if cancellable}<span class="close-icon"><Icon icon="mdi:close-circle" /></span>{/if}
	{#if selected}<span class="selected-icon"><Icon icon="mdi:check-circle" /></span>{/if}
	<img class="avatar-image" src={champion.image} alt={champion.name} title={champion.name} />

	{#if !noItems && champion.items}
		<div class="item-images">
			{#each champion.items as item}
				<img src={item.image} alt={item.name} />
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.champion-avatar {
		position: relative;
		cursor: pointer;
		border-width: 3px;
		border-style: solid;
		border-radius: 3px;
		aspect-ratio: 1 / 1;
	}

	.avatar-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 1px;
	}

	.item-images {
		position: absolute;
		bottom: -8px;
		left: -6px;
		width: calc(100% + 12px);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1px;
	}

	.item-images img {
		width: 100%;
		border-width: 1px;
		border-style: solid;
		border-radius: 2px;
		border-color: #666;
	}

	.close-icon,
	.selected-icon {
		position: absolute;
		top: -4px;
		right: -4px;
		border-radius: 100%;
		z-index: 10;
	}

	.close-icon {
		@apply text-red-700 bg-gray-800;
		transition: transform 0.2s;
	}

	.champion-avatar:not(.selected):hover .close-icon {
		transform: scale(1.25);
	}

	.selected-icon {
		@apply text-green-600 bg-gray-800;
	}

	.champion-avatar.c1 {
		border-color: #213042;
	}

	.champion-avatar.c2 {
		border-color: #156831;
	}

	.champion-avatar.c3 {
		border-color: #12407c;
	}

	.champion-avatar.c4 {
		border-color: #893088;
	}

	.champion-avatar.c5 {
		border-color: #b89d27;
	}

	.champion-avatar.c6 {
		border-color: #bbbbbb;
	}

	.champion-avatar.c7 {
		border-color: #ffffff;
	}

	.champion-avatar.c8 {
		border-color: #eab8ff;
	}
</style>
