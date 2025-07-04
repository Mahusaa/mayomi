"use client"

import { useState } from "react"
import { useCart } from "@/app/contexts/CartContext"
import {
  Clock,
  Sparkles,
  Package,
  Plus,
  Star,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  Zap,
  Heart,
  Leaf,
  ShoppingCart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Toast from "./Toast"
import React from "react"
import Image from 'next/image'

// Type definitions
interface ServiceOption {
  duration: string;
  price: string;
  popular: boolean;
  description: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  options: ServiceOption[];
}

interface Package {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  savings: string;
  popular: boolean;
  includes: string[];
}

interface Addon {
  name: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

export default function PricingPage() {
  const { addItem } = useCart()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [currentAddOn, setCurrentAddOn] = useState<number>(0)
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({ message: '', isVisible: false })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleAddService = (service: Service, option: ServiceOption) => {
    addItem({
      id: `${service.id}-${option.duration}`,
      name: `${service.name} - ${option.duration}`,
      price: parseInt(option.price.replace(/,/g, '')),
      duration: option.duration,
      category: 'service' as const,
      description: option.description,
      iconType: getIconType(service.icon),
    })
    setToast({ message: `${service.name} - ${option.duration} added to cart!`, isVisible: true })
  }

  const handleAddPackage = (pkg: Package) => {
    addItem({
      id: `package-${pkg.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: pkg.name,
      price: parseInt(pkg.price.replace(/,/g, '')),
      category: 'package' as const,
      description: pkg.description,
      iconType: 'package',
    })
    setToast({ message: `${pkg.name} package added to cart!`, isVisible: true })
  }

  const getIconType = (icon: React.ReactNode): string => {
    // Simple function to determine icon type based on the icon component
    if (React.isValidElement(icon)) {
      const iconType = icon.type as { displayName?: string; name?: string };
      const iconName = iconType.displayName || iconType.name || '';
      if (iconName.includes('Sparkles')) return 'sparkles';
      if (iconName.includes('Heart')) return 'heart';
      if (iconName.includes('Zap')) return 'zap';
      if (iconName.includes('Leaf')) return 'leaf';
      if (iconName.includes('Clock')) return 'clock';
      if (iconName.includes('Package')) return 'package';
      if (iconName.includes('Plus')) return 'plus';
    }
    return 'sparkles'; // default fallback
  }

  const handleAddAddon = (addon: Addon) => {
    addItem({
      id: `addon-${addon.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: addon.name,
      price: parseInt(addon.price.replace(/,/g, '')),
      category: 'addon' as const,
      description: addon.description,
      iconType: getIconType(addon.icon),
    })
    setToast({ message: `${addon.name} addon added to cart!`, isVisible: true })
  }

  const massageServices = [
    {
      id: "full-body",
      name: "Full Body Massage",
      description: "Complete relaxation for your entire body with therapeutic techniques",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-primary-100 to-primary-200",
      benefits: ["Stress relief", "Muscle tension release", "Improved circulation", "Deep relaxation"],
      options: [
        { duration: "60 min", price: "85,000", popular: false, description: "Perfect for first-time visitors" },
        { duration: "90 min", price: "125,000", popular: true, description: "Most popular choice" },
        { duration: "120 min", price: "170,000", popular: false, description: "Ultimate relaxation experience" },
      ],
    },
    {
      id: "reflexology",
      name: "Reflexology",
      description: "Therapeutic pressure point massage focusing on feet and hands",
      icon: <Heart className="h-6 w-6" />,
      color: "from-green-100 to-green-200",
      benefits: ["Improved energy flow", "Better sleep quality", "Reduced anxiety", "Enhanced well-being"],
      options: [
        { duration: "60 min", price: "90,000", popular: false, description: "Essential reflexology session" },
        { duration: "90 min", price: "130,000", popular: true, description: "Comprehensive treatment" },
        { duration: "120 min", price: "180,000", popular: false, description: "Extended therapeutic session" },
      ],
    },
    {
      id: "lava-stone",
      name: "Lava Stone Massage",
      description: "Hot stone therapy for deep muscle relaxation and healing",
      icon: <Zap className="h-6 w-6" />,
      color: "from-orange-100 to-orange-200",
      benefits: ["Deep muscle relief", "Improved blood flow", "Stress reduction", "Pain management"],
      options: [{ duration: "90 min", price: "175,000", popular: true, description: "Signature hot stone experience" }],
    },
    {
      id: "facial",
      name: "Facial Treatment",
      description: "Rejuvenating skincare experience for glowing, healthy skin",
      icon: <Leaf className="h-6 w-6" />,
      color: "from-pink-100 to-pink-200",
      benefits: ["Skin rejuvenation", "Deep cleansing", "Anti-aging effects", "Hydration boost"],
      options: [
        { duration: "30 min", price: "70,000", popular: false, description: "Quick refresh facial" },
        { duration: "60 min", price: "90,000", popular: true, description: "Complete facial treatment" },
      ],
    },
  ]

  const packages = [
    {
      name: "Body 60' + Facial 30'",
      description: "Perfect combination for total wellness and beauty",
      price: "145,000",
      originalPrice: "155,000",
      savings: "10,000",
      popular: true,
      includes: ["60-minute full body massage", "30-minute facial treatment", "Complimentary herbal tea"],
    },
    {
      name: "Body 60' + Reflexology 30'",
      description: "Full body relaxation with therapeutic foot therapy",
      price: "150,000",
      originalPrice: "165,000",
      savings: "15,000",
      popular: false,
      includes: ["60-minute full body massage", "30-minute reflexology", "Aromatherapy enhancement"],
    },
    {
      name: "Body 60' + Scrub 30'",
      description: "Massage with exfoliating treatment for smooth skin",
      price: "155,000",
      originalPrice: "165,000",
      savings: "10,000",
      popular: false,
      includes: ["60-minute full body massage", "30-minute body scrub", "Moisturizing treatment"],
    },
  ]

  const addOns = [
    {
      name: "Extra Time 30'",
      price: "50,000",
      icon: <Clock className="h-5 w-5" />,
      description: "Extend any service by 30 minutes",
      category: "Time Extension",
    },
    {
      name: "Foot Massage",
      price: "70,000",
      icon: <Heart className="h-5 w-5" />,
      description: "Focused foot and ankle massage",
      category: "Specialty Treatment",
    },
    {
      name: "Ear Candle",
      price: "70,000",
      icon: <Leaf className="h-5 w-5" />,
      description: "Traditional ear cleaning therapy",
      category: "Wellness Treatment",
    },
    {
      name: "Scrub 30'",
      price: "80,000",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Exfoliating body scrub treatment",
      category: "Skin Care",
    },
    {
      name: "Scrub 60'",
      price: "110,000",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Extended full body scrub",
      category: "Skin Care",
    },
    {
      name: "Kerokan (Scraping)",
      price: "50,000",
      icon: <Zap className="h-5 w-5" />,
      description: "Traditional Indonesian healing technique",
      category: "Traditional Therapy",
    },
  ]

  const retailProducts = [
    {
      name: "Essential Oils & Massage Oils",
      category: "Aromatherapy",
      description: "Premium quality oils for home use",
      estimatedPrice: "Starting from 75,000 IDR",
    },
    {
      name: "Aromatherapy (Diffuser, Perfume)",
      category: "Wellness Products",
      description: "Complete aromatherapy collection",
      estimatedPrice: "Starting from 150,000 IDR",
    },
  ]

  return (
    <div className="min-h-screen bg-secondary">
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ message: '', isVisible: false })}
        type="success"
      />
      <div className="mx-2">
        <div className="w-full mb-10">
          <Image
            src="/massage.webp"
            alt="Massage Service Header"
            width={1600}
            height={400}
            className="w-full h-40 md:h-64 shadow-lg"
            priority
          />
        </div>
        <section className="mb-20" id="services">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Choose Your Treatment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from our range of therapeutic treatments, each carefully designed to address your specific wellness
              needs
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {massageServices.map((service) => (
              <Card
                key={service.id}
                className={`group transition-all duration-500 border-2 hover:shadow-2xl ${selectedService === service.id
                  ? "border-primary shadow-xl scale-[1.02]"
                  : "border-gray-200 hover:border-primary/50 shadow-lg"
                  }`}
              >
                <Collapsible open={expandedSections[service.id]} onOpenChange={() => toggleSection(service.id)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader
                      className={`cursor-pointer flex items-center transition-all bg-white`}
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl shadow-sm text-primary bg-gradient-to-r ${service.color}`}>
                            {service.icon}
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-lg md:text-2xl text-gray-800 mb-2">{service.name}</CardTitle>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            {service.options.length} Options
                          </Badge>
                          {expandedSections[service.id] ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="p-6 md:p-8">
                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary" />
                          Key Benefits
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Options */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Duration & Pricing
                        </h4>
                        {service.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${option.popular
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-gray-200 hover:border-primary/30 bg-white"
                              }`}
                          >
                            {option.popular && (
                              <div className="absolute -top-3 left-6">
                                <Badge className="bg-primary text-white shadow-lg">Most Popular</Badge>
                              </div>
                            )}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Clock className="h-4 w-4 text-primary" />
                                  <span className="font-semibold text-base text-gray-800 ">{option.duration}</span>
                                </div>
                                <p className="text-gray-600 text-xs">{option.description}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-lg md:text-3xl font-bold text-primary">IDR {option.price}</div>
                                </div>
                                <Button
                                  onClick={() => handleAddService(service, option)}
                                  className={`${option.popular
                                    ? "bg-primary hover:bg-primary-700 text-white"
                                    : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                                    } px-6 py-2 font-semibold flex items-center gap-2`}
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Package Deals */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="h-7 w-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Value Packages</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Combine treatments for maximum benefits and savings. Our curated packages offer the perfect wellness
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${pkg.popular
                  ? "border-2 border-primary shadow-xl ring-4 ring-primary/20"
                  : "border border-gray-200 shadow-lg hover:border-primary/50"
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary-600 text-white px-6 py-2 text-sm font-bold">
                    🏆 Best Value
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{pkg.name}</h3>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>

                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg text-gray-500 line-through">IDR {pkg.originalPrice}</span>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Save {pkg.savings}</Badge>
                      </div>
                      <div className="text-4xl font-bold text-primary">IDR {pkg.price}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Package Includes:</h4>
                    {pkg.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleAddPackage(pkg)}
                    className={`w-full py-3 font-semibold flex items-center justify-center gap-2 ${pkg.popular
                      ? "bg-primary hover:bg-primary-700 text-white shadow-lg"
                      : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add Package to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Add-ons */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Plus className="h-7 w-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Adds On</h2>
            </div>
          </div>

          {/* Mobile: Carousel, Desktop: Grid */}
          <div className="block sm:hidden relative">
            <Carousel
              className="w-full"
              opts={{ loop: true }}
              setApi={api => {
                if (api) {
                  api.on("select", () => {
                    setCurrentAddOn(api.selectedScrollSnap())
                  })
                }
              }}
            >
              <CarouselContent className="px-4">
                {addOns.map((addon) => (
                  <CarouselItem key={addon.name}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary/50 w-full max-w-xs mx-auto">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {addon.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-800">{addon.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {addon.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-xl font-bold text-primary">IDR {addon.price}</div>
                              <Button
                                onClick={() => handleAddAddon(addon)}
                                size="sm"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-1"
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Arrows and dots below the slider */}
              <div className="flex flex-col items-center mt-4 gap-2">
                <div className="flex gap-4">
                </div>
                <div className="flex justify-center gap-3 mt-2">
                  <CarouselPrevious className="static relative left-0 top-0" />
                  {addOns.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-2 h-2 rounded-full transition-colors ${currentAddOn === idx ? "bg-primary" : "bg-primary/30"}`}
                    />
                  ))}

                  <CarouselNext className="static relative left-0 top-0" />
                </div>
              </div>
            </Carousel>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <Card
                key={addon.name}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {addon.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{addon.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {addon.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-primary">IDR {addon.price}</div>
                        <Button
                          onClick={() => handleAddAddon(addon)}
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-1"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Coming Soon Section */}
        <section className="mb-20">
          <Card className="border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-secondary overflow-hidden">
            <CardContent className="p-4 text-center relative">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-5"></div>
              <div className="relative max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Premium Products Launching Soon</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {retailProducts.map((product, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary hover:bg-primary-700 text-white px-8 py-3 font-semibold">
                    <Info className="mr-2 h-4 w-4" />
                    Get Notified
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

