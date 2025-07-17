import Link from "next/link";
import { Metadata } from "next";

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

const posts = [
  {
    slug: "full-body-massage-jakarta-selatan",
    title: "Full Body Massage Di Jakarta Selatan: Pengalaman Relaksasi Terbaik di Mayomi",
    excerpt: "Temukan pengalaman relaksasi terbaik dengan full body massage di Mayomi Family Massage & Wellness, Jakarta Selatan. Baca manfaat, tips, dan alasan memilih Mayomi!",
    date: "2024-06-01"
  },
  // Tambahkan post lain di sini
];

export default function BlogIndexPage() {
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
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.slug} className="bg-white/80 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-primary mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-2">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-amber-600 font-semibold hover:underline">Baca Selengkapnya →</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 