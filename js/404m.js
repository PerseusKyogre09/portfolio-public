document.addEventListener('DOMContentLoaded', () => {
    // Create psychic particles
    const createParticles = () => {
        const body = document.querySelector('body');
        const numParticles = 100;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = '#a288e3';
            particle.style.boxShadow = '0 0 8px #a288e3';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.8';
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 5;
            
            particle.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
            
            body.appendChild(particle);
        }
    };
    
    createParticles();
    
    // Add occasional psychic flash
    const addPsychicFlash = () => {
        const flashInterval = setInterval(() => {
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = 'rgba(147, 112, 219, 0.3)';
            flash.style.zIndex = '5';
            flash.style.pointerEvents = 'none';
            
            document.body.appendChild(flash);
            
            setTimeout(() => {
                flash.style.opacity = '0';
                flash.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    document.body.removeChild(flash);
                }, 500);
            }, 200);
        }, Math.random() * 5000 + 3000); // Random flash between 3-8 seconds
    };
    
    addPsychicFlash();
});