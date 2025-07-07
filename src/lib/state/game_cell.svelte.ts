export class GameCell {
    x: number = $state(0);
    y: number = $state(0);
    value: number = $state(0);
    isBomb: boolean = $state(false);
    isVisible: boolean = $state(false);
    isFlagged: boolean = $state(false);

    constructor(x: number, y: number, value: number, isBomb: boolean) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.isBomb = isBomb;
    }

    showCell(): void {
        if (this.isVisible || this.isFlagged) return;
        this.isVisible = !this.isVisible;
    }

    flagCell(): void {
        if (this.isVisible) return;
        this.isFlagged = !this.isFlagged;
    }
}