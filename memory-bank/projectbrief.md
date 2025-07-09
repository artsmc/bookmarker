# Project Brief: Open-Source Bookmarker

This project is to build a modern, open-source bookmarker application.

## Core Technologies

*   **Backend & Database:** Convex
*   **Authentication:** Better Auth (with Google Login)
*   **Frontend:** Next.js
*   **UI Components:** Shadcn UI
*   **Animations:** Animate.css & Anime.js
*   **Automation & Verification:** Playwright

## Key Features

1.  **User Authentication:** Secure sign-up and sign-in using Google.
2.  **Pocket Data Import:** Users can import their entire Pocket history via a `.zip` file.
3.  **Adding New Links:** A core feature where users can add new bookmarks. This will use Playwright to fetch metadata and a screenshot.
4.  **Link Validation Pipeline:** An automated process to check for broken or redirected links using a scheduled Convex function and Playwright.
5.  **Gemini-Powered Discovery:** A feature that provides personalized content recommendations using the Gemini API.

## Project Phases

1.  **Phase 1: User Authentication & Schema Definition:**
    *   Initialize the Next.js and Convex project.
    *   Configure Google-based authentication with Better Auth.
    *   Define the database schema for users and bookmarks in `convex/schema.ts`.

2.  **Phase 2: Pocket Data Import:**
    *   Build a UI for uploading the Pocket export file.
    *   Create a Convex mutation to process the uploaded `.zip` file and import the data.

3.  **Phase 3: Core Features Implementation:**
    *   Implement the "add new link" functionality with Playwright integration.
    *   Build the link validation pipeline with a scheduled Convex function.
    *   Create the Gemini-powered discovery page.
