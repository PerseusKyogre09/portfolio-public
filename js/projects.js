// Projects Filter JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering
    initProjectFilters();
    
    // Initialize project card animations
    initProjectCardAnimations();
    
    // Initialize GitHub contribution chart generation
    expandGitHubContributionChart();
});

// Initialize project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-indigo-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-800', 'text-gray-300'));
            
            // Add active class to clicked button
            button.classList.add('active', 'bg-indigo-600', 'text-white');
            button.classList.remove('bg-gray-800', 'text-gray-300');
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue, projectCards);
        });
    });
}

// Filter projects based on category
function filterProjects(filterValue, projectCards) {
    projectCards.forEach(card => {
        // Get the card's category
        const cardCategory = card.getAttribute('data-category');
        
        // Show/hide card based on filter
        if (filterValue === 'all' || filterValue === cardCategory) {
            // Show the card with animation
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate the card
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, 10);
        } else {
            // Hide the card with animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Remove from DOM after animation
            setTimeout(() => {
                card.style.display = 'none';
            }, 500);
        }
    });
}

// Initialize animations for project cards
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add animation class
        card.classList.add('animate-fade-in');
    });
}

// Expand GitHub contribution chart with more weeks
function expandGitHubContributionChart() {
    const gitHubChart = document.querySelector('.github-activity-chart g');
    
    if (gitHubChart) {
        // Generate additional weeks for the GitHub activity chart
        for (let week = 2; week < 50; week++) {
            const weekGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            weekGroup.setAttribute('transform', `translate(${week * 15}, 0)`);
            
            // Generate days for the week
            for (let day = 0; day < 7; day++) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('width', '10');
                rect.setAttribute('height', '10');
                rect.setAttribute('x', '0');
                rect.setAttribute('y', day * 15);
                rect.setAttribute('rx', '2');
                rect.classList.add('github-day');
                
                // Generate random activity level (0-4)
                const activityLevel = Math.floor(Math.random() * 5);
                rect.setAttribute('data-level', activityLevel);
                
                // Set fill color based on activity level
                let fillColor;
                switch (activityLevel) {
                    case 0: fillColor = '#1f2937'; break; // No activity
                    case 1: fillColor = '#4338ca'; break; // Light activity
                    case 2: fillColor = '#6366f1'; break; // Medium activity
                    case 3: fillColor = '#818cf8'; break; // Heavy activity
                    case 4: fillColor = '#a5b4fc'; break; // Very heavy activity
                }
                
                rect.setAttribute('fill', fillColor);
                
                // Add the day to the week
                weekGroup.appendChild(rect);
            }
            
            // Add the week to the chart
            gitHubChart.appendChild(weekGroup);
        }
    }
}

// Show project details on click
function showProjectDetails(projectId) {
    // This would typically open a modal or navigate to a project detail page
    console.log(`Opening project details for: ${projectId}`);
    
    // For a real implementation, you might have code like:
    // const modal = document.getElementById('project-modal');
    // const modalTitle = modal.querySelector('.modal-title');
    // const modalContent = modal.querySelector('.modal-content');
    // 
    // // Get project data from an API or data attribute
    // const projectData = getProjectData(projectId);
    // 
    // // Populate modal
    // modalTitle.textContent = projectData.title;
    // modalContent.innerHTML = projectData.description;
    // 
    // // Show modal
    // modal.classList.remove('hidden');
}

// Export functions for use in other scripts
window.projects = {
    showProjectDetails
};