import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/db/queries";
import ClientBlogPost from "@/app/components/client-blog-post";
import type { Blog } from "@/db/schema";

// Incremental Static Regeneration: rebuild pages daily
export const revalidate = 86400; // 24 hours

// Pre-render known dynamic routes at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((p) => Boolean(p.slug))
    .map((p) => ({ slug: p.slug as string }));
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // Fetch data on the server
  const fetchedPost = await getPostBySlug(slug);

  if (!fetchedPost || fetchedPost.length === 0) {
    notFound();
  }

  const post: Blog = fetchedPost[0];

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || "",
    mainEntityOfPage: `https://mayomimassage.com/blog/${post.slug}`,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt as unknown as string).toISOString() : undefined,
    author: { "@type": "Organization", name: "Mayomi" },
    publisher: { "@type": "Organization", name: "Mayomi" },
  } as const;

  // Pass the data to the client component
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientBlogPost post={post} slug={slug} />
    </>
  );
}
