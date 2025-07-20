// Experience Section JavaScript
class ExperienceSection {
    constructor() {
        this.container = document.querySelector('.experience-container');
        this.wrapper = document.querySelector('.experience-wrapper');
        this.scrollLeftBtn = document.querySelector('.scroll-left');
        this.scrollRightBtn = document.querySelector('.scroll-right');
        this.isScrollEnabled = false;
        this.currentIndex = 0;
        this.cardWidth = 400; // Default card width + gap
        this.totalCards = 0;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Check if scrolling is enabled
        this.isScrollEnabled = this.container.getAttribute('data-enable-scroll') === 'true';
        
        // Count total cards (including hidden ones for scrolling mode)
        const allCards = document.querySelectorAll('.experience-card');
        this.totalCards = allCards.length;
        
        // Update card width based on screen size
        this.updateCardWidth();
        
        if (this.isScrollEnabled) {
            this.setupScrolling();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateCardWidth();
        });
        
        // Add scroll button event listeners
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
    }
    
    setupScrolling() {
        if (!this.wrapper) return;
        
        // Show hidden cards when scrolling is enabled
        const hiddenCards = document.querySelectorAll('.hidden-card');
        hiddenCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Duplicate cards for seamless infinite scroll
        this.duplicateCards();
        
        // Start auto-scroll
        this.startAutoScroll();
    }
    
    duplicateCards() {
        const cards = Array.from(this.wrapper.children);
        
        // Clone cards and append them for seamless scrolling
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            this.wrapper.appendChild(clone);
        });
    }
    
    startAutoScroll() {
        // The auto-scroll is handled by CSS animation
        // This method can be used to control the animation if needed
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
        
        // Resume auto-scroll after a delay
        setTimeout(() => {
            if (this.isScrollEnabled) {
                this.wrapper.style.animation = 'scroll-continuous 20s linear infinite';
            }
        }, 3000);
    }
    
    // Method to toggle scrolling mode (can be called from console or other scripts)
    toggleScrollMode(enable) {
        this.isScrollEnabled = enable;
        this.container.setAttribute('data-enable-scroll', enable ? 'true' : 'false');
        
        if (enable) {
            this.setupScrolling();
        } else {
            // Reset to grid mode
            this.wrapper.style.transform = 'none';
            this.wrapper.style.animation = 'none';
            
            // Hide duplicate cards and hidden cards
            const hiddenCards = document.querySelectorAll('.hidden-card');
            hiddenCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Remove duplicated cards
            const cards = Array.from(this.wrapper.children);
            const originalCount = Math.ceil(cards.length / 2);
            cards.slice(originalCount).forEach(card => card.remove());
        }
    }
}

// Configuration object for easy toggling
const ExperienceConfig = {
    enableScrolling: false, // Change this to true when you have 4-5+ experiences
    
    // Method to easily toggle scrolling
    setScrolling(enable) {
        this.enableScrolling = enable;
        if (window.experienceSection) {
            window.experienceSection.toggleScrollMode(enable);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize experience section
    window.experienceSection = new ExperienceSection();
    
    // Set initial scrolling state based on config
    if (ExperienceConfig.enableScrolling) {
        window.experienceSection.toggleScrollMode(true);
    }
});

// Make config available globally for easy testing
window.ExperienceConfig = ExperienceConfig;

// Helper functions for easy console testing
window.enableExperienceScrolling = () => ExperienceConfig.setScrolling(true);
window.disableExperienceScrolling = () => ExperienceConfig.setScrolling(false);
