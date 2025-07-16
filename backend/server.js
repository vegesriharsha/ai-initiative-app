// server.js - Simple Express backend to save ideas to JSON file
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const IDEAS_FILE = 'ai_ideas.json';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public')); // Serve Angular build files

// Ensure ideas file exists
async function initializeIdeasFile() {
  try {
    await fs.access(IDEAS_FILE);
    console.log('✅ Ideas file found:', IDEAS_FILE);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(IDEAS_FILE, '[]', 'utf8');
    console.log('📁 Created new ideas file:', IDEAS_FILE);
  }
}

// Read ideas from file
async function readIdeas() {
  try {
    const data = await fs.readFile(IDEAS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading ideas file:', error);
    return [];
  }
}

// Write ideas to file
async function writeIdeas(ideas) {
  try {
    await fs.writeFile(IDEAS_FILE, JSON.stringify(ideas, null, 2), 'utf8');
    console.log(`💾 Ideas saved to file successfully (${ideas.length} total)`);
    return true;
  } catch (error) {
    console.error('❌ Error writing ideas file:', error);
    return false;
  }
}

// API Routes

// Submit a new idea
app.post('/api/submit-idea', async (req, res) => {
  try {
    const newIdea = req.body;
    
    // Basic validation
    if (!newIdea.teamName || !newIdea.ideaTitle || !newIdea.ideaDescription) {
      return res.status(400).json({ 
        error: 'Missing required fields: teamName, ideaTitle, ideaDescription' 
      });
    }

    // Read existing ideas
    const ideas = await readIdeas();
    
    // Add new idea
    ideas.push(newIdea);
    
    // Save to file
    const saved = await writeIdeas(ideas);
    
    if (saved) {
      console.log(`💡 New idea submitted by ${newIdea.submitterName} from ${newIdea.teamName}`);
      res.json({ 
        success: true, 
        message: 'Idea saved successfully',
        id: newIdea.id,
        totalIdeas: ideas.length
      });
    } else {
      res.status(500).json({ error: 'Failed to save idea' });
    }
    
  } catch (error) {
    console.error('❌ Error submitting idea:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all ideas
app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await readIdeas();
    res.json(ideas);
  } catch (error) {
    console.error('❌ Error fetching ideas:', error);
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

// Get ideas by team
app.get('/api/ideas/team/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const ideas = await readIdeas();
    const teamIdeas = ideas.filter(idea => 
      idea.teamName.toLowerCase().includes(teamName.toLowerCase())
    );
    res.json(teamIdeas);
  } catch (error) {
    console.error('❌ Error fetching team ideas:', error);
    res.status(500).json({ error: 'Failed to fetch team ideas' });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const ideas = await readIdeas();
    
    // Calculate statistics
    const stats = {
      totalIdeas: ideas.length,
      teamCounts: {},
      categoryCounts: {},
      priorityCounts: {},
      impactCounts: {},
      recentSubmissions: ideas.slice(-5).reverse()
    };
    
    ideas.forEach(idea => {
      // Team stats
      stats.teamCounts[idea.teamName] = (stats.teamCounts[idea.teamName] || 0) + 1;
      
      // Category stats
      stats.categoryCounts[idea.category] = (stats.categoryCounts[idea.category] || 0) + 1;
      
      // Priority stats
      stats.priorityCounts[idea.priority] = (stats.priorityCounts[idea.priority] || 0) + 1;
      
      // Impact stats
      stats.impactCounts[idea.estimatedImpact] = (stats.impactCounts[idea.estimatedImpact] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    console.error('❌ Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Download ideas as JSON file
app.get('/api/export/json', async (req, res) => {
  try {
    const ideas = await readIdeas();
    const filename = `ai_ideas_export_${new Date().toISOString().slice(0, 10)}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(JSON.stringify(ideas, null, 2));
  } catch (error) {
    console.error('❌ Error exporting ideas:', error);
    res.status(500).json({ error: 'Failed to export ideas' });
  }
});

// Download ideas as CSV
app.get('/api/export/csv', async (req, res) => {
  try {
    const ideas = await readIdeas();
    
    // CSV headers
    const headers = ['ID', 'Team Name', 'Submitter Name', 'Email', 'Idea Title', 'Description', 'Category', 'Priority', 'Impact', 'Submission Date'];
    
    // CSV rows
    const rows = ideas.map(idea => [
      idea.id,
      `"${idea.teamName}"`,
      `"${idea.submitterName}"`,
      idea.submitterEmail,
      `"${idea.ideaTitle}"`,
      `"${idea.ideaDescription.replace(/"/g, '""')}"`,
      idea.category,
      idea.priority,
      idea.estimatedImpact,
      idea.submissionDate
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const filename = `ai_ideas_export_${new Date().toISOString().slice(0, 10)}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (error) {
    console.error('❌ Error exporting CSV:', error);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Serve Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
  try {
    await initializeIdeasFile();
    app.listen(PORT, () => {
      console.log('🚀 AI Ideas Collection Server Started!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`📁 Ideas File: ${path.resolve(IDEAS_FILE)}`);
      console.log('🔗 API Endpoints:');
      console.log('   POST /api/submit-idea - Submit new idea');
      console.log('   GET  /api/ideas - Get all ideas');
      console.log('   GET  /api/stats - Get statistics');
      console.log('   GET  /api/export/json - Download JSON');
      console.log('   GET  /api/export/csv - Download CSV');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
