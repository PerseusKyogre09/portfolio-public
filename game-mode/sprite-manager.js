// Sprite management
class Sprite {
    constructor(imageSrc, frameWidth, frameHeight, frames = 1) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = frames;
        this.currentFrame = 0;
        this.animationSpeed = 0.1; // frames per update
        this.animationTimer = 0;
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    update() {
        if (this.frames > 1) {
            this.animationTimer += this.animationSpeed;
            if (this.animationTimer >= 1) {
                this.currentFrame = (this.currentFrame + 1) % this.frames;
                this.animationTimer = 0;
            }
        }
    }

    draw(ctx, x, y, flipX = false) {
        if (!this.loaded) return;

        const sourceX = this.currentFrame * this.frameWidth;
        const sourceY = 0;

        ctx.save();
        if (flipX) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image,
                sourceX, sourceY, this.frameWidth, this.frameHeight,
                -x - this.frameWidth, y, this.frameWidth, this.frameHeight
            );
        } else {
            ctx.drawImage(
                this.image,
                sourceX, sourceY, this.frameWidth, this.frameHeight,
                x, y, this.frameWidth, this.frameHeight
            );
        }
        ctx.restore();
    }
}

// Create sprites
let playerSprite;
let certificateSprite;
let computerSprite;
let bookshelfSprite;

function initSprites() {
    // Player sprite (32x32, 4 frames for walking animation)
    playerSprite = new Sprite('sprites/player.png', 32, 32, 4);

    // Object sprites (static for now)
    certificateSprite = new Sprite('sprites/certificate.png', 64, 32, 1);
    computerSprite = new Sprite('sprites/computer.png', 64, 32, 1);
    bookshelfSprite = new Sprite('sprites/bookshelf.png', 32, 64, 1);
}