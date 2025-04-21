export class Player {
    constructor(el, side) {
        this.el = el;
        this.side = side;
        this.width = 20;
        this.height = 80;
        this.speed = 5;
        this.y = 0;
        this.dy = 0;
        this.updateVisual();
    }

    move(dy) {
        this.dy = dy;
    }

    getCenterY() {
        return this.y + this.height / 2;
    }

    update(deltaTime) {
        this.y += this.dy;
        this.y = Math.max(0, Math.min(this.y, this.el.parentElement.clientHeight - this.height));
        this.updateVisual();
    }

    updateVisual() {
        this.el.style.height = `${this.height}px`;
        this.el.style.width = `${this.width}px`;
        this.el.style.position = 'absolute';
        this.el.style.top = `${this.y}px`;
        this.el.style.left = this.side === 'left' ? '20px' : 'calc(100% - 40px)';
    }

    fire() {
        // Optional: Add firing logic if needed
    }
}
