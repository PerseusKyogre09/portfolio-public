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
    function fixRelativePaths(owner, repo, readmePath, defaultBranch = 'master') {
        // Base path for raw content on GitHub
        const basePath = readmePath.includes('/') 
            ? `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${readmePath.split('/').slice(0, -1).join('/')}/`
            : `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/`;
        
        // Fix image paths
        document.querySelectorAll('#readme-content img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('https') && !src.startsWith('data:')) {
                img.src = basePath + src;
                
                // Add lightbox effect for images
                img.classList.add('cursor-pointer', 'hover:opacity-90', 'transition-opacity');
                img.addEventListener('click', function() {
                    openLightbox(img.src);
                });
            }
        });
        
        // Fix relative links to files within the repository
        document.querySelectorAll('#readme-content a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // For relative links to other files in the repository, point to GitHub
                link.href = `https://github.com/${owner}/${repo}/blob/${defaultBranch}/${href}`;
                // Open in new tab
                link.setAttribute('target', '_blank');
            }
        });
    }

    // Function for image lightbox
    function openLightbox(src) {
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
        
        const img = document.createElement('img');
        img.src = src;
        img.className = 'max-h-[90vh] max-w-[90vw] object-contain';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'absolute top-4 right-4 text-white text-2xl';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
        
        document.body.appendChild(lightbox);
    }

    // Function to show loading state
    function showLoading() {
        document.getElementById('readme-content').innerHTML = `
            <div class="readme-loading">
                <div class="readme-loading-spinner"></div>
                <span class="ml-4 text-gray-400">Loading README...</span>
            </div>
        `;
    }

    // Function to show error message
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

        // Show token notice if rate limit error
        showTokenNotice();
    }

    // Function to create a personal access token notice
    function showTokenNotice() {
        // Only show if we've encountered a rate limit error
        if (document.querySelector('.readme-error') && 
            document.querySelector('.readme-error').textContent.includes('rate limit')) {
            
            const noticeDiv = document.createElement('div');
            noticeDiv.className = 'bg-blue-900 bg-opacity-20 border border-blue-700 text-blue-300 p-4 rounded-lg mt-4';
            noticeDiv.innerHTML = `
                <h3 class="text-lg font-medium flex items-center">
                    <i class="fas fa-info-circle mr-2"></i>
                    Developer Tip
                </h3>
                <p class="mt-2">
                    GitHub API has rate limits for unauthenticated requests. For higher limits, consider using a personal access token.
                    <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" 
                       class="underline" target="_blank">Learn more</a>
                </p>
            `;
            
            // Add to the error message
            document.querySelector('.readme-error').parentNode.appendChild(noticeDiv);
        }
    }

    // Function to update repository metadata in the UI
    function updateRepoMetadata(repoData) {
        // Add repo stats if available
        const projectHeader = document.querySelector('#project-header');
        
        // Only add stats if they don't already exist
        if (!document.getElementById('repo-stats')) {
            const statsDiv = document.createElement('div');
            statsDiv.id = 'repo-stats';
            statsDiv.className = 'absolute top-0 right-0 p-4 flex space-x-4 text-sm';
            
            if (repoData.stargazerCount !== undefined || repoData.stargazers_count !== undefined) {
                const stars = repoData.stargazerCount !== undefined ? repoData.stargazerCount : repoData.stargazers_count;
                const starsSpan = document.createElement('span');
                starsSpan.className = 'flex items-center text-gray-300';
                starsSpan.innerHTML = `<i class="fas fa-star mr-1 text-yellow-400"></i>${stars}`;
                statsDiv.appendChild(starsSpan);
            }
            
            if (repoData.forkCount !== undefined || repoData.forks_count !== undefined) {
                const forks = repoData.forkCount !== undefined ? repoData.forkCount : repoData.forks_count;
                const forksSpan = document.createElement('span');
                forksSpan.className = 'flex items-center text-gray-300';
                forksSpan.innerHTML = `<i class="fas fa-code-branch mr-1 text-blue-400"></i>${forks}`;
                statsDiv.appendChild(forksSpan);
            }
            
            if ((repoData.primaryLanguage && repoData.primaryLanguage.name) || repoData.language) {
                const language = repoData.primaryLanguage ? repoData.primaryLanguage.name : repoData.language;
                const langColor = repoData.primaryLanguage && repoData.primaryLanguage.color ? 
                    repoData.primaryLanguage.color : '#4F46E5';
                    
                const langSpan = document.createElement('span');
                langSpan.className = 'flex items-center text-gray-300';
                langSpan.innerHTML = `
                    <span class="w-3 h-3 rounded-full mr-1" style="background-color: ${langColor}"></span>
                    ${language}
                `;
                statsDiv.appendChild(langSpan);
            }
            
            if (statsDiv.children.length > 0) {
                projectHeader.appendChild(statsDiv);
            }
        }
    }

    // Function to attempt fetching with GraphQL API
    function fetchWithGraphQL() {
        const query = `
        {
            repository(owner: "${owner}", name: "${repo}") {
                object(expression: "HEAD:README.md") {
                    ... on Blob {
                        text
                    }
                }
                defaultBranchRef {
                    name
                }
                description
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage {
                    name
                    color
                }
            }
        }`;
        
        return fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Note: In a production environment, you'd use an authenticated request
                // to avoid rate limiting, but for this example we'll use anonymous access
            },
            body: JSON.stringify({ query })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`GraphQL Error: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.errors) {
                throw new Error(result.errors[0].message);
            }
            
            const data = result.data;
            if (!data || !data.repository) {
                throw new Error('Repository not found');
            }
            
            // Update repository metadata
            updateRepoMetadata(data.repository);
            
            // Process README content
            const readme = data.repository.object;
            if (!readme || !readme.text) {
                throw new Error('README not found');
            }
            
            // Get default branch name
            const defaultBranch = data.repository.defaultBranchRef?.name || 'master';
            
            // Process the README content
            processReadmeContent(readme.text, 'README.md', defaultBranch);
            
            return true;
        });
    }
    
    // Function to fetch with REST API as fallback
    function fetchWithREST() {
        // First get repository metadata
        return fetch(`https://api.github.com/repos/${owner}/${repo}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Repository not found');
                    }
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(repoData => {
                // Update repo metadata
                updateRepoMetadata(repoData);
                
                // Get default branch
                const defaultBranch = repoData.default_branch || 'master';
                
                // Now fetch README
                return fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
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
                    .then(readmeData => {
                        // The README content is Base64 encoded
                        const content = atob(readmeData.content);
                        
                        // Process the README content
                        processReadmeContent(content, readmeData.path, defaultBranch);
                    });
            });
    }
    
    // Function to process and display README content
    function processReadmeContent(content, path, defaultBranch = 'master') {
        try {
            // Parse markdown and render HTML
            const renderedHTML = marked.parse(content);
            
            // Set the HTML content
            document.getElementById('readme-content').innerHTML = renderedHTML;
            
            // Apply syntax highlighting to code blocks
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });

            // Fix relative paths for images and links
            fixRelativePaths(owner, repo, path, defaultBranch);
            
            // Add a "Back to top" button if the README is long
            if (document.getElementById('readme-content').offsetHeight > 1000) {
                addBackToTopButton();
            }
            
            // Add table of contents for READMEs with multiple headings
            addTableOfContents();
        } catch (parseError) {
            console.error('Error parsing README:', parseError);
            showError(new Error('Error parsing README content'));
        }
    }
    
    // Function to fetch README content - try GraphQL first, fall back to REST
    function fetchReadme() {
        fetchWithGraphQL()
            .catch(error => {
                console.warn('GraphQL API failed, falling back to REST API:', error);
                return fetchWithREST();
            })
            .catch(error => {
                showError(error);
            });
    }
    
    // Function to add a "Back to top" button
    function addBackToTopButton() {
        // First remove any existing button
        const existingButton = document.getElementById('back-to-top');
        if (existingButton) {
            existingButton.remove();
        }
        
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
      // Function to add a table of contents for README headings
    function addTableOfContents() {
        const headings = Array.from(document.querySelectorAll('#readme-content h1, #readme-content h2, #readme-content h3'));
        
        // Only add TOC if there are multiple headings
        if (headings.length <= 1) return;
        
        // Show TOC toggle button
        const readmeActions = document.getElementById('readme-actions');
        if (readmeActions) {
            readmeActions.classList.remove('hidden');
            
            // Add toggle functionality
            const toggleTocBtn = document.getElementById('toggle-toc');
            if (toggleTocBtn) {
                toggleTocBtn.addEventListener('click', function() {
                    const toc = document.querySelector('.readme-toc');
                    if (toc) {
                        toc.classList.toggle('hidden');
                        
                        // Update button text
                        const btnText = toggleTocBtn.querySelector('span');
                        if (toc.classList.contains('hidden')) {
                            btnText.textContent = 'Show TOC';
                        } else {
                            btnText.textContent = 'Hide TOC';
                        }
                    }
                });
            }
        }
        
        // Create TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'readme-toc';
        tocContainer.id = 'readme-toc';
        
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
