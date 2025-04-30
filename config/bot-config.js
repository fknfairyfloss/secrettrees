/**
 * Bot Configuration
 * 
 * Main configuration file for the Secret Trees Telegram bot.
 * Contains all settings for the bot's behavior, AI service,
 * and path configurations.
 */
module.exports = {
  // Telegram bot configuration
  telegram: {
    // Bot token from BotFather (will be loaded from environment variable)
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    
    // Bot username (used for logging and mentions)
    username: '@treekeeper_bot',
    
    // Bot commands configuration
    commands: {
      start: {
        description: 'Start using the Secret Trees bot',
        response: 'Welcome to the Secret Trees bot! I can help you learn about our eco-tourism and carbon tokenization project. Try asking me a question about Secret Trees.'
      },
      help: {
        description: 'Show available commands',
        response: 'Here are the available commands:\n/start - Start using the bot\n/help - Show this help message\n/about - Learn about Secret Trees\n/carbon - Information about carbon credits'
      },
      about: {
        description: 'About Secret Trees project',
        response: 'Secret Trees is a regenerative forestry and eco-tourism project in Latvia. We combine sustainable tree houses, carbon sequestration, and blockchain technology to create a new model for ecological restoration and tourism.'
      },
      carbon: {
        description: 'Information about carbon credits',
        response: 'Our carbon credit system uses real-time data from IoT sensors and satellite imagery to accurately track carbon sequestration. This data is verified and tokenized to create verified carbon credit tokens that can be traded on exchanges.'
      }
    },
    
    // Bot webhook configuration (when using webhook mode)
    webhook: {
      url: process.env.WEBHOOK_URL || 'https://example.com/telegram-webhook',
      port: process.env.WEBHOOK_PORT || 3000,
      enabled: process.env.USE_WEBHOOK === 'true'
    }
  },
  
  // AI integration configuration
  ai: {
    enabled: true,
    apiKey: process.env.OPENAI_API_KEY || '',
    defaultModel: 'gpt-4', // OpenAI model to use
    systemPrompt: 'You are an assistant for the Secret Trees eco-tourism and carbon tokenization project in Latvia. Provide accurate, helpful information about regenerative forestry, sustainable tourism, carbon credits, and our project specifics.',
    temperature: 0.7,
    maxTokens: 500
  },
  
  // Obsidian integration configuration
  obsidian: {
    enabled: true,
    vaultPath: process.env.OBSIDIAN_VAULT_PATH || '../docs/markdown',
    indexFile: 'project-management-index.md',
    searchDepth: 3
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'bot.log',
    console: process.env.CONSOLE_LOGGING === 'true'
  },
  
  // n8n integration
  n8n: {
    baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
    apiKey: process.env.N8N_API_KEY || '',
    webhooks: {
      telegramBot: '/webhook/telegram-bot',
      knowledgeAssistant: '/webhook/knowledge-assistant',
      aiEndpoint: 'openai-assistant'
    }
  },
  
  // Bot response messages
  responses: {
    welcomeMessage: "👋 Welcome to the Secret Trees bot! I'm here to help you learn about reforestation, carbon credits, and our mission to combat climate change.",
    unknownCommand: "I don't recognize that command. Try /help to see available commands.",
    errorMessage: "Sorry, I encountered an error. Please try again later."
  },
  
  // Path configurations
  paths: {
    data: 'data',     // For storing FAQ and other data
    logs: 'logs',     // For log files
    pid: 'pid'        // For process ID files
  },
  
  // Rate limiting settings
  rateLimiting: {
    enabled: true,
    messagesPerMinute: 15,
    messageTimeWindow: 60000 // 1 minute in milliseconds
  },
  
  // Message logging settings
  logMessages: process.env.NODE_ENV !== 'production',
  
  // Forest analysis settings
  forestAnalysis: {
    enableLocationAnalysis: true,
    locationPrecision: 4 // Decimal places to round coordinates
  },
  
  // Carbon credit calculation settings
  carbonCalculator: {
    treeCO2PerYear: 22,       // kg of CO2 absorbed by average tree per year
    treeCostUSD: 3,           // Average cost to plant a tree in USD
    carbonPricePerTonUSD: 15  // Price per ton of carbon credits in USD
  }
}; 