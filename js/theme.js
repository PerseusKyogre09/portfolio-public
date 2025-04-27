document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupThemeToggle();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light') {
        setLightTheme();
    } else if (savedTheme === 'dark' || systemPrefersDark || !savedTheme) {
        setDarkTheme();
    }
}

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    if (themeToggleBtn && themeIcon) {
        updateThemeIcon(themeIcon);
        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                setLightTheme();
            } else {
                setDarkTheme();
            }
            
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

// Theme toggle button 
function updateThemeIcon(iconElement) {
    if (document.documentElement.classList.contains('dark')) {
        // Show sun icon
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
    } else {
        // Show moon icon
        iconElement.classList.remove('fa-sun');
        iconElement.classList.add('fa-moon');
    }
    iconElement.classList.add('theme-toggle-icon');
    iconElement.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        iconElement.style.transform = 'rotate(0deg)';
    }, 500);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    if (!localStorage.getItem('theme')) {
        if (newTheme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme();
        }
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            updateThemeIcon(themeIcon);
        }
    }
});