// Define aliens with their properties
const aliens = [
    {
        name: "swampfire",
        message: "Looks like this page has been burned to a crisp. Even Swampfire's regenerative abilities can't bring it back.",
        imagePath: "assets/images/swampfire.png",
        createEffect: createFireParticles
    },
    {
        name: "echo-echo",
        message: "Echo Echo... Echo Echo... No matter how many times we search, we can't find this page.",
        imagePath: "assets/images/echo-echo.png",
        createEffect: createSoundWaves
    },
    {
        name: "humungousaur",
        message: "Even with Humungousaur's strength, we couldn't dig up the page you're looking for.",
        imagePath: "assets/images/humungousaur.png",
        createEffect: createRockyDebris
    },
    {
        name: "jetray",
        message: "Jetray searched at the speed of light, but this page seems to have vanished into hyperspace.",
        imagePath: "assets/images/jetray.png",
        createEffect: createEnergyStreaks
    },
    {
        name: "big-chill",
        message: "This page seems to have phased out of existence, even Big Chill can't make it tangible again.",
        imagePath: "assets/images/big-chill.png",
        createEffect: createFrostyEffect
    },
    {
        name: "chromastone",
        message: "Even Chromastone's ability to absorb energy couldn't power up this missing page.",
        imagePath: "assets/images/chromastone.png",
        createEffect: createCrystalShards
    },
    {
        name: "brainstorm",
        message: "After extensive cerebral contemplation, Brainstorm concludes that this page is indubitably non-existent.",
        imagePath: "assets/images/brainstorm.png",
        createEffect: createElectricityEffect
    },
    {
        name: "spidermonkey",
        message: "Spidermonkey swung through our entire network but couldn't catch this page in his web.",
        imagePath: "assets/images/spidermonkey.png",
        createEffect: createWebLines
    },
    {
        name: "goop",
        message: "This page has slipped through our fingers like Goop without his anti-gravity projector.",
        imagePath: "assets/images/goop.png",
        createEffect: createSlimeDrops
    },
    {
        name: "alien-x",
        message: "Even with the reality-altering powers of Alien X, we couldn't create the page you're looking for.",
        imagePath: "assets/images/alien-x.png",
        createEffect: createStarryBackground
    }
];

// Function to create particles for general use
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numParticles = 60;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Function to create fire particles for Swampfire
function createFireParticles() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'effect-element fire-particle';
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const hue = Math.floor(Math.random() * 60);
        particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        particle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 70%)`;
        
        const left = Math.random() * 100;
        particle.style.left = `${left}%`;
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;
        
        particle.style.animation = `riseAndFade ${duration}s infinite ${delay}s`;
        
        effectsContainer.appendChild(particle);
    }
    
    // Add specific fire styling to omnitrix glow
    const omnitrixGlow = document.querySelector('.omnitrix-glow');
    omnitrixGlow.style.background = 'radial-gradient(circle, #ff6d00 0%, transparent 70%)';
}

// Function to create sound waves for Echo Echo
function createSoundWaves() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    const wavesContainer = document.createElement('div');
    wavesContainer.className = 'sound-waves';
    wavesContainer.style.position = 'absolute';
    wavesContainer.style.top = '50%';
    wavesContainer.style.left = '50%';
    wavesContainer.style.zIndex = '0';
    
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div');
        wave.className = 'sound-wave-circle';
        wave.style.animationDelay = i * 0.8 + 's';
        wavesContainer.appendChild(wave);
    }
    
    effectsContainer.appendChild(wavesContainer);
}

// Function to create rocky debris for Humungousaur
function createRockyDebris() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const rock = document.createElement('div');
        rock.className = 'effect-element';
        
        const size = Math.random() * 25 + 10;
        rock.style.width = `${size}px`;
        rock.style.height = `${size}px`;
        
        // Random brown colors
        const hue = 30 + Math.floor(Math.random() * 20);
        const sat = 20 + Math.floor(Math.random() * 40);
        const light = 20 + Math.floor(Math.random() * 30);
        
        rock.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`;
        rock.style.boxShadow = 'inset 3px 3px rgba(255,255,255,0.3), inset -3px -3px rgba(0,0,0,0.3)';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        rock.style.left = `${left}%`;
        rock.style.top = `${top}%`;
        
        // Make it more polygon-like with clip-path
        const points = [];
        const sides = Math.floor(Math.random() * 4) + 5; // 5-8 sided polygon
        
        for (let j = 0; j < sides; j++) {
            const angle = (j / sides) * Math.PI * 2;
            const radius = 50 + Math.random() * 10;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            points.push(`${x}% ${y}%`);
        }
        
        rock.style.clipPath = `polygon(${points.join(', ')})`;
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        rock.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        const rotation = Math.random() * 360;
        rock.style.transform = `rotate(${rotation}deg)`;
        
        effectsContainer.appendChild(rock);
    }
}

