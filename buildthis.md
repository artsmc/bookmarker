Here is a comprehensive procedure for building your open-source bookmarker, rewritten with your specified tech stack and the current context of **Wednesday, July 9, 2025**.

This plan outlines a modern, serverless approach to building a robust web application.

### **Project Blueprint: Open-Source Bookmarker (July 2025)**

-----

### **1. Foundation: Technology Stack & Setup**

This stack represents a cutting-edge, highly efficient approach for projects initiated in mid-2025.

  * **Backend & Database:** **Convex**

      * **Role:** This is your all-in-one backend platform. It provides the database, serverless functions (`queries`, `mutations`), and real-time data synchronization.
      * **Clarification:** Convex includes its own purpose-built, real-time database. You will **not** use a separate SQLite file. You will migrate your data *into* the Convex database.

  * **Authentication:** **Better Auth**

      * **Role:** Integrated with Convex, this will handle all user authentication. You will configure it to use Google (Gmail) login for a seamless and secure sign-up/sign-in experience.

  * **Frontend:** **Next.js**

      * **Role:** The React framework for building your user interface. Its server-side rendering and component-based architecture are ideal for a fast, interactive application.

  * **UI & State Management:**

      * **UI Components:** **Shadcn UI** will provide the library of beautifully designed, accessible, and composable components (buttons, dialogs, cards, etc.).
      * **Animations:** **Animate.css** for simple, class-based animations and **Anime.js** for complex, dynamic JavaScript-driven animations.
      * **Server State:** **React Query** (via Convex's `useQuery` and `useMutation` hooks) will manage all data fetching, caching, and state synchronization between your Next.js frontend and Convex backend.

  * **Automation & Verification:** **Playwright**

      * **Role:** This powerful browser automation tool will run within Convex backend functions to perform crucial automated tasks.

-----

### **2. Phase 1: User Authentication & Schema Definition**

Before any data can be saved, a user system must exist.

1.  **Initialize Project:** Set up a new project integrating Next.js and Convex.
2.  **Configure Authentication:**
      * Integrate **Better Auth** into your Convex backend.
      * Go to the Google Cloud Console and create OAuth 2.0 credentials (`client ID` and `client secret`).
      * Configure Better Auth to use these credentials, enabling users to "Sign in with Google."
3.  **Define the Database Schema:**
      * In your `convex/schema.ts` file, define the tables for your database. You will need tables for users, bookmarks, tags, etc.
      * **Example `bookmarks` table schema:**
        ```typescript
        // convex/schema.ts
        import { defineSchema, defineTable } from "convex/server";
        import { v } from "convex/values";

        export default defineSchema({
          users: defineTable({
            // User data from Google Auth
            name: v.string(),
            email: v.string(),
            subject: v.string(), // The unique identifier from the auth provider
          }).index("by_email", ["email"]),

          bookmarks: defineTable({
            userId: v.string(),
            url: v.string(),
            title: v.string(),
            description: v.optional(v.string()),
            tags: v.optional(v.array(v.string())),
            imageUrl: v.optional(v.string()),
            status: v.union(v.literal("active"), v.literal("needs_review"), v.literal("archived")),
          }).index("by_userId", ["userId"]),
        });
        ```

-----

### **3. Phase 2: Pocket Data Import**

This procedure allows a new user to bring their entire Pocket history into the application.

1.  **Build the Upload UI:** Create a page in Next.js with a file input that accepts `.zip` files. This UI should only be accessible to authenticated users.
2.  **Create an Import Mutation:** Define a Convex `mutation` to handle the file processing.
3.  **Implement the Logic:**
      * The user uploads their `ril_export.zip` file.
      * The file is sent to the Convex mutation.
      * The mutation unzips the file in memory.
      * **First, parse the JSON files** to reconstruct folder and tag structures.
      * **Then, parse the `ril_export.csv` file,** iterating through each row. For each bookmark, insert a new document into the `bookmarks` table in your Convex database, associating it with the logged-in user's ID.

-----

### **4. Phase 3: Core Features Implementation**

This is the day-to-day functionality of your service.

#### **A. Adding New Links**

1.  **UI:** Place a prominent input box in your Next.js UI for pasting URLs.
2.  **Backend Logic (Convex Mutation):**
      * When a user submits a URL, call a Convex `mutation` named `addBookmark`.
      * This mutation will trigger a server-side **Playwright** instance.
      * Playwright will:
          * Navigate to the URL.
          * Extract the page `title` and meta `description`.
          * Take a screenshot of the page and save it to a file storage service (Convex supports this).
      * The mutation then saves all this information (URL, title, description, screenshot URL, status: 'active') to the `bookmarks` table.

#### **B. Link Validation Pipeline**

This is an automated maintenance task to keep the bookmark collection clean.

1.  **Scheduled Function:** Create a scheduled Convex function that runs periodically (e.g., once a week).
2.  **Verification Logic:**
      * The function queries for a batch of bookmarks that haven't been checked recently.
      * For each bookmark, it spawns a **Playwright** instance to get the HTTP header of the URL.
      * **If the status is 4xx (e.g., 404 Not Found) or 5xx (Server Error):** Update the bookmark's `status` to `'needs_review'`.
      * **If the status is 3xx (Redirect):** Follow the redirect to the final destination and update the bookmark's URL.
3.  **Review UI:** Create a page that displays all bookmarks with the `'needs_review'` status, allowing the user to delete or manually update them.

#### **C. Gemini-Powered Discovery Page**

This feature provides intelligent, personalized content recommendations.

1.  **Context Generation:**
      * Create a Convex `query` that retrieves a sample of the user's most recent or most tagged bookmarks.
      * For these bookmarks, you can use the stored descriptions or even use a Playwright function to extract the full text content.
2.  **Gemini API Integration:**
      * Create a Convex `query` called `getRecommendations`.
      * This function will take the context (titles, tags, descriptions) and format it into a carefully crafted prompt for the **Gemini API**.
      * **Example Prompt:** *"Based on these topics and articles about [topic A, topic B, article title C], find 5 new, high-quality blog posts or articles. Do not include links from the following domains: [list of already bookmarked domains]."*
3.  **Display Unique Results:**
      * The `getRecommendations` function receives the response from Gemini.
      * It filters out any links the user has already bookmarked.
      * The Next.js "Discovery" page calls this query using `useQuery` and displays the fresh, unique links using **Shadcn UI** cards, animated with **Animate.css** or **Anime.js**.