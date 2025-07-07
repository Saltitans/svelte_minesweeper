import { GameCell } from "./game_cell.svelte";

class GameHandler {
    isRunning: boolean = $state(false);
    board: GameCell[][] = $state([]);

    initializeBoard(size: number): void {
        let nBombs = Math.round((size * size) * 0.2);
        let bombs: number[][] = [];
        while (bombs.length < nBombs) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            let bombCoord = [x, y];

            let hasBomb = bombs.some((coord) => coord[0] === bombCoord[0] && coord[1] === bombCoord[1]);
            if (hasBomb) continue;
            bombs.push(bombCoord);
        }

        let board = Array.from(
            { length: size },
            (_, y) => Array.from(
                { length: size },
                (__, x) => {
                    let isBomb = bombs.some((coord) => coord[0] === x && coord[1] === y);
                    let value = isBomb ? -1 : this._getCellValue(x, y, size, bombs);
                    return new GameCell(y, x, value, isBomb);
                }),
        );
        this.board = board;
        this.isRunning = true;
    }

    // [
    //     [1, 1],
    //     [1, B]
    // ]

    _getCellValue(x: number, y: number, boardSize: number, bombs: number[][]): number {
        let value = 0;
        if (x >= 1) {
            let hasBombTop = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y);
            value += hasBombTop ? 1 : 0;
        }

        if (x >= 1 && y <= boardSize - 1) {
            let hasBombTopRight = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y + 1);
            value += hasBombTopRight ? 1 : 0;
        }

        if (y <= boardSize - 1) {
            let hasBombRight = bombs.some((coord) => coord[0] === x && coord[1] === y + 1);
            value += hasBombRight ? 1 : 0;
        }

        if (x <= boardSize - 1 && y <= boardSize - 1) {
            let hasBombBottomRight = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y + 1);
            value += hasBombBottomRight ? 1 : 0;
        }

        if (x <= boardSize - 1) {
            let hasBombBottom = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y);
            value += hasBombBottom ? 1 : 0;
        }

        if (x <= boardSize - 1 && y >= 1) {
            let hasBombBottomLeft = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y - 1);
            value += hasBombBottomLeft ? 1 : 0;
        }

        if (y >= 1) {
            let hasBombLeft = bombs.some((coord) => coord[0] === x && coord[1] === y - 1);
            value += hasBombLeft ? 1 : 0;
        }

        if (x >= 1 && y >= 1) {
            let hasBombTopLeft = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y - 1);
            value += hasBombTopLeft ? 1 : 0;
        }

        return value;
    }
}


let gameHandler = new GameHandler();
export { gameHandler };


