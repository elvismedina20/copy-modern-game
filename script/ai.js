export class AI {
    constructor(playerToControl, ball, game) {
        this.ctl = playerToControl;
        this.ball = ball;
        this.game = game;
        this.difficulty = 0.7;
        this.reactionTimer = 0;
        this.reactionDelay = 150;
        this.fireDelay = 500;
        this.fireTimer = 0;
    }

    setDifficulty(level) {
        switch (level) {
            case 'easy': this.difficulty = 0.4; this.reactionDelay = 250; this.fireDelay = 700; break;
            case 'normal': this.difficulty = 0.7; this.reactionDelay = 150; this.fireDelay = 500; break;
            case 'hard': this.difficulty = 1.0; this.reactionDelay = 80; this.fireDelay = 300; break;
            case 'impossible': this.difficulty = 1.5; this.reactionDelay = 0; this.fireDelay = 100; break;
        }
    }

    update(deltaTime) {
        this.reactionTimer += deltaTime;

        if (this.ball.owner === this.ctl) {
            this.fireTimer += deltaTime;
            if (this.fireTimer >= this.fireDelay) {
                this.ctl.fire();
                this.fireTimer = 0;
            }
            return;
        } else {
            this.fireTimer = 0;
        }

        if (this.reactionTimer >= this.reactionDelay) {
            this.reactionTimer = 0;

            const predictedY = this.ball.y + this.ball.velocity[1] * (this.game.clientWidth / Math.abs(this.ball.velocity[0] || 1)) * 0.1 * this.difficulty;
            const clampedY = Math.max(this.ball.size / 2, Math.min(predictedY, this.game.clientHeight - this.ball.size / 2));
            const center = this.ctl.getCenterY();

            let dy = 0;
            if (center < clampedY - this.ctl.height * 0.1) {
                dy = this.ctl.speed * this.difficulty;
            } else if (center > clampedY + this.ctl.height * 0.1) {
                dy = -this.ctl.speed * this.difficulty;
            }

            this.ctl.move(dy);
        }
    }
}
