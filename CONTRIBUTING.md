# Contributing to Madheshwaran's Personal AI Portfolio

Thank you for your interest in contributing!
This project is open to improvements and suggestions.

## Getting Started

1. Fork the repository
2. Clone your fork:
   git clone https://github.com/YOUR_USERNAME/personal-ai-react.git

3. Install dependencies:
   npm install

4. Start development server:
   npm run dev

5. Run tests:
   npm run test:ci

## Project Structure

src/
  components/   — React UI components
  pages/        — Route pages
  hooks/        — Custom React hooks
  stores/       — Zustand state stores
  services/     — API calls
  utils/        — Helper functions
  data/         — Profile data and types
  __tests__/    — Test files

## Development Guidelines

Code Style:
- Use TypeScript for all new files
- Follow existing naming conventions
- Keep components small and focused
- Write tests for new utilities

Commits:
- Use clear commit messages
- Format: type: description
- Examples:
  feat: add dark mode toggle
  fix: resolve chat scroll bug
  docs: update README
  test: add Message component tests
  refactor: simplify ChatWindow logic

Branch Naming:
- feature/your-feature-name
- fix/bug-description
- docs/what-you-updated

## Pull Request Process

1. Create a branch from main
2. Make your changes
3. Run tests: npm run test:ci
4. Run build: npm run build
5. Update README if needed
6. Submit pull request with clear description

## Types of Contributions Welcome

- Bug fixes
- Performance improvements
- Accessibility improvements
- Test coverage improvements
- Documentation improvements
- New suggestion chips for chat
- Profile data improvements

## What NOT to Change

- Core AI personality in profile.js
- Personal information (name, email, projects)
- Deployment configuration without discussion

## Running Tests

npm run test:ci

All tests must pass before PR is accepted.

## Questions?

Open a GitHub issue or email:
madheshwaran402@gmail.com