// app/blog/[slug]/ClientBlogPost.tsx (Client Component)
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import type { Blog } from "@/db/schema";



interface ClientBlogPostProps {
  post: Blog;
  slug: string;
}

export default function ClientBlogPost({ post, slug }: ClientBlogPostProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/blog/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        alert("Blog post deleted successfully!");
        router.push("/blog");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to delete blog post: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert("Failed to delete blog post. Please try again.");
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src={post.coverImage || "/blog-1.jpg"}
          alt={post.imageAlt || "Massage Hands Background"}
          fill
          className="w-full h-full object-cover object-center brightness-60 blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-primary/20" />
      </div>

      <main className="max-w-3xl mx-auto px-4 py-12 bg-white/90 rounded-2xl shadow-2xl mt-16 mb-20 backdrop-blur-md animate-fadeInUp">
        <article itemScope itemType="https://schema.org/Article">
          <header className="flex justify-between items-center mb-6">
            <h1
              className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg"
              itemProp="headline"
            >
              {post.title}
            </h1>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Delete blog post"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </header>

          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            itemProp="articleBody"
          />
        </article>
      </main>
    </div>
  );
}
