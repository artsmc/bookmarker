# Active Context

## Current Focus: Project Initialization

The immediate priority is to establish the foundational structure of the project. This involves setting up the development environment, initializing the codebase with the chosen technology stack, and creating the necessary configuration files.

## Next Steps

1.  **Initialize Next.js and Convex Project:** Set up the basic project structure that integrates Next.js for the frontend and Convex for the backend.
2.  **Configure Authentication:** Integrate "Better Auth" with Convex and configure it to use Google for authentication. This will require setting up OAuth 2.0 credentials in the Google Cloud Console.
3.  **Define Initial Schema:** Create the `convex/schema.ts` file and define the initial database schema for `users` and `bookmarks` as outlined in the project brief.

## Key Decisions & Considerations

*   The project will be built following the serverless model provided by Convex. This means traditional server management is not required.
*   The database schema should be designed to be extensible for future features, but the initial focus is on the core requirements for user and bookmark management.
