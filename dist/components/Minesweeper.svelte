<script lang="ts">
	import '../../app.css';
	import gameHandler from '../state/game_handler.svelte';
	import Spacer from './Spacer.svelte';
	import StartGameForm from './StartGameForm.svelte';
	import Cell from './Cell.svelte';
</script>

<div class="flex flex-col justify-center">
	<StartGameForm />
	<Spacer height={1}></Spacer>
	{#each gameHandler.board as row}
		<div class="flex flex-row justify-center">
			{#each row as cell}
				<Cell {cell} />
			{/each}
		</div>
	{/each}
</div>
