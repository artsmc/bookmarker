# Tech Context

## Core Technologies

### Frontend Stack
*   **Next.js 15.2.3**: React framework with App Router for modern web applications
    - Server-side rendering and static site generation
    - Built-in optimization for performance and SEO
    - File-based routing system in `app/` directory
    - Automatic code splitting and lazy loading

*   **React 19.0.0**: Modern functional components with hooks
    - Concurrent features for improved performance
    - Automatic batching and suspense integration
    - Component-based architecture for reusability
    - Hooks-based state management

*   **TypeScript 5.x**: Static type checking for enhanced developer experience
    - Compile-time error detection
    - Auto-generated types from Convex schema
    - IntelliSense support in development
    - End-to-end type safety

### Backend & Database
*   **Convex 1.23.0**: All-in-one backend platform
    - Real-time document database with automatic subscriptions
    - Serverless functions (queries and mutations)
    - Integrated authentication system
    - File storage capabilities
    - Scheduled functions for automation
    - Built-in caching and optimization

*   **Convex Auth (@convex-dev/auth 0.0.81)**: Authentication solution
    - Email/password authentication
    - Session management and user state
    - Seamless integration with Convex database
    - Secure token handling

### UI & Styling
*   **Tailwind CSS 4.0**: Utility-first CSS framework
    - Responsive design system with mobile-first approach
    - Dark/light mode support
    - Custom design tokens and theming
    - Automatic CSS purging for optimal bundle size

*   **Shadcn UI**: Component library built on Radix UI primitives
    - Accessible, customizable React components
    - Consistent design language across application
    - Copy-paste components, not npm dependencies
    - TypeScript support with proper type definitions

*   **Radix UI**: Low-level UI primitives
    - Unstyled, accessible components
    - Keyboard navigation and screen reader support
    - WAI-ARIA compliant implementations
    - Foundation for Shadcn UI components

*   **Lucide React 0.525.0**: Modern icon library
    - Consistent icon design system
    - Tree-shakable for optimal bundle size
    - React component integration
    - Extensive icon collection

### Form Handling & Validation
*   **React Hook Form 7.60.0**: Performant form library
    - Minimal re-renders for optimal performance
    - Built-in validation and error handling
    - TypeScript integration for type-safe forms
    - Uncontrolled components for better performance

*   **Zod 3.25.76**: TypeScript-first schema validation
    - Runtime type checking and validation
    - Integration with React Hook Form
    - Consistent validation across frontend and backend
    - Excellent TypeScript inference

*   **Hookform Resolvers 5.1.1**: Bridge between form libraries
    - Zod integration for form validation
    - Type-safe form handling
    - Error message management
    - Seamless validation workflow

### Development Tools
*   **ESLint 9.x**: Code quality and consistency enforcement
    - Next.js specific linting rules
    - Custom configuration for project standards
    - Integration with development workflow
    - Automatic code quality checks

*   **Prettier 3.5.3**: Code formatting and style consistency
    - Automatic formatting on save
    - Consistent code style across team
    - Integration with editor and CI/CD
    - Configurable formatting rules

*   **npm-run-all 4.1.5**: Parallel script execution
    - Runs Next.js and Convex servers simultaneously
    - Streamlined development workflow
    - Cross-platform script execution
    - Simplified development commands

### Utility Libraries
*   **clsx 2.1.1**: Conditional className construction
    - Clean conditional styling in React components
    - TypeScript support for better developer experience
    - Lightweight alternative to classnames
    - Optimized for performance

*   **tailwind-merge 3.3.1**: Tailwind CSS class merging
    - Resolves conflicting utility classes
    - Optimizes final CSS output
    - Essential for component composition
    - Intelligent class conflict resolution

*   **class-variance-authority 0.7.1**: Variant-based component APIs
    - Type-safe component variants
    - Consistent component styling patterns
    - Used in Shadcn UI component system
    - Excellent TypeScript integration

## Development Setup

### Required Environment
*   **Node.js**: Latest LTS version for running development servers
*   **npm**: Package manager for dependency management
*   **Git**: Version control for collaboration and deployment
*   **VS Code**: Recommended editor for optimal TypeScript experience

