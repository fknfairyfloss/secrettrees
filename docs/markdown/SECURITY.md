# Security Policy

## Security Model

Secret Trees implements a three-tier security model for all project content and system access:

### 1. Public Information
Content and features accessible to the general public, including:
- Public documentation in GitHub
- Public web interfaces
- Marketing materials
- Educational resources about carbon capture

### 2. Participant Information
Content and features accessible to confirmed participants (visitors, property partners):
- Property visit details
- Individual tree data
- Personal carbon impact calculations
- Telegram bot interactions

### 3. Administrative Information
Content and features restricted to project administrators:
- Property location details
- Financial information
- System credentials
- Complete carbon metrics
- Workflow configurations
- Administrative bot commands

## Sensitive Data Protection

### Property Data Protection
- Exact GPS coordinates of properties are never shared publicly
- Property owners' identities are protected unless explicit consent is given
- Public property references use general region names only
- Photos with identifying features are reviewed before publication

### User Data Protection
- All user data is handled in compliance with GDPR
- Personal data is stored only when necessary for carbon tracking
- User consent is required for all data collection
- Data deletion requests are honored within 30 days

## Technical Security Measures

### System Access
- All production systems use multi-factor authentication
- Access is granted on a need-to-know basis
- Regular access reviews are conducted
- Service account credentials are rotated quarterly

### Infrastructure Security
- n8n workflows run in secured environments
- Telegram bot uses secure API token handling
- All connections use TLS/SSL
- Regular security updates are applied to all systems

### Documentation Security
- Obsidian vault security tags control information classification
- Git repositories use branch protection
- Sensitive configuration is stored separately from code
- Credentials are never committed to version control

## Reporting Security Issues

If you discover a security vulnerability, please send a detailed report to:

**Email**: info@secrettrees.io

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggestions for mitigation

We are committed to responding to security reports within 48 hours and will work with reporters to address issues appropriately.

## Responsible Disclosure

We kindly ask that you:
- Allow us time to investigate and address issues before public disclosure
- Do not access or modify data of other users
- Act in good faith to avoid disruption to our services
- Do not use automated tools on our systems without permission

We will acknowledge your report within 48 hours and keep you informed of our progress. Security researchers who follow this policy will be publicly acknowledged for their contributions (unless they prefer to remain anonymous).