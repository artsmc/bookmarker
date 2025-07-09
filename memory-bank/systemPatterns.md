# System Patterns

## System Architecture

The Bookmarker application follows a modern, serverless architecture with clear separation of concerns between frontend and backend, leveraging Convex's real-time capabilities for optimal user experience.

### Architecture Overview
*   **Frontend**: Next.js 15 with App Router handles UI rendering and client-side interactions
*   **Backend**: Convex provides real-time database, serverless functions, and authentication
*   **Real-time Sync**: Automatic data synchronization eliminates manual refresh requirements
*   **Type Safety**: End-to-end TypeScript integration with auto-generated types

### Data Flow Pattern
```
User Action → React Component → Convex Client → Convex Function → Database → Real-time Update → UI Refresh
```

## Key Technical Decisions

### Serverless-First Architecture
*   **Convex Backend**: Eliminates traditional server provisioning and management
*   **Automatic Scaling**: Handles traffic spikes without manual intervention
*   **Real-time by Default**: All data operations include automatic subscriptions
*   **Integrated Authentication**: Convex Auth provides seamless user management

### Component-Based Frontend
*   **React Functional Components**: Modern hooks-based architecture
*   **Shadcn UI Integration**: Accessible, customizable component library
*   **Responsive Design**: Mobile-first approach with Tailwind CSS utilities
*   **Self-Contained Components**: BookmarkerDashboard manages its own state and operations

### Database Design Patterns
*   **Document-Based Storage**: Convex's NoSQL approach with schema validation
*   **Strategic Indexing**: Optimized queries with `by_userId`, `by_status`, and composite indexes
*   **User Data Isolation**: All operations scoped to authenticated user
*   **Flexible Schema**: Extensible design supporting future feature additions

## Component Relationships

### Frontend Component Hierarchy
```
App Layout (app/layout.tsx)
├── Authentication Provider (ConvexClientProvider)
├── Main Page (app/page.tsx)
│   ├── Header with Sign Out
│   └── BookmarkerDashboard
│       ├── Search Interface
│       ├── Add Bookmark Dialog
│       └── Bookmark Grid
│           └── Bookmark Cards
└── Sign In Page (app/signin/page.tsx)
```

### Backend Function Organization
```
Convex Functions
├── Authentication (auth.ts, auth.config.ts)
├── Bookmark Operations (bookmarks.ts)
│   ├── getUserBookmarks (Query)
│   ├── searchBookmarks (Query)
│   ├── addBookmark (Mutation)
│   ├── updateBookmark (Mutation)
│   └── deleteBookmark (Mutation)
└── Database Schema (schema.ts)
    ├── User Tables (from authTables)
    └── Bookmarks Table with Indexes
```

## Critical Implementation Paths

### Authentication Flow
1. **User Access**: User navigates to application
2. **Auth Check**: ConvexClientProvider verifies authentication state
3. **Conditional Routing**: Redirect to sign-in if not authenticated
4. **Session Management**: Convex Auth maintains secure sessions
5. **User Context**: Authenticated user ID available throughout application

### Bookmark Management Flow
1. **Data Fetching**: BookmarkerDashboard subscribes to user bookmarks
2. **Real-time Updates**: Convex automatically pushes changes to UI
3. **User Actions**: Add, search, delete operations trigger mutations
4. **Authorization**: All mutations verify user ownership
5. **UI Synchronization**: Changes reflect immediately without manual refresh

### Search Implementation Pattern
1. **Input Handling**: Search input triggers real-time filtering
2. **Query Execution**: searchBookmarks function filters server-side data
3. **Client Optimization**: Results cached and updated via subscriptions
4. **Multi-field Search**: Searches across title, description, and tags
5. **Instant Results**: No debouncing needed due to efficient implementation

## Design Patterns in Use

### State Management Pattern
*   **Server State**: Managed entirely by Convex with automatic caching
*   **Client State**: Local component state for UI interactions only
*   **Global State**: Authentication state via Convex Auth context
*   **No Redux**: Convex subscriptions eliminate need for complex state management

### Error Handling Pattern
*   **Backend Validation**: Schema-level validation prevents invalid data
*   **Authorization Checks**: Consistent user ownership verification
*   **Graceful Degradation**: UI handles loading and error states
*   **User Feedback**: Clear error messages and confirmation dialogs

### Form Handling Pattern
*   **React Hook Form**: Performant forms with minimal re-renders
*   **Zod Validation**: Type-safe validation schemas
*   **Optimistic Updates**: UI updates immediately, with rollback on error
*   **Controlled Components**: Consistent form state management

### Responsive Design Pattern
*   **Mobile-First**: Base styles target mobile devices
*   **Progressive Enhancement**: Desktop features added via media queries
*   **Flexible Grid**: CSS Grid adapts to screen size automatically
*   **Touch-Friendly**: Adequate touch targets and spacing

## Performance Optimization Patterns

### Database Query Optimization
*   **Strategic Indexes**: Efficient queries via proper indexing
*   **User Scoping**: All queries filtered by authenticated user
*   **Selective Loading**: Only fetch required fields and records
*   **Real-time Subscriptions**: Eliminate unnecessary polling

### Frontend Performance
*   **Component Optimization**: Minimal re-renders via React best practices
*   **Bundle Optimization**: Tree-shaking and code splitting
*   **Image Optimization**: Next.js automatic image optimization
*   **CSS Optimization**: Tailwind CSS purging removes unused styles

### Development Experience Patterns
*   **Hot Reloading**: Instant feedback during development
*   **Type Safety**: Compile-time error detection
*   **Auto-generated Types**: Convex schema generates TypeScript types
*   **Parallel Development**: Frontend and backend development simultaneously

## Security Patterns

### Authentication Security
*   **Session Management**: Secure session handling via Convex Auth
*   **Password Security**: Proper hashing and validation
*   **CSRF Protection**: Built-in protection via Convex
*   **Secure Cookies**: HTTPOnly and secure cookie settings

### Data Security
*   **User Isolation**: All data operations scoped to authenticated user
*   **Authorization Checks**: Consistent ownership verification
*   **Input Validation**: Schema-level validation prevents injection
*   **Secure Defaults**: Principle of least privilege throughout

## Scalability Patterns

### Horizontal Scaling
*   **Serverless Functions**: Automatic scaling based on demand
*   **Database Scaling**: Convex handles scaling transparently
*   **CDN Integration**: Static assets served via CDN
*   **Edge Computing**: Next.js edge functions for global performance

### Code Organization
*   **Modular Architecture**: Clear separation of concerns
*   **Reusable Components**: DRY principle throughout codebase
*   **Configuration Management**: Environment-based configuration
*   **Dependency Management**: Minimal, well-maintained dependencies

## Future Pattern Considerations

### Planned Enhancements
*   **Scheduled Functions**: For link validation and maintenance
*   **File Processing**: For Pocket import functionality
*   **External API Integration**: For Gemini AI and Playwright
*   **Caching Strategies**: For improved performance at scale
