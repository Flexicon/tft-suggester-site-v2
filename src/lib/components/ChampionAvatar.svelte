<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';
	import Tooltip from './Tooltip.svelte';

	const dispatch = createEventDispatcher();

	export let champion: Champion;
	export let cancellable = false;
	export let selected = false;
	export let noItems = false;
	export let noClick = false;
	export let noTooltip = false;

	function onClick() {
		if (!noClick) {
			dispatch('click');
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!noClick && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			onClick();
		}
	}
</script>

<Tooltip title={`${champion.name} - ${champion.cost}g`} disabled={noTooltip}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="champion-avatar"
		class:noClick
		class:selected
		on:click={onClick}
		on:keydown={onKeyDown}
		role={noClick ? undefined : 'button'}
		tabindex={noClick ? undefined : 0}
		aria-label={noClick ? undefined : `${selected ? 'Deselect' : 'Select'} ${champion.name}`}
	>
		{#if cancellable}<span class="close-icon"><Icon icon="mdi:close-circle" /></span>{/if}
		{#if selected}<span class="selected-icon"><Icon icon="mdi:check-circle" /></span>{/if}

		<div class={`avatar-frame c${champion.cost}`}>
			<img src={champion.image} alt={champion.name} loading="lazy" decoding="async" />
		</div>

		{#if noTooltip}
			<div class="champion-name">{champion.name}</div>
		{/if}

		{#if !noItems && champion.items}
			<div class="item-images">
				{#each champion.items as item}
					<div class="hexagon bg-slate-700">
						<div class="item hexagon inner" style="background-image: url({item.image})" />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Tooltip>

<style lang="postcss">
	.champion-avatar {
		position: relative;
		isolation: isolate;
	}

	.champion-avatar::before {
		content: '';
		position: absolute;
		inset: 2px;
		z-index: -1;
		background: rgb(0 0 0 / 0.22);
		clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
		transform: translate(1px, 3px);
	}

	.avatar-frame {
		@apply flex aspect-square items-center justify-center overflow-hidden;
		clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
	}

	.avatar-frame img {
		@apply h-4/5 w-4/5 object-cover bg-slate-900;
		clip-path: inherit;
	}

	.champion-avatar.selected .avatar-frame {
		@apply ring-2 ring-green-500 ring-offset-2 ring-offset-stone-600;
	}

	.hexagon {
		@apply flex aspect-square;
		clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
	}

	.hexagon.inner {
		@apply m-auto w-4/5 h-4/5 bg-cover object-cover bg-slate-900;
	}

	.champion-name {
		@apply text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-center;
		text-shadow: 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black;
	}

	.item-images {
		position: absolute;
		bottom: -6px;
		left: -2px;
		width: calc(100% + 4px);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.item-images .item {
		@apply aspect-square bg-cover;
	}

	.close-icon,
	.selected-icon {
		position: absolute;
		top: 2%;
		right: 8%;
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

	.c1 {
		background-color: #213042;
	}

	.c2 {
		background-color: #156831;
	}

	.c3 {
		background-color: #12407c;
	}

	.c4 {
		background-color: #893088;
	}

	.c5 {
		background-color: #b89d27;
	}

	.c6 {
		background-color: #bbbbbb;
	}

	.c7 {
		background-color: #ffffff;
	}

	.c8 {
		background-color: #eab8ff;
	}
</style>
