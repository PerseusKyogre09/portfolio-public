// Initialize scroll animations
scrollCue.init();
        
// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const owner = urlParams.get('owner');
const repo = urlParams.get('repo');
const title = urlParams.get('title') || 'Project Title';
const category = urlParams.get('category') || 'Project';
const description = urlParams.get('description') || 'No description available.';
const tags = urlParams.get('tags') ? urlParams.get('tags').split(',') : [];
const icon = urlParams.get('icon') || 'fa-code';
const bgColor = urlParams.get('bgcolor') || 'indigo-600';
const iconColor = urlParams.get('iconcolor') || 'white';
const badgeColor = urlParams.get('badgecolor') || 'indigo-600';

// Update page title
document.title = `${title} - Pradeepto Pal`;

// Update project header
const projectTitle = document.getElementById('project-title');
const projectCategory = document.getElementById('project-category');
const projectDescription = document.getElementById('project-description');
const projectIcon = document.getElementById('project-icon');
const projectTags = document.getElementById('project-tags');
const githubLink = document.getElementById('github-link');

// Update title
if (projectTitle) projectTitle.textContent = title;

// Update category
if (projectCategory) {
    projectCategory.textContent = category;
    projectCategory.className = `inline-block px-4 py-1 rounded-full text-sm font-medium bg-${badgeColor} text-white`;
}

// Update description
if (projectDescription) projectDescription.textContent = description;

// Update icon
if (projectIcon) {
    projectIcon.className = `flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center text-4xl shadow-lg bg-${bgColor} text-${iconColor}`;
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${icon}`;
    projectIcon.innerHTML = '';
    projectIcon.appendChild(iconElement);
}

// Update tags
if (projectTags && tags.length > 0) {
    projectTags.innerHTML = tags.map(tag => 
        `<span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">${tag.trim()}</span>`
    ).join('');
}

// Update GitHub link
if (githubLink && owner && repo) {
    githubLink.href = `https://github.com/${owner}/${repo}`;
}

// Function to load README directly from raw GitHub URL
async function loadReadme() {
    if (!owner || !repo) {
        console.error('Owner or repo not specified');
        return;
    }
    
    const readmeContainer = document.getElementById('readme');
    
    try {
        // Show loading state
        readmeContainer.innerHTML = `
            <div class="flex justify-center items-center py-16">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <span class="ml-4 text-gray-400">Loading README...</span>
            </div>`;
        
        console.log(`Fetching repository info for ${owner}/${repo}`);
        
        // First, get the default branch name and available files
        const repoInfo = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!repoInfo.ok) {
            const errorData = await repoInfo.json().catch(() => ({}));
            const errorMsg = errorData.message || 'Repository not found or is private';
            console.error('Error fetching repo info:', errorMsg, errorData);
            throw new Error(errorMsg);
        }
        
        const repoData = await repoInfo.json();
        const defaultBranch = repoData.default_branch || 'main';
        console.log(`Using default branch: ${defaultBranch}`);
        
        // Try different README filenames
        const readmeFilenames = ['README.md', 'readme.md', 'Readme.md'];
        let readmeContent = null;
        let lastError = null;
        
        for (const filename of readmeFilenames) {
            const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${filename}`;
            console.log(`Trying to fetch: ${readmeUrl}`);
            
            try {
                const response = await fetch(readmeUrl);
                console.log(`Response status for ${filename}:`, response.status);
                
                if (response.ok) {
                    readmeContent = await response.text();
                    console.log(`Successfully loaded ${filename}`);
                    break;
                } else if (response.status === 404) {
                    console.log(`${filename} not found, trying next...`);
                } else {
                    console.error(`Unexpected status ${response.status} for ${filename}`);
                }
            } catch (error) {
                console.error(`Error fetching ${filename}:`, error);
                lastError = error;
                continue;
            }
        }
        
        if (!readmeContent) {
            const errorMsg = lastError?.message || 'No README file found in the repository';
            console.error('Failed to load any README:', errorMsg);
            throw new Error(errorMsg);
        }
        
        // Convert markdown to HTML using marked.js
        readmeContainer.innerHTML = marked.parse(readmeContent);
        
        // Add GitHub's markdown body class for styling
        readmeContainer.classList.add('markdown-body');
        
        // Add base URL for relative links
        const baseUrl = `https://github.com/${owner}/${repo}/blob/${defaultBranch}/`;
        document.querySelectorAll('#readme a[href^="."]').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('./')) {
                link.href = baseUrl + href.substring(2);
            } else if (href.startsWith('../')) {
                link.href = `https://github.com/${owner}/${repo}/tree/${defaultBranch}/${href}`;
            }
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });
        
        // Fix relative image paths and add lazy loading
        const images = readmeContainer.getElementsByTagName('img');
        Array.from(images).forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
                // Handle both relative and absolute paths
                const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}`;
                const absoluteSrc = src.startsWith('/')
                    ? `${baseUrl}${src}`
                    : `${baseUrl}/${src}`;
                img.src = absoluteSrc;
            }
            // Add responsive class to images
            img.className = 'max-w-full h-auto rounded-lg my-4';
            img.loading = 'lazy';
        });
        
        // Add syntax highlighting to code blocks
        if (window.hljs) {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        }
        
        // Make all external links open in new tab
        const links = readmeContainer.getElementsByTagName('a');
        Array.from(links).forEach(link => {
            if (link.href && !link.href.startsWith('#')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
        
    } catch (error) {
        console.error('Error loading README:', error);
        readmeContainer.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                <p class="text-gray-400">Unable to load README. The repository might be private or doesn't have a README file.</p>
                <p class="text-gray-500 text-sm mt-2">${error.message || 'Unknown error occurred'}</p>
                <a href="https://github.com/${owner}/${repo}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="inline-block mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors">
                    View on GitHub
                </a>
            </div>`;
    }
}

// Load README when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadReadme();
    
    // Initialize particles.js if available
    if (window.particlesJS) {
        particlesJS.load('particles-js', '../js/particles-config.json');
    }
});