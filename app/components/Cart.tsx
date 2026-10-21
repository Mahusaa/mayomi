"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, Clock, Info, MapPin, Minus, Plus, ShoppingCart, Trash2, User, Users, X } from 'lucide-react'
import { useCart, type CartItem } from '@/app/contexts/CartContext'
import { BRANCHES, CLOSE_HOUR, OPEN_HOUR, waUrl } from '@/lib/branches'
import { TAX_NOTE, TAX_RATE, formatIDR } from '@/lib/menu'
import MenuIcon from './menu-icon'

const CATEGORY_LABEL: Record<CartItem['category'], string> = {
  service: 'Treatment',
  package: 'Paket',
  addon: 'Add-on',
  product: 'Produk',
}

const CATEGORY_ICON: Record<CartItem['category'], string> = {
  service: 'sparkles',
  package: 'package',
  addon: 'plus',
  product: 'leaf',
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Today's date in Jakarta as YYYY-MM-DD, for the date picker's minimum. */
const jakartaToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' })

const formatDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function Cart() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  } = useCart()

  const [branchId, setBranchId] = useState(BRANCHES[0].id)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(1)

  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0]
  const subtotal = getTotalPrice()
  const tax = Math.round(subtotal * TAX_RATE)

  const whatsappHref = useMemo(() => {
    const lines = state.items.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} x${item.quantity} - ${formatIDR(item.price * item.quantity)}`
    )
    const schedule = [date && formatDate(date), time && `pukul ${time.replace(':', '.')}`]
      .filter(Boolean)
      .join(', ')
    const details = [
      name.trim() && `Nama: ${name.trim()}`,
      schedule && `Jadwal: ${schedule}`,
      `Jumlah orang: ${guests}`,
    ].filter(Boolean)
    const message = [
      `Halo Mayomi ${branch.area}, saya ingin booking:`,
      '',
      ...details,
      '',
      ...lines,
      '',
      `Subtotal: ${formatIDR(subtotal)} (belum termasuk pajak)`,
    ].join('\n')
    return waUrl(branch, message)
  }, [state.items, branch, subtotal, name, date, time, guests])

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Keranjang"
        className="fixed right-0 top-0 z-[120] flex h-full w-full flex-col bg-cream shadow-2xl sm:max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mayomi-50 text-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Keranjang</h2>
              <p className="text-xs text-gray-500">{getTotalItems()} item</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Tutup keranjang"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Items + booking details scroll together so the totals stay pinned */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mayomi-50">
                <ShoppingCart className="h-7 w-7 text-mayomi-400" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">Keranjang masih kosong</h3>
              <p className="mb-6 text-sm text-gray-500">Pilih treatment favoritmu dulu, yuk.</p>
              <Link
                href="/pricing"
                onClick={closeCart}
                className="inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mayomi-700"
              >
                Lihat Layanan
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {state.items.map((item) => (
                  <li key={item.id} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mayomi-50 text-primary">
                        <MenuIcon name={item.iconType ?? CATEGORY_ICON[item.category]} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-deep">
                          {CATEGORY_LABEL[item.category]}
                        </span>
                        <h4 className="font-semibold leading-snug text-gray-900">{item.name}</h4>
                        {item.duration && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Hapus ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold text-primary">{formatIDR(item.price * item.quantity)}</span>
                      <div className="flex items-center gap-1 rounded-full border border-black/10 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-mayomi-50"
                          aria-label="Kurangi"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-mayomi-50"
                          aria-label="Tambah"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Booking details */}
              <section className="mt-5 space-y-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5">
                <div>
                  <h3 className="font-semibold text-gray-900">Detail booking</h3>
                  <p className="text-xs text-gray-500">
                    Opsional, tapi bikin admin cabang lebih cepat konfirmasi jadwalmu.
                  </p>
                </div>

                <div>
                  <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pilih cabang
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBranchId(b.id)}
                        aria-pressed={b.id === branchId}
                        className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                          b.id === branchId
                            ? 'border-primary bg-mayomi-50 text-mayomi-800'
                            : 'border-black/10 text-gray-600 hover:border-primary/40'
                        }`}
                      >
                        <span className="block font-semibold">{b.name.replace(/^Mayomi /, '')}</span>
                        {b.ladiesOnly && <span className="text-[10px] text-gold-deep">Ladies only</span>}
                      </button>
                    ))}
                  </div>
                  {branch.ladiesOnly && (
                    <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-gold-soft/40 px-3 py-2 text-xs text-mayomi-800">
                      <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                      Cabang {branch.area} khusus untuk tamu wanita.
                    </p>
                  )}
                </div>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                    <User className="h-4 w-4 text-primary" />
                    Nama
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama kamu"
                    autoComplete="name"
                    className={inputClass}
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      Tanggal
                    </span>
                    <input
                      type="date"
                      value={date}
                      min={jakartaToday()}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                      <Clock className="h-4 w-4 text-primary" />
                      Jam
                    </span>
                    <input
                      type="time"
                      value={time}
                      min={`${pad(OPEN_HOUR)}:00`}
                      max={`${pad(CLOSE_HOUR - 1)}:00`}
                      step={1800}
                      onChange={(e) => setTime(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                </div>

                <div>
                  <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                    <Users className="h-4 w-4 text-primary" />
                    Jumlah orang
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full border border-black/10 p-0.5">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-mayomi-50 disabled:opacity-40"
                      disabled={guests <= 1}
                      aria-label="Kurangi jumlah orang"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(10, g + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-mayomi-50"
                      aria-label="Tambah jumlah orang"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Checkout */}
        {state.items.length > 0 && (
          <div className="space-y-4 border-t border-black/5 bg-white p-5">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pajak ({Math.round(TAX_RATE * 100)}%)</span>
                <span>{formatIDR(tax)}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-bold text-gray-900">
                <span>Estimasi total</span>
                <span className="text-primary">{formatIDR(subtotal + tax)}</span>
              </div>
              <p className="text-[11px] text-gray-400">{TAX_NOTE}. Total final dikonfirmasi di kasir.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="rounded-full border border-black/10 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Kosongkan
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow transition hover:brightness-95"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="white" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd" /></svg>
                Kirim ke {branch.name.replace(/^Mayomi /, '')}
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
