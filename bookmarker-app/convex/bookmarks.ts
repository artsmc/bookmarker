import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Query to get all bookmarks for the authenticated user
export const getUserBookmarks = query({
  args: {
    status: v.optional(v.union(v.literal("active"), v.literal("needs_review"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    let bookmarks;

    if (args.status) {
      bookmarks = await ctx.db
        .query("bookmarks")
        .withIndex("by_userId_status", (q) => 
          q.eq("userId", userId).eq("status", args.status as "active" | "needs_review" | "archived")
        )
        .order("desc")
        .collect();
    } else {
      bookmarks = await ctx.db
        .query("bookmarks")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc")
        .collect();
    }

    return bookmarks;
  },
});

// Mutation to add a new bookmark
export const addBookmark = mutation({
  args: {
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();
    
    const bookmarkId = await ctx.db.insert("bookmarks", {
      userId,
      url: args.url,
      title: args.title,
      description: args.description,
      tags: args.tags,
      imageUrl: args.imageUrl,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    return bookmarkId;
  },
});

// Mutation to update a bookmark
export const updateBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("active"), v.literal("needs_review"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const bookmark = await ctx.db.get(args.id);
    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    if (bookmark.userId !== userId) {
      throw new Error("Not authorized to update this bookmark");
    }

    const updates: {
      updatedAt: number;
      title?: string;
      description?: string;
      tags?: string[];
      status?: "active" | "needs_review" | "archived";
    } = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.tags !== undefined) updates.tags = args.tags;
    if (args.status !== undefined) updates.status = args.status;

    await ctx.db.patch(args.id, updates);
  },
});

// Mutation to delete a bookmark
export const deleteBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const bookmark = await ctx.db.get(args.id);
    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    if (bookmark.userId !== userId) {
      throw new Error("Not authorized to delete this bookmark");
    }

    await ctx.db.delete(args.id);
  },
});

// Query to search bookmarks by title or description
export const searchBookmarks = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const searchTerm = args.searchTerm.toLowerCase();
    
    return bookmarks.filter(bookmark => 
      bookmark.title.toLowerCase().includes(searchTerm) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(searchTerm)) ||
      (bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  },
});
