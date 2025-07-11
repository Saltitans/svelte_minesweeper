import { GameCell } from "./game_cell.svelte";

class GameHandler {
    _isRunning: boolean = $state(false);
    _board: GameCell[][] = $state([]);
    _boardSize: number = -1;

    initializeBoard(size: number): void {
        this._boardSize = size;

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
            (_, x) => Array.from(
                { length: size },
                (__, y) => {
                    let isBomb = bombs.some((coord) => coord[0] === x && coord[1] === y);
                    let value = isBomb ? -1 : this._getCellValue(x, y, size, bombs);
                    return new GameCell(x, y, value, isBomb, this._displayAdjacentCells.bind(this));
                }),
        );

        this._board = board;
        this._isRunning = true;
    }

    // [
    //     [1, 1],
    //     [1, B]
    // ]
    _getCellValue(x: number, y: number, boardSize: number, bombs: number[][]): number {
        let value = 0;
        if (x > 0) {
            let hasBombTop = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y);
            value += hasBombTop ? 1 : 0;
        }

        if (x > 0 && y < boardSize - 1) {
            let hasBombTopRight = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y + 1);
            value += hasBombTopRight ? 1 : 0;
        }

        if (y < boardSize - 1) {
            let hasBombRight = bombs.some((coord) => coord[0] === x && coord[1] === y + 1);
            value += hasBombRight ? 1 : 0;
        }

        if (x < boardSize - 1 && y < boardSize - 1) {
            let hasBombBottomRight = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y + 1);
            value += hasBombBottomRight ? 1 : 0;
        }

        if (x < boardSize - 1) {
            let hasBombBottom = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y);
            value += hasBombBottom ? 1 : 0;
        }

        if (x < boardSize - 1 && y > 0) {
            let hasBombBottomLeft = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y - 1);
            value += hasBombBottomLeft ? 1 : 0;
        }

        if (y > 0) {
            let hasBombLeft = bombs.some((coord) => coord[0] === x && coord[1] === y - 1);
            value += hasBombLeft ? 1 : 0;
        }

        if (x > 0 && y > 0) {
            let hasBombTopLeft = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y - 1);
            value += hasBombTopLeft ? 1 : 0;
        }

        return value;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    get board(): GameCell[][] {
        return this._board;
    }

    showCell(x: number, y: number): void {
        let cell = this._board[x][y];
        if (cell.value === 0)
            this._displayAdjacentCells(x, y);
        else
            cell.showCell();
    }

    flagCell(x: number, y: number): void {
        let cell = this._board[x][y];
        cell.flagCell();
    }

    _displayAdjacentCells(x: number, y: number): void {
        let cell = this._board[x][y];

        if (cell.value !== 0 || cell.isFlagged) return;
        if (cell.isVisible) return;

        cell.showCell();

        if (x > 0) this._displayAdjacentCells(x - 1, y);

        if (x > 0 && y < this._boardSize - 1) this._displayAdjacentCells(x - 1, y + 1);

        if (y < this._boardSize - 1) this._displayAdjacentCells(x, y + 1);

        if (x < this._boardSize - 1 && y < this._boardSize - 1) this._displayAdjacentCells(x + 1, y + 1);

        if (x < this._boardSize - 1) this._displayAdjacentCells(x + 1, y);

        if (x < this._boardSize - 1 && y > 0) this._displayAdjacentCells(x + 1, y - 1);

        if (y > 0) this._displayAdjacentCells(x, y - 1)

        if (x > 0 && y > 0) this._displayAdjacentCells(x - 1, y - 1)
    }
}


let gameHandler = new GameHandler();
export { gameHandler };


