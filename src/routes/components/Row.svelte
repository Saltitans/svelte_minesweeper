<script lang="ts">
	import '../../app.css';
	import Cell from './Cell.svelte';

	let { row }: { row: Array<number> } = $props();
</script>

<div class="flex flex-row">
	{#each row as cell}
		<Cell content={cell} />
	{/each}
</div>
