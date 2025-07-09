# Glossary

## Domain-Specific Terms

### Core Application Concepts

**Bookmark**
- A saved web link with associated metadata (title, description, tags, status)
- Stored in the `bookmarks` table with user ownership and timestamps
- Can have status: "active", "needs_review", or "archived"

**BookmarkerDashboard**
- The main React component providing the complete bookmark management interface
- Handles CRUD operations, search, and responsive display of bookmarks
- Self-contained component with integrated state management

**Convex Auth**
- Authentication system integrated with Convex backend
- Provides email/password authentication with session management
- Generates `authTables` for user management in the database schema

**Real-time Subscriptions**
- Convex's automatic data synchronization between backend and frontend
- Updates React components instantly when database changes occur
- Eliminates need for manual data refetching or polling

### Technical Implementation Terms

**Mutation**
- Convex backend function that modifies data (create, update, delete operations)
- Examples: `addBookmark`, `updateBookmark`, `deleteBookmark`
- Requires authentication and authorization checks

**Query**
- Convex backend function that reads data without modification
- Examples: `getUserBookmarks`, `searchBookmarks`
- Automatically subscribes to data changes for real-time updates

**Schema Definition**
- TypeScript-based database structure definition using Convex validators
- Defines table structure, field types, and database indexes
- Provides compile-time type safety for all database operations

**Index**
- Database optimization for efficient querying
- Examples: `by_userId`, `by_status`, `by_userId_status`
- Enables fast filtering and sorting of bookmark collections

### User Interface Terms

**Shadcn UI**
- Component library providing accessible, customizable React components
- Built on Radix UI primitives with Tailwind CSS styling
- Examples: Button, Input, Card, Dialog, Badge components

**Dialog/Modal**
- Overlay interface for adding new bookmarks
- Implemented using Radix UI Dialog component
- Provides form validation and submission handling

**Card Layout**
- Grid-based display system for bookmark visualization
- Responsive design adapting to screen size (mobile, tablet, desktop)
- Each bookmark rendered as an individual card with metadata

**Search Functionality**
- Real-time filtering of bookmarks based on user input
- Searches across title, description, and tag fields
- Implemented with client-side filtering for instant results

### Data Management Terms

**userId**
- Foreign key linking bookmarks to their owner
- Used in all bookmark operations for data isolation
- Ensures users can only access their own bookmarks

**Tags**
- Array of strings for bookmark categorization
- Optional field allowing flexible organization
- Searchable and displayed as badges in the UI

**Status Field**
- Enum field indicating bookmark state: "active", "needs_review", "archived"
- Enables filtering and workflow management
- Future-proofing for link validation pipeline

**Timestamps**
- `createdAt` and `updatedAt` fields tracking bookmark lifecycle
- Stored as Unix timestamps (number type)
- Used for sorting and displaying creation dates

### Development Environment Terms

**npm-run-all**
- Package enabling parallel execution of development servers
- Runs both Next.js frontend and Convex backend simultaneously
- Configured in package.json scripts for streamlined development

**App Router**
- Next.js 13+ routing system using file-based routing in `app/` directory
- Replaces older Pages Router with improved performance and features
- Supports server and client components with clear boundaries

**Convex Dev**
- Development server for Convex backend functions
- Provides hot reloading, function deployment, and database management
- Includes dashboard interface for monitoring and debugging

**TypeScript Integration**
- Full type safety across frontend and backend
- Auto-generated types from Convex schema and functions
- Compile-time error detection and IntelliSense support

### Future Implementation Terms

**Pocket Import**
- Planned feature for bulk data migration from Pocket bookmark service
- Will process ZIP file exports and transform data for Convex schema
- Enables seamless transition from existing bookmark solutions

**Link Validation Pipeline**
- Planned automated system for checking bookmark link health
- Will use scheduled Convex functions and Playwright for web scraping
- Updates bookmark status based on link accessibility

**Gemini API Integration**
- Planned AI-powered content discovery feature
- Will analyze user's bookmark patterns to suggest relevant content
- Provides personalized recommendations based on interests and history

**Playwright**
- Browser automation tool planned for metadata extraction and link validation
- Will capture screenshots, titles, and descriptions from web pages
- Enables automated quality assurance for bookmark collections
