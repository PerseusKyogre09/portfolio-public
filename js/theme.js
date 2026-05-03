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

function setDarkTheme() {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    document.body.classList.add('bg-gray-900');
    document.body.classList.add('text-gray-200');
    document.body.classList.remove('bg-white');
    document.body.classList.remove('text-gray-800');
    
    document.documentElement.style.setProperty('--indigo-500', '#6366f1');
    document.documentElement.style.setProperty('--indigo-600', '#4f46e5');
    document.documentElement.style.setProperty('--indigo-700', '#4338ca');
    
    localStorage.setItem('theme', 'dark');
}

function setLightTheme() {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    document.body.classList.remove('bg-gray-900');
    document.body.classList.remove('text-gray-200');
    document.body.classList.add('bg-white');
    document.body.classList.add('text-gray-800');
    
    document.documentElement.style.setProperty('--indigo-500', '#6366f1');
    document.documentElement.style.setProperty('--indigo-600', '#4f46e5');
    document.documentElement.style.setProperty('--indigo-700', '#4338ca');
    
    localStorage.setItem('theme', 'light');
}

function updateThemeIcon(iconElement) {
    if (document.documentElement.classList.contains('dark')) {
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
    } else {
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
