"use client";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

import { getPostBySlug } from "@/db/queries";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [post, setPost] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostBySlug(slug);
      if (!fetchedPost || fetchedPost.length === 0) {
        notFound();
      }
      setPost(fetchedPost[0]);
    };
    fetchPost();

    const cookies = parseCookies();
    setIsAuthenticated(cookies.auth === 'true');
  }, [slug]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
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
        alert("Failed to delete blog post.");
      }
    }
  };

  if (!post) {
    return null; // Or a loading spinner
  }

  const blogPost = post;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src={blogPost.coverImage || "/blog-1.jpg"}
          alt={blogPost.imageAlt || "Massage Hands Background"}
          fill
          className="w-full h-full object-cover object-center brightness-60 blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-primary/20" />
      </div>
      <main className="max-w-3xl mx-auto px-4 py-12 bg-white/90 rounded-2xl shadow-2xl mt-16 mb-20 backdrop-blur-md animate-fadeInUp">
        <article itemScope itemType="https://schema.org/Article">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg" itemProp="headline">
              {blogPost.title}
            </h1>
            {isAuthenticated && (
              <button
                onClick={handleDelete}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </header>
          <div
            className="prose prose-sm"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </article>
      </main>
    </div>
  );
} 
