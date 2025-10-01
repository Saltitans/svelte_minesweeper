<script lang="ts">
	import gameHandler from '../state/game_handler.svelte.ts';
	import Spacer from './Spacer.svelte';

	function onclick(): void {
		gameHandler.startGame();
	}
</script>

<div class="flex flex-row justify-center">
	<select bind:value={gameHandler.boardSize} disabled={gameHandler.isRunning}>
		<option value={10}>Easy</option>
		<option value={12}>Medium</option>
		<option value={14}>Hard</option>
	</select>
	<Spacer width={1}></Spacer>
	<button
		class="bg-yellow-500 px-2 text-white"
		aria-label="start game button"
		{onclick}
		disabled={gameHandler.isRunning}
	>
		START</button
	>
</div>
