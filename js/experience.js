class ExperienceSection {
    constructor() {
        this.container = document.querySelector('.experience-container');
        this.wrapper = document.querySelector('.experience-wrapper');
        this.scrollLeftBtn = document.querySelector('.scroll-left');
        this.scrollRightBtn = document.querySelector('.scroll-right');
        this.isScrollEnabled = false;
        this.currentIndex = 0;
        this.cardWidth = 400;
        this.totalCards = 0;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.isScrollEnabled = this.container.getAttribute('data-enable-scroll') === 'true';
        const allCards = document.querySelectorAll('.experience-card');
        this.totalCards = allCards.length;
        this.updateCardWidth();
        
        if (this.isScrollEnabled) {
            this.setupScrolling();
        }
        window.addEventListener('resize', () => {
            this.updateCardWidth();
        });
        
        if (this.scrollLeftBtn && this.scrollRightBtn) {
            this.scrollLeftBtn.addEventListener('click', () => this.scrollLeft());
            this.scrollRightBtn.addEventListener('click', () => this.scrollRight());
        }
    }
    
    updateCardWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            this.cardWidth = 280 + 24; // card width + gap
        } else if (screenWidth <= 768) {
            this.cardWidth = 300 + 24;
        } else if (screenWidth <= 1024) {
            this.cardWidth = 350 + 32;
        } else {
            this.cardWidth = 400 + 32;
        }
        
        if (this.isScrollEnabled) {
            this.updateScrollDistance();
        }
    }
    
    setupScrolling() {
        if (!this.wrapper) return;
        const hiddenCards = document.querySelectorAll('.hidden-card');
        hiddenCards.forEach(card => {
            card.style.display = 'block';
        });
        this.duplicateCards();
        this.updateScrollDistance();
        this.startAutoScroll();
    }
    
    duplicateCards() {
        const cards = Array.from(this.wrapper.children);
        
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            this.wrapper.appendChild(clone);
        });
    }
    
    updateScrollDistance() {
        const scrollDistance = - (this.totalCards * this.cardWidth) + 'px';
        this.wrapper.style.setProperty('--scroll-distance', scrollDistance);
    }
    
    startAutoScroll() {
    }
    
    scrollLeft() {
        if (!this.isScrollEnabled) return;
        
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateScrollPosition();
    }
    
    scrollRight() {
        if (!this.isScrollEnabled) return;
        
        this.currentIndex = Math.min(this.totalCards - 1, this.currentIndex + 1);
        this.updateScrollPosition();
    }
    
    updateScrollPosition() {
        if (!this.wrapper) return;
        
        const translateX = -this.currentIndex * this.cardWidth;
        this.wrapper.style.transform = `translateX(${translateX}px)`;
        this.wrapper.style.animation = 'none'; // Pause auto-scroll during manual scroll
        
        setTimeout(() => {
            if (this.isScrollEnabled) {
                this.wrapper.style.animation = 'scroll-continuous 20s linear infinite';
            }
        }, 3000);
    }
    
    toggleScrollMode(enable) {
        this.isScrollEnabled = enable;
        this.container.setAttribute('data-enable-scroll', enable ? 'true' : 'false');
        
        if (enable) {
            this.setupScrolling();
        } else {
            this.wrapper.style.transform = 'none';
            this.wrapper.style.animation = 'none';
            
            const hiddenCards = document.querySelectorAll('.hidden-card');
            hiddenCards.forEach(card => {
                card.style.display = 'none';
            });
            
            const cards = Array.from(this.wrapper.children);
            const originalCount = Math.ceil(cards.length / 2);
            cards.slice(originalCount).forEach(card => card.remove());
        }
    }
}

const ExperienceConfig = {
    enableScrolling: false, // Change this to true when you have 4-5+ experiences
    
    setScrolling(enable) {
        this.enableScrolling = enable;
        if (window.experienceSection) {
            window.experienceSection.toggleScrollMode(enable);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.experienceSection = new ExperienceSection();
    
    if (ExperienceConfig.enableScrolling) {
        window.experienceSection.toggleScrollMode(true);
    }
});

window.ExperienceConfig = ExperienceConfig;

window.enableExperienceScrolling = () => ExperienceConfig.setScrolling(true);
window.disableExperienceScrolling = () => ExperienceConfig.setScrolling(false);
