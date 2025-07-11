<script lang="ts">
	import { gameHandler } from '$lib/state/game_handler.svelte';
	import '../../app.css';

	let {
		x,
		y,
		isVisible,
		isBomb,
		isFlagged,
		value
	}: {
		x: number;
		y: number;
		isVisible: boolean;
		isBomb: boolean;
		isFlagged: boolean;
		value: number;
	} = $props();

	function onclick(): void {
		gameHandler.showCell(x, y);
	}

	function oncontextmenu(event: MouseEvent): void {
		event.preventDefault();
		gameHandler.flagCell(x, y);
	}
</script>

<button
	class="flex h-10 w-10 items-center justify-center border bg-yellow-500"
	aria-label="mine button"
	{onclick}
	{oncontextmenu}
>
	{#if isVisible}
		{#if isBomb}
			<p>B</p>
		{:else}
			<p>{value}</p>
		{/if}
	{:else if isFlagged}
		<p>F</p>
	{/if}
</button>
