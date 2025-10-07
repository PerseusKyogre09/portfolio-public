// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;
const roomWidth = 25; // in tiles
const roomHeight = 18; // in tiles

// Character
let player = {
    x: 5 * tileSize,
    y: 5 * tileSize,
    width: tileSize,
    height: tileSize,
    speed: 2,
    color: '#6366f1'
};

// Sprite variables
let playerSprite;
let certificateSprite;
let computerSprite;
let bookshelfSprite;

// Game objects (interactive elements)
const gameObjects = [
    {
        x: 10 * tileSize,
        y: 3 * tileSize,
        width: tileSize * 2,
        height: tileSize,
        type: 'certificate',
        name: 'Certificate Frame',
        description: 'Click to view certificates',
        sprite: null // Will be assigned after loading
    },
    {
        x: 18 * tileSize,
        y: 8 * tileSize,
        width: tileSize * 2,
        height: tileSize,
        type: 'computer',
        name: 'Computer Desk',
        description: 'Click to explore projects',
        sprite: null
    },
    {
        x: 3 * tileSize,
        y: 12 * tileSize,
        width: tileSize,
        height: tileSize * 2,
        type: 'bookshelf',
        name: 'Bookshelf',
        description: 'Click to see skills & education',
        sprite: null
    }
];

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Mobile controls (basic touch)
let touchStartX = 0;
let touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});
canvas.addEventListener('touchmove', (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    const threshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) keys['ArrowRight'] = true;
        else if (deltaX < -threshold) keys['ArrowLeft'] = true;
    } else {
        if (deltaY > threshold) keys['ArrowDown'] = true;
        else if (deltaY < -threshold) keys['ArrowUp'] = true;
    }

    setTimeout(() => {
        keys['ArrowUp'] = false;
        keys['ArrowDown'] = false;
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
    }, 100);
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Update sprites
    if (playerSprite) playerSprite.update();

    // Handle movement
    if (keys['ArrowUp'] || keys['KeyW']) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        player.y += player.speed;
    }
    if (keys['ArrowLeft'] || keys['KeyA']) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        player.x += player.speed;
    }

    // Keep player in bounds
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Check interactions
    gameObjects.forEach(obj => {
        if (checkCollision(player, obj)) {
            obj.highlighted = true;
        } else {
            obj.highlighted = false;
        }
    });
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw room floor
    ctx.fillStyle = '#0f3460';
    for (let x = 0; x < roomWidth; x++) {
        for (let y = 0; y < roomHeight; y++) {
            if ((x + y) % 2 === 0) {
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw walls (simple border)
    ctx.fillStyle = '#533483';
    ctx.fillRect(0, 0, canvas.width, tileSize); // Top wall
    ctx.fillRect(0, canvas.height - tileSize, canvas.width, tileSize); // Bottom wall
    ctx.fillRect(0, 0, tileSize, canvas.height); // Left wall
    ctx.fillRect(canvas.width - tileSize, 0, tileSize, canvas.height); // Right wall

    // Draw game objects
    gameObjects.forEach(obj => {
        if (obj.sprite && obj.sprite.loaded) {
            // Use sprite if available
            const highlight = obj.highlighted ? 1.2 : 1.0;
            ctx.save();
            ctx.globalAlpha = highlight > 1 ? 0.8 : 1.0;
            obj.sprite.draw(ctx, obj.x, obj.y);
            ctx.restore();
        } else {
            // Fallback to colored rectangles
            ctx.fillStyle = obj.highlighted ? '#ffffff' : (obj.color || '#666666');
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

            // Draw simple icon based on type
            ctx.fillStyle = '#ffffff';
            if (obj.type === 'certificate') {
                // Simple frame icon
                ctx.fillRect(obj.x + 4, obj.y + 4, obj.width - 8, 4);
                ctx.fillRect(obj.x + 4, obj.y + obj.height - 8, obj.width - 8, 4);
                ctx.fillRect(obj.x + 4, obj.y + 4, 4, obj.height - 8);
                ctx.fillRect(obj.x + obj.width - 8, obj.y + 4, 4, obj.height - 8);
            } else if (obj.type === 'computer') {
                // Simple computer icon
                ctx.fillRect(obj.x + 6, obj.y + 6, obj.width - 12, obj.height - 12);
                ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, 4);
            } else if (obj.type === 'bookshelf') {
                // Simple bookshelf
                for (let i = 0; i < 3; i++) {
                    ctx.fillRect(obj.x + 2, obj.y + 2 + i * 8, obj.width - 4, 2);
                }
            }
        }
    });

    // Draw player
    if (playerSprite && playerSprite.loaded) {
        // Determine if player should face left or right based on movement
        const facingLeft = keys['ArrowLeft'] || keys['KeyA'];
        const facingRight = keys['ArrowRight'] || keys['KeyD'];

        // Simple direction logic - face the direction of last movement
        let flipX = false;
        if (facingLeft && !facingRight) flipX = true;
        else if (!facingLeft && facingRight) flipX = false;
        // Keep current direction if no horizontal movement

        playerSprite.draw(ctx, player.x, player.y, flipX);
    } else {
        // Fallback to colored rectangle
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw player face (simple eyes)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(player.x + 6, player.y + 6, 4, 4);
        ctx.fillRect(player.x + 16, player.y + 6, 4, 4);
    }
}

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Handle object interactions
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    gameObjects.forEach(obj => {
        if (clickX >= obj.x && clickX <= obj.x + obj.width &&
            clickY >= obj.y && clickY <= obj.y + obj.height) {
            showObjectInfo(obj);
        }
    });
});

// Show object information
function showObjectInfo(obj) {
    alert(`${obj.name}\n${obj.description}\n\n(This will show detailed portfolio content in the future!)`);
}

// Exit game mode
function exitGameMode() {
    window.location.href = '../index.html';
}

// Start the game
window.addEventListener('load', () => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // Initialize sprites
    initSprites();

    // Assign sprites to game objects
    gameObjects.forEach(obj => {
        switch(obj.type) {
            case 'certificate':
                obj.sprite = certificateSprite;
                break;
            case 'computer':
                obj.sprite = computerSprite;
                break;
            case 'bookshelf':
                obj.sprite = bookshelfSprite;
                break;
        }
    });

    // Start game loop
    gameLoop();
});