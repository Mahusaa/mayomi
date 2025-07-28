import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getPostBySlug } from "@/db/queries";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post || post.length === 0) return {};
  return {
    title: post[0].metaTitle || post[0].title,
    description: post[0].metaDescription,
    alternates: {
      canonical: `https://mayomimassage.com/blog/${post[0].slug}`,
    },
    openGraph: {
      title: post[0].metaTitle || post[0].title,
      description: post[0].metaDescription ?? "",
      url: `https://mayomimassage.com/blog/${post[0].slug}`,
      type: "article"
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post || post.length === 0) return notFound();
  const blogPost = post[0];
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
          <header>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 drop-shadow-lg" itemProp="headline">
              {blogPost.title}
            </h1>
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
