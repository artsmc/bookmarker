# System Patterns

## System Architecture

The application follows a modern, serverless architecture, with a clear separation of concerns between the frontend and backend.

*   **Frontend:** A Next.js application is responsible for rendering the user interface and managing client-side state. It communicates with the backend via the Convex client library.
*   **Backend:** Convex serves as the all-in-one backend. It provides:
    *   A real-time database.
    *   Serverless functions for business logic (queries and mutations).
    *   Scheduled functions for automated tasks.
    *   Authentication services via "Better Auth".
    *   File storage.

## Key Technical Decisions

*   **Serverless-First:** The entire backend is built on Convex, eliminating the need for traditional server provisioning and management. This simplifies deployment and scaling.
*   **Real-time Data:** The use of Convex's real-time database means that the UI will update automatically when data changes on the backend, providing a highly interactive user experience.
*   **Component-Based UI:** The frontend will be built using React (via Next.js) and Shadcn UI, promoting reusability and a consistent design language.
*   **Backend Automation:** CPU-intensive or sensitive tasks, like scraping websites with Playwright or interacting with the Gemini API, are handled within Convex backend functions. This keeps the frontend light and secure.

## Component Relationships

```mermaid
graph TD
    A[User] -->|Interacts with| B(Next.js Frontend)
    B -->|Calls Functions| C{Convex Backend}
    C -->|Reads/Writes| D[Convex Database]
    C -->|Handles Auth| E(Better Auth)
    C -->|Runs Tasks| F(Playwright)
    C -->|Calls API| G(Gemini API)
