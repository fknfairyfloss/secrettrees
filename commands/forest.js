/**
 * Forest Command Handler
 * 
 * Handles the /forest command which provides information about
 * Secret Trees' forest projects and reforestation efforts.
 */
const logger = require('../utils/logger');

/**
 * Handle the /forest command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the forest command
      logger.info({
        event: 'command_executed',
        command: '/forest',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Send forest projects information
      const forestMessage = `🌲 *Our Forest Projects* 🌲

Secret Trees is currently working on reforestation projects in the following regions:

🌍 *Amazon Rainforest, Brazil*
- 50,000 trees planted since 2021
- Focus on native species diversity
- Partnership with local indigenous communities

🌍 *Borneo, Indonesia*
- 35,000 trees planted since 2022
- Restoring orangutan habitats
- Combating illegal logging

🌍 *The Highlands, Scotland*
- 28,000 trees planted since 2021
- Restoring ancient Caledonian forest
- Creating wildlife corridors

🌍 *Madagascar Dry Forests*
- 42,000 trees planted since 2023
- Preserving endemic species
- Working with local farmers

Want to get involved with our projects? Send /carbon to learn about our carbon credit program!`;
      
      await bot.sendMessage(chatId, forestMessage, { parse_mode: 'Markdown' });
      
      // Add a follow-up with project selection options
      setTimeout(async () => {
        // Create inline keyboard with project options
        const projectOptions = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Amazon Project', callback_data: 'project_amazon' },
                { text: 'Borneo Project', callback_data: 'project_borneo' }
              ],
              [
                { text: 'Scotland Project', callback_data: 'project_scotland' },
                { text: 'Madagascar Project', callback_data: 'project_madagascar' }
              ],
              [
                { text: 'View All Projects Map', callback_data: 'project_map' }
              ]
            ]
          }
        };
        
        await bot.sendMessage(
          chatId, 
          'Select a project to learn more details:', 
          projectOptions
        );
      }, 500);
    } catch (error) {
      logger.error({
        event: 'forest_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 