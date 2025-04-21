// Dark/Light Theme Toggle

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme based on user preference or default to dark
    initTheme();
    
    // Set up theme toggle button
    setupThemeToggle();
});

// Initialize theme based on stored preference or system preference
function initTheme() {
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark theme if no preference is saved
    if (savedTheme === 'light') {
        setLightTheme();
    } else if (savedTheme === 'dark' || systemPrefersDark || !savedTheme) {
        setDarkTheme();
    }
}

// Set up the theme toggle button functionality
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    if (themeToggleBtn && themeIcon) {
        // Update the button icon based on current theme
        updateThemeIcon(themeIcon);
        
        // Add click event listener to the button
        themeToggleBtn.addEventListener('click', () => {
            // Toggle between dark and light themes
            if (document.documentElement.classList.contains('dark')) {
                setLightTheme();
            } else {
                setDarkTheme();
            }
            
            // Update the button icon
            updateThemeIcon(themeIcon);
        });
    }
}

// Set the theme to dark mode
function setDarkTheme() {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.body.classList.add('bg-gray-900');
    document.body.classList.remove('bg-white');
    localStorage.setItem('theme', 'dark');
}

// Set the theme to light mode
function setLightTheme() {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.body.classList.remove('bg-gray-900');
    document.body.classList.add('bg-white');
    localStorage.setItem('theme', 'light');
}

// Update the theme toggle button icon based on current theme
function updateThemeIcon(iconElement) {
    if (document.documentElement.classList.contains('dark')) {
        // In dark mode, show sun icon
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
    } else {
        // In light mode, show moon icon
        iconElement.classList.remove('fa-sun');
        iconElement.classList.add('fa-moon');
    }
    
    // Add animation effect
    iconElement.classList.add('theme-toggle-icon');
    iconElement.style.transform = 'rotate(360deg)';
    
    // Reset transform after animation completes
    setTimeout(() => {
        iconElement.style.transform = 'rotate(0deg)';
    }, 500);
}

// Check for system theme preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    
    // Only update theme if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        if (newTheme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme();
        }
        
        // Update the theme toggle button icon
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            updateThemeIcon(themeIcon);
        }
    }
});