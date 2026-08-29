function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // The DOM is usable before every image/video and third-party script finishes.
    requestAnimationFrame(hideLoadingScreen);
}

document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initParticles();
    initBackgroundVideos();
    initTypedText();
    initScrollAnimations();
    initScrollCue();
    initPageTransitions();
});

function initBackgroundVideos() {
    const videos = document.querySelectorAll('.bg-video');
    if (!videos.length || window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches) return;

    const loadVideo = (video) => {
        const source = video.querySelector('source[data-src]');
        if (!source || source.src) return;
        source.src = source.dataset.src;
        video.load();
        video.play().catch(() => {});
    };

    const observer = new IntersectionObserver((entries, videoObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadVideo(entry.target);
                videoObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px' });

    videos.forEach((video) => observer.observe(video));
}

window.addEventListener('load', function() {
    deferAnimation(() => {
        initScrollCue();
        
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
            once: true,
            docSlider: false,
            breakpoint: 768,       // Mobile breakpoint
            delayTime: 100,        // Small delay after elements become visible
            skipMobile: false,     // Keep animations on mobile but simplify them
            beforeReveal: (element) => {
                element.style.willChange = 'opacity, transform';
            },
            afterReveal: (element) => {
                element.style.willChange = 'auto';
            }
        });
        
        ScrollCue.update();
    } else {
        console.warn('ScrollCue.js library not loaded yet. Will retry on window load.');
    }
}

function initParticles() {
    if (typeof particlesJS !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 18 : 35,
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
    let transitionElement = document.getElementById('page-transition');
    if (!transitionElement) {
        transitionElement = document.createElement('div');
        transitionElement.id = 'page-transition';
        transitionElement.className = 'page-transition';
        document.body.appendChild(transitionElement);
    }

    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname && !link.hash) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                transitionElement.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            });
        }
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            transitionElement.classList.remove('active');
        }
    });

    document.body.classList.add('page-loaded');

    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('main-content');
    }
}

function deferAnimation(callback, delay = 100) {
    const transitionElement = document.getElementById('page-transition');
    if (transitionElement && transitionElement.classList.contains('active')) {
        setTimeout(() => deferAnimation(callback, delay), 100);
        return;
    }
    
    setTimeout(callback, delay);
}

function batchAnimations(elements, animationCallback, interval = 100) {
    elements.forEach((element, index) => {
        deferAnimation(() => animationCallback(element), index * interval);
    });
}

window.portfolio = {
    handleFormSubmit
};
