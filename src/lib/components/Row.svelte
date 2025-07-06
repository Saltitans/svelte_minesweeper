<script lang="ts">
	import { GameCell } from '$lib/state/game_cell.svelte';
	import '../../app.css';
	import Cell from './Cell.svelte';

	let { row }: { row: GameCell[] } = $props();
</script>

<div class="flex flex-row justify-center">
	{#each row as cell}
		<Cell {cell} />
	{/each}
</div>
