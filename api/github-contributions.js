// api/github-contributions.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    // Generate date 1 year ago
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 12);
    const fromDateString = fromDate.toISOString().split('T')[0];
    
    const query = `
      query UserContributions {
        user(login: "${username}") {
          name
          contributionsCollection(from: "${fromDateString}T00:00:00Z") {
            contributionCalendar {
              totalContributions
              weeks {
                firstDay
                contributionDays {
                  date
                  contributionCount
                  color
                  weekday
                }
              }
            }
          }
        }
      }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
}