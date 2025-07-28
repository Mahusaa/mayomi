import { Blog } from "@/db/schema";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Mayomi: Tips & Info Massage Jakarta Selatan",
  description: "Kumpulan artikel, tips, dan informasi seputar massage, spa, dan wellness di Jakarta Selatan dari Mayomi Family Massage & Wellness.",
  openGraph: {
    title: "Blog Mayomi: Tips & Info Massage Jakarta Selatan",
    description: "Kumpulan artikel, tips, dan informasi seputar massage, spa, dan wellness di Jakarta Selatan dari Mayomi Family Massage & Wellness.",
    url: "https://mayomimassage.com/blog",
    type: "website"
  }
};

import { getAllPosts } from "@/db/queries";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1500&q=80"
          alt="Massage Hands Background"
          className="w-full h-full object-cover object-center brightness-60 blur-[1px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-primary/20" />
      </div>
      <main className="max-w-3xl mx-auto px-4 py-16 bg-white/90 rounded-2xl shadow-2xl mt-16 mb-20 backdrop-blur-md animate-fadeInUp">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 drop-shadow-lg text-center">Blog Mayomi</h1>
        <p className="text-lg text-gray-700 mb-10 text-center">Kumpulan artikel, tips, dan info seputar massage & wellness di Jakarta Selatan.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post: Blog) => (
            <div key={post.slug} className="bg-white/80 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              <Image
                src={post.coverImage || "/blog-1.jpg"}
                alt={post.imageAlt || "Blog Post Thumbnail"}
                width={700}
                height={400}
                className="w-full h-48 object-cover"
                priority={true}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 text-base leading-relaxed">{post.metaDescription}</p>
                <Link href={`/blog/${post.slug}`} className="inline-block bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 