import GameCell from "./game_cell.svelte";

class GameHandler {
    isRunning: boolean = $state(false);
    _boardSize: number = -1;
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
            (_, x) => Array.from(
                { length: size },
                (__, y) => {
                    let isBomb = bombs.some((coord) => coord[0] === x && coord[1] === y);
                    let value = isBomb ? -1 : this._getCellValue(x, y, size, bombs);
                    return new GameCell(x, y, value, isBomb, this._displayAdjacentCells.bind(this));
                }),
        );

        this.isRunning = true;
        this._boardSize = size;
        this.board = board;
    }

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


    flagCell(x: number, y: number): void {
        let cell = this.board[x][y];
        cell.flagCell();
    }

    _displayAdjacentCells(cell: null | GameCell, previousCell: GameCell): void {
        if (cell === null) {
            if (previousCell.value !== 0) return;
        } else {
            if (!cell.canShow()) return;
            if (previousCell.value !== 0) return;
        }

        let effectiveCell = cell ?? previousCell;

        effectiveCell.showCell();

        if (effectiveCell.x > 0) this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y], effectiveCell);

        if (effectiveCell.x > 0 && effectiveCell.y < this._boardSize - 1) this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y + 1], effectiveCell);

        if (effectiveCell.y < this._boardSize - 1) this._displayAdjacentCells(this.board[effectiveCell.x][effectiveCell.y + 1], effectiveCell);

        if (effectiveCell.x < this._boardSize - 1 && effectiveCell.y < this._boardSize - 1) this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y + 1], effectiveCell);

        if (effectiveCell.x < this._boardSize - 1) this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y], effectiveCell);

        if (effectiveCell.x < this._boardSize - 1 && effectiveCell.y > 0) this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y - 1], effectiveCell);

        if (effectiveCell.y > 0) this._displayAdjacentCells(this.board[effectiveCell.x][effectiveCell.y - 1], effectiveCell)

        if (effectiveCell.x > 0 && effectiveCell.y > 0) this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y - 1], effectiveCell)
    }
}


let gameHandler = new GameHandler();
export default gameHandler;


