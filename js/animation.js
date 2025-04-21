// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollReveal();
    animateSkillCircles();
    initProjectCardHoverEffects();
    initCodeTypingAnimation();
});

// Initialize ScrollReveal for element animations on scroll
function initScrollReveal() {
    // Add animation classes to elements based on scroll position
    const animatedElements = document.querySelectorAll('.project-card, .skill-circle, .blog-post');
    
    // Create observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Animate skill circle progress bars
function animateSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle-progress');
    
    // Create observer for skill circles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the stroke-dashoffset value from the element
                const circle = entry.target;
                const currentOffset = parseInt(circle.getAttribute('stroke-dashoffset'));
                
                // Animate from full circle to current value
                animateProgress(circle, 226, currentOffset, 1500);
                
                // Unobserve after animation
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });
    
    // Set initial state and observe skill circles
    skillCircles.forEach(circle => {
        // Store the final offset value
        const finalOffset = circle.getAttribute('stroke-dashoffset');
        
        // Reset to zero progress
        circle.setAttribute('stroke-dashoffset', '226');
        
        // Observe the element
        observer.observe(circle);
    });
}

// Animate progress for skill circles
function animateProgress(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = start - (start - end) * easeOutCubic(progress);
        
        element.setAttribute('stroke-dashoffset', currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Easing function for smooth animations
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// Initialize hover effects for project cards
function initProjectCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.fa-arrow-right');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.fa-arrow-right');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// Initialize code typing animation
function initCodeTypingAnimation() {
    const codeAnimationElements = document.querySelectorAll('.code-animation');
    
    codeAnimationElements.forEach(element => {
        const codeBlock = element.querySelector('pre');
        
        if (codeBlock) {
            const codeLines = codeBlock.innerHTML.split('\n');
            const totalLines = codeLines.length;
            const typingDelay = 2000; // ms
            
            // Reset the content for animation
            codeBlock.innerHTML = '';
            
            // Animate line by line with a delay
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    codeBlock.innerHTML += (index > 0 ? '\n' : '') + line;
                    
                    // Scroll to the bottom of the code block
                    codeBlock.scrollTop = codeBlock.scrollHeight;
                    
                    // When finished typing all lines, remove the cursor animation
                    if (index === totalLines - 1) {
                        setTimeout(() => {
                            const parent = codeBlock.parentElement;
                            if (parent && parent.classList.contains('code-animation')) {
                                parent.classList.add('typing-finished');
                            }
                        }, 1000);
                    }
                }, typingDelay + (index * 150));
            });
        }
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add parallax effect to background elements
function initParallaxEffect() {
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.getAttribute('data-speed') || 5;
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// Initialize parallax effect if elements exist
if (document.querySelector('.parallax-bg')) {
    initParallaxEffect();
}