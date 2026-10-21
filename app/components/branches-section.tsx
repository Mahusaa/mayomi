import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { BRANCHES, mapsUrl, waUrl, telUrl } from "@/lib/branches"
import { accentAt } from "@/lib/accents"
import OpenStatus from "./open-status"

export default function BranchesSection() {
  return (
    <section id="branches" className="relative overflow-hidden bg-gradient-to-b from-mayomi-50 via-cream to-peach-soft/40 py-16 md:py-24">
      <div className="blob -right-24 top-10 h-80 w-80 bg-teal/15" aria-hidden="true" />
      <div className="blob -left-24 bottom-0 h-80 w-80 bg-gold/20" aria-hidden="true" />
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-glow">
            <MapPin className="h-3.5 w-3.5" />
            {BRANCHES.length} Cabang
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-mayomi-800 text-balance">
            Temukan Mayomi <span className="text-gradient-brand">Terdekat</span>
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed text-balance">
            Hadir di Jakarta Selatan dan Tangerang. Pilih cabang terdekat, lalu
            booking langsung lewat WhatsApp.
          </p>
        </div>

        {/* Branch grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((branch, i) => {
            const accent = accentAt(i)
            return (
            <article
              key={branch.id}
              className={`group animate-fade-up delay-${i + 1} flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${accent.ring} hover:ring-2`}
            >
              {/* Photo */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={branch.image}
                  alt={`Cabang ${branch.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mayomi-900/75 via-mayomi-900/10 to-transparent" />
                <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accent.gradient}`} aria-hidden="true" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {branch.featured && (
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-mayomi-700 shadow-sm">
                      Cabang Utama
                    </span>
                  )}
                  {branch.badge && (
                    <span className="rounded-full bg-brand-warm px-2.5 py-1 text-[11px] font-semibold text-mayomi-900 shadow-sm">
                      {branch.badge}
                    </span>
                  )}
                  {branch.ladiesOnly && (
                    <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                      Ladies Only
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-base font-bold text-white drop-shadow">
                    {branch.area}
                  </h3>
                  <p className="text-xs text-white/80">{branch.city}</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <MapPin className={`mt-0.5 h-4 w-4 flex-shrink-0 ${accent.text}`} />
                  <span className="leading-relaxed">{branch.address}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Clock className={`h-4 w-4 flex-shrink-0 ${accent.text}`} />
                    <span>Setiap hari, {branch.hours}</span>
                  </div>
                  {!branch.openingSoon && (
                    <div className="pl-6">
                      <OpenStatus />
                    </div>
                  )}
                </div>

                <a
                  href={telUrl(branch)}
                  className="flex items-center gap-2.5 text-sm font-medium text-primary transition-colors hover:text-mayomi-700"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {branch.phone}
                </a>

                <div className="flex flex-wrap gap-1.5">
                  {branch.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full ${accent.soft} px-2.5 py-1 text-[11px] font-semibold ${accent.text}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions pinned to the bottom so cards line up */}
                <div className="mt-auto flex gap-2 pt-2">
                  <a
                    href={waUrl(
                      branch,
                      `Halo Mayomi ${branch.area}, saya ingin booking sesi massage.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110"
                  >
                    Booking
                  </a>
                  <a
                    href={mapsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka lokasi ${branch.name} di Google Maps`}
                    className="flex items-center justify-center gap-1 rounded-full border border-primary/30 px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                  >
                    Peta
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
