<script lang="ts">
	import type { GameCell } from '$lib/state/game_cell.svelte';
	import { gameHandler } from '$lib/state/game_handler.svelte';
	import '../../app.css';

	let { cell }: { cell: GameCell } = $props();

	function onclick(): void {
		gameHandler.showCell(cell.x, cell.y);
	}

	function oncontextmenu(event: MouseEvent): void {
		event.preventDefault();
		gameHandler.flagCell(cell.x, cell.y);
	}
</script>

<button
	class="flex h-10 w-10 items-center justify-center border bg-yellow-500"
	aria-label="mine button"
	{onclick}
	{oncontextmenu}
>
	{#if cell.isVisible}
		<p>V</p>
	{:else if cell.isFlagged}
		<p>F</p>
	{/if}
</button>
