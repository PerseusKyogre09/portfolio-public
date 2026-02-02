// GSAP Animations for Portfolio

gsap.defaults({ overwrite: 'auto' });

// Hero Section Animations
window.addEventListener('load', () => {
    // Hero heading animation
    const heroHeading = document.querySelector('h1.text-transparent');
    if (heroHeading) {
        gsap.from(heroHeading, {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out"
        });
    }

    // Hero text animations with stagger
    const heroTexts = document.querySelectorAll('.hero-text, .md\\:text-left > p');
    if (heroTexts.length) {
        gsap.from(heroTexts, {
            duration: 0.8,
            opacity: 0,
            y: 20,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.3
        });
    }

    // Hero button animations
    const heroButtons = document.querySelectorAll('a.px-6.py-3');
    if (heroButtons.length) {
        gsap.from(heroButtons, {
            duration: 0.8,
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
            ease: "back.out",
            delay: 0.6
        });
    }

    // Project Cards - Staggered Animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            opacity: 0,
            y: 40,
            rotate: -2,
            ease: "power2.out",
            delay: index * 0.1
        });
    });

    // Project Card Hover Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                ease: "power2.out"
            });
        });
    });

    // Experience Cards - Scroll Triggered with Stagger
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            ease: "power2.out",
            delay: index * 0.1
        });
    });

    // Experience Card Hover Animation
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
            gsap.to(this.querySelector('.experience-logo'), {
                duration: 0.3,
                rotate: 360,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
            gsap.to(this.querySelector('.experience-logo'), {
                duration: 0.3,
                rotate: 0,
                ease: "power2.out"
            });
        });
    });

    // Skill Circles Animation
    gsap.utils.toArray('.skill-circle').forEach((circle, index) => {
        gsap.from(circle, {
            scrollTrigger: {
                trigger: circle,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            opacity: 0,
            scale: 0,
            ease: "back.out",
            delay: index * 0.1
        });

        // Continuous rotation animation
        gsap.to(circle, {
            duration: 20,
            rotation: 360,
            ease: "none",
            repeat: -1
        });
    });

    // Section Headings - Fade and Slide
    document.querySelectorAll('h2.text-3xl').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            opacity: 0,
            y: -30,
            ease: "power2.out"
        });
    });

    // Section Divider Lines Animation
    document.querySelectorAll('.w-24.h-1.bg-indigo-500').forEach(divider => {
        gsap.from(divider, {
            scrollTrigger: {
                trigger: divider,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            width: 0,
            ease: "power2.out"
        });
    });

    // Skill Tags - Staggered Appearance
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            duration: 0.4,
            opacity: 0,
            scale: 0.8,
            ease: "back.out",
            delay: index * 0.05
        });
    });

    // Button Hover Effects
    document.querySelectorAll('a[class*="px-6"][class*="py-3"], button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // Social Icons Animation
    document.querySelectorAll('.social-icon').forEach((icon, index) => {
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.4,
            opacity: 0,
            y: 20,
            ease: "back.out",
            delay: index * 0.1
        });
    });

    // Parallax effect on scroll
    gsap.utils.toArray('[data-speed]').forEach(element => {
        const speed = element.getAttribute('data-speed');
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                scrub: 0.5
            },
            y: () => document.documentElement.scrollHeight * (speed / 10),
            ease: "none"
        });
    });

    // Text appears on scroll
    gsap.utils.toArray('p.text-gray-300, p.text-gray-400').forEach(para => {
        gsap.from(para, {
            scrollTrigger: {
                trigger: para,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            opacity: 0,
            y: 15,
            ease: "power2.out"
        });
    });
});

// Scroll animations for dynamically added content
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
