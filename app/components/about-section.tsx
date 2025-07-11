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
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("story")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Family Warmth",
      description: "Creating a welcoming environment where every client feels like part of our family",
      color: "from-red-100 to-red-200",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Professional Excellence",
      description: "Skilled therapists committed to your safety, comfort, and wellness journey",
      color: "from-blue-100 to-blue-200",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Holistic Wellness",
      description: "Promoting physical and mental wellness for a balanced, productive lifestyle",
      color: "from-green-100 to-green-200",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Affordable Luxury",
      description: "Premium quality services accessible to everyone, without compromising on excellence",
      color: "from-purple-100 to-purple-200",
    },
  ]

  const tabs = [
    { id: "story", label: "Our Story", icon: <Heart className="h-4 w-4" /> },
    { id: "mission", label: "Mission & Vision", icon: <Star className="h-4 w-4" /> },
    { id: "values", label: "Core Values", icon: <Award className="h-4 w-4" /> },
    { id: "team", label: "Our Team", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-secondary">
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
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
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
                          : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
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
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
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
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
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
                            className="focus:outline-none"
                            style={{ padding: 0, background: 'none', border: 'none' }}
                          >
                            <Image
                              src={`/review-${num}.png`}
                              alt={`Google Review ${num}`}
                              className="shadow-md border border-gray-100"
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

        <section className="my-16 py-10 px-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8" id="about-place">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <span className="inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Reservation</span>
            </h2>
            <div className="flex flex-col gap-3 text-gray-700 text-base">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="font-medium">Alamat:</span>
                <a 
                  href="https://maps.google.com/?q=Jl.+Gabus+Raya+No.34A,+RT./RW:4/RW.9,+Ps.+Minggu,+Kota+Jakarta+Selatan,+Daerah+Khusus+Ibukota+Jakarta+12520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Jl. Gabus Raya No.34A, RT./RW:4/RW.9, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">Jam Operasional:</span>
                  <div className="mt-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Buka Setiap Hari</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="font-medium">10:00</span>
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span className="font-medium">21:00</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-amber-600 font-medium">11 Jam Pelayanan</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7 1.06l.94 1.88a2 2 0 001.7 1.06h3.24a2 2 0 001.7-1.06l.94-1.88A2 2 0 0116.72 3H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
                <span className="font-medium">Telepon:</span>
                <a href="tel:085711383843" className="text-primary hover:underline">0857-1138-3843</a>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/gallery4.jpg" alt="Mayomi Location" width={320} height={220} className="rounded-xl shadow-lg object-cover w-full max-w-xs" />
          </div>
        </section>

        <div id="gallery" className="mt-16 py-12 px-4 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto flex flex-col items-center gap-4">
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
              <Image
                src={zoomedImage}
                alt="Zoomed Review"
                width={1920}
                height={1080}
                style={{ maxWidth: '100vw', maxHeight: '100vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
                className="shadow-none border-none bg-transparent"
                unoptimized
              />
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
