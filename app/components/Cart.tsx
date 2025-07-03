"use client"

import { useMemo } from 'react'
import { useCart } from '@/app/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  Package,
  Sparkles,
  Heart,
  Leaf,
  Zap,
} from 'lucide-react'

export default function Cart() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
    getTotalItems,
    getTotalPrice
  } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryIcon = (category: string, iconType?: string) => {
    // If we have a specific icon type, use it
    if (iconType) {
      switch (iconType) {
        case 'sparkles':
          return <Sparkles className="h-4 w-4" />
        case 'heart':
          return <Heart className="h-4 w-4" />
        case 'zap':
          return <Zap className="h-4 w-4" />
        case 'leaf':
          return <Leaf className="h-4 w-4" />
        case 'clock':
          return <Clock className="h-4 w-4" />
        case 'package':
          return <Package className="h-4 w-4" />
        case 'plus':
          return <Plus className="h-4 w-4" />
        default:
          break
      }
    }

    // Fallback to category-based icons
    switch (category) {
      case 'service':
        return <Sparkles className="h-4 w-4" />
      case 'package':
        return <Package className="h-4 w-4" />
      case 'addon':
        return <Plus className="h-4 w-4" />
      case 'product':
        return <Leaf className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'package':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'addon':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'product':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }


  const whatsappNumber = '081333443299'
  const whatsappMessage = useMemo(() => {
    if (!state.items.length) return ''
    let message = `Hello, I would like to order the following services at Mayomi:%0A%0A`
    state.items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} x${item.quantity} - Rp${item.price.toLocaleString('id-ID')}%0A`
    })
    message += `%0ATotal: Rp${getTotalPrice().toLocaleString('id-ID')}`
    return message
  }, [state.items, getTotalPrice])

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]
        "
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[120] transform transition-transform duration-300 ease-in-out
        sm:max-w-md sm:w-full
        max-sm:w-full max-sm:max-w-full max-sm:rounded-none max-sm:p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5
            max-sm:p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg max-sm:p-1.5">
                <ShoppingCart className="h-6 w-6 text-primary max-sm:h-5 max-sm:w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 max-sm:text-lg">Your Cart</h2>
                <p className="text-sm text-gray-600 max-sm:text-xs">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors max-sm:p-3 max-sm:-mr-2"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-gray-600 max-sm:h-7 max-sm:w-7" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 max-sm:p-3">
            {state.items.length === 0 ? (
              <div className="text-center py-12 max-sm:py-8">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center max-sm:w-12 max-sm:h-12 max-sm:p-2">
                  <ShoppingCart className="h-8 w-8 text-gray-400 max-sm:h-6 max-sm:w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 max-sm:text-base">Your cart is empty</h3>
                <p className="text-gray-600 mb-6 max-sm:text-xs max-sm:mb-4">Add some services to get started!</p>
                <Button
                  onClick={closeCart}
                  className="bg-primary hover:bg-primary/90 text-white max-sm:w-full max-sm:py-3 max-sm:text-sm"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="border border-gray-200 hover:shadow-md transition-shadow max-sm:text-sm">
                    <CardContent className="p-4 max-sm:p-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getCategoryColor(item.category)} max-sm:text-[10px]`}
                            >
                              {getCategoryIcon(item.category, item.iconType)}
                              {item.category}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1 max-sm:text-sm">{item.name}</h4>
                          {item.duration && (
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1 max-sm:text-xs">
                              <Clock className="h-3 w-3 max-sm:h-3 max-sm:w-3" />
                              {item.duration}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-sm text-gray-500 mb-3 max-sm:text-xs">{item.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary max-sm:text-base">
                              {formatPrice(item.price)}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 max-sm:h-7 max-sm:w-7"
                              >
                                <Minus className="h-3 w-3 max-sm:h-3 max-sm:w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium max-sm:w-6">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 max-sm:h-7 max-sm:w-7"
                              >
                                <Plus className="h-3 w-3 max-sm:h-3 max-sm:w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 max-sm:h-7 max-sm:w-7"
                              >
                                <Trash2 className="h-3 w-3 max-sm:h-3 max-sm:w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-secondary/30 to-primary/5 max-sm:p-3">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 max-sm:text-base">Total</span>
                  <span className="text-2xl font-bold text-primary max-sm:text-lg">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <div className="flex gap-2 max-sm:flex-col">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 max-sm:py-3 max-sm:text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2 max-sm:h-4 max-sm:w-4" />
                    Clear Cart
                  </Button>
                  <a
                    href={`https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition max-sm:py-3 max-sm:text-sm shadow"
                    style={{ textAlign: 'center' }}
                  >
                    <svg viewBox="0 0 32 32" width="22" height="22" fill="white" className="inline-block align-middle" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd" /></svg>
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 
