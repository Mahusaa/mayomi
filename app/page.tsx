import Image from "next/image";
import PricingPage from "./components/pricing-section";
import AboutSection from "./components/about-section";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <div className="bg-[#F7F9F6] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Redesigned */}
      <section id="home" className="relative w-full min-h-[520px] flex items-center pt-20">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/massage.webp"
            alt="Massage background"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl px-6 md:px-16 py-16 md:py-28 items-start">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1 rounded-full backdrop-blur-sm border border-white/30 mb-2"> Everyone Deserves a Good Massage</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 text-left">
            Relax, Rejuvenate, <span role="img" aria-label="woman in lotus">🧘‍♀️</span> <br className="hidden md:block" />
            and Book Your Perfect Massage Anytime, Anywhere
          </h1>
          <div className="flex gap-4 mt-2">
            <a href="#services" className="bg-[#6B7B5A] hover:bg-[#556346] text-white px-6 py-3 rounded-full font-semibold shadow transition">Get Started</a>
            <a href="#about" className="bg-white/90 border border-[#6B7B5A] text-[#6B7B5A] px-6 py-3 rounded-full font-semibold hover:bg-[#F7F9F6] transition">Learn More</a>
          </div>
        </div>
      </section>

      <AboutSection />

      <PricingPage />

      {/* Enhanced Call to Action */}
      <section className="flex justify-center items-center px-2 md:px-0 mb-10 bg-[#F7F3EF]">
        <div className="relative w-full max-w-2xl rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-primary/20 bg-white/90 dark:bg-primary-950/90 min-h-[220px] flex items-center justify-center transition-colors duration-300" style={{ backdropFilter: 'blur(5px)' }}>
          {/* Background image with soft overlay for harmony */}
          <img src="/cta-lastt.jpg" alt="Wellness Spa" className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-90" />
          <div className="absolute inset-0 z-10" />
          <div className="relative z-20 w-full max-w-xl mx-auto px-4 py-8 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white drop-shadow">Ready to Relax & Rejuvenate?</h3>
            <p className="text-base sm:text-lg text-white/90 mb-4 font-medium max-w-md mx-auto">
              Join <span className="font-bold text-amber-500">500+ happy clients</span> who trust us for their wellness journey.
            </p>
            <Button
              size="lg"
              className="bg-amber-400 hover:bg-amber-500 text-primary font-bold px-8 py-3 text-base shadow-lg transition-all rounded-full w-full max-w-xs"
            >
              <span className="mr-2">✨</span> Book Your Experience Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#6B7B5A] text-white px-4 md:px-8 py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold">Mayomi Family Massage & Wellness</span> &copy; {new Date().getFullYear()}
          </div>
          <div className="flex gap-4">
            <a href="mailto:info@mayomi.com" className="hover:underline">info@mayomi.com</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