// Function to create energy streaks for Jetray
function createEnergyStreaks() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const streak = document.createElement('div');
        streak.className = 'effect-element';
        
        const width = Math.random() * 100 + 100;
        const height = 3 + Math.random() * 2;
        
        streak.style.width = `${width}px`;
        streak.style.height = `${height}px`;
        streak.style.backgroundColor = '#f44336';
        streak.style.boxShadow = '0 0 15px #ff8a80';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        streak.style.left = `${left}%`;
        streak.style.top = `${top}%`;
        
        const rotation = Math.random() * 360;
        streak.style.transform = `rotate(${rotation}deg)`;
        streak.style.borderRadius = '2px';
        
        // Create pulse animation
        const keyframeId = `pulse-streak-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 2 + 1;
        streak.style.animation = `${keyframeId} ${duration}s infinite, float ${duration * 3}s infinite`;
        
        effectsContainer.appendChild(streak);
    }
}

// Function to create frost effect for Big Chill
function createFrostyEffect() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    // Add frost to corners
    for (let i = 0; i < 4; i++) {
        const frost = document.createElement('div');
        frost.className = 'effect-element';
        
        frost.style.width = '150px';
        frost.style.height = '150px';
        frost.style.background = 'radial-gradient(circle, rgba(144, 202, 249, 0.7) 0%, rgba(33, 150, 243, 0) 70%)';
        frost.style.opacity = '0.7';
        
        // Position in corners
        switch(i) {
            case 0:
                frost.style.top = '0';
                frost.style.left = '0';
                break;
            case 1:
                frost.style.top = '0';
                frost.style.right = '0';
                break;
            case 2:
                frost.style.bottom = '0';
                frost.style.left = '0';
                break;
            case 3:
                frost.style.bottom = '0';
                frost.style.right = '0';
                break;
        }
        
        effectsContainer.appendChild(frost);
    }
    
    // Add snowflakes
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'effect-element';
        
        const size = Math.random() * 5 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        snowflake.style.borderRadius = '50%';
        snowflake.style.boxShadow = '0 0 5px rgba(33, 150, 243, 0.8)';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        snowflake.style.left = `${left}%`;
        snowflake.style.top = `${top}%`;
        
        // Create snowfall animation
        const keyframeId = `snowfall-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(${Math.random() * 100 - 50}px, ${window.innerHeight / 2}px) rotate(180deg); }
                100% { transform: translate(0, ${window.innerHeight}px) rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        snowflake.style.animation = `${keyframeId} ${duration}s infinite linear ${delay}s`;
        
        effectsContainer.appendChild(snowflake);
    }
}

// Function to create crystal shards for Chromastone
function createCrystalShards() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const crystal = document.createElement('div');
        crystal.className = 'effect-element';
        
        const size = Math.random() * 40 + 10;
        crystal.style.width = `${size}px`;
        crystal.style.height = `${size * 2}px`;
        
        // Random purple/pink colors
        const hue = 280 + Math.floor(Math.random() * 40);
        const sat = 70 + Math.floor(Math.random() * 30);
        const light = 40 + Math.floor(Math.random() * 30);
        
        crystal.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`;
        crystal.style.boxShadow = `0 0 15px hsl(${hue}, ${sat}%, ${light + 10}%)`;
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        crystal.style.left = `${left}%`;
        crystal.style.top = `${top}%`;
        
        // Make it crystal-like with clip-path
        const points = [
            '50% 0%',
            '100% 25%',
            '100% 75%',
            '50% 100%',
            '0% 75%',
            '0% 25%'
        ];
        
        crystal.style.clipPath = `polygon(${points.join(', ')})`;
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        crystal.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        const rotation = Math.random() * 360;
        crystal.style.transform = `rotate(${rotation}deg)`;
        
        // Add pulsing glow
        const keyframeId = `crystal-pulse-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        crystal.style.animation += `, ${keyframeId} ${Math.random() * 2 + 1}s infinite`;
        
        effectsContainer.appendChild(crystal);
    }
}

