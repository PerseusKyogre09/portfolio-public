// Main JavaScript functionality

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle.js for background animation
    initParticles();
    
    // Initialize typed.js for the typing animation
    initTypedText();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Initialize scrolling animations
    initScrollAnimations();
    
    // Generate GitHub activity chart (expanded in the full implementation)
    generateGitHubActivityChart();
});

// Particles.js initialization
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

// Typed.js initialization for the typing animation
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

// Mobile menu functionality
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

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport
    checkElementsInViewport(animatedElements);
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        checkElementsInViewport(animatedElements);
    });
}

// Check if elements are in viewport and add animation class
function checkElementsInViewport(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Generate GitHub activity chart
function generateGitHubActivityChart() {
    // In a real implementation, this could fetch data from GitHub API
    // For now, we'll generate some random data for the demo
    const gitHubChart = document.querySelector('.github-activity-chart g');
    
    if (gitHubChart) {
        // Code to generate additional weeks of activity would go here
        // This would typically be dynamic based on actual GitHub data
        // For now, the sample SVG has two weeks hardcoded in the HTML
    }
}

// Handle form submissions
function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    
    if (form) {
        // In a real implementation, this would send the form data to a server
        // For now, we'll just show a success message
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        // Simulate form submission
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

// Export functions for use in other scripts
window.portfolio = {
    handleFormSubmit
};