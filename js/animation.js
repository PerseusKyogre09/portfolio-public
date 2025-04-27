document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    animateSkillCircles();
    initProjectCardHoverEffects();
    initCodeTypingAnimation();
});

function initScrollReveal() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-circle, .About-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

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
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.fa-arrow-right');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

function initCodeTypingAnimation() {
    const codeAnimationElements = document.querySelectorAll('.code-animation');
    
    codeAnimationElements.forEach(element => {
        const codeBlock = element.querySelector('pre');
        
        if (codeBlock) {
            const codeLines = codeBlock.innerHTML.split('\n');
            const totalLines = codeLines.length;
            const typingDelay = 2000;           
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
                        }, 1000);
                    }
                }, typingDelay + (index * 150));
            });
        }
    });
}

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

if (document.querySelector('.parallax-bg')) {
    initParallaxEffect();
}