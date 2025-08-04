<script lang="ts">
	import '../app.css';
	import gameHandler from '$lib/state/game_handler.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import StartGameForm from '$lib/components/StartGameForm.svelte';
	import Cell from '$lib/components/Cell.svelte';
</script>

<div class="flex h-screen w-screen flex-col justify-center">
	<StartGameForm />
	<Spacer height={1}></Spacer>
	{#if gameHandler.isRunning}
		{#each gameHandler.board as row}
			<div class="flex flex-row justify-center">
				{#each row as cell}
					<Cell {cell} />
				{/each}
			</div>
		{/each}
	{/if}
</div>
