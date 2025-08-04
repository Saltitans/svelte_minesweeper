<script lang="ts">
	import gameHandler from '$lib/state/game_handler.svelte';
	import Spacer from './Spacer.svelte';

	let boardSize = $state(1);
	let isInputDisabled = $derived(gameHandler.isRunning);
	let isButtonDisabled = $derived(
		gameHandler.isRunning || boardSize === null || boardSize <= 0 || boardSize > 18
	);

	function onclick(): void {
		gameHandler.initializeBoard(boardSize as number);
	}
</script>

<div class="flex flex-row justify-center">
	<input
		id="board-size-input"
		type="number"
		min="1"
		max="18"
		bind:value={boardSize}
		disabled={isInputDisabled}
	/>
	<Spacer width={1}></Spacer>
	<button
		class="bg-yellow-500 px-2 text-white"
		aria-label="start game button"
		{onclick}
		disabled={isButtonDisabled}
	>
		START</button
	>
</div>
