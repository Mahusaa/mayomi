"use client"

import { usePathname } from 'next/navigation'
import { ChevronUp, ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'
import { formatIDR } from '@/lib/menu'

// Admin pages have nothing to do with the cart.
const HIDDEN_ON = ['/editor', '/sign-in']

/** Mobile-only bar that keeps the cart one tap away once it has items. */
export default function CartBar() {
  const pathname = usePathname()
  const { state, toggleCart, getTotalItems, getTotalPrice } = useCart()

  if (state.items.length === 0 || state.isOpen) return null
  if (HIDDEN_ON.some((path) => pathname.startsWith(path))) return null

  return (
    <>
      {/* Spacer so the bar never covers the end of the page */}
      <div className="h-24 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
        <button
          type="button"
          onClick={toggleCart}
          className="flex w-full items-center gap-3 rounded-2xl bg-brand px-4 py-3.5 text-white shadow-lift transition-all hover:brightness-110"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-warm px-1 text-[11px] font-bold text-mayomi-900">
              {getTotalItems()}
            </span>
          </span>
          <span className="flex-1 text-left">
            <span className="block text-xs text-white/75">Estimasi sebelum pajak</span>
            <span className="block font-bold">{formatIDR(getTotalPrice())}</span>
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold">
            Lihat keranjang
            <ChevronUp className="h-4 w-4" />
          </span>
        </button>
      </div>
    </>
  )
}
