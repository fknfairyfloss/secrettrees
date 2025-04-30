/**
 * Start Command Handler
 * 
 * Handles the /start command which introduces users to the bot
 * and provides initial information about Secret Trees.
 */
const config = require('../config/bot-config');
const logger = require('../utils/logger');

/**
 * Handle the /start command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the start command
      logger.info({
        event: 'command_executed',
        command: '/start',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Create welcome message
      const welcomeMessage = `${config.responses.welcomeMessage}\n\n🌲 *Secret Trees* helps combat climate change through reforestation and carbon credits.`;
      
      // Create keyboard with main commands
      const keyboard = {
        reply_markup: {
          keyboard: [
            [{ text: '🌲 Forest Projects' }, { text: '💨 Carbon Credits' }],
            [{ text: '❓ FAQ' }, { text: '📍 Share Location' }]
          ],
          resize_keyboard: true
        }
      };
      
      // Send welcome message with keyboard
      await bot.sendMessage(chatId, welcomeMessage, { 
        parse_mode: 'Markdown',
        ...keyboard
      });
      
      // Send follow-up message with command options
      setTimeout(async () => {
        const commandsMessage = `You can interact with me using these commands:

/forest - Learn about our forest projects
/carbon - Information about carbon credits
/faq - View frequently asked questions
/about - Learn about Secret Trees
/help - Show this help message

Or just chat with me directly to ask about forests, carbon credits, or climate change!`;
        
        await bot.sendMessage(chatId, commandsMessage);
      }, 1000);
    } catch (error) {
      logger.error({
        event: 'start_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 