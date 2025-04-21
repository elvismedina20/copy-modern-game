export class Ball {
    constructor(game, el) {
        this.el = el;
        this.game = game;
        this.size = 15;
        this.baseSpeed = 5;
        this.velocity = [0, 0];
        this.owner = null;
        this.reset(null);
    }

    reset(owner) {
        this.x = this.game.clientWidth / 2 - this.size / 2;
        this.y = this.game.clientHeight / 2 - this.size / 2;
        this.owner = owner;
        this.velocity = [0, 0];
        this.updateVisual();
    }

    update(deltaTime) {
        if (this.owner) {
            this.followOwner();
        } else {
            this.x += this.velocity[0];
            this.y += this.velocity[1];

            if (this.y <= 0 || this.y >= this.game.clientHeight - this.size) {
                this.velocity[1] *= -1;
                this.y = Math.max(0, Math.min(this.y, this.game.clientHeight - this.size));
            }
        }
        this.updateVisual();
    }

    followOwner() {
        if (!this.owner) return;
        const ownerCenterY = this.owner.getCenterY();
        this.y = ownerCenterY - this.size / 2;
        this.x = this.owner.side === "left"
            ? this.owner.width + 15
            : this.game.clientWidth - this.owner.width - this.size - 15;
    }

    updateVisual() {
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;
        this.el.style.background = '#fff';
        this.el.style.position = 'absolute';
        this.el.style.borderRadius = '50%';
    }
}
