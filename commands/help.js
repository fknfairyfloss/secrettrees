/**
 * Help Command Handler
 * 
 * Handles the /help command which provides information about
 * available bot commands and functionality.
 */
const logger = require('../utils/logger');

/**
 * Handle the /help command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the help command
      logger.info({
        event: 'command_executed',
        command: '/help',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Create help message with available commands
      const helpMessage = `🌲 *Secret Trees Bot Commands* 🌲

Here are the commands you can use:

/start - Begin interaction with the bot and get an introduction
/forest - Learn about our reforestation projects around the world
/carbon - Information about our carbon credit programs
/faq - View frequently asked questions about our services
/about - Learn more about Secret Trees and our mission
/help - Show this help message

You can also:
• Send me a location to analyze forest data for that area
• Ask me questions about forests, climate change, or carbon offsets
• Use the menu buttons to navigate through options

Need more assistance? Contact our support team at support@secrettrees.org`;
      
      await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
      
      // Add a follow-up with quick access buttons
      setTimeout(async () => {
        // Create inline keyboard with common actions
        const helpOptions = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Forest Projects', callback_data: 'cmd_forest' },
                { text: 'Carbon Credits', callback_data: 'cmd_carbon' }
              ],
              [
                { text: 'FAQ', callback_data: 'cmd_faq' },
                { text: 'About Us', callback_data: 'cmd_about' }
              ]
            ]
          }
        };
        
        await bot.sendMessage(
          chatId, 
          'Quick access to common topics:', 
          helpOptions
        );
      }, 500);
    } catch (error) {
      logger.error({
        event: 'help_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 