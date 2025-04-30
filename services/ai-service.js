/**
 * AI Service
 * 
 * Provides a simple HTTP server and AI integration for the Secret Trees bot.
 * Handles communication with OpenAI API for generating responses
 * to user queries.
 */
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/bot-config');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
app.use(express.json());

// Initialize OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Server instance
let server = null;

/**
 * Create a context-aware AI response based on user query
 * 
 * @param {string} query - User's question or message
 * @returns {Promise<string>} - AI-generated response
 */
async function generateAIResponse(query) {
  try {
    // Define system prompt
    const systemPrompt = `You are a helpful assistant for Secret Trees, a company focused on reforestation and carbon credits.
    
Key information about Secret Trees:
- We plant trees in verified reforestation projects around the world
- We offer carbon credits to individuals and businesses
- Each tree absorbs approximately ${config.carbonCalculator.treeCO2PerYear}kg of CO2 per year
- It costs about $${config.carbonCalculator.treeCostUSD} to plant a single tree
- Carbon credits are priced at $${config.carbonCalculator.carbonPricePerTonUSD} per ton

Provide informative, accurate responses about forests, climate change, carbon credits, and reforestation.
Keep responses concise (under 200 words) and friendly.
If you don't know something, acknowledge that and offer to find out.
    
Current date: ${new Date().toISOString().split('T')[0]}`;

    // Generate response using OpenAI
    const completion = await openai.createChatCompletion({
      model: config.ai.defaultModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: config.ai.temperature,
      max_tokens: config.ai.maxTokens
    });
    
    const response = completion.data.choices[0].message.content;
    
    // Save query for future FAQ generation if enabled
    if (config.ai.saveQuestions) {
      saveUserQuery(query, response);
    }
    
    return response;
  } catch (error) {
    logger.error({
      event: 'ai_generation_error',
      error: error.message,
      stack: error.stack,
      query
    });
    
    return 'Sorry, I encountered an error generating a response. Please try again later.';
  }
}

/**
 * Analyze forest data for a specific location
 * 
 * @param {Object} location - Location coordinates
 * @param {number} location.latitude - Latitude
 * @param {number} location.longitude - Longitude
 * @returns {Promise<string>} - Analysis of forest data for the location
 */
async function analyzeLocation(location) {
  try {
    const prompt = `You are a forest and climate expert for Secret Trees.
    
Analyze this location:
Latitude: ${location.latitude}
Longitude: ${location.longitude}

Based on these coordinates, provide a brief analysis including:
1. The likely climate zone and forest type in this region
2. Key tree species that would thrive there
3. Reforestation potential of this area
4. Challenges and opportunities for forest restoration

Current approximate date: ${new Date().toISOString().split('T')[0]}`;

    // Generate location analysis using OpenAI
    const completion = await openai.createChatCompletion({
      model: config.ai.defaultModel,
      messages: [
        { role: "system", content: prompt }
      ],
      temperature: config.ai.temperature,
      max_tokens: config.ai.maxTokens
    });
    
    const analysis = completion.data.choices[0].message.content;
    
    return analysis;
  } catch (error) {
    logger.error({
      event: 'location_analysis_error',
      error: error.message,
      stack: error.stack,
      location
    });
    
    return 'Sorry, I couldn\'t analyze this location at the moment. Please try again later.';
  }
}

/**
 * Save user query for future FAQ generation
 * 
 * @param {string} query - User's question
 * @param {string} response - AI-generated response
 */
function saveUserQuery(query, response) {
  try {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '..', config.paths.data);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Create questions file path
    const today = new Date().toISOString().split('T')[0];
    const questionsFile = path.join(dataDir, `questions-${today}.json`);
    
    // Initialize questions array
    let questions = [];
    
    // Read existing questions if file exists
    if (fs.existsSync(questionsFile)) {
      const fileContent = fs.readFileSync(questionsFile, 'utf-8');
      questions = JSON.parse(fileContent);
    }
    
    // Check if we've reached the max questions limit
    if (questions.length >= config.ai.maxLoggedQuestionsPerDay) {
      return;
    }
    
    // Add new question
    questions.push({
      query,
      response,
      timestamp: new Date().toISOString()
    });
    
    // Write questions back to file
    fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));
  } catch (error) {
    logger.error({
      event: 'save_query_error',
      error: error.message,
      stack: error.stack
    });
  }
}

// Define API endpoints
app.post('/webhook/openai-assistant', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }
    
    const response = await generateAIResponse(text);
    res.json({ response });
  } catch (error) {
    logger.error({
      event: 'openai_webhook_error',
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to generate response',
      message: error.message
    });
  }
});

app.post('/webhook/forest-analysis', async (req, res) => {
  try {
    const { location } = req.body;
    
    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({ error: 'Missing or invalid location data' });
    }
    
    const analysis = await analyzeLocation(location);
    res.json({ analysis });
  } catch (error) {
    logger.error({
      event: 'forest_analysis_webhook_error',
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to analyze location',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = {
  /**
   * Start the AI service
   * 
   * @param {number} port - Port to listen on
   * @returns {Promise<void>}
   */
  start: (port) => {
    return new Promise((resolve, reject) => {
      try {
        server = app.listen(port, () => {
          logger.info(`AI service started on port ${port}`);
          resolve();
        });
      } catch (error) {
        logger.error({
          event: 'ai_service_start_error',
          error: error.message,
          stack: error.stack
        });
        
        reject(error);
      }
    });
  },
  
  /**
   * Stop the AI service
   * 
   * @returns {Promise<void>}
   */
  stop: () => {
    return new Promise((resolve, reject) => {
      if (!server) {
        resolve();
        return;
      }
      
      server.close((error) => {
        if (error) {
          logger.error({
            event: 'ai_service_stop_error',
            error: error.message,
            stack: error.stack
          });
          
          reject(error);
          return;
        }
        
        logger.info('AI service stopped');
        resolve();
      });
    });
  },
  
  // Export functions for direct use
  generateAIResponse,
  analyzeLocation
}; 