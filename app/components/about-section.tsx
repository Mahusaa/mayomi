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
import { Badge } from "@/components/ui/badge"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("story")

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Client",
      content: "Mayomi has transformed my wellness routine. The therapists are incredibly skilled and the atmosphere is so relaxing. I feel rejuvenated after every visit!",
      rating: 5,
      avatar: "/placeholder.svg",
    },
    {
      name: "Michael Chen",
      role: "First-time Visitor",
      content: "As someone new to massage therapy, I was nervous at first. But the team at Mayomi made me feel so comfortable. The 90-minute session was absolutely perfect.",
      rating: 5,
      avatar: "/placeholder.svg",
    },
    {
      name: "Emma Rodriguez",
      role: "Wellness Enthusiast",
      content: "Ive tried many massage places, but Mayomi stands out for their attention to detail and genuine care for clients. The pricing is also very reasonable for the quality.",
      rating: 5,
      avatar: "/placeholder.svg",
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
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              About Mayomi
            </Badge>
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
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="border-l-4 border-primary/30 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          &quot;{testimonial.content}&quot;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary text-sm font-semibold">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">{testimonial.name}</div>
                            <div className="text-gray-500 text-xs">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 
