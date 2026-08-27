import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { BRANCHES, mapsUrl, waUrl, telUrl } from "@/lib/branches"

export default function BranchesSection() {
  return (
    <section id="branches" className="bg-wash py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <MapPin className="h-3.5 w-3.5" />
            4 Cabang
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-primary text-balance">
            Temukan Mayomi Terdekat
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed text-balance">
            Kini hadir di empat lokasi di Jakarta Selatan dan Tangerang, termasuk
            cabang terbaru kami di Gading Serpong.
          </p>
        </div>

        {/* Branch grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((branch, i) => (
            <article
              key={branch.id}
              className={`group animate-fade-up delay-${i + 1} flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-mayomi-900/70 via-mayomi-900/10 to-transparent" />
                {branch.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm">
                    Cabang Utama
                  </span>
                )}
                {branch.id === "gading-serpong" && (
                  <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                    Baru Dibuka
                  </span>
                )}
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
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="leading-relaxed">{branch.address}</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Setiap hari, {branch.hours}</span>
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
                      className="rounded-full bg-mayomi-50 px-2.5 py-1 text-[11px] font-medium text-mayomi-700"
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
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mayomi-700"
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
          ))}
        </div>
      </div>
    </section>
  )
}
