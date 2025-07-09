# Tech Stack

## Core Technologies

### Frontend Framework
**Next.js 15.2.3**
- React-based full-stack framework with App Router
- Server-side rendering and static site generation capabilities
- Built-in optimization for performance and SEO
- File-based routing system in `app/` directory

**React 19.0.0**
- Modern functional components with hooks
- Concurrent features for improved performance
- Automatic batching and suspense integration
- Component-based architecture for reusability

### Backend & Database
**Convex 1.23.0**
- All-in-one backend platform providing:
  - Real-time document database
  - Serverless functions (queries and mutations)
  - Authentication system
  - File storage capabilities
  - Scheduled functions for automation

**Convex Auth (@convex-dev/auth 0.0.81)**
- Integrated authentication solution
- Email/password authentication
- Session management and user state
- Seamless integration with Convex database

### UI & Styling
**Tailwind CSS 4.0**
- Utility-first CSS framework
- Responsive design system
- Dark/light mode support
- Custom design tokens and theming

**Shadcn UI**
- Component library built on Radix UI primitives
- Accessible, customizable React components
- Consistent design language across the application
- Components: Button, Input, Card, Dialog, Badge, etc.

**Radix UI**
- Low-level UI primitives for accessibility
- Unstyled, accessible components
- Keyboard navigation and screen reader support
- Foundation for Shadcn UI components

**Lucide React 0.525.0**
- Modern icon library with React components
- Consistent icon design system
- Tree-shakable for optimal bundle size
- Used throughout the UI for visual elements

### Development Tools
**TypeScript 5.x**
- Static type checking for JavaScript
- Enhanced developer experience with IntelliSense
- Compile-time error detection
- Auto-generated types from Convex schema

**ESLint 9.x**
- Code quality and consistency enforcement
- Next.js specific linting rules
- Custom configuration for project standards
- Integration with development workflow

**Prettier 3.5.3**
- Code formatting and style consistency
- Automatic formatting on save
- Consistent code style across team
- Integration with editor and CI/CD

### Build & Development
**npm-run-all 4.1.5**
- Parallel execution of development scripts
- Runs Next.js and Convex servers simultaneously
- Streamlined development workflow
- Cross-platform script execution

**PostCSS & Tailwind**
- CSS processing and optimization
- Tailwind CSS compilation
- Autoprefixer for browser compatibility
- CSS minification for production

### Form Handling
**React Hook Form 7.60.0**
- Performant form library with minimal re-renders
- Built-in validation and error handling
- TypeScript integration for type-safe forms
- Used in bookmark creation and editing

**Zod 3.25.76**
- TypeScript-first schema validation
- Runtime type checking and validation
- Integration with React Hook Form
- Consistent validation across frontend and backend

**Hookform Resolvers 5.1.1**
- Bridge between React Hook Form and validation libraries
- Zod integration for form validation
- Type-safe form handling
- Error message management

### Utility Libraries
**clsx 2.1.1**
- Utility for constructing className strings conditionally
- Clean conditional styling in React components
- TypeScript support for better DX
- Lightweight alternative to classnames

**tailwind-merge 3.3.1**
- Utility for merging Tailwind CSS classes
- Resolves conflicting utility classes
- Optimizes final CSS output
- Essential for component composition

**class-variance-authority 0.7.1**
- Utility for creating variant-based component APIs
- Type-safe component variants
- Consistent component styling patterns
- Used in Shadcn UI component system

### Development Dependencies
**@types packages**
- TypeScript type definitions for Node.js, React, and React DOM
- Enhanced development experience with accurate types
- IntelliSense and error detection in IDEs
- Version compatibility with runtime packages

**dotenv 16.4.7**
- Environment variable management
- Secure configuration for development and production
- API keys and sensitive data handling
- Cross-environment configuration

## Planned Technologies

### Browser Automation
**Playwright** (Future Implementation)
- Headless browser automation for web scraping
- Metadata extraction from bookmarked URLs
- Screenshot capture for visual previews
- Link validation and health checking

### AI Integration
**Google Gemini API** (Future Implementation)
- AI-powered content discovery and recommendations
- Natural language processing for bookmark analysis
- Personalized content suggestions
- Smart categorization and tagging

### Animation Libraries
**Animate.css & Anime.js** (Future Implementation)
- CSS-based animations for micro-interactions
- JavaScript animation library for complex sequences
- Enhanced user experience with smooth transitions
- Loading states and feedback animations

## Architecture Decisions

### Why Convex?
- **Real-time by default**: Automatic data synchronization
- **Serverless simplicity**: No infrastructure management
- **Type safety**: End-to-end TypeScript integration
- **Developer experience**: Integrated development tools

### Why Next.js App Router?
- **Modern React patterns**: Server and client components
- **Performance optimization**: Built-in caching and optimization
- **Developer experience**: File-based routing and conventions
- **Production ready**: Vercel deployment optimization

### Why Shadcn UI?
- **Accessibility first**: Built on Radix UI primitives
- **Customizable**: Copy-paste components, not npm packages
- **Consistent design**: Unified design system
- **Developer friendly**: TypeScript support and documentation

### Why Tailwind CSS?
- **Utility-first approach**: Rapid UI development
- **Responsive design**: Mobile-first responsive utilities
- **Customization**: Design system integration
- **Performance**: Purged CSS for optimal bundle size

## Development Workflow

### Local Development
```bash
npm run dev          # Start both frontend and backend
npm run dev:frontend # Next.js development server
npm run dev:backend  # Convex development server
```

### Code Quality
```bash
npm run lint         # ESLint code quality checks
npm run build        # Production build verification
```

### Environment Setup
- Node.js runtime for development and build processes
- Convex CLI for backend function management
- Git for version control and collaboration
- VS Code recommended for optimal TypeScript experience
