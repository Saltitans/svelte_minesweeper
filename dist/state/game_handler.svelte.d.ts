import GameCell from "./game_cell.svelte.ts";
declare class GameHandler {
    isRunning: boolean;
    boardSize: number;
    board: GameCell[][];
    _initializeBoard(size: number): GameCell[][];
    startGame(): void;
    _getCellValue(x: number, y: number, bombs: number[][]): number;
    _displayAdjacentCells(cell: null | GameCell, previousCell: GameCell): void;
}
declare let gameHandler: GameHandler;
export default gameHandler;
