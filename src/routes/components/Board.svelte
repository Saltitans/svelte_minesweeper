<script lang="ts">
	import '../../app.css';
	import Row from './Row.svelte';

	let nRows = 5;
	let nColumns = 5;
	let nBombs = Math.floor(nRows * nColumns * 0.3);

	let board: Array<Array<number>> = [];

	let bombs: Array<Array<number>> = [];

	while (bombs.length < nBombs) {
		let xPos = Math.floor(Math.random() * (nRows - 1));
		let yPos = Math.floor(Math.random() * (nColumns - 1));

		let containsBomb = bombs.some((bomb) => {
			return bomb[0] == xPos && bomb[1] == yPos;
		});

		if (containsBomb) continue;

		bombs.push([xPos, yPos]);
	}

	for (let i = 0; i < nRows; i++) {
		let newRow: Array<number> = [];

		for (let j = 0; j < nColumns; j++) {
			let isBomb = bombs.some((bomb) => {
				return bomb[0] == i && bomb[1] == j;
			});

			newRow.push(isBomb ? -1 : 0);
		}
		board.push(newRow);
	}

	for (let i = 0; i < nRows; i++) {
		for (let j = 0; j < nColumns; j++) {
			if (board[i][j] == -1) continue;

			let nBombs = 0;

			if (i - 1 >= 0) {
				nBombs += board[i - 1][j] == -1 ? 1 : 0;
			}

			if (i - 1 >= 0 && j + 1 <= nColumns - 1) {
				nBombs += board[i - 1][j + 1] == -1 ? 1 : 0;
			}

			if (j + 1 <= nColumns - 1) {
				nBombs += board[i][j + 1] == -1 ? 1 : 0;
			}

			if (i + 1 <= nRows - 1 && j + 1 <= nColumns - 1) {
				nBombs += board[i + 1][j + 1] == -1 ? 1 : 0;
			}

			if (i + 1 <= nRows - 1) {
				nBombs += board[i + 1][j] == -1 ? 1 : 0;
			}

			if (i + 1 <= nRows - 1 && j - 1 >= 0) {
				nBombs += board[i + 1][j - 1] == -1 ? 1 : 0;
			}

			if (j - 1 >= 0) {
				nBombs += board[i][j - 1] == -1 ? 1 : 0;
			}

			if (i - 1 >= 0 && j - 1 >= 0) {
				nBombs += board[i - 1][j - 1] == -1 ? 1 : 0;
			}

			board[i][j] = nBombs;
		}
	}
</script>

<div class="flex flex-col justify-center">
	{#each board as row}
		<Row {row} />
	{/each}
</div>
