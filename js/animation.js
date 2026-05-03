document.addEventListener('DOMContentLoaded', function() {
    
    animateSkillCircles();
    initProjectCardHoverEffects();
    initCodeTypingAnimation();
    initParallaxEffect();
    
    initGridBackground();
    initCursorGlow();
});

function animateSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const currentOffset = parseInt(circle.getAttribute('stroke-dashoffset'));
                
                animateProgress(circle, 226, currentOffset, 1500);
                
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });
    
    skillCircles.forEach(circle => {
        const finalOffset = circle.getAttribute('stroke-dashoffset');
        circle.setAttribute('stroke-dashoffset', '226');
        observer.observe(circle);
    });
}

function animateProgress(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = start - (start - end) * easeOutCubic(progress);
        
        element.setAttribute('stroke-dashoffset', currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.classList.add('animation-completed');
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function initProjectCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.fa-arrow-right');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            if (imageContainer) {
                imageContainer.style.boxShadow = '0 0 15px rgba(129, 140, 248, 0.3)';
                imageContainer.style.transition = 'box-shadow 0.4s ease';
            }
            
            const categoryTag = card.querySelector('.absolute.bottom-0 span');
            if (categoryTag) {
                categoryTag.style.transform = 'translateY(-3px)';
                categoryTag.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                categoryTag.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.fa-arrow-right');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
            
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            if (imageContainer) {
                imageContainer.style.boxShadow = 'none';
            }
            
            const categoryTag = card.querySelector('.absolute.bottom-0 span');
            if (categoryTag) {
                categoryTag.style.transform = 'translateY(0)';
                categoryTag.style.boxShadow = 'none';
            }
        });
    });
}

function initCodeTypingAnimation() {
    const codeAnimationElements = document.querySelectorAll('.code-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const codeBlock = element.querySelector('pre');
                
                if (codeBlock && !element.classList.contains('typing-started')) {
                    element.classList.add('typing-started');
                    animateCodeBlock(codeBlock);
                    observer.unobserve(element);
                }
            }
        });
    }, { threshold: 0.3 });
    
    codeAnimationElements.forEach(element => {
        observer.observe(element);
    });
}

function animateCodeBlock(codeBlock) {
    const codeLines = codeBlock.innerHTML.split('\n');
    const totalLines = codeLines.length;
    const typingDelay = 1000; // Shorter initial delay
    
    codeBlock.innerHTML = '';
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            codeBlock.innerHTML += (index > 0 ? '\n' : '') + line;
            codeBlock.scrollTop = codeBlock.scrollHeight;
            if (index === totalLines - 1) {
                setTimeout(() => {
                    const parent = codeBlock.parentElement;
                    if (parent && parent.classList.contains('code-animation')) {
                        parent.classList.add('typing-finished');
                    }
                }, 800);
            }
        }, typingDelay + (index * 120)); // Faster typing (120ms per line instead of 150ms)
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const startPosition = window.scrollY;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1000; // 1 second duration
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeProgress = easeOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        }
    });
});

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    let ticking = false;
    
    function updateParallaxElements() {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yPos = -(window.scrollY * speed / 10);
            
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallaxElements();
            });
            ticking = true;
        }
    });
    
    window.addEventListener('mousemove', e => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.getAttribute('data-speed')) * 0.05;
                    const mouseX = (window.innerWidth / 2 - e.clientX) * speed / 100;
                    const mouseY = (window.innerHeight / 2 - e.clientY) * speed / 100;
                    
                    const scrollY = -(window.scrollY * speed * 2);
                    
                    element.style.transform = `translate3d(${mouseX}px, ${scrollY + mouseY}px, 0)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateParallaxElements();
}

function optimizeAnimationsForMobile() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        document.querySelectorAll('[data-speed]').forEach(element => {
            if (!element.classList.contains('essential-parallax')) {
                element.removeAttribute('data-speed');
            } else {
                const currentSpeed = parseFloat(element.getAttribute('data-speed'));
                element.setAttribute('data-speed', String(currentSpeed * 0.5));
            }
        });
        
        document.querySelectorAll('.scrollcue').forEach(element => {
            const currentDelay = parseInt(element.getAttribute('data-delay') || '0');
            
            if (currentDelay > 300) {
                element.setAttribute('data-delay', String(Math.max(100, currentDelay * 0.7)));
            }
        });
    }
}

window.addEventListener('load', optimizeAnimationsForMobile);
window.addEventListener('resize', optimizeAnimationsForMobile);

if (document.querySelector('.parallax-bg')) {
    initParallaxEffect();
}

function enhanceSkillProgressBars() {
    const skillCards = document.querySelectorAll('.bg-gray-800.rounded-xl');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
            card.style.transform = 'translateY(-8px)';
            
            const progressBars = card.querySelectorAll('.skill-progress');
            progressBars.forEach((bar, index) => {
                bar.style.transition = 'all 0.3s ease';
                bar.style.animation = `skillPulse 1.5s infinite ${index * 0.2}s`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.transform = '';
            
            const progressBars = card.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = '';
            });
        });
    });
    
    if (!document.getElementById('skill-pulse-animation')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'skill-pulse-animation';
        styleEl.textContent = `
            @keyframes skillPulse {
                0% { opacity: 0.7; }
                50% { opacity: 1; }
                100% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(styleEl);
    }
}

