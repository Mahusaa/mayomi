import Image from "next/image";
import AboutSection from "./components/about-section";
import BranchesSection from "./components/branches-section";
import { BRANCHES, OPERATING_HOURS } from "@/lib/branches";
import { STARTING_PRICE, formatIDR } from "@/lib/menu";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
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
          {/* Warm colour blooms so the hero feels sunny rather than flat green */}
          <div className="blob -left-24 top-24 h-80 w-80 bg-mayomi-400/40" aria-hidden="true" />
          <div className="blob right-0 -bottom-20 h-96 w-96 bg-peach/35" aria-hidden="true" />
          <div className="blob right-1/3 top-10 h-64 w-64 bg-gold/25" aria-hidden="true" />
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
                {BRANCHES.length} Cabang &middot; Jakarta &amp; Tangerang
              </a>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight text-balance animate-fade-up delay-1">
              Badan pegal?
              <br />
              <span className="text-gradient-warm">Waktunya rileks</span> di
              Mayomi.
            </h1>

            <p className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-white/75 text-balance animate-fade-up delay-2">
              Family massage &amp; wellness dengan terapis bersertifikat, ruang
              yang tenang, dan harga yang masuk akal. Mulai dari {formatIDR(STARTING_PRICE)}.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up delay-3">
              <a
                href="#branches"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-warm px-7 py-3.5 text-base font-bold text-mayomi-900 shadow-lift transition-all hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <MapPin className="h-5 w-5" />
                Pilih Cabang &amp; Booking
              </a>
              <Link
                href="/pricing"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Lihat Harga
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-4 text-sm text-white/70 animate-fade-up delay-3">
              Pilih cabang terdekat, lalu chat admin via WhatsApp &middot; Buka
              setiap hari {OPERATING_HOURS}
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      <BranchesSection />

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mayomi-700 via-mayomi-600 to-teal-deep py-16 md:py-24">
        <Image
          src="/cta-lastt.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-15"
        />
        {/* Soft gold bloom, echoing the accent used across the site */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-peach/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
            Kapan pun kamu siap
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
            Siap untuk <span className="text-gradient-warm">rileks</span> hari ini?
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/75 text-balance">
            Bergabung dengan{" "}
            <span className="font-semibold text-gold-soft">500+ klien</span> yang
            mempercayakan perjalanan wellness mereka pada Mayomi.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#branches"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-warm px-8 py-3.5 text-base font-bold text-mayomi-900 shadow-lift transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              <MapPin className="h-4 w-4" />
              Pilih Cabang &amp; Booking
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Lihat Layanan &amp; Harga
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