### Development Commands
```bash
npm run dev          # Start both frontend and backend servers
npm run dev:frontend # Next.js development server only
npm run dev:backend  # Convex development server only
npm run build        # Production build verification
npm run lint         # ESLint code quality checks
```

### Environment Configuration
*   **Environment Variables**: Managed via `.env.local` for development
*   **Convex Configuration**: Project settings in `convex.json`
*   **TypeScript Configuration**: Optimized `tsconfig.json` for Next.js and Convex
*   **ESLint Configuration**: Custom rules in `eslint.config.mjs`

## Dependencies Management

### Production Dependencies
All production dependencies are carefully selected for:
- **Performance**: Minimal bundle size impact
- **Reliability**: Well-maintained packages with active communities
- **Type Safety**: Full TypeScript support
- **Security**: Regular security updates and vulnerability monitoring

### Development Dependencies
Development tools focus on:
- **Developer Experience**: Fast feedback loops and helpful tooling
- **Code Quality**: Automated formatting and linting
- **Type Safety**: Enhanced TypeScript integration
- **Build Optimization**: Efficient development and production builds

## Tool Usage Patterns

### Convex Development Workflow
1. **Schema Definition**: Define database structure in `schema.ts`
2. **Function Development**: Create queries and mutations in TypeScript
3. **Type Generation**: Convex automatically generates TypeScript types
4. **Real-time Testing**: Changes reflect immediately in development
5. **Dashboard Monitoring**: Use Convex dashboard for debugging

### Next.js Development Workflow
1. **Component Development**: Create React components in `components/`
2. **Page Creation**: Use App Router file-based routing
3. **Styling**: Apply Tailwind CSS utilities and Shadcn components
4. **Type Safety**: Leverage auto-generated Convex types
5. **Hot Reloading**: Instant feedback during development

### Form Development Pattern
1. **Schema Definition**: Create Zod validation schemas
2. **Form Setup**: Initialize React Hook Form with resolver
3. **Component Integration**: Connect form to Shadcn UI components
4. **Validation**: Real-time validation with error display
5. **Submission**: Type-safe form submission to Convex mutations

## Performance Considerations

### Bundle Optimization
*   **Tree Shaking**: Automatic removal of unused code
*   **Code Splitting**: Automatic route-based code splitting
*   **Image Optimization**: Next.js automatic image optimization
*   **CSS Optimization**: Tailwind CSS purging removes unused styles

### Runtime Performance
*   **React Optimization**: Minimal re-renders via proper component design
*   **Database Optimization**: Efficient queries with proper indexing
*   **Caching**: Convex automatic caching and subscription management
*   **Real-time Updates**: Eliminate unnecessary polling and refetching

## Security Considerations

### Authentication Security
*   **Secure Sessions**: HTTPOnly cookies with secure flags
*   **Password Security**: Proper hashing via Convex Auth
*   **CSRF Protection**: Built-in protection via Convex
*   **Token Management**: Secure token storage and rotation

### Data Security
*   **Input Validation**: Schema-level validation prevents injection
*   **Authorization**: Consistent user ownership verification
*   **Secure Defaults**: Principle of least privilege throughout
*   **Environment Security**: Secure handling of environment variables

## Future Technology Integration

### Planned Additions
*   **Playwright**: Browser automation for web scraping and testing
    - Metadata extraction from bookmarked URLs
    - Screenshot capture for visual previews
    - Link validation and health checking
    - End-to-end testing automation

*   **Google Gemini API**: AI-powered content discovery
    - Natural language processing for bookmark analysis
    - Personalized content recommendations
    - Smart categorization and tagging
    - Content similarity analysis

*   **Animation Libraries**: Enhanced user experience
    - **Animate.css**: CSS-based animations for micro-interactions
    - **Anime.js**: JavaScript animation library for complex sequences
    - Loading states and feedback animations
    - Smooth transitions and visual feedback

### Technology Evaluation Criteria
When considering new technologies:
1. **TypeScript Support**: Must have excellent TypeScript integration
2. **Bundle Size Impact**: Minimal impact on application bundle size
3. **Maintenance**: Active community and regular updates
4. **Integration**: Seamless integration with existing stack
5. **Performance**: No negative impact on application performance
