# Secret Trees Telegram Bot

A Telegram bot for Secret Trees, a fictional organization focused on reforestation projects and carbon credits.

## Features

- 🌲 Information about reforestation projects worldwide
- 💨 Carbon credit purchasing and offsetting
- 🗺️ Location-based forest analysis
- ❓ FAQ system with AI-powered responses
- 🤖 Natural language conversation powered by Google's Gemini API

## Project Structure

```
Secret_Trees/
├── commands/           # Command handlers for the bot
├── config/             # Configuration files
├── services/           # Service modules (AI, etc.)
├── utils/              # Utility functions
├── data/               # Data storage (generated at runtime)
├── logs/               # Log files (generated at runtime)
├── bot.js              # Main bot file
├── package.json        # Project dependencies
└── .env                # Environment variables (create from .env.example)
```

## Prerequisites

- Node.js 18 or higher
- A Telegram Bot Token (from BotFather)
- Google Gemini API Key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/secret-trees-bot.git
   cd secret-trees-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your API keys:
   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   GEMINI_API_KEY=your_gemini_api_key
   ```

## Running the Bot

Start the bot in development mode:
```
npm run dev
```

Or in production:
```
npm start
```

## Available Commands

- `/start` - Introduction to the bot
- `/forest` - Information about reforestation projects
- `/carbon` - Carbon credit information and calculator
- `/faq` - Frequently asked questions
- `/about` - About Secret Trees
- `/help` - Help with using the bot

## Development

To add new commands, create a new file in the `commands/` directory. The filename should be the command name (without the slash).

## License

MIT
