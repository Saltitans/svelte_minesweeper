export class GameCell {
    x: number = $state(0);
    y: number = $state(0);
    value: number = 0;
    isVisible: boolean = $state(false);
    isFlagged: boolean = $state(false);

    constructor(x: number, y: number, value: number) {
        this.x = x;
        this.y = y;
        this.value = value;
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