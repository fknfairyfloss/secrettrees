/**
 * Callback Handlers
 * 
 * Provides handlers for callback queries from inline buttons
 * and manages routing of different callback types.
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/bot-config');
const logger = require('./logger');

/**
 * Setup callback query handlers for the bot
 * 
 * @param {Object} bot - Telegram bot instance
 */
function setupCallbackHandlers(bot) {
  bot.on('callback_query', async (callbackQuery) => {
    try {
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const data = callbackQuery.data;
      
      // Log callback query
      logger.info({
        event: 'callback_query',
        data: data,
        userId: callbackQuery.from.id,
        chatId: chatId
      });
      
      // Answer callback query to stop loading animation
      await bot.answerCallbackQuery(callbackQuery.id);
      
      // Route callback queries based on prefix
      if (data.startsWith('project_')) {
        await handleProjectCallback(bot, chatId, messageId, data);
      } else if (data.startsWith('carbon_')) {
        await handleCarbonCallback(bot, chatId, messageId, data);
      } else if (data.startsWith('faq_')) {
        await handleFaqCallback(bot, chatId, messageId, data);
      } else if (data.startsWith('cmd_')) {
        await handleCommandCallback(bot, chatId, data);
      } else {
        // Unknown callback type
        logger.warn({
          event: 'unknown_callback',
          data: data,
          userId: callbackQuery.from.id
        });
        
        await bot.sendMessage(chatId, 'This feature is not yet implemented. Please try again later.');
      }
    } catch (error) {
      logger.error({
        event: 'callback_handler_error',
        error: error.message,
        stack: error.stack,
        data: callbackQuery.data
      });
      
      // Send error message
      try {
        await bot.sendMessage(
          callbackQuery.message.chat.id,
          'Sorry, I encountered an error while processing your request. Please try again later.'
        );
      } catch (sendError) {
        logger.error({
          event: 'callback_error_message_failed',
          error: sendError.message
        });
      }
    }
  });
}

/**
 * Handle project-related callbacks
 * 
 * @param {Object} bot - Telegram bot instance
 * @param {number} chatId - Chat ID
 * @param {number} messageId - Message ID
 * @param {string} data - Callback data
 */
async function handleProjectCallback(bot, chatId, messageId, data) {
  // Extract project ID from callback data
  const projectId = data.replace('project_', '');
  
  // Define project information
  const projects = {
    amazon: {
      title: '🌴 Amazon Rainforest Project',
      description: `Our Amazon project focuses on reforesting areas affected by deforestation in the Brazilian Amazon.
      
*Key Details:*
• Location: Pará State, Brazil
• Trees Planted: 50,000+
• Area: 240 hectares
• Started: 2021
• Key Species: Brazil nut, Açaí palm, Ipe, Andiroba
      
We work closely with indigenous communities who act as forest guardians. This project not only sequesters carbon but also creates sustainable income for local people through agroforestry.`,
      image: 'https://example.com/images/amazon.jpg'
    },
    borneo: {
      title: '🌴 Borneo Rainforest Project',
      description: `Our Borneo project focuses on restoring areas affected by palm oil plantations and logging.
      
*Key Details:*
• Location: East Kalimantan, Indonesia
• Trees Planted: 35,000+
• Area: 180 hectares
• Started: 2022
• Key Species: Dipterocarp species, Ironwood, Ramin, Wild fruit trees
      
This project focuses on creating corridor forests to connect fragmented orangutan habitats. We partner with local communities to monitor and maintain the forests.`,
      image: 'https://example.com/images/borneo.jpg'
    },
    scotland: {
      title: '🌲 Scottish Highlands Project',
      description: `Our Scotland project aims to restore the ancient Caledonian forest that once covered the Highlands.
      
*Key Details:*
• Location: Cairngorms National Park, Scotland
• Trees Planted: 28,000+
• Area: 95 hectares
• Started: 2021
• Key Species: Scots pine, birch, rowan, juniper, oak
      
This project focuses on creating wildlife corridors and restoring native woodland. The restored forest will provide habitat for threatened species like the Scottish wildcat, pine marten, and capercaillie.`,
      image: 'https://example.com/images/scotland.jpg'
    },
    madagascar: {
      title: '🌴 Madagascar Dry Forest Project',
      description: `Our Madagascar project focuses on restoring unique dry forest ecosystems.
      
*Key Details:*
• Location: Western Madagascar
• Trees Planted: 42,000+
• Area: 210 hectares
• Started: 2023
• Key Species: Baobab, Alluaudia, Pachypodium, Commiphora
      
Madagascar has lost over 90% of its original forest cover. Our project works with local farmers to establish sustainable agroforestry systems while restoring native dry forest habitat for endangered lemurs and other endemic species.`,
      image: 'https://example.com/images/madagascar.jpg'
    },
    map: {
      title: '🗺️ Global Project Map',
      description: `Secret Trees currently operates reforestation projects in 4 major regions:
      
1. 🌴 *Amazon Rainforest* (Brazil)
2. 🌴 *Borneo Rainforest* (Indonesia)
3. 🌲 *Scottish Highlands* (UK)
4. 🌴 *Dry Forests* (Madagascar)
      
We select project sites based on:
• Biodiversity impact
• Carbon sequestration potential
• Community involvement opportunities
• Protection of threatened ecosystems
      
All our projects are verified by third-party certification bodies and adhere to international standards for forest carbon projects.`,
      image: 'https://example.com/images/project-map.jpg'
    }
  };
  
  // Check if project exists
  if (projects[projectId]) {
    const project = projects[projectId];
    
    // Send project information
    await bot.sendMessage(
      chatId,
      `*${project.title}*\n\n${project.description}`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Back to Projects', callback_data: 'cmd_forest' },
              { text: 'Support This Project', callback_data: `support_${projectId}` }
            ]
          ]
        }
      }
    );
  } else {
    await bot.sendMessage(
      chatId,
      'Project information not found. Please try another option.',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'View All Projects', callback_data: 'cmd_forest' }]
          ]
        }
      }
    );
  }
}

