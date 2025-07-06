<script lang="ts">
	import '../app.css';
	import Row from '$lib/components/Row.svelte';
	import { gameHandler } from '$lib/state/game_handler.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import StartGameForm from '$lib/components/StartGameForm.svelte';
</script>

<div class="flex h-screen w-screen flex-col justify-center">
	<StartGameForm />
	<Spacer height={1}></Spacer>
	{#if gameHandler.isRunning}
		{#each gameHandler.board as row}
			<Row {row} />
		{/each}
	{/if}
</div>