// Function to create electricity effect for Brainstorm
function createElectricityEffect() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const bolt = document.createElement('div');
        bolt.className = 'effect-element';
        
        bolt.style.width = '3px';
        bolt.style.height = Math.random() * 100 + 50 + 'px';
        bolt.style.backgroundColor = 'rgba(255, 193, 7, 0)';
        
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 80 + 10;
        
        bolt.style.left = `${left}%`;
        bolt.style.top = `${top}%`;
        
        const rotation = Math.random() * 90 - 45;
        bolt.style.transform = `rotate(${rotation}deg)`;
        
        // Create lightning flash animation
        const keyframeId = `lightning-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0%, 95%, 100% { 
                    background-color: rgba(255, 193, 7, 0);
                    box-shadow: none;
                }
                96%, 99% { 
                    background-color: rgba(255, 193, 7, 1);
                    box-shadow: 0 0 20px rgba(255, 193, 7, 0.8), 0 0 40px rgba(255, 193, 7, 0.4);
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        bolt.style.animation = `${keyframeId} ${duration}s infinite ${delay}s`;
        
        effectsContainer.appendChild(bolt);
    }
}

// Function to create web lines for Spidermonkey
function createWebLines() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const web = document.createElement('div');
        web.className = 'effect-element';
        
        // Create a thin white line
        web.style.width = '1px';
        const height = Math.random() * 150 + 50;
        web.style.height = `${height}px`;
        web.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        web.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        web.style.left = `${left}%`;
        web.style.top = `${top}%`;
        
        const rotation = Math.random() * 360;
        web.style.transform = `rotate(${rotation}deg)`;
        web.style.transformOrigin = '0 0';
        
        // Add a circular web node at the end
        const webNode = document.createElement('div');
        webNode.className = 'web-node';
        webNode.style.width = '5px';
        webNode.style.height = '5px';
        webNode.style.backgroundColor = 'white';
        webNode.style.borderRadius = '50%';
        webNode.style.position = 'absolute';
        webNode.style.bottom = '0';
        webNode.style.left = '-2px';
        
        web.appendChild(webNode);
        effectsContainer.appendChild(web);
    }
    
    // Create some circular web structures
    for (let i = 0; i < 3; i++) {
        const circularWeb = document.createElement('div');
        circularWeb.className = 'effect-element circular-web';
        
        const size = Math.random() * 150 + 100;
        circularWeb.style.width = `${size}px`;
        circularWeb.style.height = `${size}px`;
        circularWeb.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        circularWeb.style.borderRadius = '50%';
        circularWeb.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
        
        const left = Math.random() * 70 + 15;
        const top = Math.random() * 70 + 15;
        
        circularWeb.style.left = `${left}%`;
        circularWeb.style.top = `${top}%`;
        
        // Add web spokes
        for (let j = 0; j < 8; j++) {
            const spoke = document.createElement('div');
            spoke.className = 'web-spoke';
            spoke.style.width = '1px';
            spoke.style.height = `${size / 2}px`;
            spoke.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            spoke.style.position = 'absolute';
            spoke.style.top = '50%';
            spoke.style.left = '50%';
            spoke.style.transformOrigin = '0 0';
            
            const angle = (j / 8) * 360;
            spoke.style.transform = `rotate(${angle}deg)`;
            
            circularWeb.appendChild(spoke);
        }
        
        effectsContainer.appendChild(circularWeb);
    }
}

// Function to create slime drops for Goop
function createSlimeDrops() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    // Create slime drops
    for (let i = 0; i < 40; i++) {
        const slimeDrop = document.createElement('div');
        slimeDrop.className = 'effect-element';
        
        const size = Math.random() * 15 + 5;
        slimeDrop.style.width = `${size}px`;
        slimeDrop.style.height = `${size + Math.random() * 10}px`;
        
        // Acid green color for Goop
        const hue = 75 + Math.floor(Math.random() * 20);
        const sat = 80 + Math.floor(Math.random() * 20);
        const light = 40 + Math.floor(Math.random() * 20);
        
        slimeDrop.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`;
        slimeDrop.style.boxShadow = `0 0 10px hsl(${hue}, ${sat}%, ${light + 10}%)`;
        slimeDrop.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        slimeDrop.style.left = `${left}%`;
        slimeDrop.style.top = `${top}%`;
        
        // Create dripping animation
        const keyframeId = `drip-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0% { transform: scale(1) translateY(0); opacity: 0.8; }
                100% { transform: scale(0.5) translateY(${Math.random() * 300 + 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        slimeDrop.style.animation = `${keyframeId} ${duration}s infinite ${delay}s`;
        
        effectsContainer.appendChild(slimeDrop);
    }
    
    // Create slime puddle at the bottom
    const slimePuddle = document.createElement('div');
    slimePuddle.className = 'effect-element slime-puddle';
    slimePuddle.style.width = '300px';
    slimePuddle.style.height = '50px';
    slimePuddle.style.backgroundColor = 'rgba(149, 214, 65, 0.5)';
    slimePuddle.style.borderRadius = '50%';
    slimePuddle.style.boxShadow = '0 0 20px rgba(149, 214, 65, 0.7)';
    slimePuddle.style.bottom = '0';
    slimePuddle.style.left = '50%';
    slimePuddle.style.transform = 'translateX(-50%)';
    
    // Create puddle pulsing animation
    const puddleKeyframe = document.createElement('style');
    puddleKeyframe.textContent = `
        @keyframes puddlePulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.1); }
        }
    `;
    document.head.appendChild(puddleKeyframe);
    slimePuddle.style.animation = 'puddlePulse 4s infinite';
    
    effectsContainer.appendChild(slimePuddle);
}

// Function to create starry background for Alien X
function createStarryBackground() {
    const effectsContainer = document.getElementById('effect-elements');
    effectsContainer.innerHTML = '';
    
    // Create dark overlay
    const darkOverlay = document.createElement('div');
    darkOverlay.className = 'effect-element dark-space';
    darkOverlay.style.width = '100%';
    darkOverlay.style.height = '100%';
    darkOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    darkOverlay.style.top = '0';
    darkOverlay.style.left = '0';
    effectsContainer.appendChild(darkOverlay);
    
    // Create stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'effect-element star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 8px white';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // Create twinkling animation
        const keyframeId = `twinkle-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0%, 100% { opacity: ${Math.random() * 0.5 + 0.5}; }
                50% { opacity: ${Math.random() * 0.2}; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 5 + 1;
        const delay = Math.random() * 5;
        star.style.animation = `${keyframeId} ${duration}s infinite ${delay}s`;
        
        effectsContainer.appendChild(star);
    }
    
    // Create cosmic energy
    for (let i = 0; i < 10; i++) {
        const cosmic = document.createElement('div');
        cosmic.className = 'effect-element cosmic-energy';
        
        const size = Math.random() * 100 + 50;
        cosmic.style.width = `${size}px`;
        cosmic.style.height = `${size}px`;
        
        // Create a gradient with cosmic colors
        const hue1 = Math.random() * 360;
        const hue2 = (hue1 + 180) % 360; // Complementary color
        cosmic.style.background = `radial-gradient(circle, rgba(255,255,255,0.8) 0%, hsl(${hue1}, 100%, 70%) 30%, hsl(${hue2}, 100%, 50%) 70%, rgba(0,0,0,0) 100%)`;
        cosmic.style.borderRadius = '50%';
        cosmic.style.opacity = '0.6';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        cosmic.style.left = `${left}%`;
        cosmic.style.top = `${top}%`;
        
        // Create pulsing animation
        const keyframeId = `cosmic-pulse-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0%, 100% { transform: scale(0.8); }
                50% { transform: scale(1.2); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        cosmic.style.animation = `${keyframeId} ${duration}s infinite ${delay}s`;
        
        effectsContainer.appendChild(cosmic);
    }
    
    // Create celestial symbols (like the ones on Alien X's body)
    for (let i = 0; i < 5; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'effect-element celestial-symbol';
        
        const size = Math.random() * 30 + 20;
        symbol.style.width = `${size}px`;
        symbol.style.height = `${size}px`;
        symbol.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        
        // Create different celestial symbols with clip-path
        const symbolShapes = [
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // star
            'circle(50% at 50% 50%)', // circle
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // diamond
            'polygon(50% 0%, 100% 100%, 0% 100%)' // triangle
        ];
        
        const symbolIndex = Math.floor(Math.random() * symbolShapes.length);
        symbol.style.clipPath = symbolShapes[symbolIndex];
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        symbol.style.left = `${left}%`;
        symbol.style.top = `${top}%`;
        
        // Create floating and rotating animation
        const keyframeId = `symbol-float-${i}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${keyframeId} {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        const duration = Math.random() * 30 + 20;
        symbol.style.animation = `${keyframeId} ${duration}s infinite`;
        
        effectsContainer.appendChild(symbol);
    }
}