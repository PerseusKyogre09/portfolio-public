document.addEventListener('DOMContentLoaded', function() {
    const floatingNav = document.querySelector('.floating-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    function updateNavbarOnScroll() {
        if (window.scrollY > 30) {
            floatingNav.classList.add('scrolled');
        } else {
            floatingNav.classList.remove('scrolled');
        }
    }
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            if (!mobileMenu.classList.contains('hidden')) {
                floatingNav.classList.add('menu-open');
            } else {
                floatingNav.classList.remove('menu-open');
            }
        });
    }
    
    updateNavbarOnScroll();
    
    window.addEventListener('scroll', updateNavbarOnScroll);
});
