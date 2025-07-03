"use client"

import { useCart } from '@/app/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface CartButtonProps {
  scrolled?: boolean
}

export default function CartButton({ scrolled = false }: CartButtonProps) {
  const { toggleCart, getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <Button
      onClick={toggleCart}
      variant="ghost"
      size="sm"
      className={`relative p-2 rounded-full transition-all duration-300 ${
        scrolled 
          ? 'text-gray-700 hover:text-primary hover:bg-primary/10' 
          : 'text-white/90 hover:text-white hover:bg-white/20'
      }`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  )
} 