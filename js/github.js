/**
 * Enhanced GitHub Activity Visualization
 * Creates a more authentic GitHub-style contribution calendar
 */

// Configuration
const config = {
    username: 'PerseusKyogre09', // Your GitHub username
    repoLimit: 5, // Number of repositories to display
    commitLimit: 10, // Number of commits to display per repository
    apiUrl: 'https://api.github.com/users/',
    profileUrl: 'https://github.com/' // Base GitHub URL
};

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initGitHubActivity();
    updateProfileLink();
});

/**
 * Update the profile link with the configured username
 */
function updateProfileLink() {
    const profileLink = document.querySelector('[data-github-profile]');
    if (profileLink) {
        profileLink.href = config.profileUrl + config.username;
    }
}

/**
 * Initialize GitHub activity visualization
 */
async function initGitHubActivity() {
    const container = document.getElementById('github-activity-container');

    if (!container) {
        console.error('GitHub activity container not found');
        return;
    }

    try {
        // Fetch user data and repositories
        const userData = await fetchUserData(config.username);
        const contributionData = await generateContributionData();

        // Clear loading indicator
        container.innerHTML = '';

        // Render the activity visualization
        renderUserInfo(container, userData);
        renderContributionCalendar(container, contributionData);
        await renderRecentActivity(container);
        renderActivityOverview(container);
    } catch (error) {
        renderError(container, error);
    }
}

/**
 * Fetch basic user data from GitHub API
 */
async function fetchUserData(username) {
    try {
        const response = await fetch(`${config.apiUrl}${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            login: username,
            avatar_url: '/api/placeholder/80/80',
            name: username,
            public_repos: 40,
            followers: 22
        };
    }
}

/**
 * Fetch repositories for a user
 */
async function fetchUserRepos(username) {
    try {
        const response = await fetch(`${config.apiUrl}${username}/repos?sort=updated&per_page=${config.repoLimit}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching repositories:', error);
        // Return mock data if API call fails
        return [
            { name: 'PerseusKyogre09', description: 'My personal repository.', html_url: '#', stargazers_count: 0, forks_count: 0 },
            { name: 'ip_sniffer', description: 'No description', html_url: '#', stargazers_count: 0, forks_count: 0 },
            { name: 'PawMart', description: 'No description', html_url: '#', stargazers_count: 0, forks_count: 0 }
        ];
    }
}

/**
 * Generate mock contribution data for demonstration
 * In a real implementation, this would fetch actual contribution data from GitHub API
 */
async function generateContributionData() {
    // Generate data for the most recent 12 months
    const now = new Date();
    const months = [];
    const monthNames = [];
    
    // Generate month labels for the last 12 months
    for (let i = 11; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(month);
        monthNames.push(month.toLocaleString('default', { month: 'short' }));
    }
    
    // Generate contribution data with weighted random values
    // Higher probability of contributions in recent months
    const contributions = [];
    const days = ['Mon', 'Wed', 'Fri'];
    
    for (let week = 0; week < 52; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
            // More recent weeks have higher probability of contributions
            const recencyFactor = week > 26 ? (week - 26) / 26 : 0;
            const probability = 0.1 + (recencyFactor * 0.5);
            
            // Generate activity level (0-4)
            let level = 0;
            if (Math.random() < probability) {
                // Weighted distribution favoring lower values
                const rand = Math.random();
                if (rand > 0.8) level = 4;
                else if (rand > 0.6) level = 3;
                else if (rand > 0.3) level = 2;
                else level = 1;
            }
            
            weekData.push({
                level,
                count: level === 0 ? 0 : level * Math.floor(Math.random() * 5) + 1,
                date: new Date(now.getFullYear(), now.getMonth() - 11, (week * 7) + day)
            });
        }
        contributions.push(weekData);
    }
    
    return {
        totalCount: 529,
        months: monthNames,
        monthDates: months,
        days,
        contributions
    };
}

/**
 * Render user information in the container
 */
function renderUserInfo(container, userData) {
    const userInfoEl = document.createElement('div');
    userInfoEl.className = 'flex items-center mb-6';
    userInfoEl.innerHTML = `
        <img src="${userData.avatar_url}" alt="${userData.login}" class="w-12 h-12 rounded-full mr-4">
        <div>
            <h3 class="text-lg font-bold text-white">${userData.name || userData.login}</h3>
            <p class="text-gray-400 text-sm">${userData.public_repos} repositories · ${userData.followers} followers</p>
        </div>
    `;
    container.appendChild(userInfoEl);
}

/**
 * Render GitHub-style contribution calendar
 */
