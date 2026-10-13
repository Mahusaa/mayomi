"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Clock, Info, MapPin, Package, Plus, Sparkles } from "lucide-react"
import { useCart } from "@/app/contexts/CartContext"
import { BRANCHES } from "@/lib/branches"
import {
  ADDONS,
  PACKAGES,
  TAX_NOTE,
  TREATMENTS,
  formatIDR,
  type MenuAddon,
  type MenuOption,
  type MenuPackage,
  type Treatment,
} from "@/lib/menu"
import MenuIcon from "./menu-icon"
import Toast from "./Toast"

const SECTIONS = [
  { id: "treatments", label: "Treatment" },
  { id: "packages", label: "Paket" },
  { id: "addons", label: "Add-on" },
]

const LADIES_ONLY = BRANCHES.filter((b) => b.ladiesOnly)

export default function PricingPage() {
  const { addItem } = useCart()
  const [toast, setToast] = useState({ message: "", isVisible: false })

  const notify = (message: string) => setToast({ message, isVisible: true })

  const handleAddTreatment = (treatment: Treatment, option: MenuOption) => {
    addItem({
      id: `${treatment.id}-${option.duration}`,
      name: `${treatment.name} ${option.duration}'`,
      price: option.price,
      duration: `${option.duration} menit`,
      category: "service",
      iconType: treatment.icon,
    })
    notify(`${treatment.name} ${option.duration} menit ditambahkan ke keranjang`)
  }

  const handleAddPackage = (pkg: MenuPackage) => {
    addItem({
      id: `package-${pkg.id}`,
      name: pkg.name,
      price: pkg.price,
      duration: `${pkg.duration} menit`,
      category: "package",
      description: pkg.includes.join(" + "),
      iconType: "package",
    })
    notify(`${pkg.name} ditambahkan ke keranjang`)
  }

  const handleAddAddon = (addon: MenuAddon) => {
    addItem({
      id: `addon-${addon.id}`,
      name: addon.name,
      price: addon.price,
      duration: `${addon.duration} menit`,
      category: "addon",
      description: addon.description,
      iconType: addon.icon,
    })
    notify(`${addon.name} ditambahkan ke keranjang`)
  }

  return (
    <div className="min-h-screen bg-wash">
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ message: "", isVisible: false })}
        type="success"
      />

      {/* Page header */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image src="/massage.webp" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-mayomi-900/90 via-mayomi-900/60 to-mayomi-900/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-8 md:pb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
              Layanan &amp; Harga
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Pilih Treatment Kamu
            </h1>
            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-white/75">
              Harga sama di seluruh {BRANCHES.length} cabang Mayomi. {TAX_NOTE}.
            </p>
          </div>
        </div>
      </div>

      {/* Section nav */}
      <nav
        aria-label="Kategori layanan"
        className="sticky top-16 z-30 border-b border-black/5 bg-cream/90 backdrop-blur-md md:top-20"
      >
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto px-4 py-3 md:px-8 no-scrollbar">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-medium text-mayomi-700 transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-4">
        {/* Treatments */}
        <section id="treatments" className="scroll-mt-36 mb-16">
          <SectionHeading
            icon={<Sparkles className="h-5 w-5" />}
            title="Treatment"
            subtitle="Pilih durasi, lalu tambahkan ke keranjang untuk booking via WhatsApp."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {TREATMENTS.map((treatment) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onAdd={(option) => handleAddTreatment(treatment, option)}
              />
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-36 mb-16">
          <SectionHeading
            icon={<Package className="h-5 w-5" />}
            title="Paket Hemat"
            subtitle="Body Massage 60 menit dipadukan dengan treatment favorit, total 90 menit."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  pkg.popular ? "ring-2 ring-primary" : "ring-1 ring-black/5"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white shadow">
                    Paling Favorit
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {pkg.code}
                </span>
                <h3 className="mt-1 text-lg font-bold leading-snug text-gray-800">
                  {pkg.name.replace(/^Mayomi /, "")}
                </h3>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration} menit
                  </div>
                  <div className="mt-1 text-2xl font-bold text-primary">{formatIDR(pkg.price)}</div>
                  <button
                    type="button"
                    onClick={() => handleAddPackage(pkg)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                      pkg.popular
                        ? "bg-primary text-white hover:bg-mayomi-700"
                        : "border border-primary/30 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Tambah
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section id="addons" className="scroll-mt-36 mb-12">
          <SectionHeading
            icon={<Plus className="h-5 w-5" />}
            title="Add-on"
            subtitle="Tambahan untuk melengkapi sesi kamu."
          />
          <div className="divide-y divide-black/5 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="flex items-center gap-4 p-4 md:p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-mayomi-50 text-primary">
                  <MenuIcon name={addon.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800">{addon.name}</h3>
                  <p className="text-sm text-gray-500">{addon.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{formatIDR(addon.price)}</div>
                  <div className="text-xs text-gray-400">{addon.duration} menit</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddAddon(addon)}
                  aria-label={`Tambah ${addon.name}`}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <aside className="mb-16 rounded-2xl border border-gold/30 bg-gold-soft/40 p-5 md:p-6">
          <h3 className="flex items-center gap-2 font-semibold text-mayomi-800">
            <Info className="h-4 w-4" />
            Info Penting
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-mayomi-800/80">
            <li>{TAX_NOTE}.</li>
            <li>Harga di atas untuk Regular Room. Private room tersedia dengan tambahan biaya.</li>
            {LADIES_ONLY.length > 0 && (
              <li className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  Cabang {LADIES_ONLY.map((b) => b.area).join(", ")} khusus untuk tamu wanita
                  (ladies only).
                </span>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  )
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
        <p className="mt-1 text-sm md:text-base text-gray-600">{subtitle}</p>
      </div>
    </div>
  )
}

function TreatmentCard({
  treatment,
  onAdd,
}: {
  treatment: Treatment
  onAdd: (option: MenuOption) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 md:p-6 shadow-soft ring-1 ring-black/5 transition-shadow hover:shadow-lift">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mayomi-100 to-mayomi-200 text-primary">
          <MenuIcon name={treatment.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            {treatment.category}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{treatment.name}</h3>
        </div>
      </div>

      <p className={`mt-3 text-sm leading-relaxed text-gray-600 ${expanded ? "" : "line-clamp-2"}`}>
        {treatment.description}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-1 self-start text-xs font-semibold text-primary hover:underline"
      >
        {expanded ? "Sembunyikan" : "Selengkapnya"}
      </button>

      <div className="mt-4 space-y-2">
        {treatment.options.map((option) => (
          <div
            key={option.duration}
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
              option.popular ? "border-primary/40 bg-mayomi-50" : "border-black/10"
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{option.duration} menit</span>
              {option.popular && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                  Favorit
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary">{formatIDR(option.price)}</span>
              <button
                type="button"
                onClick={() => onAdd(option)}
                aria-label={`Tambah ${treatment.name} ${option.duration} menit`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-mayomi-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
