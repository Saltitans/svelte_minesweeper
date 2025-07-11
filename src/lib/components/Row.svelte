<script lang="ts">
	import { GameCell } from '$lib/state/game_cell.svelte';
	import '../../app.css';
	import Cell from './Cell.svelte';

	let { row }: { row: GameCell[] } = $props();
</script>

<div class="flex flex-row justify-center">
	{#each row as cell}
		<Cell
			x={cell.x}
			y={cell.y}
			isVisible={cell.isVisible}
			isBomb={cell.isBomb}
			isFlagged={cell.isFlagged}
			value={cell.value}
		/>
	{/each}
</div>
