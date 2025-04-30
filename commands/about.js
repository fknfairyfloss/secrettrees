/**
 * About Command Handler
 * 
 * Handles the /about command which provides information about
 * Secret Trees and its mission.
 */
const logger = require('../utils/logger');

/**
 * Handle the /about command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the about command
      logger.info({
        event: 'command_executed',
        command: '/about',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Send about information
      const aboutMessage = `🌍 *About Secret Trees* 🌍

Secret Trees is on a mission to combat climate change through global reforestation and providing accessible carbon offsets.

*Our Vision:*
A world where responsible carbon management is accessible to everyone, and forests are expanding rather than shrinking.

*Our Approach:*
1. *Verified Reforestation*: We plant diverse, native trees in ecosystems that need them most
2. *Community Partnership*: We work with local communities to ensure long-term forest health
3. *Transparent Carbon Credits*: We provide verifiable carbon credits to individuals and businesses
4. *Education*: We promote understanding of forests' role in climate stability

*Our Impact So Far:*
• 155,000+ trees planted across 4 continents
• 3,500+ tons of CO₂ sequestered annually
• 12 local communities supported with sustainable income
• 850+ hectares of forest restored

Founded in 2020, we're a team of 15 forest scientists, climate experts, and technologists committed to making meaningful climate action accessible to all.`;
      
      await bot.sendMessage(chatId, aboutMessage, { parse_mode: 'Markdown' });
      
      // Add a follow-up with team info and contact
      setTimeout(async () => {
        // Second message with contact info
        const contactMessage = `*Contact & Connect with Secret Trees:*

• Website: www.secrettrees.org
• Email: info@secrettrees.org
• Instagram: @SecretTreesOrg
• Twitter: @SecretTrees

Want to get involved? We're always looking for partners, volunteers, and supporters!`;
        
        await bot.sendMessage(chatId, contactMessage, { parse_mode: 'Markdown' });
      }, 500);
    } catch (error) {
      logger.error({
        event: 'about_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 