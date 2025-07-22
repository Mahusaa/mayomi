import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

const posts = [
  {
    slug: "full-body-massage-jakarta-selatan",
    title: "Full Body Massage Di Jakarta Selatan: Pengalaman Relaksasi Terbaik di Mayomi",
    description: "Full body massage terbaik di Jakarta Selatan. Temukan pengalaman relaksasi, terapis profesional, lokasi strategis, dan suasana nyaman di Mayomi Family Massage & Wellness.",
    content: (
      <>
        <section className="mb-8">
          <div className="mb-6">
            <Image
              src="/blog-1.jpg"
              alt="Full Body Massage di Mayomi Family Massage & Wellness Jakarta Selatan, suasana relaksasi, terapis profesional, dan kenyamanan spa di Jakarta Selatan"
              width={800}
              height={450}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Apa Itu Full Body Massage?</h2>
          <p className="mb-2">Full body massage adalah terapi pijat menyeluruh dari kepala hingga kaki yang bertujuan untuk:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Mengurangi ketegangan otot</li>
            <li>Meningkatkan sirkulasi darah</li>
            <li>Meredakan stres dan kecemasan</li>
            <li>Membantu tubuh dan pikiran lebih rileks</li>
          </ul>
          <p>
            Di Mayomi Massage & Wellness, Jakarta Selatan, layanan ini dilakukan oleh terapis berpengalaman dengan pendekatan personal, menyesuaikan teknik dengan kebutuhan setiap pelanggan.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Full Body Massage Di Jakarta Selatan, Kenapa Harus Mayomi?</h2>
          <h3 className="text-xl font-semibold text-primary mb-2 mt-4">1. Lokasi Strategis</h3>
          <p className="mb-4">Terletak di Pasar Minggu, Jakarta Selatan, Mayomi mudah diakses dari berbagai area seperti Cilandak, Ragunan, Tanjung Barat, dan sekitarnya. Lokasi ini ideal untuk kamu yang ingin relaksasi tanpa harus menempuh perjalanan jauh.</p>
          <h3 className="text-xl font-semibold text-primary mb-2 mt-4">2. Terapis Terlatih dan Profesional</h3>
          <p className="mb-2">Mayomi dikenal dengan tim terapis yang ramah dan berpengalaman. Layanan full body massage serta treatment lain seperti:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Reflexology</li>
            <li>Lava Stone Massage</li>
            <li>Facial Treatment</li>
          </ul>
          <p className="mb-4">Semua dilakukan dengan standar kebersihan dan kenyamanan tinggi, menciptakan pengalaman spa yang menyeluruh.</p>
          <h3 className="text-xl font-semibold text-primary mb-2 mt-4">3. Suasana Tenang dan Nyaman</h3>
          <p>Interior Mayomi didesain dengan nuansa tropis yang memberi sensasi seperti berada di Bali. Musik relaksasi, aroma terapi, dan pelayanan yang hangat menjadikan kunjunganmu bukan sekadar pijat, tapi juga momen self-care yang menyegarkan.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Tips Sebelum Full Body Massage di Mayomi</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Booking terlebih dahulu untuk menghindari antrian</li>
            <li>Datang lebih awal agar bisa lebih tenang sebelum sesi dimulai</li>
            <li>Sampaikan keluhan tubuhmu agar terapis bisa menyesuaikan teknik</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Reservasi Sekarang dan Rasakan Manfaatnya</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Di tengah padatnya aktivitas harian di Jakarta, tubuh dan pikiran kita memerlukan waktu untuk beristirahat. Salah satu cara efektif untuk memulihkan kebugaran adalah dengan full body massage. Jika kamu mencari tempat full body massage di Jakarta Selatan yang nyaman, profesional, dan tenang, <strong>Mayomi Family Massage & Wellness</strong> adalah pilihan yang tepat.
          </p>
          <p className="mb-4">Sudah saatnya Anda memanjakan diri dan menjaga kesehatan tubuh dengan cara yang menyenangkan. Rasakan manfaat full body massage di tempat yang benar-benar peduli pada kenyamanan Anda.</p>
          <p className="mb-4">Reservasi sekarang juga melalui website atau WhatsApp kami untuk mendapatkan slot terbaik.</p>
          <div className="mb-2">
            <strong>Mayomi Family Massage & Wellness — Jakarta Selatan</strong><br />
            Jl. Gabus Raya No.34A, Jakarta Selatan.
          </div>
          <div className="mb-2">
            Reservasi via WhatsApp: {" "}
            <a
              href="https://wa.me/6285212586168"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-semibold"
            >
              0852-1258-6168
            </a>
          </div>
          <div>
            Kunjungi website kami: {" "}
            <a
              href="https://mayomimassage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              mayomimassage.com
            </a>
          </div>
        </section>
      </>
    )
  }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://mayomimassage.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://mayomimassage.com/blog/${post.slug}`,
      type: "article"
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return notFound();
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/blog-1.jpg"
          alt="Massage Hands Background"
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
              {post.title}
            </h1>
          </header>
          {post.content}
        </article>
      </main>
    </div>
  );
} 
