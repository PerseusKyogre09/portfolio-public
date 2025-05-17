// Floating Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const floatingNav = document.querySelector('.floating-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Function to update navbar styling on scroll
    function updateNavbarOnScroll() {
        if (window.scrollY > 30) {
            floatingNav.classList.add('scrolled');
        } else {
            floatingNav.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Expand the floating nav background when menu is open
            if (!mobileMenu.classList.contains('hidden')) {
                floatingNav.classList.add('menu-open');
            } else {
                floatingNav.classList.remove('menu-open');
            }
        });
    }
    
    // Initial check in case page is loaded at a scrolled position
    updateNavbarOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateNavbarOnScroll);
});
