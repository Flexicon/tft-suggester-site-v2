<script lang="ts">
	export let value = '';
	export let options: (string | { value: string; label: string })[] = [];
	export let initialValue = 'Select an option';
</script>

<select bind:value {...$$restProps}>
	<option value="">{initialValue}</option>
	{#each options as opt}
		{#if typeof opt === 'string'}
			<option value={opt}>{opt}</option>
		{:else}
			<option value={opt.value}>{opt.label}</option>
		{/if}
	{/each}
</select>

<style lang="postcss">
	select {
		@apply bg-gray-50 border rounded text-gray-900 text-sm appearance-none bg-no-repeat;
		@apply focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-4 shadow-inner hover:border-zinc-300;

		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E");
		background-position: right 0.75rem center;
		background-size: 0.75em 0.75em;
	}
</style>
