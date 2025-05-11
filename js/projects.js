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
    // Add a subtle visual effect to the container
    const container = document.getElementById('projects-container');
    if (container) {
        container.style.transition = 'transform 0.3s ease';
        container.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Count for staggered animations
    let visibleCount = 0;
    
    projectCards.forEach(card => {
        // Get the card's category
        const cardCategory = card.getAttribute('data-category');
        
        // Show/hide card based on filter
        if (filterValue === 'all' || filterValue === cardCategory) {
            // Show the card with animation
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            
            // Animate the card with staggered delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 50 + (visibleCount * 100)); // Staggered delay
            
            visibleCount++;
        } else {
            // Hide the card with animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            // Remove from DOM after animation
            setTimeout(() => {
                card.style.display = 'none';
            }, 400);
        }
    });
    
    // Update ScrollCue if available
    if (typeof ScrollCue !== 'undefined') {
        setTimeout(() => {
            ScrollCue.update();
        }, 600);
    }
}

// Initialize animations for project cards
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add staggered entrance animations
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Create a more sophisticated hover effect
        card.addEventListener('mouseenter', () => {
            // Elevate the card slightly higher than its natural hover state
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.1) inset';
            card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
            
            // Add a subtle glow to the card border
            card.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            
            // Animate the project image/icon with a subtle scale
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            if (imageContainer) {
                imageContainer.style.transform = 'scale(1.05)';
                imageContainer.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Return to normal state but maintain smooth transition
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            
            // Reset image container
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            if (imageContainer) {
                imageContainer.style.transform = '';
            }
        });
        
        // Trigger the entrance animation with staggered timing
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 100 + (index * 120)); // Staggered delay based on card index
    });
    
    // Re-initialize ScrollCue after animations have completed
    if (typeof ScrollCue !== 'undefined') {
        setTimeout(() => {
            ScrollCue.update();
        }, 100 + (projectCards.length * 120) + 800); // Wait for all cards to animate
    }
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
