# Contributing to Secret Trees

Thank you for your interest in contributing to the Secret Trees project! This guide will help you understand how to contribute to our documentation and technical infrastructure.

## Development Environment

### Prerequisites
- Node.js (v16+)
- n8n for workflow automation
- Obsidian for documentation editing
- Git for version control

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/secretrees/secretrees.git
   cd secretrees
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up local environment:
   ```bash
   cp config/sample-config.js config/bot-config.js
   # Edit bot-config.js with your development credentials
   ```

## Project Structure

- `/docs/markdown/` - Project documentation
- `/src/` - Application source code
- `/workflows/` - n8n workflow export files
- `/config/` - Configuration templates (do not commit actual credentials)

## Documentation Guidelines

1. **Use Markdown**: All documentation should be written in Markdown
2. **Security Frontmatter**: Always include security level in frontmatter:
   ```markdown
   ---
   security: public
   tags: your, relevant, tags
   created: YYYY-MM-DD
   ---
   ```
3. **Mermaid Diagrams**: Use Mermaid for flowcharts and diagrams
4. **Obsidian Compatibility**: Ensure documentation works in Obsidian with proper links

## Workflow Development

When contributing to n8n workflows:

1. Export your workflow from n8n
2. Remove any sensitive credentials
3. Place in the `/workflows/` directory
4. Document usage in corresponding markdown files

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure documentation is updated
4. Submit a pull request with clear description
5. Await review from maintainers

## Security Considerations

- Never commit secrets, tokens, or credentials
- Be careful about property details in public documentation
- Use the three-tier security model for all content
- See our security model in the architecture documentation

## Code of Conduct

- Be respectful and inclusive
- Focus on environmental impact
- Maintain transparency in all carbon metrics
- Prioritize education and sustainability in all features

Thank you for contributing to a more sustainable future through technology!

## Contact

If you have questions about contributing, please contact:
- Developer Team: dev@secrettrees.io 