function renderContributionCalendar(container, data) {
    const calendarSection = document.createElement('div');
    calendarSection.className = 'mb-8';
    
    // Create calendar header with contribution count and year dropdown
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'flex justify-between items-center mb-2';
    
    // Get current year and previous years for dropdown
    const currentYear = new Date().getFullYear();
    
    calendarHeader.innerHTML = `
        <h4 class="text-sm font-medium text-gray-300">${data.totalCount} contributions in the last year</h4>
        <div class="text-xs text-gray-500">
            <select id="year-selector" class="bg-gray-800 border border-gray-700 rounded px-2 py-1">
                <option value="${currentYear}">${currentYear}</option>
                <option value="${currentYear-1}">${currentYear-1}</option>
                <option value="${currentYear-2}">${currentYear-2}</option>
            </select>
        </div>
    `;
    calendarSection.appendChild(calendarHeader);
    
    // Create main calendar container
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'relative bg-gray-900 rounded-md p-2';
    
    // Month labels - positioned above the contribution grid
    const monthsRow = document.createElement('div');
    monthsRow.className = 'flex text-xs text-gray-500 mb-1 pl-10 relative h-4';
    
    // Calculate month positions
    let monthsHTML = '';
    const totalWeeks = data.contributions.length;
    
    // Position month labels based on their actual start positions in the grid
    const monthPositions = [];
    
    data.monthDates.forEach((date, i) => {
        // Calculate the week number for this month's start
        const startOfMonth = new Date(date);
        const timeSinceFirstDate = startOfMonth - data.monthDates[0];
        const daysSinceFirstDate = timeSinceFirstDate / (1000 * 60 * 60 * 24);
        const weekIndex = Math.floor(daysSinceFirstDate / 7);
        
        monthPositions.push({
            name: data.months[i],
            position: (weekIndex / totalWeeks) * 100
        });
    });
    
    // Generate month labels
    monthPositions.forEach(month => {
        monthsHTML += `<div style="position: absolute; left: ${month.position + 8}%" class="text-xs">${month.name}</div>`;
    });
    
    monthsRow.innerHTML = monthsHTML;
    calendarContainer.appendChild(monthsRow);
    
    // Create main calendar grid with day labels
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'flex mt-6';
    
    // Day labels column
    const dayLabels = document.createElement('div');
    dayLabels.className = 'flex flex-col justify-between pr-2 text-xs text-gray-500 h-16';
    
    data.days.forEach(day => {
        dayLabels.innerHTML += `<div>${day}</div>`;
    });
    
    // Contribution cells
    const cellsContainer = document.createElement('div');
    cellsContainer.className = 'flex-grow';
    
    // Add our custom styles for the grid at render time
    // This creates the GitHub-style tight grid
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .contribution-grid {
                display: grid;
                grid-template-columns: repeat(52, 1fr);
                grid-template-rows: repeat(7, 1fr);
                grid-gap: 2px;
                height: 80px;
            }
            
            .contribution-cell {
                width: 10px;
                height: 10px;
                border-radius: 2px;
            }
            
            @media (max-width: 768px) {
                .contribution-grid {
                    grid-gap: 1px;
                }
                
                .contribution-cell {
                    width: 8px;
                    height: 8px;
                }
            }
        </style>
    `);
    
    let gridHTML = '<div class="contribution-grid">';
    
    // Flatten the data for easier rendering
    const flatData = data.contributions.flatMap((week, weekIndex) => 
        week.map((day, dayIndex) => ({...day, x: weekIndex, y: dayIndex}))
    );
    
    // Generate all cells (52 weeks × 7 days)
    for (let i = 0; i < 364; i++) {
        const weekIndex = Math.floor(i / 7);
        const dayIndex = i % 7;
        const dataPoint = flatData.find(d => d.x === weekIndex && d.y === dayIndex) || { level: 0 };
        
        const colorClass = getContributionColorClass(dataPoint.level);
        const title = dataPoint.count > 0 ? `${dataPoint.count} contributions` : 'No contributions';
        
        gridHTML += `
            <div class="contribution-cell ${colorClass}" 
                 title="${title}"></div>
        `;
    }
    
    gridHTML += '</div>';
    cellsContainer.innerHTML = gridHTML;
    
    calendarGrid.appendChild(dayLabels);
    calendarGrid.appendChild(cellsContainer);
    calendarContainer.appendChild(calendarGrid);
    
    // Color scale legend
    const legend = document.createElement('div');
    legend.className = 'flex justify-end mt-2';
    legend.innerHTML = `
        <div class="flex items-center text-xs text-gray-500">
            <span class="mr-2">Less</span>
            <div class="flex space-x-1">
                <div class="w-3 h-3 bg-gray-800 border border-gray-700 rounded-sm"></div>
                <div class="w-3 h-3 bg-green-900 rounded-sm"></div>
                <div class="w-3 h-3 bg-green-700 rounded-sm"></div>
                <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div class="w-3 h-3 bg-green-300 rounded-sm"></div>
            </div>
            <span class="ml-2">More</span>
        </div>
    `;
    calendarContainer.appendChild(legend);
    
    calendarSection.appendChild(calendarContainer);
    container.appendChild(calendarSection);
    
    // Add event listener to the year selector
    const yearSelector = calendarSection.querySelector('#year-selector');
    if (yearSelector) {
        yearSelector.addEventListener('change', (e) => {
            const selectedYear = parseInt(e.target.value);
            // In a real implementation, you would fetch data for the selected year
            alert(`Fetching data for year: ${selectedYear}`);
            // For demo purposes we're just showing an alert
            // In production, you would call a function to update the calendar with new data
        });
    }
}

/**
 * Get color class based on contribution level
 */
function getContributionColorClass(level) {
    const colors = [
        'bg-gray-800 border border-gray-700', // 0 contributions
        'bg-green-900',                       // 1-3 contributions
        'bg-green-700',                       // 4-6 contributions
        'bg-green-500',                       // 7-9 contributions
        'bg-green-300'                        // 10+ contributions
    ];
    return colors[level];
}

/**
 * Render recent activity (latest repositories)
 */
async function renderRecentActivity(container) {
    const repos = await fetchUserRepos(config.username);
    
    const activitySection = document.createElement('div');
    activitySection.className = 'space-y-4 mb-8';

    const activityHeader = document.createElement('h4');
    activityHeader.className = 'text-sm font-medium text-gray-300 mb-3';
    activityHeader.textContent = 'Recent Activity';
    activitySection.appendChild(activityHeader);

    const recentRepos = repos.slice(0, 3);
    for (const repo of recentRepos) {
        const repoEl = document.createElement('div');
        repoEl.className = 'bg-gray-800 bg-opacity-50 rounded-lg p-3';

        repoEl.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <a href="${repo.html_url}" class="font-medium text-blue-400 hover:text-blue-300">
                        ${repo.name}
                    </a>
                    <p class="text-xs text-gray-400 mt-1">${repo.description || 'No description'}</p>
                </div>
                <div class="flex items-center text-gray-500 text-xs">
                    <span class="flex items-center mr-3">
                        <i class="fas fa-star mr-1"></i> ${repo.stargazers_count}
                    </span>
                    <span class="flex items-center">
                        <i class="fas fa-code-branch mr-1"></i> ${repo.forks_count}
                    </span>
                </div>
            </div>
        `;
        activitySection.appendChild(repoEl);
    }
    container.appendChild(activitySection);
}

