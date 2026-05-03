document.addEventListener("DOMContentLoaded", function() {
    const stickers = document.querySelectorAll('.sticker');
    const placedStickers = [];
    const section = document.getElementById('github-section');
    
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

const tardisSticker = document.querySelector('.sticker[alt="TARDIS"]');
if (tardisSticker) {
  tardisSticker.addEventListener('click', function() {
    createTardisEffect();
  });
}

function createTardisEffect() {
  const pageContent = document.createElement('div');
  pageContent.className = 'tardis-blur-wrapper';
  
  Array.from(document.body.children).forEach(child => {
    if (child.tagName !== 'SCRIPT' && 
        !child.classList.contains('tardis-container') && 
        !child.classList.contains('blocking-overlay')) {
      pageContent.appendChild(child);
    }
  });
  
  document.body.appendChild(pageContent);
  
  pageContent.classList.add('tardis-blur');
  
  const blockingOverlay = document.createElement('div');
  blockingOverlay.className = 'blocking-overlay';
  document.body.appendChild(blockingOverlay);
  
  const tardisSound = new Audio('../assets/sounds/tardis.mp3');
  tardisSound.volume = 0.5;
  tardisSound.play().catch(e => console.log('Audio playback prevented: ', e));
  
  const tardisContainer = document.createElement('div');
  tardisContainer.className = 'tardis-container';
  
  const tardisImg = document.createElement('img');
  tardisImg.src = '../assets/tardis.png';
  tardisImg.alt = 'TARDIS';
  tardisImg.className = 'tardis-img';
  
  const tardisMessage = document.createElement('div');
  tardisMessage.className = 'tardis-message';
  tardisMessage.textContent = "Oops, looks like the Doctor landed in the wrong place and time!";
  
  const tardisButton = document.createElement('button');
  tardisButton.className = 'tardis-button';
  tardisButton.textContent = "Go back in time";
  tardisButton.addEventListener('click', function() {
    removeTardisEffect();
  });
  
  tardisContainer.appendChild(tardisImg);
  tardisContainer.appendChild(tardisMessage);
  tardisContainer.appendChild(tardisButton);
  document.body.appendChild(tardisContainer);
  
  setTimeout(() => {
    tardisContainer.classList.add('tardis-visible');
  }, 100);
}

function removeTardisEffect() {
  const tardisContainer = document.querySelector('.tardis-container');
  const blockingOverlay = document.querySelector('.blocking-overlay');
  const blurWrapper = document.querySelector('.tardis-blur-wrapper');
  
  if (tardisContainer) {
    const tardisButton = document.querySelector('.tardis-button');
    const tardisMessage = document.querySelector('.tardis-message');
    
    tardisButton.style.opacity = '0';
    tardisMessage.style.opacity = '0';
    
    const tardisLeavingSound = new Audio('../assets/sounds/tardis-leaving.mp3');
    tardisLeavingSound.volume = 0.5;
    tardisLeavingSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    const tardisImg = document.querySelector('.tardis-img');
    tardisImg.classList.add('tardis-departing');
    
    setTimeout(() => {
      blurWrapper.classList.add('tardis-unblur');
    }, 10000);
    
    setTimeout(() => {
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

const masterballSticker = document.querySelector('.sticker[alt="MasterBall"]');
if (masterballSticker) {
  masterballSticker.addEventListener('click', function() {
    createMasterballEffect();
  });
}

function createMasterballEffect() {
  const blockingOverlay = document.createElement('div');
  blockingOverlay.className = 'blocking-overlay';
  document.body.appendChild(blockingOverlay);
  
  const masterballContainer = document.createElement('div');
  masterballContainer.className = 'masterball-container';
  
  const masterballImg = document.createElement('img');
  masterballImg.src = '../assets/masterball.png';
  masterballImg.alt = 'MasterBall';
  masterballImg.className = 'masterball-img';
  
  masterballContainer.appendChild(masterballImg);
  document.body.appendChild(masterballContainer);
  
  const throwSound = new Audio('../assets/sounds/masterball-throw.mp3');
  throwSound.volume = 0.5;
  throwSound.play().catch(e => console.log('Audio playback prevented: ', e));
  
  setTimeout(() => {
    masterballContainer.classList.add('masterball-throw');
    
    setTimeout(() => {
      const captureSound = new Audio('../assets/sounds/masterball-capture.mp3');
      captureSound.volume = 0.5;
      captureSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      masterballContainer.classList.add('masterball-shake');
      
      setTimeout(() => {
        masterballContainer.remove();
        
        const mewtwoContainer = document.createElement('div');
        mewtwoContainer.className = 'mewtwo-container';
        
        const mewtwoImg = document.createElement('img');
        mewtwoImg.src = '../assets/mewtwo.png';
        mewtwoImg.alt = 'Mewtwo';
        mewtwoImg.className = 'mewtwo-img';
        
        mewtwoContainer.appendChild(mewtwoImg);
        document.body.appendChild(mewtwoContainer);
        
        const mewtwoSound = new Audio('../assets/sounds/mewtwo-cry.mp3');
        mewtwoSound.volume = 0.5;
        mewtwoSound.play().catch(e => console.log('Audio playback prevented: ', e));
        
        setTimeout(() => {
          mewtwoContainer.classList.add('mewtwo-appear');
          
          setTimeout(() => {
            document.body.classList.add('psychic-effect');
            
            const psychicSound = new Audio('../assets/sounds/psychic-attack.mp3');
            psychicSound.volume = 0.5;
            psychicSound.play().catch(e => console.log('Audio playback prevented: ', e));
            
            createPsychicWaves();
            
            mewtwoImg.classList.add('psychic-glow');
            
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
  const waveContainer = document.createElement('div');
  waveContainer.className = 'psychic-wave-container';
  document.body.appendChild(waveContainer);
  
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'psychic-wave';
    wave.style.animationDelay = `${i * 0.2}s`;
    waveContainer.appendChild(wave);
  }
  
  for (let i = 0; i < 40; i++) {
    createPsychicParticle();
  }
}

function createPsychicParticle() {
  const particle = document.createElement('div');
  particle.className = 'psychic-particle';
  
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angle = Math.random() * Math.PI * 2;
  const distance = 100 + Math.random() * 150;
  
  const xPos = centerX + Math.cos(angle) * distance;
  const yPos = centerY + Math.sin(angle) * distance;
  
  const size = Math.random() * 15 + 5;
  
  particle.style.left = `${xPos}px`;
  particle.style.top = `${yPos}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  document.body.appendChild(particle);
  
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

document.addEventListener("DOMContentLoaded", function() {
  const omnitrixSticker = document.querySelector('.sticker[alt="Omnitrix"]') || 
                         document.querySelector('img[alt="Omnitrix"]');
  
  console.log('Omnitrix element found:', omnitrixSticker);
  
  if (omnitrixSticker) {
    console.log('Adding click event to Omnitrix');
    omnitrixSticker.style.cursor = 'pointer';
    
    omnitrixSticker.addEventListener('click', function() {
      console.log('Omnitrix clicked!');
      createBlockingOverlay();
      const activationSound = new Audio('../assets/sounds/omnitrix-activation.mp3');
      activationSound.volume = 0.5;
      activationSound.play().catch(e => console.log('Audio playback prevented: ', e));
      showOmnitrixInterface();
    });
  } else {
    console.error('Omnitrix sticker not found in DOM');
  }
  
  function createBlockingOverlay() {
    const blockingOverlay = document.createElement('div');
    blockingOverlay.className = 'blocking-overlay';
    blockingOverlay.style.pointerEvents = 'none';
    document.body.appendChild(blockingOverlay);
  }
  
  function showOmnitrixInterface() {
    const omnitrixInterface = document.createElement('div');
    omnitrixInterface.className = 'omnitrix-interface';
    omnitrixInterface.style.zIndex = '10000';
    
    const omnitrixBody = document.createElement('div');
    omnitrixBody.className = 'omnitrix-body';
    const omnitrixDial = document.createElement('div');
    omnitrixDial.className = 'omnitrix-dial';
    const hologramDisplay = document.createElement('div');
    hologramDisplay.className = 'hologram-display';
    const aliens = [
      { name: "Swampfire", color: "#8BC34A", power: "fireBlast" },
      { name: "Echo Echo", color: "#E0E0E0", power: "soundWave" },
      { name: "Humungousaur", color: "#795548", power: "smash" },
      { name: "Jetray", color: "#F44336", power: "laserBeam" },
      { name: "Big Chill", color: "#2196F3", power: "freeze" },
      { name: "Chromastone", color: "#9C27B0", power: "energyBeam" },
      { name: "Brainstorm", color: "#FFC107", power: "electricShock" },
      { name: "Spidermonkey", color: "#1565C0", power: "webShot" },
      { name: "Goop", color: "#4CAF50", power: "acidMelt" },
      { name: "Alien X", color: "#000000", power: "realityWarp" }
    ];
    
    const hologramContainer = document.createElement('div');
    hologramContainer.className = 'hologram-container';
    
    aliens.forEach((alien, index) => {
      const hologram = document.createElement('div');
      hologram.className = 'alien-hologram';
      hologram.dataset.alien = alien.name;
      hologram.dataset.power = alien.power;
      hologram.style.backgroundColor = "rgba(0, 255, 0, 0.7)"; // Brighter green
      hologram.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.8)"; // Add glow effect
      hologram.style.cursor = 'pointer';
      hologram.style.pointerEvents = 'auto';
      
      const angle = (index / aliens.length) * Math.PI * 2;
      const radius = 180;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      hologram.style.transform = `translate(${x}px, ${y}px)`;
      
      const nameLabel = document.createElement('div');
      nameLabel.className = 'alien-name';
      nameLabel.textContent = alien.name;
      nameLabel.style.textShadow = "0 0 5px rgba(0, 255, 0, 0.8)"; // Add text glow
      hologram.appendChild(nameLabel);
      const silhouette = document.createElement('div');
      silhouette.className = 'alien-silhouette';
      let alienFileName = alien.name.toLowerCase().replace(' ', '');
      if (alienFileName === "chromastone") {
        alienFileName = "cromastone";
      }
      
      silhouette.style.backgroundImage = `url('../assets/aliens/${alienFileName}.png')`;
      silhouette.style.filter = 'brightness(0)'; // Keep silhouettes completely black
      hologram.appendChild(silhouette);
      
      hologramContainer.appendChild(hologram);
      
      hologram.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event bubbling
        console.log(`Clicked on ${alien.name}`);
        selectAlien(alien.name, alien.power);
      });
    });
    
    const faceplate = document.createElement('div');
    faceplate.className = 'omnitrix-faceplate';
    
    const faceplateSymbol = document.createElement('div');
    faceplateSymbol.className = 'omnitrix-symbol';
    faceplate.appendChild(faceplateSymbol);
    
    hologramDisplay.appendChild(hologramContainer);
    omnitrixDial.appendChild(hologramDisplay);
    omnitrixBody.appendChild(omnitrixDial);
    omnitrixBody.appendChild(faceplate);
    omnitrixInterface.appendChild(omnitrixBody);
    
    document.body.appendChild(omnitrixInterface);
    
    setTimeout(() => {
      omnitrixInterface.classList.add('active');
      omnitrixDial.classList.add('glow');
    }, 100);
    
    let currentRotation = 0;
    
    function rotateHolograms(direction) {
      const rotateSound = new Audio('../assets/sounds/omnitrix-rotate.mp3');
      rotateSound.volume = 0.3;
      rotateSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      const rotationAmount = direction === 'left' ? 36 : -36;
      currentRotation += rotationAmount;
      
      document.querySelectorAll('.alien-hologram').forEach((hologram, index) => {
        const angle = ((index / aliens.length) * Math.PI * 2) + (currentRotation * Math.PI / 180);
        const radius = 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        hologram.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        rotateHolograms('left');
      } else if (event.key === "ArrowRight") {
        rotateHolograms('right');
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    omnitrixInterface.keyboardListener = handleKeyDown;
    
    const instruction = document.createElement('div');
    instruction.className = 'keyboard-instruction';
    instruction.textContent = 'Use ← → arrow keys to rotate';
    instruction.style.position = 'absolute';
    instruction.style.bottom = '20px';
    instruction.style.left = '50%';
    instruction.style.transform = 'translateX(-50%)';
    instruction.style.color = 'rgba(0, 255, 0, 0.8)';
    instruction.style.fontSize = '14px';
    instruction.style.fontWeight = 'bold';
    instruction.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.5)';
    instruction.style.zIndex = '11000';
    omnitrixInterface.appendChild(instruction);
  }
  
  function selectAlien(alienName, power) {
    console.log(`Selected: ${alienName} with power: ${power}`);
    
    const selectedAlien = document.querySelector(`.alien-hologram[data-alien="${alienName}"]`);
    const hologramContainer = document.querySelector('.hologram-container');
    const omnitrixFaceplate = document.querySelector('.omnitrix-faceplate');
    if (selectedAlien.classList.contains('centered')) {
      const transformSound = new Audio('../assets/sounds/transformation.mp3');
      transformSound.volume = 0.5;
      transformSound.play().catch(e => console.log('Audio playback prevented: ', e));
      const omnitrixInterface = document.querySelector('.omnitrix-interface');
      if (omnitrixInterface) {
        if (omnitrixInterface.keyboardListener) {
          document.removeEventListener('keydown', omnitrixInterface.keyboardListener);
        }
        
        omnitrixInterface.classList.add('fade-out');
        
        setTimeout(() => {
          document.body.removeChild(omnitrixInterface);
          showTransformation(alienName, power);
        }, 1000);
      }
    } else {
      const rotateSound = new Audio('../assets/sounds/omnitrix-rotate.mp3');
      rotateSound.volume = 0.3;
      rotateSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      document.querySelectorAll('.alien-hologram').forEach(hologram => {
        if (hologram !== selectedAlien) {
          hologram.style.opacity = '0';
        }
      });
      
      omnitrixFaceplate.style.opacity = '0';
      omnitrixFaceplate.style.visibility = 'hidden';
      
      selectedAlien.style.transform = 'translate(0px, 0px) scale(5)';
      selectedAlien.classList.add('centered');
      
      selectedAlien.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.8)';
      selectedAlien.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
      
      const omnitrixDial = document.querySelector('.omnitrix-dial');
      if (omnitrixDial) {
        omnitrixDial.classList.add('pulse-ready');
      }
      
      const silhouette = selectedAlien.querySelector('.alien-silhouette');
      if (silhouette) {
        silhouette.style.cursor = 'pointer';
        silhouette.addEventListener('click', function(e) {
          e.stopPropagation();
          selectAlien(alienName, power);
        });
      }
      
      selectedAlien.addEventListener('click', function(e) {
        if (selectedAlien.classList.contains('centered')) {
          e.stopPropagation();
          selectAlien(alienName, power);
        }
      });
    }
  }
  
  function showTransformation(alienName, power) {
    const flash = document.createElement('div');
    flash.className = 'transformation-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.classList.add('active');
      
      setTimeout(() => {
        flash.classList.remove('active');
        showAlien(alienName, power);
      }, 2000);
    }, 100);
  }
  
  function showAlien(alienName, power) {
    const alien = document.createElement('div');
    alien.className = 'alien ' + alienName.toLowerCase().replace(' ', '-');
    
    const alienImage = document.createElement('img');
    let alienFileName = alienName.toLowerCase().replace(' ', '');
    
    if (alienFileName === "chromastone") {
      alienFileName = "cromastone";
    }
    
    alienImage.src = `../assets/aliens/${alienFileName}.png`;
    alienImage.alt = alienName;
    alien.appendChild(alienImage);
    
    document.body.appendChild(alien);
    
    setTimeout(() => {
      alien.classList.add('active');
      
      setTimeout(() => {
        const alienCrySound = new Audio(`../assets/sounds/aliens/${alienFileName}-cry.mp3`);
        alienCrySound.volume = 0.7;
        alienCrySound.play().catch(e => console.log('Alien cry sound playback prevented: ', e));
        setTimeout(() => {
          const catchphraseElement = document.createElement('div');
          catchphraseElement.className = 'alien-catchphrase';
          catchphraseElement.textContent = getAlienCatchphrase(alienName);
          document.body.appendChild(catchphraseElement);
          
          setTimeout(() => {
            catchphraseElement.classList.add('active');
            
            setTimeout(() => {
              executePower(power);
              
              sessionStorage.setItem('selectedAlien', alienName);
              
              setTimeout(() => {
                window.location.href = "../404b.html";
              }, 7000);
            }, 3000);
          }, 1000);
        }, 2000);
      }, 1000);
    }, 100);
  }
  
  function getAlienCatchphrase(alienName) {
    const catchphrases = {
      "Swampfire": "Time to bring the heat!",
      "Echo Echo": "Echo Echo! Wall! Of! Sound!",
      "Humungousaur": "Humungousaur! Time to go big!",
      "Jetray": "Jetray! Faster than light!",
      "Big Chill": "Big Chill! Cool it down!",
      "Chromastone": "Chromastone! Light it up!",
      "Brainstorm": "Brainstorm! Let me tell you, quite frankly...",
      "Spidermonkey": "Spidermonkey! Ready to swing into action!",
      "Goop": "Goop! Time to get sticky!",
      "Alien X": "Alien X! Reality is mine to command!"
    };
    
    return catchphrases[alienName] || `It's ${alienName} time!`;
  }
  
  function executePower(power) {
    document.body.classList.add('power-active');
    
    switch (power) {
      case 'fireBlast':
        createFireEffect();
        break;
      case 'soundWave':
        createSoundWaveEffect();
        break;
      case 'smash':
        createSmashEffect();
        break;
      case 'laserBeam':
        createLaserEffect();
        break;
      case 'freeze':
        createFreezeEffect();
        break;
      case 'energyBeam':
        createEnergyBeamEffect();
        break;
      case 'electricShock':
        createElectricEffect();
        break;
      case 'webShot':
        createWebEffect();
        break;
      case 'acidMelt':
        createAcidEffect();
        break;
      case 'realityWarp':
        createRealityWarpEffect();
        break;
      default:
        createGenericEffect();
    }
  }
  
  function createFireEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'destruction-overlay fire-overlay';
    document.body.appendChild(overlay);
    
    for (let i = 0; i < 50; i++) {
      const flame = document.createElement('div');
      flame.className = 'flame-particle';
      flame.style.left = `${Math.random() * 100}%`;
      flame.style.animationDuration = `${0.5 + Math.random() * 2}s`;
      flame.style.animationDelay = `${Math.random() * 0.5}s`;
      overlay.appendChild(flame);
    }
    
    const burnSound = new Audio('../assets/sounds/fire-burn.mp3');
    burnSound.volume = 0.5;
    burnSound.play().catch(e => console.log('Audio playback prevented: ', e));
  }
  
  function createSoundWaveEffect() {
    const container = document.createElement('div');
    container.className = 'sound-wave-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < 8; i++) {
      const wave = document.createElement('div');
      wave.className = 'sound-wave';
      container.appendChild(wave);
      
      setTimeout(() => {
        wave.classList.add('expand');
      }, i * 300);
    }
    
    const soundWaveAudio = new Audio('../assets/sounds/sound-wave.mp3');
    soundWaveAudio.volume = 0.5;
    soundWaveAudio.play().catch(e => console.log('Audio playback prevented: ', e));
    
    setTimeout(() => {
      document.body.classList.add('shatter');
    }, 1500);
  }
  
  function createSmashEffect() {
    document.body.classList.add('shake-heavy');
    
    const cracks = document.createElement('div');
    cracks.className = 'screen-cracks';
    document.body.appendChild(cracks);
    
    for (let i = 0; i < 15; i++) {
      const crack = document.createElement('div');
      crack.className = 'crack';
      
      const startX = 50 + (Math.random() - 0.5) * 20;
      const startY = 50 + (Math.random() - 0.5) * 20;
      
      crack.style.left = `${startX}%`;
      crack.style.top = `${startY}%`;
      crack.style.transform = `rotate(${Math.random() * 360}deg)`;
      crack.style.animationDelay = `${i * 0.1}s`;
      
      cracks.appendChild(crack);
    }
    
    const smashSound = new Audio('../assets/sounds/smash.mp3');
    smashSound.volume = 0.5;
    smashSound.play().catch(e => console.log('Audio playback prevented: ', e));
  }
  
  function createLaserEffect() {
    const laser = document.createElement('div');
    laser.className = 'laser-beam';
    document.body.appendChild(laser);
    
    setTimeout(() => {
      laser.classList.add('active');
      
      const laserSound = new Audio('../assets/sounds/laser.mp3');
      laserSound.volume = 0.4;
      laserSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      setTimeout(() => {
        document.body.classList.add('burn-out');
      }, 1000);
    }, 100);
  }
  
  function createFreezeEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'freeze-overlay';
    document.body.appendChild(overlay);
    
    overlay.style.backgroundImage = 'url("../assets/effects/ice-effect.png")';
    overlay.style.backgroundSize = 'cover';
    
    const frostParticles = document.createElement('div');
    frostParticles.className = 'frost-particles';
    document.body.appendChild(frostParticles);
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'frost-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${2 + Math.random() * 4}s`;
      particle.style.animationDelay = `${Math.random()}s`;
      
      particle.style.backgroundImage = `url("../assets/effects/snowflake.png")`;
      particle.style.backgroundSize = 'contain';
      particle.style.backgroundRepeat = 'no-repeat';
      particle.style.opacity = '0.2';
      const scale = 0.5 + Math.random();
      const rotation = Math.random() * 360;
      particle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      
      frostParticles.appendChild(particle);
    }
    
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        const crack = document.createElement('div');
        crack.className = 'ice-crack';
        crack.style.left = `${20 + Math.random() * 60}%`;
        crack.style.top = `${20 + Math.random() * 60}%`;
        crack.style.width = `${50 + Math.random() * 200}px`;
        crack.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const crackNum = Math.floor(Math.random() * 3) + 1;
        crack.style.backgroundImage = `url("../assets/effects/ice-crack${crackNum}.png")`;
        crack.style.backgroundSize = 'contain';
        crack.style.backgroundRepeat = 'no-repeat';
        
        overlay.appendChild(crack);
      }
      
      const frostBorder = document.createElement('div');
      frostBorder.className = 'frost-border';
      frostBorder.style.backgroundImage = 'url("../assets/effects/frost-border.png")';
      frostBorder.style.backgroundSize = 'cover';
      document.body.appendChild(frostBorder);
      
      const freezeSound = new Audio('../assets/sounds/freeze.mp3');
      freezeSound.volume = 0.5;
      freezeSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      const blackoutOverlay = document.createElement('div');
      blackoutOverlay.className = 'blackout-overlay';
      blackoutOverlay.style.position = 'fixed';
      blackoutOverlay.style.top = '0';
      blackoutOverlay.style.left = '0';
      blackoutOverlay.style.width = '100%';
      blackoutOverlay.style.height = '100%';
      blackoutOverlay.style.backgroundColor = 'black';
      blackoutOverlay.style.opacity = '0';
      blackoutOverlay.style.transition = 'opacity 1.5s ease-in';
      blackoutOverlay.style.zIndex = '99999';
      document.body.appendChild(blackoutOverlay);
      
      setTimeout(() => {
        blackoutOverlay.style.opacity = '1';
        
        const crackSound = new Audio('../assets/sounds/ice-crack.mp3');
        crackSound.volume = 0.4;
        crackSound.play().catch(e => console.log('Audio playback prevented: ', e));
      }, 4500);
    }, 500);
    
    setTimeout(() => {
      document.body.classList.add('shatter-freeze');
      
      const shardContainer = document.createElement('div');
      shardContainer.className = 'ice-shard-container';
      shardContainer.style.position = 'fixed';
      shardContainer.style.left = '0';
      shardContainer.style.top = '0';
      shardContainer.style.width = '100vw';
      shardContainer.style.height = '100vh';
      shardContainer.style.pointerEvents = 'none';
      shardContainer.style.zIndex = '10000';
      document.body.appendChild(shardContainer);
      
      for (let i = 0; i < 15; i++) {
        const shard = document.createElement('div');
        shard.className = 'ice-shard';
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const startX = viewportWidth * (0.3 + Math.random() * 0.4);
        const startY = viewportHeight * (0.3 + Math.random() * 0.4);
        
        shard.style.position = 'absolute';
        shard.style.left = `${startX}px`;
        shard.style.top = `${startY}px`;
        
        shard.style.backgroundImage = `url("../assets/effects/ice-shard.png")`;
        shard.style.backgroundSize = 'contain';
        shard.style.backgroundRepeat = 'no-repeat';
        
        shard.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`;
        
        shardContainer.appendChild(shard);
        
        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2;
          
          const maxDistance = Math.min(viewportWidth, viewportHeight) * 0.5;
          const distance = 100 + Math.random() * maxDistance;
          
          const xMove = Math.cos(angle) * distance;
          const yMove = Math.sin(angle) * distance;
          
          shard.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
          shard.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 720}deg) scale(0)`;
          shard.style.opacity = '0';
        }, 100 + Math.random() * 500);
      }
      
      const shatterSound = new Audio('../assets/sounds/ice-shatter.mp3');
      shatterSound.volume = 0.4;
      shatterSound.play().catch(e => console.log('Audio playback prevented: ', e));
    }, 2500);
  }
  
  function createEnergyBeamEffect() {
    const beams = document.createElement('div');
    beams.className = 'energy-beams';
    document.body.appendChild(beams);
    
    for (let i = 0; i < 8; i++) {
      const beam = document.createElement('div');
      beam.className = 'energy-beam';
      beam.style.transform = `rotate(${i * 45}deg)`;
      beams.appendChild(beam);
    }
    
    setTimeout(() => {
      beams.classList.add('active');
      
      const energySound = new Audio('../assets/sounds/energy-beam.mp3');
      energySound.volume = 0.5;
      energySound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      setTimeout(() => {
        document.body.classList.add('disintegrate');
      }, 1000);
    }, 100);
  }
  
  function createElectricEffect() {
    const container = document.createElement('div');
    container.className = 'electric-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
      createLightning(container);
    }
    
    const electricSound = new Audio('../assets/sounds/electric.mp3');
    electricSound.volume = 0.4;
    electricSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    setTimeout(() => {
      document.body.classList.add('electrify');
    }, 1000);
  }
  
  function createLightning(container) {
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    
    const startX = Math.random() * 100;
    lightning.style.left = `${startX}%`;
    lightning.style.top = '0';
    lightning.style.animationDelay = `${Math.random() * 1}s`;
    
    container.appendChild(lightning);
    
    setTimeout(() => {
      container.removeChild(lightning);
      createLightning(container);
    }, 1000 + Math.random() * 2000);
  }
  
  function createWebEffect() {
    const webContainer = document.createElement('div');
    webContainer.className = 'web-container';
    document.body.appendChild(webContainer);
    
    for (let i = 0; i < 15; i++) {
      const web = document.createElement('div');
      web.className = 'web-strand';
      
      const startAngle = Math.random() * 360;
      const startX = 50 + Math.cos(startAngle) * 50;
      const startY = 50 + Math.sin(startAngle) * 50;
      
      web.style.left = `${startX}%`;
      web.style.top = `${startY}%`;
      web.style.transform = `rotate(${startAngle}deg)`;
      
      webContainer.appendChild(web);
    }
    
    const webSound = new Audio('../assets/sounds/web.mp3');
    webSound.volume = 0.4;
    webSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    setTimeout(() => {
      const webOverlay = document.createElement('div');
      webOverlay.className = 'web-overlay';
      webOverlay.style.backgroundImage = 'url("../assets/effects/web-overlay.png")';
      webOverlay.style.backgroundSize = 'cover';
      webOverlay.style.backgroundPosition = 'center';
      document.body.appendChild(webOverlay);
    }, 1500);
  }
  
  function createAcidEffect() {
    const acid = document.createElement('div');
    acid.className = 'acid-overlay';
    document.body.appendChild(acid);
    
    for (let i = 0; i < 30; i++) {
      const drop = document.createElement('div');
      drop.className = 'acid-drop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${1 + Math.random()}s`;
      drop.style.animationDelay = `${Math.random() * 1.5}s`;
      acid.appendChild(drop);
    }
    
    const acidSound = new Audio('../assets/sounds/acid.mp3');
    acidSound.volume = 0.4;
    acidSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    setTimeout(() => {
      document.body.classList.add('melt');
    }, 1000);
  }
  
  function createRealityWarpEffect() {
    const warp = document.createElement('div');
    warp.className = 'reality-warp';
    document.body.appendChild(warp);
    
    const stars = document.createElement('div');
    stars.className = 'cosmic-stars';
    warp.appendChild(stars);
    
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'cosmic-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${0.5 + Math.random() * 2}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      stars.appendChild(star);
    }
    
    setTimeout(() => {
      warp.classList.add('active');
      
      const warpSound = new Audio('../assets/sounds/reality-warp.mp3');
      warpSound.volume = 0.5;
      warpSound.play().catch(e => console.log('Audio playback prevented: ', e));
      
      setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.className = 'reality-ripple';
        document.body.appendChild(ripple);
        
        document.body.classList.add('dissolve');
      }, 1500);
    }, 500);
  }
  
  function createGenericEffect() {
    const explosion = document.createElement('div');
    explosion.className = 'generic-explosion';
    document.body.appendChild(explosion);
    
    const explosionSound = new Audio('../assets/sounds/explosion.mp3');
    explosionSound.volume = 0.4;
    explosionSound.play().catch(e => console.log('Audio playback prevented: ', e));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const optimusSticker = document.querySelector('.sticker[alt="Autobots"]');
  if (optimusSticker) {
    optimusSticker.addEventListener('click', function() {
      createBlockingOverlay();
      playTransformersSequence();
    });
  }
  
  function playTransformersSequence() {
    const engineSound = new Audio('../assets/sounds/truck-engine.mp3');
    engineSound.volume = 0.5;
    engineSound.play().catch(e => console.log('Audio playback prevented: ', e));
    
    showTruckApproaching();
    
    setTimeout(function() {
      const transformSound = new Audio('../assets/sounds/transform-sound.mp3');
      transformSound.volume = 0.5;
      transformSound.play().catch(e => console.log('Audio playback prevented: ', e));
      showRobotTransformation();
    }, 3000);
    
    setTimeout(function() {
      const optimusVoice = new Audio('../assets/sounds/optimus-quote.mp3');
      optimusVoice.volume = 0.6;
      optimusVoice.play().catch(e => console.log('Audio playback prevented: ', e));
      showOptimusQuote("Freedom is the right of all sentient beings.");
    }, 5000);
    
    setTimeout(function() {
      showMegatronAppearing();
    }, 8000);
    
    setTimeout(function() {
      const megatronVoice = new Audio('../assets/sounds/megatron-quote.mp3');
      megatronVoice.volume = 0.6;
      megatronVoice.play().catch(e => console.log('Audio playback prevented: ', e));
      showMegatronQuote("They cannot handle the wrath of Decepticon Tyranny... Huhuhahahahahahaha!!");
    }, 9500);
    
    setTimeout(function() {
      window.location.href = "../404t.html";
    }, 16500);
  }
  
  function createBlockingOverlay() {
    const blockingOverlay = document.createElement('div');
    blockingOverlay.className = 'blocking-overlay';
    document.body.appendChild(blockingOverlay);
  }
  
  function showTruckApproaching() {
    const truckContainer = document.createElement('div');
    truckContainer.className = 'truck-container';
    
    const truckImg = document.createElement('img');
    truckImg.src = '../assets/transformers/optimus-truck.png';
    truckImg.alt = 'Optimus Truck';
    truckImg.className = 'truck-img';
    
    truckContainer.appendChild(truckImg);
    document.body.appendChild(truckContainer);
    
    setTimeout(() => {
      truckContainer.classList.add('truck-animate');
    }, 100);
  }
  
  function showRobotTransformation() {
    const truckContainer = document.querySelector('.truck-container');
    if (truckContainer) {
      truckContainer.classList.add('hide');
    }
    
    const flash = document.createElement('div');
    flash.className = 'transform-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      document.body.removeChild(flash);
      
      const robotContainer = document.createElement('div');
      robotContainer.className = 'robot-container';
      
      const robotImg = document.createElement('img');
      robotImg.src = '../assets/transformers/optimus-robot.png';
      robotImg.alt = 'Optimus Robot';
      robotImg.className = 'robot-img';
      
      robotContainer.appendChild(robotImg);
      document.body.appendChild(robotContainer);
      
      setTimeout(() => {
        robotContainer.classList.add('robot-animate');
      }, 100);
    }, 500);
  }
  
  function showOptimusQuote(quote) {
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container autobot-quote';
    
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = quote;
    
    quoteContainer.appendChild(quoteText);
    document.body.appendChild(quoteContainer);
    
    setTimeout(() => {
      quoteContainer.classList.add('quote-animate');
    }, 100);
  }
  
  function showMegatronAppearing() {
    const darkEnergy = document.createElement('div');
    darkEnergy.className = 'dark-energy';
    document.body.appendChild(darkEnergy);
    
    setTimeout(() => {
      darkEnergy.classList.add('dark-energy-animate');
      
      setTimeout(() => {
        const megatronContainer = document.createElement('div');
        megatronContainer.className = 'megatron-container';
        
        const megatronImg = document.createElement('img');
        megatronImg.src = '../assets/transformers/megatron.png';
        megatronImg.alt = 'Megatron';
        megatronImg.className = 'megatron-img';
        
        megatronContainer.appendChild(megatronImg);
        document.body.appendChild(megatronContainer);
        
        setTimeout(() => {
          megatronContainer.classList.add('megatron-animate');
        }, 100);
      }, 1000);
    }, 100);
  }
  
  function showMegatronQuote(quote) {
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container decepticon-quote';
    
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = quote;
    
    quoteContainer.appendChild(quoteText);
    document.body.appendChild(quoteContainer);
    
    setTimeout(() => {
      quoteContainer.classList.add('quote-animate');
    }, 100);
  }
});
