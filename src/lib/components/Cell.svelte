<script lang="ts">
	import type { GameCell } from '$lib/state/game_cell.svelte';
	import '../../app.css';

	let { cell }: { cell: GameCell } = $props();

	function onclick(): void {
		cell.showCell();
	}

	function oncontextmenu(event: MouseEvent): void {
		event.preventDefault();
		cell.flagCell();
	}
</script>

<button
	class="flex h-10 w-10 items-center justify-center border bg-yellow-500"
	aria-label="mine button"
	{onclick}
	{oncontextmenu}
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
