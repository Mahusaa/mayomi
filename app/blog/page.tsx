import { Blog } from "@/db/schema";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { accentAt } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Blog Mayomi: Tips & Info Massage Jakarta Selatan",
  description: "Kumpulan artikel, tips, dan informasi seputar massage, spa, dan wellness di Jakarta Selatan dari Mayomi Family Massage & Wellness.",
  alternates: {
    canonical: "https://mayomimassage.com/blog",
  },
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
    <div className="min-h-screen bg-wash">
      {/* Header band: dark enough for the transparent navbar's white links */}
      <header className="relative overflow-hidden bg-gradient-to-br from-mayomi-800 via-mayomi-600 to-teal-deep pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="blob -left-20 top-10 h-72 w-72 bg-gold/30" aria-hidden="true" />
        <div className="blob -right-20 bottom-0 h-80 w-80 bg-peach/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
            Tips &amp; Info Wellness
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Blog <span className="text-gradient-warm">Mayomi</span>
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80">
            Kumpulan artikel, tips, dan info seputar massage &amp; wellness di Jakarta Selatan.
          </p>
        </div>
      </header>

      <main className="relative mx-auto -mt-10 max-w-6xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Blog, i: number) => {
            const accent = accentAt(i);
            return (
              <article
                key={post.slug}
                className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-2 ${accent.ring}`}
              >
                <Link href={`/blog/${post.slug}`} className="relative block h-48 overflow-hidden">
                  <Image
                    src={post.coverImage ?? "/blog-1.jpg"}
                    alt={post.imageAlt ?? "Blog Post Thumbnail"}
                    width={700}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i < 3}
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accent.gradient}`} aria-hidden="true" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <span className={`self-start rounded-full ${accent.soft} px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${accent.text}`}>
                    Artikel
                  </span>
                  <h2 className="mt-3 text-xl font-bold leading-snug text-mayomi-800">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.metaDescription}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-primary"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
