import Image from "next/image";
import AboutSection from "./components/about-section";
import BranchesSection from "./components/branches-section";
import { BRANCHES, PRIMARY_BRANCH, waUrl } from "@/lib/branches";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

const STATS = [
  { value: `${BRANCHES.length}`, label: "Cabang" },
  { value: "500+", label: "Happy Clients" },
  { value: "09-22", label: "Buka Tiap Hari" },
];

const BOOKING_MESSAGE = "Halo Mayomi, saya ingin booking sesi massage.";

export default function Home() {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/massage.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Sage-tinted scrim keeps the photo on-brand and the copy legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-mayomi-900/90 via-mayomi-900/70 to-mayomi-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-mayomi-900/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5 animate-fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
                Everyone Deserves a Good Massage
              </span>
              <a
                href="#branches"
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 text-xs font-semibold text-gold-soft backdrop-blur-sm transition-colors hover:bg-gold/25"
              >
                <MapPin className="h-3.5 w-3.5" />
                {BRANCHES.length} Cabang &middot; Kini di Gading Serpong
              </a>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight text-balance animate-fade-up delay-1">
              Relax, rejuvenate,
              <br />
              <span className="text-mayomi-200">and unwind</span> &mdash; kapan
              pun, di mana pun.
            </h1>

            <p className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-white/75 text-balance animate-fade-up delay-2">
              Family massage &amp; wellness dengan terapis bersertifikat, ruang
              yang tenang, dan harga yang masuk akal. Mulai dari Rp85.000.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up delay-3">
              <a
                href={waUrl(PRIMARY_BRANCH, BOOKING_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-mayomi-700 shadow-lift transition-all hover:bg-mayomi-50 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Booking via WhatsApp
              </a>
              <Link
                href="/pricing"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Lihat Harga
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust strip */}
            <dl className="mt-10 grid grid-cols-3 gap-8 max-w-md animate-fade-up delay-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-t border-gold/40 pt-4">
                  <dt className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-xs uppercase tracking-wider text-white/60">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <AboutSection />

      <BranchesSection />

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mayomi-700 via-mayomi-600 to-mayomi-800 py-16 md:py-24">
        <Image
          src="/cta-lastt.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-15"
        />
        {/* Soft gold bloom, echoing the accent used across the site */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
            Ready when you are
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
            Siap untuk relaks &amp; rejuvenate?
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/75 text-balance">
            Bergabung dengan{" "}
            <span className="font-semibold text-gold-soft">500+ klien</span> yang
            mempercayakan perjalanan wellness mereka pada Mayomi.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={waUrl(PRIMARY_BRANCH, BOOKING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-mayomi-700 shadow-lift transition-all hover:bg-mayomi-50"
            >
              Book Your Experience
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#branches"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" />
              Cari Cabang Terdekat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
