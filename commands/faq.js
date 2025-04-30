/**
 * FAQ Command Handler
 * 
 * Handles the /faq command which provides frequently asked questions
 * and answers about Secret Trees and its services.
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/bot-config');
const logger = require('../utils/logger');

/**
 * Sample FAQs if no dynamic FAQs are available
 */
const defaultFAQs = [
  {
    question: "How do carbon credits work?",
    answer: "Carbon credits represent the removal of 1 ton of CO₂ from the atmosphere. When you purchase our carbon credits, you invest in our verified reforestation projects that absorb CO₂ as trees grow. This allows you to offset your carbon footprint while supporting forest restoration."
  },
  {
    question: "How do you verify your reforestation projects?",
    answer: "All our reforestation projects are independently verified by third-party certification bodies. We use satellite monitoring, on-ground verification, and blockchain tracking to ensure transparency. Each project follows strict protocols for biodiversity, community involvement, and long-term forest management."
  },
  {
    question: "How many trees do I need to plant to offset my carbon footprint?",
    answer: "An average person in a developed country has a carbon footprint of about 10-20 tons of CO₂ per year. Since each tree absorbs approximately 22kg of CO₂ annually, offsetting your entire footprint would require planting 450-900 trees. However, even offsetting a portion makes a positive impact!"
  },
  {
    question: "Do you work with businesses for carbon offsetting?",
    answer: "Yes! We offer custom carbon offset programs for businesses of all sizes. Our corporate packages include detailed carbon footprint analysis, offset certificates, marketing materials, and employee engagement programs. Contact us at business@secrettrees.org for more information."
  },
  {
    question: "Where are your reforestation projects located?",
    answer: "We currently have active reforestation projects in Brazil (Amazon), Indonesia (Borneo), Scotland (Highlands), and Madagascar. We select locations based on biodiversity benefits, carbon sequestration potential, and opportunities to support local communities."
  }
];

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
  
  // Return default FAQs if file doesn't exist or there's an error
  return defaultFAQs;
}

/**
 * Handle the /faq command
 * 
 * @param {Object} bot - Telegram bot instance
 * @returns {Function} - Command handler function
 */
module.exports = (bot) => {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      // Log the FAQ command
      logger.info({
        event: 'command_executed',
        command: '/faq',
        userId: msg.from.id,
        chatId: chatId
      });
      
      // Load FAQs
      const faqs = loadFAQs();
      
      // Create FAQ overview message
      const faqOverviewMessage = `❓ *Frequently Asked Questions* ❓

Here are some common questions about Secret Trees and our services:

${faqs.map((faq, index) => `${index + 1}. ${faq.question}`).join('\n')}

Select a question number to see the answer, or ask me any other questions you have!`;
      
      await bot.sendMessage(chatId, faqOverviewMessage, { parse_mode: 'Markdown' });
      
      // Create inline keyboard with FAQ options
      const keyboardRows = [];
      
      // Create rows with 3 buttons each
      for (let i = 0; i < faqs.length; i += 2) {
        const row = [];
        
        row.push({
          text: `Question ${i + 1}`,
          callback_data: `faq_${i}`
        });
        
        if (i + 1 < faqs.length) {
          row.push({
            text: `Question ${i + 2}`,
            callback_data: `faq_${i + 1}`
          });
        }
        
        keyboardRows.push(row);
      }
      
      // Add "Ask a question" button at the bottom
      keyboardRows.push([{
        text: "Ask a Different Question",
        callback_data: "faq_ask"
      }]);
      
      // Send message with FAQ selection keyboard
      setTimeout(async () => {
        await bot.sendMessage(
          chatId,
          "Select a question to see the answer:",
          {
            reply_markup: {
              inline_keyboard: keyboardRows
            }
          }
        );
      }, 500);
    } catch (error) {
      logger.error({
        event: 'faq_command_error',
        error: error.message,
        stack: error.stack
      });
      
      bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request. Please try again later.');
    }
  };
}; 