if (document.querySelector('.skill-progress')) {
    window.addEventListener('load', enhanceSkillProgressBars);
}

function enhanceProfileElements() {
    const profilePhoto = document.querySelector('.aspect-w-1.aspect-h-1');
    if (profilePhoto) {
        profilePhoto.style.animation = 'float 6s ease-in-out infinite';
        
        if (!document.getElementById('profile-animations')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'profile-animations';
            styleEl.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes socialPop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                .social-icon:hover i {
                    animation: socialPop 0.5s ease;
                }
            `;
            document.head.appendChild(styleEl);
        }
    }
    
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = `${index * 0.05}s`;
        
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px)';
            const iconEl = icon.querySelector('i');
            if (iconEl) {
                iconEl.style.color = '#818cf8'; // Brighter color on hover
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            const iconEl = icon.querySelector('i');
            if (iconEl) {
                iconEl.style.color = ''; // Reset to original color
            }
        });
    });
}

if (document.querySelector('.social-icon')) {
    window.addEventListener('load', enhanceProfileElements);
}

function enhanceContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
            
            const label = input.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#818cf8';
                label.style.transform = 'translateY(-2px) scale(0.95)';
                label.style.transformOrigin = 'left';
                label.style.transition = 'transform 0.3s ease, color 0.3s ease';
            }
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-focused');
            
            const label = input.parentElement.querySelector('label');
            if (label && !input.value) {
                label.style.color = '';
                label.style.transform = '';
            }
        });
        
        if (input.value) {
            const label = input.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#818cf8';
                label.style.transform = 'translateY(-2px) scale(0.95)';
            }
        }
    });
    
    if (!document.getElementById('contact-form-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'contact-form-styles';
        styleEl.textContent = `
            .input-focused input, .input-focused textarea {
                border-color: #818cf8 !important;
                box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.5) !important;
                background-color: rgba(30, 30, 46, 0.8) !important;
            }
            
            #contactForm button[type="submit"] {
                position: relative;
                overflow: hidden;
            }
            
            #contactForm button[type="submit"]::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.5);
                opacity: 0;
                border-radius: 100%;
                transform: scale(1, 1) translate(-50%);
                transform-origin: 50% 50%;
            }
            
            #contactForm button[type="submit"]:focus:not(:active)::after {
                animation: ripple 1s ease-out;
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0, 0);
                    opacity: 0.5;
                }
                20% {
                    transform: scale(25, 25);
                    opacity: 0.3;
                }
                100% {
                    opacity: 0;
                    transform: scale(40, 40);
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            
            if (!contactForm.checkValidity()) {
                return;
            }
            
            e.preventDefault();
            
            submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                submitButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                submitButton.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';
                        submitButton.classList.remove('bg-green-600', 'hover:bg-green-700');
                        submitButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                        submitButton.disabled = false;
                        
                        formInputs.forEach(input => {
                            const label = input.parentElement.querySelector('label');
                            if (label) {
                                label.style.color = '';
                                label.style.transform = '';
                            }
                        });
                    }, 3000);
                }, 1000);
            }, 2000);
        });
    }
}

if (document.getElementById('contactForm')) {
    window.addEventListener('load', enhanceContactForm);
}

function initGridBackground() {
    if (!document.querySelector('.grid-background')) {
        const grid = document.createElement('div');
        grid.className = 'grid-background';
        document.body.insertBefore(grid, document.body.firstChild);

        if (!document.getElementById('grid-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'grid-styles';
            styleEl.textContent = `
                .grid-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    background-image: 
                        linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
                    background-size: 30px 30px;
                    pointer-events: none;
                    animation: gridFloat 20s linear infinite;
                }

                @keyframes gridFloat {
                    0% {
                        background-position: 0px 0px;
                    }
                    100% {
                        background-position: 30px 30px;
                    }
                }

                .dark .grid-background {
                    background-image: 
                        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
                }

                @media (max-width: 768px) {
                    .grid-background {
                        background-size: 20px 20px;
                    }
                    @keyframes gridFloat {
                        100% {
                            background-position: 20px 20px;
                        }
                    }
                }
            `;
            document.head.appendChild(styleEl);
        }
    }

    let mouseX = 0, mouseY = 0;
    const grid = document.querySelector('.grid-background');
    
    document.addEventListener('mousemove', e => {
        mouseX = (window.innerWidth / 2 - e.clientX) * 0.01;
        mouseY = (window.innerHeight / 2 - e.clientY) * 0.01;
        
        if (grid) {
            grid.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
    });
}

function initCursorGlow() {
    if (!document.querySelector('.cursor-glow')) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        if (!document.getElementById('cursor-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'cursor-styles';
            styleEl.textContent = `
                .cursor-glow {
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, 
                        rgba(99, 102, 241, 0.1) 0%,
                        rgba(99, 102, 241, 0.05) 40%,
                        transparent 70%
                    );
                    border-radius: 50%;
                    position: fixed;
                    pointer-events: none;
                    z-index: 1;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                @media (max-width: 768px) {
                    .cursor-glow {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(styleEl);
        }

        let isMoving = false;
        let moveTimeout;

        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';

            isMoving = true;
            clearTimeout(moveTimeout);
            
            moveTimeout = setTimeout(() => {
                isMoving = false;
                glow.style.opacity = '0';
            }, 150);
        });

        document.addEventListener('mouseout', () => {
            glow.style.opacity = '0';
        });
    }
}
