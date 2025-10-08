import GameCell from "./game_cell.svelte";
class GameHandler {
    isRunning = $state(false);
    boardSize = $state(10);
    board = $derived(this._initializeBoard(this.boardSize));
    _initializeBoard(size) {
        return Array.from({ length: size }, (_, x) => Array.from({ length: size }, (__, y) => {
            return new GameCell(x, y, 0, false, this._displayAdjacentCells.bind(this));
        }));
    }
    startGame() {
        let bombPercentage = (this.boardSize * 0.2) / 10;
        let nBombs = Math.round((this.boardSize * this.boardSize) * bombPercentage);
        console.log(bombPercentage, nBombs);
        let bombs = [];
        while (bombs.length < nBombs) {
            let x = Math.floor(Math.random() * this.boardSize);
            let y = Math.floor(Math.random() * this.boardSize);
            let bombCoord = [x, y];
            let hasBomb = bombs.some((coord) => coord[0] === bombCoord[0] && coord[1] === bombCoord[1]);
            if (hasBomb)
                continue;
            bombs.push(bombCoord);
        }
        for (const [x, row] of this.board.entries()) {
            for (const [y, cell] of row.entries()) {
                let isBomb = bombs.some((coord) => coord[0] === x && coord[1] === y);
                cell.isBomb = isBomb;
                cell.value = isBomb ? -1 : this._getCellValue(x, y, bombs);
            }
        }
        this.isRunning = true;
    }
    _getCellValue(x, y, bombs) {
        let value = 0;
        if (x > 0) {
            let hasBombTop = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y);
            value += hasBombTop ? 1 : 0;
        }
        if (x > 0 && y < this.boardSize - 1) {
            let hasBombTopRight = bombs.some((coord) => coord[0] === x - 1 && coord[1] === y + 1);
            value += hasBombTopRight ? 1 : 0;
        }
        if (y < this.boardSize - 1) {
            let hasBombRight = bombs.some((coord) => coord[0] === x && coord[1] === y + 1);
            value += hasBombRight ? 1 : 0;
        }
        if (x < this.boardSize - 1 && y < this.boardSize - 1) {
            let hasBombBottomRight = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y + 1);
            value += hasBombBottomRight ? 1 : 0;
        }
        if (x < this.boardSize - 1) {
            let hasBombBottom = bombs.some((coord) => coord[0] === x + 1 && coord[1] === y);
            value += hasBombBottom ? 1 : 0;
        }
        if (x < this.boardSize - 1 && y > 0) {
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
    _displayAdjacentCells(cell, previousCell) {
        if (cell === null) {
            if (previousCell.value !== 0)
                return;
        }
        else {
            if (!cell.canShow())
                return;
            if (previousCell.value !== 0)
                return;
        }
        let effectiveCell = cell ?? previousCell;
        effectiveCell.showCell();
        if (effectiveCell.x > 0)
            this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y], effectiveCell);
        if (effectiveCell.x > 0 && effectiveCell.y < this.boardSize - 1)
            this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y + 1], effectiveCell);
        if (effectiveCell.y < this.boardSize - 1)
            this._displayAdjacentCells(this.board[effectiveCell.x][effectiveCell.y + 1], effectiveCell);
        if (effectiveCell.x < this.boardSize - 1 && effectiveCell.y < this.boardSize - 1)
            this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y + 1], effectiveCell);
        if (effectiveCell.x < this.boardSize - 1)
            this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y], effectiveCell);
        if (effectiveCell.x < this.boardSize - 1 && effectiveCell.y > 0)
            this._displayAdjacentCells(this.board[effectiveCell.x + 1][effectiveCell.y - 1], effectiveCell);
        if (effectiveCell.y > 0)
            this._displayAdjacentCells(this.board[effectiveCell.x][effectiveCell.y - 1], effectiveCell);
        if (effectiveCell.x > 0 && effectiveCell.y > 0)
            this._displayAdjacentCells(this.board[effectiveCell.x - 1][effectiveCell.y - 1], effectiveCell);
    }
}
let gameHandler = new GameHandler();
export default gameHandler;
