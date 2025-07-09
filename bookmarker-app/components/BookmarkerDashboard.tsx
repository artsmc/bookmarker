"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, ExternalLink, Trash2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function BookmarkerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBookmark, setNewBookmark] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
  });
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Queries
  const bookmarks = useQuery(api.bookmarks.getUserBookmarks, {});
  const searchResults = useQuery(
    api.bookmarks.searchBookmarks,
    searchTerm.trim() ? { searchTerm: searchTerm.trim() } : "skip"
  );

  // Mutations
  const addBookmark = useMutation(api.bookmarks.addBookmark);
  const deleteBookmark = useMutation(api.bookmarks.deleteBookmark);

  const displayedBookmarks = searchTerm.trim() ? searchResults : bookmarks;

  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookmark.url.trim() || !newBookmark.title.trim()) return;

    try {
      await addBookmark({
        url: newBookmark.url.trim(),
        title: newBookmark.title.trim(),
        description: newBookmark.description.trim() || undefined,
        tags: newBookmark.tags.trim() 
          ? newBookmark.tags.split(",").map(tag => tag.trim()).filter(Boolean)
          : undefined,
        imageUrl: newBookmark.imageUrl.trim() || undefined,
      });

      setNewBookmark({ url: "", title: "", description: "", tags: "", imageUrl: "" });
      setImagePreviewError(false);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (confirm("Are you sure you want to delete this bookmark?")) {
      try {
        await deleteBookmark({ id: id as any });
      } catch (error) {
        console.error("Failed to delete bookmark:", error);
      }
    }
  };

  if (bookmarks === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading bookmarks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Bookmarks</h2>
          <p className="text-muted-foreground">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Bookmark
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bookmark</DialogTitle>
                <DialogDescription>
                  Save a new bookmark to your collection.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBookmark} className="space-y-4">
                <div>
                  <Input
                    placeholder="URL (required)"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    placeholder="Title (required)"
                    value={newBookmark.title}
                    onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Description (optional)"
                    value={newBookmark.description}
                    onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Tags (comma-separated, optional)"
                    value={newBookmark.tags}
                    onChange={(e) => setNewBookmark({ ...newBookmark, tags: e.target.value })}
                  />
                </div>
                <div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Image URL (optional)"
                      value={newBookmark.imageUrl}
                      onChange={(e) => {
                        setNewBookmark({ ...newBookmark, imageUrl: e.target.value });
                        setImagePreviewError(false);
                      }}
                    />
                    {newBookmark.imageUrl && !imagePreviewError && (
                      <div className="relative w-full max-w-sm">
                        <Image
                          src={newBookmark.imageUrl}
                          alt="Preview"
                          width={200}
                          height={120}
                          className="rounded-md object-cover border"
                          onError={() => setImagePreviewError(true)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white"
                          onClick={() => {
                            setNewBookmark({ ...newBookmark, imageUrl: "" });
                            setImagePreviewError(false);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    {imagePreviewError && newBookmark.imageUrl && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                        <span>Unable to load image preview</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Bookmark</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {displayedBookmarks && displayedBookmarks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedBookmarks.map((bookmark) => (
            <Card key={bookmark._id} className="hover:shadow-md transition-shadow overflow-hidden">
              {bookmark.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={bookmark.imageUrl}
                    alt={bookmark.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {bookmark.title}
                    </a>
                  </CardTitle>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBookmark(bookmark._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {bookmark.description && (
                  <CardDescription className="line-clamp-3">
                    {bookmark.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {bookmark.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Added {new Date(bookmark.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm.trim() ? "No bookmarks found matching your search." : "No bookmarks yet."}
          </div>
          {!searchTerm.trim() && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Bookmark
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
