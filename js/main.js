document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypedText();
    initMobileMenu();
    initScrollAnimations();
    initScrollCue();
    initPageTransitions();
    initGameModeToggle();
});

// Also add load event to ensure ScrollCue is initialized even if scripts load asynchronously
window.addEventListener('load', function() {
    deferAnimation(() => {
        // Re-initialize ScrollCue on load to ensure all elements are properly animated
        initScrollCue();
        
        // Rerun any other animations that need to be deferred
        if (typeof animateSkillCircles === 'function') {
            animateSkillCircles();
        }
    });
});

function initScrollCue() {
    if (typeof ScrollCue !== 'undefined') {
        ScrollCue.init({
            duration: 800,          // Duration of the animation
            interval: 0.12,         // Time between animations of elements
            percentage: 0.70,       // When to trigger the animation
            parentSelector: '',     
            childSelector: '.scrollcue',
            easing: 'easeOutExpo', // Smooth easing function
            once: false,           // Allow animations to repeat
            docSlider: false,
            breakpoint: 768,       // Mobile breakpoint
            // Add new options for better performance
            delayTime: 100,        // Small delay after elements become visible
            skipMobile: false,     // Keep animations on mobile but simplify them
            beforeReveal: (element) => {
                // Ensure smooth interaction with page transitions
                element.style.willChange = 'opacity, transform';
            },
            afterReveal: (element) => {
                // Cleanup
                element.style.willChange = 'auto';
            }
        });
        
        // Re-run ScrollCue after all animations are complete
        ScrollCue.update();
    } else {
        console.warn('ScrollCue.js library not loaded yet. Will retry on window load.');
    }
}

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#818cf8' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4b5563',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.4 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
}

function initTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement && typeof Typed !== 'undefined') {
        new Typed(typedTextElement, {
            strings: [
                'I build things for the web.',
                'I create desktop applications.',
                'I dabble in solidity-blockchain.',
                'I solve complex problems.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true
        });
    }
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    checkElementsInViewport(animatedElements);
    window.addEventListener('scroll', () => {
        checkElementsInViewport(animatedElements);
    });
}

function checkElementsInViewport(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Form Submission (Not complete)
function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    
    if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Sent Successfully!';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 3000);
        }, 1500);
    }
}

function initPageTransitions() {
    // Create transition element if it doesn't exist
    let transitionElement = document.getElementById('page-transition');
    if (!transitionElement) {
        transitionElement = document.createElement('div');
        transitionElement.id = 'page-transition';
        transitionElement.className = 'page-transition';
        document.body.appendChild(transitionElement);
    }

    // Add transition to all internal links
    document.querySelectorAll('a').forEach(link => {
        // Only add transition to internal links and not anchor links
        if (link.hostname === window.location.hostname && !link.hash) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Show transition
                transitionElement.classList.add('active');
                
                // Wait for transition animation to complete before navigating
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // Match with CSS transition duration
            });
        }
    });

    // Handle back/forward browser navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from back/forward cache
            transitionElement.classList.remove('active');
        }
    });

    // Add initial page load animation
    document.body.classList.add('page-loaded');

    // Ensure main content has animation class
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('main-content');
    }
}

// Helper function to defer animations until page transition is complete
function deferAnimation(callback, delay = 100) {
    // Wait for any ongoing page transitions
    const transitionElement = document.getElementById('page-transition');
    if (transitionElement && transitionElement.classList.contains('active')) {
        setTimeout(() => deferAnimation(callback, delay), 100);
        return;
    }
    
    // Execute the animation with a small delay
    setTimeout(callback, delay);
}

// Game Mode Toggle
function initGameModeToggle() {
    const gameModeBtn = document.getElementById('game-mode-toggle');
    console.log('Game mode button found:', gameModeBtn);
    if (gameModeBtn) {
        gameModeBtn.addEventListener('click', () => {
            console.log('Game mode button clicked');
            // Show loading message
            gameModeBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-xl"></i>';
            gameModeBtn.disabled = true;

            // Get the base path (works from any page)
            const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
            console.log('Redirecting to:', basePath + 'game-mode/index.html');
            window.location.href = basePath + 'game-mode/index.html';
        });
    }
}

// Fallback function for onclick
function enterGameMode() {
    console.log('enterGameMode called');
    const gameModeBtn = document.getElementById('game-mode-toggle');
    if (gameModeBtn) {
        gameModeBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-xl"></i>';
        gameModeBtn.disabled = true;
    }
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    window.location.href = basePath + 'game-mode/index.html';
}

// Helper to manage animations in batches
function batchAnimations(elements, animationCallback, interval = 100) {
    elements.forEach((element, index) => {
        deferAnimation(() => animationCallback(element), index * interval);
    });
}

window.portfolio = {
    handleFormSubmit
};