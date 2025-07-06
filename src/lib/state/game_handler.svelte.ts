import { GameCell } from "./game_cell.svelte";

class GameHandler {
    isRunning: boolean = $state(false);
    board: GameCell[][] = $state([]);

    initializeBoard(size: number): void {
        let board = Array.from(
            { length: size },
            (_, y) => Array.from(
                { length: size },
                (__, x) => new GameCell(y, x, 1)),
        );
        this.board = board;
        this.isRunning = true;
    }

    showCell(x: number, y: number): void {
        this.board[x][y].showCell();
    }

    flagCell(x: number, y: number): void {
        this.board[x][y].flagCell();
    }
}


let gameHandler = new GameHandler();
export { gameHandler };


