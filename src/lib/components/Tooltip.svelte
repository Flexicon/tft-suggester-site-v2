<script lang="ts">
	export let title = '';

	const xOffset = 0;
	const yOffset = -40;

	let isHovered = false;
	let x: number;
	let y: number;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX + xOffset;
		y = event.pageY + yOffset;
	}

	function mouseMove(event: MouseEvent) {
		x = event.pageX + xOffset;
		y = event.pageY + yOffset;
	}

	function mouseLeave() {
		isHovered = false;
	}

	function focusIn(event: FocusEvent) {
		isHovered = true;
	}

	function focusOut(event: FocusEvent) {
		isHovered = false;
	}
</script>

<div
	on:mouseover={mouseOver}
	on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
	on:focus={focusIn}
	on:focusout={focusIn}
>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}

<style lang="postcss">
	.tooltip {
		@apply absolute text-black bg-zinc-50 rounded p-1 z-50 border border-zinc-300 shadow;
	}
</style>
