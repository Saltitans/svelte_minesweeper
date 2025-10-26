declare class GameCell {
    x: number;
    y: number;
    value: number;
    isBomb: boolean;
    isVisible: boolean;
    isFlagged: boolean;
    _onShowCallback: (cell: null | GameCell, startingCell: GameCell) => void;
    constructor(x: number, y: number, value: number, isBomb: boolean, onShowCallback: (cell: null | GameCell, startingCell: GameCell) => void);
    showCell(): void;
    canShow(): boolean;
    flagCell(): void;
}
export default GameCell;
