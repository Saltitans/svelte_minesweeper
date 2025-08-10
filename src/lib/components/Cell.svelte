<script lang="ts">
	import '../../app.css';
	import GameCell from '$lib/state/game_cell.svelte';
	import gameHandler from '$lib/state/game_handler.svelte';

	let { cell }: { cell: GameCell } = $props();

	function onclick(): void {
		cell.showCell();
	}

	function oncontextmenu(event: MouseEvent): void {
		event.preventDefault();
		cell.flagCell();
	}

	let isDisabled = $derived(!gameHandler.isRunning);
</script>

<button
	class="flex h-10 w-10 items-center justify-center border {cell.isBomb
		? 'bg-yellow-900'
		: cell.value === 0
			? 'bg-yellow-100'
			: 'bg-yellow-500'}"
	aria-label="mine button"
	{onclick}
	{oncontextmenu}
	disabled={isDisabled}
>
	{#if cell.isVisible}
		{#if cell.isBomb}
			<p>B</p>
		{:else}
			<p>{cell.value}</p>
		{/if}
	{:else if cell.isFlagged}
		<p>F</p>
	{/if}
</button>
