import { Metadata } from "next";
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
