class GameCell {
    x: number = 0;
    y: number = 0;
    value: number = 0;
    isBomb: boolean = $state(false);
    isVisible: boolean = $state(false);
    isFlagged: boolean = $state(false);
    _onShowCallback: (cell: null | GameCell, startingCell: GameCell) => void;

    constructor(x: number, y: number, value: number, isBomb: boolean, onShowCallback: (cell: null | GameCell, startingCell: GameCell) => void) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.isBomb = isBomb;
        this._onShowCallback = onShowCallback;
    }

    showCell(): void {
        if (!this.canShow()) return;
        this.isVisible = !this.isVisible;
        this._onShowCallback(null, this);
    }

    canShow(): boolean {
        return !this.isVisible && !this.isFlagged;
    }

    flagCell(): void {
        if (this.isVisible) return;
        this.isFlagged = !this.isFlagged;
    }
}

export default GameCell;