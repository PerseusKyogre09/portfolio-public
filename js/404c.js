function createPixels() {
    const pixelsContainer = document.getElementById('pixels');
    const numPixels = 120;
    
    for (let i = 0; i < numPixels; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        pixel.style.left = `${left}%`;
        pixel.style.top = `${top}%`;
        
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        pixel.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        pixelsContainer.appendChild(pixel);
    }
}

function createBlocks() {
    const blocksContainer = document.getElementById('blocks');
    const numBlocks = 30;
    
    for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        block.style.left = `${left}%`;
        block.style.top = `${top}%`;
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        block.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        const rotation = Math.random() * 360;
        block.style.transform = `rotate(${rotation}deg)`;
        
        blocksContainer.appendChild(block);
    }
}

function createCraters() {
    const explosionArea = document.querySelector('.explosion-area');
    const numCraters = 20;
    
    for (let i = 0; i < numCraters; i++) {
        const crater = document.createElement('div');
        crater.className = 'crater';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        const size = Math.random() * 300 + 100;
        
        crater.style.width = `${size}px`;
        crater.style.height = `${size}px`;
        crater.style.left = `${left}%`;
        crater.style.top = `${top}%`;
        crater.style.opacity = Math.random() * 0.4 + 0.1;
        
        explosionArea.appendChild(crater);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createPixels();
    createBlocks();
    createCraters();
});