/**
 * Render activity overview chart (similar to GitHub's language/activity breakdown)
 */
function renderActivityOverview(container) {
    const overviewSection = document.createElement('div');
    overviewSection.className = 'mb-8';
    
    // Activity overview header
    const overviewHeader = document.createElement('h4');
    overviewHeader.className = 'text-sm font-medium text-gray-300 mb-3';
    overviewHeader.textContent = 'Activity Overview';
    overviewSection.appendChild(overviewHeader);
    
    // Activity metrics
    const metrics = document.createElement('div');
    metrics.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
    
    // Contribution types
    const contributionTypes = document.createElement('div');
    contributionTypes.innerHTML = `
        <div class="text-sm text-gray-400 mb-2">Contribution types</div>
        <div class="flex items-center mb-2">
            <i class="fas fa-code-commit mr-2 text-gray-500"></i>
            <div class="flex-grow">
                <div class="flex justify-between text-xs mb-1">
                    <span>Commits</span>
                    <span>96%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 96%"></div>
                </div>
            </div>
        </div>
        <div class="flex items-center mb-2">
            <i class="fas fa-code-pull-request mr-2 text-gray-500"></i>
            <div class="flex-grow">
                <div class="flex justify-between text-xs mb-1">
                    <span>Pull requests</span>
                    <span>3%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 3%"></div>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2 text-gray-500"></i>
            <div class="flex-grow">
                <div class="flex justify-between text-xs mb-1">
                    <span>Issues</span>
                    <span>1%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 1%"></div>
                </div>
            </div>
        </div>
    `;
    
    // Organizations/Collaborators
    const collaborators = document.createElement('div');
    collaborators.innerHTML = `
        <div class="text-sm text-gray-400 mb-2">Collaborated with</div>
        <div class="flex space-x-2">
            <a href="#" class="block">
                <img src="/api/placeholder/32/32" alt="Collaborator" class="w-8 h-8 rounded-full border-2 border-gray-700">
            </a>
            <a href="#" class="block">
                <img src="/api/placeholder/32/32" alt="Collaborator" class="w-8 h-8 rounded-full border-2 border-gray-700">
            </a>
            <a href="#" class="block">
                <img src="/api/placeholder/32/32" alt="Collaborator" class="w-8 h-8 rounded-full border-2 border-gray-700">
            </a>
            <a href="#" class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 text-xs text-gray-400">
                +2
            </a>
        </div>
    `;
    
    metrics.appendChild(contributionTypes);
    metrics.appendChild(collaborators);
    overviewSection.appendChild(metrics);
    
    container.appendChild(overviewSection);
}

/**
 * Render error message in the container
 */
function renderError(container, error) {
    container.innerHTML = `
        <div class="flex items-center justify-center h-64">
            <div class="text-red-400 text-center">
                <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
                <p>Could not load GitHub activity.</p>
                <p class="text-sm text-gray-500 mt-1">${error.message}</p>
            </div>
        </div>
    `;
}