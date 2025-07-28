"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"
import { toast } from "sonner"

interface BlogPost {
  title: string
  slug: string | null
  content: string
  coverImage: string
  imageAlt: string
  metaTitle: string
  metaDescription: string
  metaKeyword: string
  status: "draft" | "published"
}

interface BlogEditorProps {
  params: { slug: string }
}

export default function BlogEditor({ params }: BlogEditorProps) {
  const [post, setPost] = useState<BlogPost>({
    title: "",
    slug: "",
    content: "",
    coverImage: "",
    imageAlt: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
    status: "draft",
  })

  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${params.slug}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.statusText}`)
        }
        const data = await response.json()
        setPost(data)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchPost()
    } else {
      setLoading(false)
    }
  }, [params.slug])

  // Auto-generate slug from title (only if it's a new post or slug is empty)
  useEffect(() => {
    if (post.title && !post.slug) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setPost((prev) => ({ ...prev, slug }))
    }
  }, [post.title, post.slug])

  const handleUpdate = async () => {
    setIsSaving(true)
    try {
      const { publishedAt, ...dataToUpdate } = post;
      const response = await fetch(`/api/blog/${params.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      })

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('API response:', result)
      toast.success("Post updated successfully!")
    } catch (error) {
      console.error('Error updating post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post'
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading post...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="container max-w-6xl mx-auto p-4">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Post Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={post.title}
                        onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter your blog post title..."
                        className="text-lg font-medium"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={post.slug || ''}
                        onChange={(e) => setPost((prev) => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-friendly-slug"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        URL: /article/{post.slug || "your-slug"}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="coverImage">Cover Image URL</Label>
                      <Input
                        id="coverImage"
                        value={post.coverImage || ''}
                        onChange={(e) => setPost((prev) => ({ ...prev, coverImage: e.target.value }))}
                        placeholder="e.g., https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageAlt">Cover Image Alt Text</Label>
                      <Input
                        id="imageAlt"
                        value={post.imageAlt || ''}
                        onChange={(e) => setPost((prev) => ({ ...prev, imageAlt: e.target.value }))}
                        placeholder="e.g., A descriptive alt text for the image"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Rich Text Editor */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Content *</CardTitle>
                    <ThemeToggle />
                  </CardHeader>
                  <CardContent>
                    <SimpleEditor
                      initialContent={post.content}
                      onUpdate={(html) => setPost((prev) => ({ ...prev, content: html }))}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Button className="w-full" onClick={handleUpdate} disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Update Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardContent className="p-8">
                {post.coverImage && (
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h1 className="text-4xl font-bold mb-6">
                  {post.title || "Your Blog Post Title"}
                </h1>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.content || "<p>Start writing your content...</p>"
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Meta Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={post.metaTitle || ''}
                    onChange={(e) => setPost((prev) => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO-optimized title (max 60 characters)"
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.metaTitle?.length || 0}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={post.metaDescription || ''}
                    onChange={(e) => setPost((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Brief description for search engines (max 160 characters)"
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.metaDescription?.length || 0}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    value={post.metaKeyword || ''}
                    onChange={(e) => setPost((prev) => ({ ...prev, metaKeyword: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Separate keywords with commas
                  </p>
                </div>

                {/* SEO Preview */}
                <div className="mt-6">
                  <Label>Search Engine Preview</Label>
                  <div className="border rounded-lg p-4 mt-2 bg-muted/30">
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                      {post.metaTitle || post.title || "Your Blog Post Title"}
                    </div>
                    <div className="text-green-700 text-sm">
                      yoursite.com/article/{post.slug || "your-slug"}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                      {post.metaDescription || "Your meta description will appear here..."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
