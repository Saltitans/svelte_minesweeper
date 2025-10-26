class GameCell {
    x = 0;
    y = 0;
    value = 0;
    isBomb = $state(false);
    isVisible = $state(false);
    isFlagged = $state(false);
    _onShowCallback;
    constructor(x, y, value, isBomb, onShowCallback) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.isBomb = isBomb;
        this._onShowCallback = onShowCallback;
    }
    showCell() {
        if (!this.canShow())
            return;
        this.isVisible = !this.isVisible;
        this._onShowCallback(null, this);
    }
    canShow() {
        return !this.isVisible && !this.isFlagged;
    }
    flagCell() {
        if (this.isVisible)
            return;
        this.isFlagged = !this.isFlagged;
    }
}
export default GameCell;
