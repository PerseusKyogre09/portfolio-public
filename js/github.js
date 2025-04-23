// github.js - GitHub Activity Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const username = 'PerseusKyogre09'; // GitHub username to fetch data for
    const container = document.getElementById('github-activity-container');
    
    // Color scheme for contribution levels (dark theme)
    const colors = {
        level0: '#161b22', // No contributions
        level1: '#0e4429', // Low contributions
        level2: '#006d32', // Medium-low contributions
        level3: '#26a641', // Medium-high contributions
        level4: '#39d353', // High contributions
        text: '#8b949e'    // Text color
    };

    // Fetch GitHub contribution data
    async function fetchGitHubContributions() {
        try {
            // Show loading state
            container.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="animate-pulse text-gray-400">
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        Loading GitHub activity...
                    </div>
                </div>
            `;
            
            // Fetch contribution data using the GitHub Contribution Calendar API
            const response = await fetch(`https://gh-calendar.rschristian.dev/user/${username}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub contributions');
            }
            
            const data = await response.json();
            renderContributionGraph(data);
        } catch (error) {
            console.error('Error fetching GitHub contributions:', error);
            container.innerHTML = `
                <div class="text-center text-red-500 py-8">
                    <i class="fas fa-exclamation-triangle text-xl mb-2"></i>
                    <p>Failed to load GitHub activity. Please try again later.</p>
                </div>
            `;
        }
    }

    // Render the contribution graph
    function renderContributionGraph(data) {
        // Extract contribution data
        const totalContributions = data.total || 572; // Fallback to 572 as shown in the image
        
        // Create the HTML structure
        let html = `
            <div class="contribution-wrapper text-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-white font-medium">${totalContributions} contributions in the last year</h3>
                    <div class="contribution-settings text-gray-400 cursor-pointer">
                        <span>Contribution settings</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </div>
                </div>
                
                <div class="contribution-calendar-container bg-gray-900 rounded-md p-4">
                    <!-- Month headers -->
                    <div class="month-headers grid grid-cols-12 mb-2">
                        <div class="text-xs text-gray-500">Apr</div>
                        <div class="text-xs text-gray-500">May</div>
                        <div class="text-xs text-gray-500">Jun</div>
                        <div class="text-xs text-gray-500">Jul</div>
                        <div class="text-xs text-gray-500">Aug</div>
                        <div class="text-xs text-gray-500">Sep</div>
                        <div class="text-xs text-gray-500">Oct</div>
                        <div class="text-xs text-gray-500">Nov</div>
                        <div class="text-xs text-gray-500">Dec</div>
                        <div class="text-xs text-gray-500">Jan</div>
                        <div class="text-xs text-gray-500">Feb</div>
                        <div class="text-xs text-gray-500">Mar</div>
                        <div class="text-xs text-gray-500">Apr</div>
                    </div>
                    
                    <div class="contribution-grid-container flex">
                        <!-- Day labels -->
                        <div class="day-labels flex flex-col justify-between pr-2">
                            <div class="text-xs text-gray-500">Mon</div>
                            <div class="text-xs text-gray-500">Wed</div>
                            <div class="text-xs text-gray-500">Fri</div>
                        </div>
                        
                        <!-- Contribution cells -->
                        <div class="contribution-cells grid grid-cols-53 gap-1 w-full">
                            ${generateContributionCells(data)}
                        </div>
                    </div>
                    
                    <!-- Legend -->
                    <div class="flex justify-between items-center mt-2">
                        <a href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile" 
                           class="text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200">
                           Learn how we count contributions
                        </a>
                        
                        <div class="flex items-center">
                            <span class="text-xs text-gray-500 mr-1">Less</span>
                            <div class="w-3 h-3 rounded-sm" style="background-color: ${colors.level0};"></div>
                            <div class="w-3 h-3 rounded-sm ml-1" style="background-color: ${colors.level1};"></div>
                            <div class="w-3 h-3 rounded-sm ml-1" style="background-color: ${colors.level2};"></div>
                            <div class="w-3 h-3 rounded-sm ml-1" style="background-color: ${colors.level3};"></div>
                            <div class="w-3 h-3 rounded-sm ml-1" style="background-color: ${colors.level4};"></div>
                            <span class="text-xs text-gray-500 ml-1">More</span>
                        </div>
                    </div>
                </div>
                
                <!-- Collaborators section -->
                <div class="mt-4 border-t border-gray-800 pt-4">
                    <div class="flex space-x-2 overflow-x-auto pb-2">
                        <a href="https://github.com/code50" class="flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                            <img src="https://github.com/code50.png" class="w-5 h-5 rounded-full mr-2" alt="@code50">
                            <span>@code50</span>
                        </a>
                        <a href="https://github.com/Alektronika" class="flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                            <img src="https://github.com/Alektronika.png" class="w-5 h-5 rounded-full mr-2" alt="@Alektronika">
                            <span>@Alektronika</span>
                        </a>
                        <a href="https://github.com/me50" class="flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                            <img src="https://github.com/me50.png" class="w-5 h-5 rounded-full mr-2" alt="@me50">
                            <span>@me50</span>
                        </a>
                        <button class="flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                            <span>More</span>
                        </button>
                    </div>
                </div>
                
                <!-- Activity overview and Code review -->
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-medium text-white mb-4">Activity overview</h4>
                        <p class="flex items-start text-gray-300 mb-2">
                            <span class="mr-2">📊</span>
                            <span>Contributed to 
                                <a href="https://github.com/code50/8853467" class="text-blue-400 hover:underline">code50/8853467</a>,
                                <a href="https://github.com/PerseusKyogre09/PerseusKyogre09" class="text-blue-400 hover:underline">PerseusKyogre09/PerseusKyogre09</a>,
                                <a href="https://github.com/PerseusKyogre09/weather-project" class="text-blue-400 hover:underline">PerseusKyogre09/weather-project</a>
                                and 55 other repositories
                            </span>
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-medium text-white mb-4">Code review</h4>
                        <div class="relative h-32">
                            <!-- Horizontal line -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-full h-px bg-gray-700"></div>
                            </div>
                            
                            <!-- Vertical line -->
                            <div class="absolute inset-0 flex justify-center">
                                <div class="h-full w-px bg-gray-700"></div>
                            </div>
                            
                            <!-- Green lines -->
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full h-px bg-green-500"></div>
                            </div>
                            <div class="absolute inset-0 flex justify-center">
                                <div class="h-full w-px bg-green-500"></div>
                            </div>
                            
                            <!-- Percentages -->
                            <div class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                                <span>96%</span>
                                <div class="mt-1">Commits</div>
                            </div>
                            <div class="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs text-right">
                                <span>1%</span>
                                <div class="mt-1">Issues</div>
                            </div>
                            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs text-center">
                                <span>3%</span>
                                <div class="mt-1">Pull requests</div>
                            </div>
                            
                            <!-- Center dot -->
                            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update the container with the generated HTML
        container.innerHTML = html;
        
        // Add event listeners for tooltips
        const cells = container.querySelectorAll('.contribution-cell');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', showTooltip);
            cell.addEventListener('mouseleave', hideTooltip);
        });
    }
    
    // Generate contribution cells based on data or mock data if needed
    function generateContributionCells(data) {
        let cellsHTML = '';
        
        // If we have real data, use it
        if (data && data.contributions) {
            const contributions = data.contributions;
            
            // Generate cells for each day in the year
            for (let i = 0; i < contributions.length; i++) {
                const week = contributions[i];
                if (week && week.days) {
                    for (let j = 0; j < week.days.length; j++) {
                        const day = week.days[j] || { level: 0, count: 0, date: '' };
                        const level = day.level || 0;
                        const count = day.count || 0;
                        const date = day.date || '';
                        
                        let color;
                        switch (level) {
                            case 0: color = colors.level0; break;
                            case 1: color = colors.level1; break;
                            case 2: color = colors.level2; break;
                            case 3: color = colors.level3; break;
                            case 4: color = colors.level4; break;
                            default: color = colors.level0;
                        }
                        
                        cellsHTML += `
                            <div 
                                class="contribution-cell w-3 h-3 rounded-sm" 
                                style="background-color: ${color};"
                                data-date="${date}"
                                data-count="${count}"
                                title="${count} contributions on ${formatDate(date)}"
                            ></div>
                        `;
                    }
                }
            }
        } else {
            // Generate mock data similar to the image
            // This creates a pattern similar to what's shown in the image
            for (let i = 0; i < 53; i++) {
                for (let j = 0; j < 7; j++) {
                    // Create a pattern similar to the image
                    let level = 0;
                    
                    // Add some activity in Sep-Dec and Jan-Apr as shown in the image
                    if ((i >= 20 && i <= 35) || (i >= 40 && i <= 52)) {
                        // Higher chance of activity in these months
                        level = Math.random() > 0.8 ? Math.floor(Math.random() * 4) + 1 : 0;
                    }
                    
                    const color = level === 0 ? colors.level0 : 
                                 level === 1 ? colors.level1 : 
                                 level === 2 ? colors.level2 : 
                                 level === 3 ? colors.level3 : colors.level4;
                    
                    // Calculate a mock date
                    const today = new Date('2025-04-22');
                    const date = new Date(today);
                    date.setDate(today.getDate() - ((52 - i) * 7 + (6 - j)));
                    
                    cellsHTML += `
                        <div 
                            class="contribution-cell w-3 h-3 rounded-sm" 
                            style="background-color: ${color};"
                            data-date="${date.toISOString().split('T')[0]}"
                            data-count="${level * 2}"
                            title="${level * 2} contributions on ${formatDate(date.toISOString().split('T')[0])}"
                        ></div>
                    `;
                }
            }
        }
        
        return cellsHTML;
    }
    
    // Helper function to format dates
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Tooltip functions
    function showTooltip(event) {
        const cell = event.target;
        const date = cell.getAttribute('data-date');
        const count = cell.getAttribute('data-count');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-10 bg-gray-900 text-white text-xs rounded py-1 px-2 shadow-lg';
        tooltip.textContent = `${count} contributions on ${formatDate(date)}`;
        
        // Position tooltip
        const rect = cell.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
        
        // Add tooltip to body
        document.body.appendChild(tooltip);
        cell.setAttribute('data-tooltip-id', Date.now());
        tooltip.id = cell.getAttribute('data-tooltip-id');
    }
    
    function hideTooltip(event) {
        const cell = event.target;
        const tooltipId = cell.getAttribute('data-tooltip-id');
        if (tooltipId) {
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.remove();
            }
        }
    }
    
    // Add CSS for the contribution graph
    const style = document.createElement('style');
    style.textContent = `
        .contribution-wrapper {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            color: #c9d1d9;
        }
        
        .contribution-calendar-container {
            background-color: #0d1117;
            border-radius: 6px;
            padding: 16px;
        }
        
        .month-headers {
            display: grid;
            grid-template-columns: repeat(13, 1fr);
            text-align: center;
        }
        
        .contribution-grid-container {
            display: flex;
        }
        
        .day-labels {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-right: 8px;
            height: 100px;
        }
        
        .contribution-cells {
            display: grid;
            grid-template-columns: repeat(53, 1fr);
            grid-template-rows: repeat(7, 1fr);
            gap: 2px;
            width: 100%;
        }
        
        .contribution-cell {
            width: 10px;
            height: 10px;
            border-radius: 2px;
            transition: transform 0.1s ease-in-out;
        }
        
        .contribution-cell:hover {
            transform: scale(1.2);
        }
        
        .grid-cols-53 {
            grid-template-columns: repeat(53, 1fr);
        }
        
        @media (max-width: 768px) {
            .contribution-cells {
                grid-template-columns: repeat(53, 1fr);
                gap: 1px;
            }
            
            .contribution-cell {
                width: 8px;
                height: 8px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the GitHub activity display
    fetchGitHubContributions();
    
    // Add click event for GitHub profile link
    const profileLink = document.querySelector('[data-github-profile]');
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://github.com/${username}`, '_blank');
        });
    }
});
