import { notFound } from "next/navigation";
import { getPostBySlug } from "@/db/queries";
import ClientBlogPost from "@/app/components/client-blog-post";
import type { Blog } from "@/db/schema";



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

  // Pass the data to the client component
  return <ClientBlogPost post={post} slug={slug} />;
}
