"use client"

import { useState } from "react"
import {
  Heart,
  Users,
  Star,
  Award,
  Shield,
  Leaf,
  Sparkles,
  Quote,
  MapPin,
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';
import { BRANCHES, OPERATING_HOURS, mapsUrl, waUrl, telUrl } from '@/lib/branches';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("story")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Family Warmth",
      description: "Creating a welcoming environment where every client feels like part of our family",
      color: "from-gold-soft to-clay",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Professional Excellence",
      description: "Skilled therapists committed to your safety, comfort, and wellness journey",
      color: "from-mayomi-200 to-mayomi-300",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Holistic Wellness",
      description: "Promoting physical and mental wellness for a balanced, productive lifestyle",
      color: "from-mayomi-100 to-mayomi-200",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Affordable Luxury",
      description: "Premium quality services accessible to everyone, without compromising on excellence",
      color: "from-sand to-clay",
    },
  ]

  const tabs = [
    { id: "story", label: "Our Story", icon: <Heart className="h-4 w-4" /> },
    { id: "mission", label: "Mission & Vision", icon: <Star className="h-4 w-4" /> },
    { id: "values", label: "Core Values", icon: <Award className="h-4 w-4" /> },
    { id: "team", label: "Our Team", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="bg-wash">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero About Section */}
        <section className="mb-20" id="about">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Where Wellness Meets{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Family Care
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the story behind Mayomi Family Massage & Wellness - where professional expertise meets
              warm hospitality to create the perfect sanctuary for your relaxation journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image and Content */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-soft ring-1 ring-black/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Quote className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Your Wellness Journey Starts Here</h3>
                      <p className="text-gray-600">Professional care in a family atmosphere</p>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                          ? "bg-primary text-white shadow-md"
                          : "bg-mayomi-50 text-mayomi-700 hover:bg-mayomi-100"
                          }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[200px]">
                    {activeTab === "story" && (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          Founded with a simple yet powerful vision, Mayomi Family Massage & Wellness began as a dream
                          to make professional wellness services accessible to everyone. What started as a small family
                          business has grown into a trusted destination for relaxation and rejuvenation.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Our journey is marked by countless smiles, relaxed shoulders, and grateful clients who have
                          found their perfect wellness sanctuary. We believe that everyone deserves to experience the
                          transformative power of therapeutic massage without breaking the bank.
                        </p>
                      </div>
                    )}

                    {activeTab === "mission" && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Our Mission</h4>
                          <p className="text-gray-700 leading-relaxed">
                            To provide high-quality, affordable massage and spa services that promote wellness,
                            relaxation, and self-care for individuals and families in a warm, welcoming environment.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Our Vision</h4>
                          <p className="text-gray-700 leading-relaxed">
                            To become the leading family wellness destination, known for exceptional service,
                            professional expertise, and creating lasting positive impact on our communitys health and well-being.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "values" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {values.map((value, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-cream">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${value.color} text-primary`}>
                                {value.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">{value.title}</h4>
                                <p className="text-sm text-gray-600">{value.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "team" && (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          Our team consists of highly trained and certified massage therapists who are passionate
                          about wellness and dedicated to providing exceptional care to every client.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">5+</div>
                            <div className="text-sm text-gray-600">Certified Therapists</div>
                          </div>
                          <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">100+</div>
                            <div className="text-sm text-gray-600">Hours Training</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image and Testimonials */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-soft ring-1 ring-black/5">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">What Our Clients Say</h3>
                    <p className="text-gray-600">Real experiences from our valued clients</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-6">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="w-full flex justify-center">
                          <button
                            type="button"
                            onClick={() => setZoomedImage(`/review-${num}.png`)}
                            className="focus:outline-none transition-transform hover:scale-105"
                            style={{ padding: 0, background: 'none', border: 'none' }}
                          >
                            <Image
                              src={`/review-${num}.png`}
                              alt={`Google Review ${num}`}
                              className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                              width={600}
                              height={400}
                              style={{ height: 'auto', maxWidth: '100%', cursor: 'zoom-in' }}
                              unoptimized
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-16 max-w-5xl mx-auto" id="about-place">
          <div className="rounded-3xl bg-white p-6 md:p-10 shadow-soft ring-1 ring-black/5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Reservation</h2>
                <p className="text-gray-600">
                  Pilih cabang terdekat, lalu booking langsung lewat WhatsApp.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-mayomi-200 bg-mayomi-50 px-4 py-2 self-start md:self-auto">
                <span className="h-2 w-2 rounded-full bg-mayomi-400 animate-pulse" />
                <span className="text-sm font-medium text-mayomi-700">
                  Buka setiap hari &middot; {OPERATING_HOURS}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="group rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{branch.area}</h3>
                      <p className="text-xs text-gray-500">{branch.city}</p>
                    </div>
                    {branch.id === "gading-serpong" && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold">
                        Baru
                      </span>
                    )}
                  </div>

                  <a
                    href={mapsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </a>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={telUrl(branch)}
                      className="flex-1 rounded-full border border-primary/30 px-4 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                    >
                      {branch.phone}
                    </a>
                    <a
                      href={waUrl(branch, `Halo Mayomi ${branch.area}, saya ingin booking sesi massage.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mayomi-700"
                    >
                      Booking
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="gallery" className="mt-16 py-12 px-4 bg-white rounded-3xl shadow-soft ring-1 ring-black/5 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-primary mb-2">Gallery</h2>
          <Carousel className="w-full max-w-2xl relative">
            <CarouselContent>
              {[
                { src: '/gallery1.jpg', caption: 'Wellness Decor Wall' },
                { src: '/gallery2.jpg', caption: 'Serenity Treatment Room' },
                { src: '/gallery3.jpg', caption: 'Serene Waiting Area' },
                { src: '/gallery4.jpg', caption: 'Calm Reception Area' },
              ].map((img, i) => (
                <CarouselItem key={i} className="flex flex-col items-center justify-center">
                  <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-gray-100">
                    <Image src={img.src} alt={img.caption} width={600} height={320} className="object-cover w-full h-full" />
                  </div>
                  <span className="mt-3 text-base text-gray-700 font-medium text-center">{img.caption}</span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary/80 text-primary hover:text-white border-none shadow-lg" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary/80 text-primary hover:text-white border-none shadow-lg" />
          </Carousel>
        </div>

        {/* Zoom Modal */}
        {zoomedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setZoomedImage(null)}
            style={{ cursor: 'zoom-out' }}
          >
            <div className="relative w-full h-full flex justify-center items-center">
              <a
                href="https://g.co/kgs/i5P1Jzm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              >
                <Image
                  src={zoomedImage}
                  alt="Zoomed Review - Click to view Google Reviews"
                  width={1920}
                  height={1080}
                  style={{ maxWidth: '100vw', maxHeight: '100vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
                  className="shadow-none border-none bg-transparent hover:opacity-90 transition-opacity"
                  unoptimized
                />
              </a>
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 rounded-full px-3 py-1 hover:bg-black/80 transition"
                onClick={e => { e.stopPropagation(); setZoomedImage(null); }}
                aria-label="Close zoom"
              >
                &times;
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
} 
