document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.2,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4F46E5",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Initialize ScrollCue
    if (typeof ScrollCue !== 'undefined') {
        ScrollCue.init({
            docSlider: false,
            pageChangeReset: false
        });
    }

    // Parse URL params to get repository information
    const urlParams = new URLSearchParams(window.location.search);
    const repo = urlParams.get('repo');
    const owner = urlParams.get('owner');
    const projectTitle = urlParams.get('title');
    const projectCategory = urlParams.get('category');
    const projectTags = urlParams.get('tags') ? urlParams.get('tags').split(',') : [];
    const projectDescription = urlParams.get('description');
    const iconClass = urlParams.get('icon') || 'fas fa-code';
    const bgColor = urlParams.get('bgcolor') || 'indigo-900';
    const iconColor = urlParams.get('iconcolor') || 'indigo-300';
    const badgeColor = urlParams.get('badgecolor') || 'indigo-600';
    const githubUrl = `https://github.com/${owner}/${repo}`;
    const gitlabUrl = `https://gitlab.com/${owner}/${repo}`;

    // Set page title
    document.title = `${projectTitle} - Pradeepto Pal`;

    // Set project information
    document.getElementById('project-title').textContent = projectTitle;
    document.getElementById('project-category-badge').textContent = projectCategory;
    document.getElementById('project-category-badge').className = `bg-${badgeColor} text-xs px-2 py-1 rounded-md text-white`;
    document.getElementById('project-description').textContent = projectDescription;
    document.getElementById('github-link').href = githubUrl;
    document.getElementById('gitlab-link').href = gitlabUrl;
    document.getElementById('project-icon').className = `${iconClass} text-5xl text-${iconColor}`;
    document.getElementById('project-hero').className = `bg-${bgColor} h-full w-full flex items-center justify-center`;

    // Add tags
    const tagsContainer = document.getElementById('project-tags');
    projectTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'bg-gray-700 px-2 py-1 rounded text-gray-300';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // Function to fix relative paths (images and links) in README
    function fixRelativePaths(owner, repo, readmePath) {
        // Base path for raw content on GitHub
        const basePath = readmePath.includes('/') 
            ? `https://raw.githubusercontent.com/${owner}/${repo}/master/${readmePath.split('/').slice(0, -1).join('/')}/`
            : `https://raw.githubusercontent.com/${owner}/${repo}/master/`;
        
        // Fix image paths
        document.querySelectorAll('#readme-content img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('https') && !src.startsWith('data:')) {
                img.src = basePath + src;
            }
        });
        
        // Fix relative links to files within the repository
        document.querySelectorAll('#readme-content a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // For relative links to other files in the repository, point to GitHub
                link.href = `https://github.com/${owner}/${repo}/blob/master/${href}`;
                // Open in new tab
                link.setAttribute('target', '_blank');
            }
        });
    }    // Function to show loading state
    function showLoading() {
        document.getElementById('readme-content').innerHTML = `
            <div class="readme-loading">
                <div class="readme-loading-spinner"></div>
                <span class="ml-4 text-gray-400">Loading README...</span>
            </div>
        `;
    }    // Function to show error message
    function showError(error) {
        console.error('Error fetching README:', error);
        
        let errorMessage;
        if (error.message === 'API rate limit exceeded') {
            errorMessage = `
                <div class="readme-error bg-yellow-900 bg-opacity-20 border border-yellow-700 text-yellow-300">
                    <h3 class="text-lg font-medium">
                        <i class="fas fa-exclamation-triangle readme-error-icon"></i>
                        GitHub API Rate Limit Exceeded
                    </h3>
                    <p class="mt-2">We've hit GitHub's API rate limit. Please try again later or visit the repository directly.</p>
                </div>
            `;
        } else if (error.message === 'README not found') {
            errorMessage = `
                <div class="readme-error bg-red-900 bg-opacity-20 border border-red-700 text-red-300">
                    <h3 class="text-lg font-medium">
                        <i class="fas fa-exclamation-circle readme-error-icon"></i>
                        README Not Found
                    </h3>
                    <p class="mt-2">This repository doesn't have a README file or it's not accessible. You can check the GitHub repository directly for more information.</p>
                </div>
            `;
        } else {
            errorMessage = `
                <div class="readme-error bg-red-900 bg-opacity-20 border border-red-700 text-red-300">
                    <h3 class="text-lg font-medium">
                        <i class="fas fa-exclamation-circle readme-error-icon"></i>
                        Error Loading README
                    </h3>
                    <p class="mt-2">There was an error loading the README: ${error.message}. Please try again later or visit the repository directly.</p>
                </div>
            `;
        }
        
        document.getElementById('readme-content').innerHTML = `
            ${errorMessage}
            <div class="mt-6">
                <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <a href="${githubUrl}" class="inline-flex items-center px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors">
                        <i class="fab fa-github mr-2"></i>
                        View on GitHub
                    </a>
                    <a href="${gitlabUrl}" class="inline-flex items-center px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors">
                        <i class="fab fa-gitlab mr-2"></i>
                        View on GitLab
                    </a>
                    <button id="retry-fetch" class="inline-flex items-center px-4 py-2 bg-indigo-700 rounded-lg text-white hover:bg-indigo-600 transition-colors">
                        <i class="fas fa-redo-alt mr-2"></i>
                        Retry Loading
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener to retry button
        document.getElementById('retry-fetch').addEventListener('click', function() {
            showLoading();
            fetchReadme();
        });
    }
    
    // Function to fetch and display README content
    function fetchReadme() {
        fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('README not found');
                    } else if (response.status === 403) {
                        throw new Error('API rate limit exceeded');
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then(data => {
                try {
                    // The README content is Base64 encoded
                    const content = atob(data.content);
                    
                    // Parse markdown and render HTML
                    const renderedHTML = marked.parse(content);
                    
                    // Set the HTML content
                    document.getElementById('readme-content').innerHTML = renderedHTML;
                    
                    // Apply syntax highlighting to code blocks
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightElement(block);
                    });                    // Fix relative paths for images and links
                    fixRelativePaths(owner, repo, data.path);
                    
                    // Add a "Back to top" button if the README is long
                    if (document.getElementById('readme-content').offsetHeight > 1000) {
                        addBackToTopButton();
                    }
                    
                    // Add table of contents for long READMEs with multiple headings
                    addTableOfContents();

                    // Add table of contents if the README is long
                    addTableOfContents();
                } catch (parseError) {
                    console.error('Error parsing README:', parseError);
                    showError(new Error('Error parsing README content'));
                }
            })
            .catch(error => {
                showError(error);
            });
    }
    
    // Function to add a "Back to top" button
    function addBackToTopButton() {
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-opacity opacity-0 invisible z-50';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.id = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        
        document.body.appendChild(backToTopButton);
        
        // Show button when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top when clicking the button
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Function to add a table of contents for long READMEs
    function addTableOfContents() {
        const headings = Array.from(document.querySelectorAll('#readme-content h1, #readme-content h2, #readme-content h3'));
        
        // Only add TOC if there are multiple headings
        if (headings.length <= 1) return;
        
        // Create TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'readme-toc';
        
        // Create TOC header
        const tocHeader = document.createElement('h4');
        tocHeader.innerHTML = '<i class="fas fa-list"></i> Table of Contents';
        tocContainer.appendChild(tocHeader);
        
        // Create list of links
        const tocList = document.createElement('ul');
        
        headings.forEach((heading, index) => {
            // Add id to the heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Style based on heading level
            if (heading.tagName === 'H1') {
                link.style.fontWeight = 'bold';
            } else if (heading.tagName === 'H3') {
                link.style.paddingLeft = '1em';
                link.style.fontSize = '0.9em';
            }
            
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        tocContainer.appendChild(tocList);
        
        // Insert TOC at the beginning of the README content
        const readmeContent = document.getElementById('readme-content');
        readmeContent.insertBefore(tocContainer, readmeContent.firstChild);
    }

    // Show initial loading state
    showLoading();
    
    // Fetch README from GitHub API
    fetchReadme();
});

// Custom renderer for marked to enhance the styling
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartypants: true,
    xhtml: false
});
