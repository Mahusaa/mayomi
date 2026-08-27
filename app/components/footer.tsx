import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { BRANCHES, OPERATING_HOURS, mapsUrl, telUrl } from "@/lib/branches"
export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-[#5A6B4A] to-[#6B7B5A] text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logos-mayomi.png"
                alt="Mayomi Logo"
                width={80}
                height={80}
                className="mr-3"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Professional massage and wellness services for your relaxation and rejuvenation needs.
              Experience the perfect blend of traditional and modern techniques.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/mayomi.jkt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/6285212586168"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="Contact us on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="text-white/80 hover:text-white transition-colors duration-300">Full Body Massage</Link></li>
              <li><Link href="/pricing" className="text-white/80 hover:text-white transition-colors duration-300">Reflexology</Link></li>
              <li><Link href="/pricing" className="text-white/80 hover:text-white transition-colors duration-300">Lava Stone Massage</Link></li>
              <li><Link href="/pricing" className="text-white/80 hover:text-white transition-colors duration-300">Facial Treatment</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/home" className="text-white/80 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/#about" className="text-white/80 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link href="/pricing" className="text-white/80 hover:text-white transition-colors duration-300">Services</Link></li>
              <li><Link href="/home" className="text-white/80 hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Branches */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Our Branches</h4>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                {BRANCHES.length} Cabang
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-white">{branch.area}</span>
                    {branch.id === "gading-serpong" && (
                      <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                        Baru
                      </span>
                    )}
                  </div>
                  <a
                    href={mapsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </a>
                  <a
                    href={telUrl(branch)}
                    className="mt-2 flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                    {branch.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Buka setiap hari, {OPERATING_HOURS}
              </span>
              <a
                href="mailto:mayomi.jkt@gmail.com"
                className="hover:text-white transition-colors"
              >
                mayomi.jkt@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} Mayomi Family Massage & Wellness. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link href="/sitemap" className="text-white/60 hover:text-white transition-colors duration-300">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
