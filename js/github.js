// GitHub Contribution Calendar using Vercel serverless function
const GitHubContributionCalendar = {
    username: 'PerseusKyogre09', // Default username
    apiUrl: '/api/github-contributions', // Path to your Vercel serverless function
    
    init: function(config = {}) {
      // Override default settings with any provided config
      if (config.username) this.username = config.username;
      if (config.apiUrl) this.apiUrl = config.apiUrl;
      
      // Find the container
      this.container = document.getElementById('github-activity-container');
      if (!this.container) {
        console.error('GitHub activity container not found');
        return;
      }
      
      // Look for username in data attributes if available
      const profileLink = document.querySelector('[data-github-profile]');
      if (profileLink) {
        const href = profileLink.getAttribute('href');
        if (href) {
          const usernameFromUrl = href.split('/').pop();
          if (usernameFromUrl) this.username = usernameFromUrl;
        }
      }
      
      this.fetchContributions();
    },
    
    fetchContributions: async function() {
      try {
        this.showLoading();
        
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username })
        });
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.errors) {
          console.error('GraphQL errors:', result.errors);
          this.renderError('Could not load GitHub data due to API errors');
          return;
        }
        
        if (result.data && result.data.user) {
          this.renderCalendar(result.data.user.contributionsCollection.contributionCalendar);
        } else {
          this.renderError('No data found for this GitHub username');
        }
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        
        // Fallback to demo data
        console.warn('Falling back to demo data');
        this.renderDemoCalendar();
      }
    },
    
    showLoading: function() {
      this.container.innerHTML = `
        <div class="flex items-center justify-center h-64">
          <div class="text-gray-400">
            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>Loading contribution data for ${this.username}...</div>
        </div>
      `;
    },
    
    renderCalendar: function(contributionCalendar) {
      const { weeks, totalContributions } = contributionCalendar;
      this.container.innerHTML = '';
      
      // Create header with total contributions
      const header = document.createElement('div');
      header.className = 'flex justify-between items-center mb-4';
      header.innerHTML = `
        <h3 class="text-lg font-medium text-gray-200">
          ${this.username}'s Contributions
        </h3>
        <span class="text-sm text-gray-400">
          ${totalContributions} contributions in the last year
        </span>
      `;
      this.container.appendChild(header);
      
      // Create month labels
      const monthLabels = document.createElement('div');
      monthLabels.className = 'flex text-xs text-gray-500 mb-1 pl-10';
      
      const months = [];
      weeks.forEach(week => {
        const date = new Date(week.firstDay);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!months.includes(month)) {
          months.push(month);
        }
      });
      
      // Calculate spacing for month labels
      const monthLabelHtml = months.map(month => 
        `<span class="flex-1 text-center">${month}</span>`
      ).join('');
      
      monthLabels.innerHTML = monthLabelHtml;
      this.container.appendChild(monthLabels);
      
      // Create calendar container
      const calendarContainer = document.createElement('div');
      calendarContainer.className = 'flex';
      
      // Create weekday labels
      const weekdayLabels = document.createElement('div');
      weekdayLabels.className = 'flex flex-col text-xs text-gray-500 mt-4';
      
      const weekdays = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
      weekdays.forEach(day => {
        const dayLabel = document.createElement('span');
        dayLabel.className = 'h-3 mb-1 text-right pr-2';
        dayLabel.textContent = day;
        weekdayLabels.appendChild(dayLabel);
      });
      calendarContainer.appendChild(weekdayLabels);
      
      // Create weeks grid
      const weeksGrid = document.createElement('div');
      weeksGrid.className = 'flex flex-1 overflow-x-auto pb-2';
      
      weeks.forEach(week => {
        const weekEl = document.createElement('div');
        weekEl.className = 'flex flex-col';
        
        week.contributionDays.forEach(day => {
          const dayEl = document.createElement('div');
          dayEl.className = 'w-3 h-3 m-0.5 rounded-sm transition-all duration-200 hover:scale-125';
          dayEl.style.backgroundColor = day.color || '#ebedf0';
          
          // Add tooltip with date and count
          const date = new Date(day.date);
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          });
          
          dayEl.setAttribute('title', `${formattedDate}: ${day.contributionCount} contributions`);
          dayEl.setAttribute('data-date', day.date);
          dayEl.setAttribute('data-count', day.contributionCount);
          
          weekEl.appendChild(dayEl);
        });
        weeksGrid.appendChild(weekEl);
      });
      
      calendarContainer.appendChild(weeksGrid);
      this.container.appendChild(calendarContainer);
      
      // Create legend
      const legend = document.createElement('div');
      legend.className = 'flex justify-end items-center mt-2 text-xs text-gray-400';
      legend.innerHTML = `
        <span class="mr-2">Less</span>
        <div class="w-3 h-3 rounded-sm mr-1" style="background-color: #ebedf0"></div>
        <div class="w-3 h-3 rounded-sm mr-1" style="background-color: #9be9a8"></div>
        <div class="w-3 h-3 rounded-sm mr-1" style="background-color: #40c463"></div>
        <div class="w-3 h-3 rounded-sm mr-1" style="background-color: #30a14e"></div>
        <div class="w-3 h-3 rounded-sm" style="background-color: #216e39"></div>
        <span class="ml-2">More</span>
      `;
      this.container.appendChild(legend);
    },
    
    renderDemoCalendar: function() {
      // Generate random contribution data for demo purposes
      const weeks = [];
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 12);
      
      let currentDate = new Date(startDate);
      let totalContributions = 0;
      
      while (currentDate <= new Date()) {
        const firstDay = new Date(currentDate);
        firstDay.setDate(firstDay.getDate() - firstDay.getDay());
        
        const contributionDays = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(firstDay);
          date.setDate(date.getDate() + i);
          
          if (date <= new Date() && date >= startDate) {
            // Generate random count and color
            const count = Math.floor(Math.random() * 5);
            let color;
            if (count === 0) color = '#ebedf0';
            else if (count === 1) color = '#9be9a8';
            else if (count === 2) color = '#40c463';
            else if (count === 3) color = '#30a14e';
            else color = '#216e39';
            
            contributionDays.push({
              date: date.toISOString().split('T')[0],
              contributionCount: count,
              color,
              weekday: i
            });
            
            totalContributions += count;
          }
        }
        
        if (contributionDays.length > 0) {
          weeks.push({
            firstDay: firstDay.toISOString().split('T')[0],
            contributionDays
          });
        }
        
        currentDate.setDate(currentDate.getDate() + 7);
      }
      
      this.renderCalendar({ weeks, totalContributions });
    },
    
    renderError: function(message) {
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center p-6">
          <svg class="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-400">${message}</p>
          <p class="text-sm text-gray-500 mt-2">Showing demo data instead.</p>
        </div>
      `;
      
      // After showing the error for a moment, show demo data
      setTimeout(() => {
        this.renderDemoCalendar();
      }, 3000);
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    GitHubContributionCalendar.init();
  });