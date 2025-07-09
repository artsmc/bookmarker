# System Architecture

## High-Level System Architecture

The Bookmarker application follows a modern serverless architecture with clear separation between frontend and backend concerns:

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        B[React Components]
        C[Shadcn UI Components]
        D[Convex React Client]
    end
    
    subgraph "Backend Layer"
        E[Convex Runtime]
        F[Database Functions]
        G[Authentication]
        H[Real-time Subscriptions]
    end
    
    subgraph "Data Layer"
        I[Convex Database]
        J[Users Table]
        K[Bookmarks Table]
    end
    
    A --> B
    B --> C
    B --> D
    D --> E
    E --> F
    E --> G
    E --> H
    F --> I
    G --> J
    F --> K
```

## Database Schema

The application uses Convex's document database with the following schema:

```mermaid
erDiagram
    users {
        string _id PK
        string name
        string email
        string image
        number _creationTime
    }
    
    bookmarks {
        string _id PK
        string userId FK
        string url
        string title
        string description
        array tags
        string imageUrl
        string status
        number createdAt
        number updatedAt
    }
    
    users ||--o{ bookmarks : "owns"
```

### Database Indexes
- `bookmarks.by_userId`: Efficient user bookmark queries
- `bookmarks.by_status`: Status-based filtering
- `bookmarks.by_userId_status`: Combined user and status queries

## High-Level Procedures

### User Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Convex Auth
    participant D as Database
    
    U->>F: Access Application
    F->>A: Check Authentication
    A->>D: Validate Session
    D-->>A: Session Status
    A-->>F: Auth State
    alt Not Authenticated
        F->>U: Redirect to Sign In
        U->>A: Sign In with Email/Password
        A->>D: Create/Update User
        D-->>A: User Record
        A-->>F: Authentication Success
    end
    F->>U: Show Dashboard
```

### Bookmark Management Flow
```mermaid
sequenceDiagram
    participant U as User
    participant D as Dashboard
    participant C as Convex
    participant DB as Database
    
    U->>D: Add New Bookmark
    D->>C: addBookmark Mutation
    C->>DB: Insert Bookmark Record
    DB-->>C: Bookmark ID
    C-->>D: Success Response
    D->>D: Update UI (Real-time)
    
    U->>D: Search Bookmarks
    D->>C: searchBookmarks Query
    C->>DB: Filter by Search Term
    DB-->>C: Matching Bookmarks
    C-->>D: Search Results
    D->>U: Display Results
```

## Description of File Architecture

### Frontend Architecture (Next.js App Router)
- **`app/`**: Next.js 13+ App Router structure
  - `page.tsx`: Main application entry point
  - `layout.tsx`: Root layout with providers
  - `signin/`: Authentication pages
  - `globals.css`: Global styles and Tailwind CSS

### Component Architecture
- **`components/`**: Reusable React components
  - `BookmarkerDashboard.tsx`: Main dashboard component (self-contained)
  - `ConvexClientProvider.tsx`: Convex client wrapper
  - `ui/`: Shadcn UI component library (atomic design)

### Backend Architecture (Convex)
- **`convex/`**: Serverless backend functions
  - `schema.ts`: Database schema definition
  - `bookmarks.ts`: Bookmark CRUD operations
  - `auth.ts` & `auth.config.ts`: Authentication configuration
  - `_generated/`: Auto-generated TypeScript types

### Shared Resources
- **`lib/utils.ts`**: Utility functions and helpers
- **Configuration Files**: TypeScript, ESLint, Tailwind, and Convex configs

### Self-Sustained Components
- **BookmarkerDashboard**: Complete bookmark management interface
- **UI Components**: Atomic, reusable Shadcn components
- **Auth System**: Fully integrated with Convex Auth

## Critical Implementation Paths

1. **Authentication Flow**: `app/signin` → `ConvexClientProvider` → `auth.ts`
2. **Data Flow**: `BookmarkerDashboard` → `convex/bookmarks.ts` → `schema.ts`
3. **UI Rendering**: `page.tsx` → `BookmarkerDashboard` → `ui/components`
4. **Real-time Updates**: Convex subscriptions automatically update React components
