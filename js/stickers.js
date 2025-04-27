document.addEventListener("DOMContentLoaded", function() {
    const stickers = document.querySelectorAll('.sticker');
    const placedStickers = [];
    const section = document.getElementById('github-section');
    
    // Position stickers within the section
    function positionStickers() {
      const sectionRect = section.getBoundingClientRect();
      const sectionWidth = sectionRect.width;
      const sectionHeight = sectionRect.height;
  
      stickers.forEach(sticker => {
        let tries = 0;
        let overlap = true;
        let pos = {x: 0, y: 0};
      
        while (overlap && tries < 100) {
          const stickerWidth = 80;
          const stickerHeight = 80;
          const padding = 20;
      
          const xPercent = Math.random() * 85;
          const yPercent = Math.random() * 85;
          
          const x = (sectionWidth * xPercent / 100);
          const y = (sectionHeight * yPercent / 100);
      
          pos = {x, y};
          overlap = placedStickers.some(p => {
            return (
              x < p.x + stickerWidth + padding &&
              x + stickerWidth + padding > p.x &&
              y < p.y + stickerHeight + padding &&
              y + stickerHeight + padding > p.y
            );
          });
          tries++;
        }
      
        placedStickers.push(pos);
        sticker.style.left = `${pos.x}px`;
        sticker.style.top = `${pos.y}px`;
        sticker.style.opacity = "1";
      });
    }
  
    positionStickers();
    
    window.addEventListener('resize', function() {
      placedStickers.length = 0;
      positionStickers();
    });
    
    const creeperSticker = document.querySelector('.sticker[alt="Creeper"]');
    if (creeperSticker) {
      creeperSticker.addEventListener('click', function() {
        createBlockingOverlay();
        const hissSound = new Audio('../assets/sounds/creeper-hiss.mp3');
        hissSound.volume = 0.5;
        hissSound.play().catch(e => console.log('Audio playback prevented: ', e));
        showCreeperFace();
        document.body.classList.add('shake');
        setTimeout(function() {
          createExplosionEffect();
        }, 3000);
        setTimeout(function() {
          window.location.href = "../404c.html";
        }, 5000);
      });
    }
    
    function createBlockingOverlay() {
      const blockingOverlay = document.createElement('div');
      blockingOverlay.className = 'blocking-overlay';
      document.body.appendChild(blockingOverlay);
    }
    
    function showCreeperFace() {
      const creeperFace = document.createElement('div');
      creeperFace.className = 'creeper-face';
      const creeperImg = document.createElement('img');
      creeperImg.src = '../assets/creeper.png';
      creeperImg.alt = 'Creeper Face';
      creeperImg.className = 'creeper-img';
      
      creeperFace.appendChild(creeperImg);
      document.body.appendChild(creeperFace);
      setTimeout(() => {
        creeperFace.classList.add('fade-in');
        setTimeout(() => {
          creeperFace.classList.add('flash');
        }, 2500);
      }, 100);
    }
    function createExplosionEffect() {
      const overlay = document.createElement('div');
      overlay.className = 'explosion-overlay';
      document.body.appendChild(overlay);
      
      for (let i = 0; i < 80; i++) {
        createExplosionParticle();
      }
      
      setTimeout(() => {
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        overlay.style.opacity = '1';
        
        setTimeout(() => {
          overlay.style.backgroundColor = 'rgba(83, 199, 83, 0.8)';
          
          setTimeout(() => {
            overlay.style.opacity = '0.5';
          }, 200);
        }, 100);
      }, 10);
    }
    
    function createExplosionParticle() {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100;
      
      const xPos = centerX + Math.cos(angle) * distance;
      const yPos = centerY + Math.sin(angle) * distance;
      const size = Math.random() * 20 + 5;
      particle.style.left = `${xPos}px`;
      particle.style.top = `${yPos}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      const moveDistance = 400 + Math.random() * 600;
      const xMove = Math.cos(angle) * moveDistance;
      const yMove = Math.sin(angle) * moveDistance;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.style.transform = `translate(${xMove}px, ${yMove}px)`;
        particle.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(particle);
        }, 1000);
      }, 10);
    }
  });

// Add this code to your stickers.js file, after the existing sticker event listeners

const tardisSticker = document.querySelector('.sticker[alt="TARDIS"]');
if (tardisSticker) {
  tardisSticker.addEventListener('click', function() {
    createTardisEffect();
  });
}

function createTardisEffect() {
  // Create a wrapper for the background elements that will be blurred
  const pageContent = document.createElement('div');
  pageContent.className = 'tardis-blur-wrapper';
  
  // Move all body children (except scripts) to the wrapper
  Array.from(document.body.children).forEach(child => {
    // Skip script tags and the tardis elements we might add
    if (child.tagName !== 'SCRIPT' && 
        !child.classList.contains('tardis-container') && 
        !child.classList.contains('blocking-overlay')) {
      pageContent.appendChild(child);
    }
  });
  
  // Add the wrapper to the body
  document.body.appendChild(pageContent);
  
  // Apply blur to the wrapper
  pageContent.classList.add('tardis-blur');
  
  // Create blocking overlay
  const blockingOverlay = document.createElement('div');
  blockingOverlay.className = 'blocking-overlay';
  document.body.appendChild(blockingOverlay);
  
  // Play TARDIS sound
  const tardisSound = new Audio('../assets/sounds/tardis.mp3');
  tardisSound.volume = 0.5;
  tardisSound.play().catch(e => console.log('Audio playback prevented: ', e));
  
  // Create TARDIS container
  const tardisContainer = document.createElement('div');
  tardisContainer.className = 'tardis-container';
  
  // Create TARDIS image
  const tardisImg = document.createElement('img');
  tardisImg.src = '../assets/tardis.png';
  tardisImg.alt = 'TARDIS';
  tardisImg.className = 'tardis-img';
  
  // Create message
  const tardisMessage = document.createElement('div');
  tardisMessage.className = 'tardis-message';
  tardisMessage.textContent = "Oops, looks like the Doctor landed in the wrong place and time!";
  
  // Create button
  const tardisButton = document.createElement('button');
  tardisButton.className = 'tardis-button';
  tardisButton.textContent = "Go back in time";
  tardisButton.addEventListener('click', function() {
    removeTardisEffect();
  });
  
  // Append elements
  tardisContainer.appendChild(tardisImg);
  tardisContainer.appendChild(tardisMessage);
  tardisContainer.appendChild(tardisButton);
  document.body.appendChild(tardisContainer);
  
  // Add animation
  setTimeout(() => {
    tardisContainer.classList.add('tardis-visible');
  }, 100);
}

function removeTardisEffect() {
  // Get elements
  const tardisContainer = document.querySelector('.tardis-container');
  const blockingOverlay = document.querySelector('.blocking-overlay');
  const blurWrapper = document.querySelector('.tardis-blur-wrapper');
  
  if (tardisContainer) {
    // Hide button and message
    const tardisButton = document.querySelector('.tardis-button');
    const tardisMessage = document.querySelector('.tardis-message');
    
    tardisButton.style.opacity = '0';
    tardisMessage.style.opacity = '0';
    
    // Play TARDIS leaving sound
    const tardisLeavingSound = new Audio('../assets/sounds/tardis-leaving.mp3');
    tardisLeavingSound.volume = 0.5;
    tardisLeavingSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    // Begin TARDIS departure animation but keep the TARDIS visible during the sound
    const tardisImg = document.querySelector('.tardis-img');
    tardisImg.classList.add('tardis-departing');
    
    // Gradually reduce blur over time
    setTimeout(() => {
      blurWrapper.classList.add('tardis-unblur');
    }, 10000);
    
    // Wait for the full sound duration before removing elements
    setTimeout(() => {
      // Move all content back to body
      if (blurWrapper) {
        while (blurWrapper.firstChild) {
          document.body.appendChild(blurWrapper.firstChild);
        }
        blurWrapper.remove();
      }
      
      blockingOverlay?.remove();
      tardisContainer.remove();
    }, 31000); // Match the 31-second sound
  }
}

// Add this code to your stickers.js file, after the existing event listeners

const masterballSticker = document.querySelector('.sticker[alt="MasterBall"]');
if (masterballSticker) {
  masterballSticker.addEventListener('click', function() {
    createMasterballEffect();
  });
}

function createMasterballEffect() {
  // Create blocking overlay
  const blockingOverlay = document.createElement('div');
  blockingOverlay.className = 'blocking-overlay';
  document.body.appendChild(blockingOverlay);
  
  // Create MasterBall animation container
  const masterballContainer = document.createElement('div');
  masterballContainer.className = 'masterball-container';
  
  // Create MasterBall image
  const masterballImg = document.createElement('img');
  masterballImg.src = '../assets/masterball.png';
  masterballImg.alt = 'MasterBall';
  masterballImg.className = 'masterball-img';
  
  // Add masterball to container and body
  masterballContainer.appendChild(masterballImg);
  document.body.appendChild(masterballContainer);
  
  // Play MasterBall throw sound
  const throwSound = new Audio('../assets/sounds/masterball-throw.mp3');
  throwSound.volume = 0.5;
  throwSound.play().catch(e => console.log('Audio playback prevented: ', e));
  
  // Add throw animation
  setTimeout(() => {
    masterballContainer.classList.add('masterball-throw');
    
    // Wait for throw animation to complete
    setTimeout(() => {
      // Play capture sound
      const captureSound = new Audio('../assets/sounds/masterball-capture.mp3');
      captureSound.volume = 0.5;
      captureSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      // Start shake animation
      masterballContainer.classList.add('masterball-shake');
      
      // Wait for shake, then start Mewtwo sequence
      setTimeout(() => {
        // Remove masterball
        masterballContainer.remove();
        
        // Create Mewtwo container
        const mewtwoContainer = document.createElement('div');
        mewtwoContainer.className = 'mewtwo-container';
        
        // Create Mewtwo image
        const mewtwoImg = document.createElement('img');
        mewtwoImg.src = '../assets/mewtwo.png';
        mewtwoImg.alt = 'Mewtwo';
        mewtwoImg.className = 'mewtwo-img';
        
        // Add Mewtwo to page
        mewtwoContainer.appendChild(mewtwoImg);
        document.body.appendChild(mewtwoContainer);
        
        // Play Mewtwo cry sound
        const mewtwoSound = new Audio('../assets/sounds/mewtwo-cry.mp3');
        mewtwoSound.volume = 0.5;
        mewtwoSound.play().catch(e => console.log('Audio playback prevented: ', e));
        
        // Start Mewtwo appearance animation
        setTimeout(() => {
          mewtwoContainer.classList.add('mewtwo-appear');
          
          // Add psychic effect after appearance
          setTimeout(() => {
            // Apply psychic effect to page
            document.body.classList.add('psychic-effect');
            
            // Play psychic attack sound
            const psychicSound = new Audio('../assets/sounds/psychic-attack.mp3');
            psychicSound.volume = 0.5;
            psychicSound.play().catch(e => console.log('Audio playback prevented: ', e));
            
            // Create psychic energy waves
            createPsychicWaves();
            
            // Add pulsing glow to Mewtwo
            mewtwoImg.classList.add('psychic-glow');
            
            // Redirect to 404m.html after effect completes
            setTimeout(() => {
              window.location.href = "../404m.html";
            }, 4000);
          }, 1500);
        }, 500);
      }, 3000); // After masterball shake animation
    }, 1000); // After throw animation
  }, 100);
}

function createPsychicWaves() {
  // Create psychic wave container
  const waveContainer = document.createElement('div');
  waveContainer.className = 'psychic-wave-container';
  document.body.appendChild(waveContainer);
  
  // Create multiple psychic waves
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'psychic-wave';
    wave.style.animationDelay = `${i * 0.2}s`;
    waveContainer.appendChild(wave);
  }
  
  // Create psychic particles
  for (let i = 0; i < 40; i++) {
    createPsychicParticle();
  }
}

function createPsychicParticle() {
  const particle = document.createElement('div');
  particle.className = 'psychic-particle';
  
  // Random position around the center
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angle = Math.random() * Math.PI * 2;
  const distance = 100 + Math.random() * 150;
  
  const xPos = centerX + Math.cos(angle) * distance;
  const yPos = centerY + Math.sin(angle) * distance;
  
  // Random size
  const size = Math.random() * 15 + 5;
  
  particle.style.left = `${xPos}px`;
  particle.style.top = `${yPos}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  document.body.appendChild(particle);
  
  // Animate particle movement
  setTimeout(() => {
    const moveDistance = 300 + Math.random() * 400;
    const xMove = Math.cos(angle) * moveDistance;
    const yMove = Math.sin(angle) * moveDistance;
    
    particle.style.transform = `translate(${xMove}px, ${yMove}px)`;
    particle.style.opacity = '0';
    
    setTimeout(() => {
      document.body.removeChild(particle);
    }, 2000);
  }, 10);
}