/**
 * Carbon Command Handler
 * 
 * Handles the /carbon command which provides information about
 * carbon credits offered by Secret Trees.
 */
const config = require('../config/bot-config');
const logger = require('../utils/logger');

/**
 * Handle the /carbon command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the carbon command
      logger.info({
        event: 'command_executed',
        command: '/carbon',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Send carbon credits information
      const carbonMessage = `💨 *Carbon Credits with Secret Trees* 💨

Carbon credits allow individuals and businesses to offset their carbon footprint by investing in our reforestation projects.

📊 *How it works:*
1. We plant and maintain trees in verified reforestation projects
2. These trees absorb CO₂ from the atmosphere as they grow
3. Each tree absorbs approximately ${config.carbonCalculator.treeCO2PerYear}kg of CO₂ per year
4. Carbon credits are sold at $${config.carbonCalculator.carbonPricePerTonUSD} per ton of CO₂

🌱 *Our Credits are:*
- Third-party verified
- Traceable through our blockchain registry
- Supporting biodiversity and local communities
- Available for both individuals and businesses

💰 *Pricing Information:*
- Single tree: $${config.carbonCalculator.treeCostUSD} (plants one tree)
- Monthly offset: $10/month (plants 40 trees per year)
- Corporate packages: Custom pricing based on emissions

Use our calculator to determine how many credits you need to offset your carbon footprint!`;
      
      await bot.sendMessage(chatId, carbonMessage, { parse_mode: 'Markdown' });
      
      // Add a follow-up with calculator options
      setTimeout(async () => {
        // Create inline keyboard with calculator options
        const calculatorOptions = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Calculate My Footprint', callback_data: 'carbon_calculator' }
              ],
              [
                { text: 'Individual Offsets', callback_data: 'carbon_individual' },
                { text: 'Business Offsets', callback_data: 'carbon_business' }
              ],
              [
                { text: 'How Credits Work', callback_data: 'carbon_explanation' }
              ]
            ]
          }
        };
        
        await bot.sendMessage(
          chatId, 
          'What would you like to learn about next?', 
          calculatorOptions
        );
      }, 500);
    } catch (error) {
      logger.error({
        event: 'carbon_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 