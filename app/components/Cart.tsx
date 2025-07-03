"use client"

import { useState } from 'react'
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
  Calendar,
  Phone
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

  const [isCheckingOut, setIsCheckingOut] = useState(false)

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

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Here you would typically redirect to a checkout page or open a booking modal
    setTimeout(() => {
      setIsCheckingOut(false)
      // For now, just show a success message
      alert('Thank you for your booking! We will contact you soon to confirm your appointment.')
      clearCart()
      closeCart()
    }, 2000)
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-600">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some services to get started!</p>
                <Button
                  onClick={closeCart}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getCategoryColor(item.category)}`}
                            >
                              {getCategoryIcon(item.category, item.iconType)}
                              {item.category}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                          {item.duration && (
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.duration}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">
                              {formatPrice(item.price)}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
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
            <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-secondary/30 to-primary/5">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help? Contact us</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 
