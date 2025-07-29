import Image from "next/image";
import AboutSection from "./components/about-section";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";



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
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl px-6 md:px-16 py-16 md:py-28 items-start">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1 rounded-full backdrop-blur-sm border border-white/30 mb-2"> Everyone Deserves a Good Massage</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 text-left">
            Relax, Rejuvenate, <span role="img" aria-label="woman in lotus">🧘‍♀️</span> <br className="hidden md:block" />
            and Book Your Perfect Massage Anytime, Anywhere
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
            <a
              href="https://wa.me/6285711383843"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Now on WhatsApp"
              className="flex items-center justify-center gap-2 px-7 py-3 border border-white text-white rounded-full font-bold text-base bg-transparent hover:bg-white/10 transition-all shadow focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-auto max-w-xs"
              style={{ minWidth: 0 }}
            >
              <svg viewBox="0 0 32 32" width="22" height="22" fill="white" className="inline-block align-middle" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd" /></svg>
              Book Now
            </a>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 px-7 py-3 border border-white text-white rounded-full font-bold text-base bg-white/20 hover:bg-white/30 transition-all shadow focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-auto max-w-xs backdrop-blur-sm"
              style={{ minWidth: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              View Services
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Enhanced Call to Action */}
      <section className="flex justify-center items-center px-4 sm:px-6 lg:px-8 mb-10 bg-[#F7F3EF]">
        <div className="relative w-full max-w-2xl rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-primary/20 bg-white/90 dark:bg-primary-950/90 min-h-[220px] flex items-center justify-center transition-colors duration-300" style={{ backdropFilter: 'blur(5px)' }}>
          {/* Background image with soft overlay for harmony */}
          <Image
            src="/cta-lastt.jpg"
            alt="Wellness Spa"
            fill
            className="object-cover object-center z-0 opacity-90"
          />
          <div className="absolute inset-0 z-10" />
          <div className="relative z-20 w-full max-w-xl mx-auto px-6 sm:px-8 py-8 sm:py-10 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow">Ready to Relax & Rejuvenate?</h3>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 font-medium max-w-md mx-auto leading-relaxed">
              Join <span className="font-bold text-amber-500">500+ happy clients</span> who trust us for their wellness journey.
            </p>
            <div className="w-full flex justify-center">
              <Link href="https://wa.me/6285711383843" className="w-full max-w-xs sm:max-w-sm">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-500 text-primary font-bold px-8 py-4 text-base shadow-lg transition-all rounded-full w-full h-14 sm:h-12"
                >
                  <span className="mr-2">✨</span> Book Your Experience Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