/**
 * Handle carbon-related callbacks
 * 
 * @param {Object} bot - Telegram bot instance
 * @param {number} chatId - Chat ID
 * @param {number} messageId - Message ID
 * @param {string} data - Callback data
 */
async function handleCarbonCallback(bot, chatId, messageId, data) {
  // Extract carbon action from callback data
  const action = data.replace('carbon_', '');
  
  switch (action) {
    case 'calculator':
      await bot.sendMessage(
        chatId,
        `*Carbon Footprint Calculator*
        
To calculate your carbon footprint, I'll need some information about your lifestyle. What would you like to calculate?`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Personal Footprint', callback_data: 'carbon_calc_personal' },
                { text: 'Business Footprint', callback_data: 'carbon_calc_business' }
              ],
              [
                { text: 'Flight Emissions', callback_data: 'carbon_calc_flight' },
                { text: 'Vehicle Emissions', callback_data: 'carbon_calc_vehicle' }
              ],
              [
                { text: 'Back to Carbon Info', callback_data: 'cmd_carbon' }
              ]
            ]
          }
        }
      );
      break;
      
    case 'individual':
      await bot.sendMessage(
        chatId,
        `*Individual Carbon Offsets*
        
Our individual carbon offset options help you take personal climate action:

*Monthly Subscription Plans:*
• Basic: $5/month (plants 20 trees/year, offsets ~0.4 tons CO₂)
• Standard: $10/month (plants 40 trees/year, offsets ~0.9 tons CO₂)
• Premium: $25/month (plants 100 trees/year, offsets ~2.2 tons CO₂)

*One-Time Purchases:*
• Single Tree: $${config.carbonCalculator.treeCostUSD} (offsets ~${config.carbonCalculator.treeCO2PerYear}kg CO₂/year)
• Family Pack: $100 (plants 40 trees, offsets ~0.9 tons CO₂)
• Annual Offset: $250 (plants 100 trees, offsets ~2.2 tons CO₂)

All plans include:
• Tree planting certificate
• GPS coordinates of your trees
• Regular project updates
• Impact dashboard access`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Subscribe Now', url: 'https://www.secrettrees.org/subscribe' },
                { text: 'One-Time Offset', url: 'https://www.secrettrees.org/offset' }
              ],
              [
                { text: 'Back to Carbon Info', callback_data: 'cmd_carbon' }
              ]
            ]
          }
        }
      );
      break;
      
    case 'business':
      await bot.sendMessage(
        chatId,
        `*Business Carbon Offsets*
        
Our business carbon offset programs help companies reduce their environmental impact:

*Business Plans:*
• Startup: $500/year (offsets 30 tons CO₂)
• SME: $2,000/year (offsets 130 tons CO₂)
• Corporate: Custom pricing based on emissions assessment

*All business plans include:*
• Detailed carbon footprint analysis
• Customized offset portfolio across our projects
• Marketing materials for sustainability communications
• Employee engagement program
• Annual impact report
• Verification certificates

Contact our business team at business@secrettrees.org to get started with a carbon assessment.`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Contact Business Team', url: 'https://www.secrettrees.org/business' }
              ],
              [
                { text: 'Back to Carbon Info', callback_data: 'cmd_carbon' }
              ]
            ]
          }
        }
      );
      break;
      
    case 'explanation':
      await bot.sendMessage(
        chatId,
        `*How Carbon Credits Work*
        
Carbon credits represent the removal of 1 ton of CO₂ from the atmosphere:

1️⃣ *Measurement*: We calculate how much carbon our forest projects sequester using scientific methodologies

2️⃣ *Verification*: Independent third parties verify our calculations and project implementation

3️⃣ *Registration*: Credits are registered in carbon registries with unique serial numbers

4️⃣ *Purchase*: When you buy credits, you're financing the removal of CO₂ through our reforestation work

5️⃣ *Retirement*: Credits can only be used once to offset emissions, then they're permanently retired

Our projects follow the Gold Standard or Verified Carbon Standard (VCS) methodologies, ensuring high-quality carbon sequestration with additional biodiversity and community benefits.`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Learn More', url: 'https://www.secrettrees.org/carbon-credits' }
              ],
              [
                { text: 'Back to Carbon Info', callback_data: 'cmd_carbon' }
              ]
            ]
          }
        }
      );
      break;
      
    default:
      await bot.sendMessage(
        chatId,
        'This carbon feature is still under development. Please check back later!',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Back to Carbon Info', callback_data: 'cmd_carbon' }]
            ]
          }
        }
      );
  }
}

