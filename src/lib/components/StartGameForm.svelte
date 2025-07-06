<script lang="ts">
	import { gameHandler } from '$lib/state/game_handler.svelte';
	import Spacer from './Spacer.svelte';

	let inputContent: any;

	function onclick(): void {
		if (inputContent === null) return;
		gameHandler.initializeBoard(inputContent as number);
	}
</script>

<div class="flex flex-row justify-center">
	<input id="board-size-input" type="number" min="1" max="18" bind:value={inputContent} />
	<Spacer width={1}></Spacer>
	<button class="bg-yellow-500 px-2 text-white" aria-label="start game button" {onclick}>
		START</button
	>
</div>
