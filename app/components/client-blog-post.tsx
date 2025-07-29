"use client";
import Image from "next/image";
import type { Blog } from "@/db/schema";

interface ClientBlogPostProps {
  post: Blog;
  slug: string;
}

export default function ClientBlogPost({ post }: ClientBlogPostProps) {
  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src={post.coverImage || "/blog-1.jpg"}
          alt={post.imageAlt || "Blog Post Cover"}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-2xl"
              itemProp="headline"
            >
              {post.title}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="bg-white rounded-t-3xl shadow-2xl overflow-hidden"
            itemScope
            itemType="https://schema.org/Article"
          >
            {/* Content Header */}
            <div className="px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    Blog Post
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {/* Add date if available in post object */}
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:text-gray-700
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 
                  prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
                  prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
                  prose-hr:border-gray-200 prose-hr:my-12
                  prose-table:my-8 prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-left
                  prose-td:border-gray-200 prose-th:border-gray-200"
                dangerouslySetInnerHTML={{ __html: post.content }}
                itemProp="articleBody"
              />
            </div>
          </article>

          {/* Bottom Spacing */}
          <div className="h-8 sm:h-12 lg:h-16" />
        </div>
      </div>

      {/* Scroll to Top Button (optional) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-50 hidden sm:flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