/**
 * Handle FAQ-related callbacks
 * 
 * @param {Object} bot - Telegram bot instance
 * @param {number} chatId - Chat ID
 * @param {number} messageId - Message ID
 * @param {string} data - Callback data
 */
async function handleFaqCallback(bot, chatId, messageId, data) {
  // Check if this is the "ask" button
  if (data === 'faq_ask') {
    await bot.sendMessage(
      chatId,
      'What question would you like to ask about Secret Trees, reforestation, or carbon credits?'
    );
    return;
  }
  
  // Get FAQ index from callback data
  const faqIndex = parseInt(data.replace('faq_', ''));
  
  try {
    // Load FAQs
    const faqs = loadFAQs();
    
    // Check if FAQ exists
    if (faqs[faqIndex]) {
      const faq = faqs[faqIndex];
      
      // Send FAQ answer
      await bot.sendMessage(
        chatId,
        `*Q: ${faq.question}*\n\n${faq.answer}`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Back to FAQs', callback_data: 'cmd_faq' }]
            ]
          }
        }
      );
    } else {
      await bot.sendMessage(
        chatId,
        'FAQ not found. Please select another question.',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'View All FAQs', callback_data: 'cmd_faq' }]
            ]
          }
        }
      );
    }
  } catch (error) {
    logger.error({
      event: 'faq_callback_error',
      error: error.message,
      stack: error.stack
    });
    
    await bot.sendMessage(
      chatId,
      'Sorry, I encountered an error retrieving the FAQ. Please try again later.'
    );
  }
}

/**
 * Handle command shortcuts from callbacks
 * 
 * @param {Object} bot - Telegram bot instance
 * @param {number} chatId - Chat ID
 * @param {string} data - Callback data
 */
async function handleCommandCallback(bot, chatId, data) {
  // Extract command from callback data
  const command = data.replace('cmd_', '');
  
  // Simulate command execution based on command files
  const commandHandlers = {
    start: require('../commands/start')(bot),
    help: require('../commands/help')(bot),
    about: require('../commands/about')(bot),
    forest: require('../commands/forest')(bot),
    carbon: require('../commands/carbon')(bot),
    faq: require('../commands/faq')(bot)
  };
  
  // Check if command handler exists
  if (commandHandlers[command]) {
    // Create a simulated message object
    const simulatedMsg = {
      chat: { id: chatId },
      from: { id: 0 } // Unknown user ID for analytics
    };
    
    // Call the command handler
    await commandHandlers[command](simulatedMsg);
  } else {
    await bot.sendMessage(
      chatId,
      `Sorry, the /${command} command is not available.`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Help', callback_data: 'cmd_help' }]
          ]
        }
      }
    );
  }
}

/**
 * Load FAQs from file or use defaults
 * 
 * @returns {Array} - Array of FAQ objects
 */
function loadFAQs() {
  try {
    const dataDir = path.join(__dirname, '..', config.paths.data);
    const faqPath = path.join(dataDir, 'faqs.json');
    
    if (fs.existsSync(faqPath)) {
      const faqData = fs.readFileSync(faqPath, 'utf-8');
      return JSON.parse(faqData);
    }
  } catch (error) {
    logger.error({
      event: 'faq_load_error',
      error: error.message,
      stack: error.stack
    });
  }
  
  // Return default FAQs from the FAQ command
  return require('../commands/faq').defaultFAQs || [];
}

module.exports = {
  setupCallbackHandlers
}; 