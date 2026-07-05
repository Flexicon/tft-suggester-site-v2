<script lang="ts">
	import { onDestroy } from 'svelte';

	export let title = '';
	export let disabled = false;

	const xOffset = -25;
	const yOffset = 20;

	let isHovered = false;
	let x: number;
	let y: number;
	let pendingX: number;
	let pendingY: number;
	let frame: number | undefined;

	function cancelPendingFrame() {
		if (frame !== undefined) {
			cancelAnimationFrame(frame);
			frame = undefined;
		}
	}

	function updatePosition(event: MouseEvent) {
		pendingX = event.pageX + xOffset;
		pendingY = event.pageY + yOffset;

		if (frame !== undefined) return;

		frame = requestAnimationFrame(() => {
			x = pendingX;
			y = pendingY;
			frame = undefined;
		});
	}

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		updatePosition(event);
	}

	function mouseMove(event: MouseEvent) {
		updatePosition(event);
	}

	function mouseLeave() {
		isHovered = false;
		cancelPendingFrame();
	}

	function focusIn() {
		isHovered = true;
	}

	function focusOut() {
		isHovered = false;
	}

	onDestroy(cancelPendingFrame);
</script>

{#if disabled}
	<slot />
{:else}
	<div
		role="tooltip"
		on:mouseover={mouseOver}
		on:mouseleave={mouseLeave}
		on:mousemove={mouseMove}
		on:focus={focusIn}
		on:focusout={focusOut}
	>
		<slot />
	</div>

	{#if isHovered}
		<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
	{/if}
{/if}

<style lang="postcss">
	.tooltip {
		@apply absolute text-black text-xs bg-zinc-50 rounded p-1 z-50 border border-zinc-300 shadow;
	}
</style>
