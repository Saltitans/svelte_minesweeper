export class GameCell {
    x: number = 0;
    y: number = 0;
    value: number = 0;
    _isBomb: boolean = $state(false);
    _isVisible: boolean = $state(false);
    _isFlagged: boolean = $state(false);
    onShowCallback: (x: number, y: number) => void;

    constructor(x: number, y: number, value: number, isBomb: boolean, onShowCallback: (x: number, y: number) => void) {
        this.x = x;
        this.y = y;
        this.value = value;
        this._isBomb = isBomb;
        this.onShowCallback = onShowCallback;
    }

    get isBomb(): boolean {
        return this._isBomb;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    get isFlagged(): boolean {
        return this._isFlagged;
    }

    showCell(): void {
        if (this._isVisible || this._isFlagged) return;
        this._isVisible = !this._isVisible;
    }

    flagCell(): void {
        if (this._isVisible) return;
        this._isFlagged = !this._isFlagged;
    }
}