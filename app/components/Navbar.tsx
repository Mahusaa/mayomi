"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setOpen(false); // Close mobile menu
  };

  return (
    <header 
      className={`fixed w-full left-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image 
            src="/logos-mayomi.png" 
            alt="Mayomi Logo" 
            width={scrolled ? 100 : 120} 
            height={scrolled ? 100 : 120} 
            className="rounded transition-all duration-300" 
            priority 
          />
          {scrolled && (
            <span className="text-primary font-bold text-lg hidden sm:block">
              Mayomi
            </span>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(sectionId)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative group ${
                  scrolled
                    ? isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                    : isActive
                      ? 'bg-white/90 text-primary shadow-md'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => scrollToSection('services')}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 border ${
              scrolled
                ? 'bg-primary hover:bg-primary/90 text-white border-primary'
                : 'bg-white/90 hover:bg-white text-primary border-white/50'
            }`}
          >
            Book Now
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 mb-1 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? 'rotate-45 translate-y-1.5' : ''}`}
          ></span>
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 mb-1 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? 'opacity-0' : ''}`}
          ></span>
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? '-rotate-45 -translate-y-1.5' : ''}`}
          ></span>
        </button>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div 
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            
            {/* Drawer */}
            <div 
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/mayomi-logo.png" 
                      alt="Mayomi Logo" 
                      width={40} 
                      height={40} 
                      className="rounded" 
                    />
                    <span className="text-primary text-xl font-bold">Mayomi</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 p-6">
                  <nav className="space-y-2">
                    {NAV_LINKS.map((link) => {
                      const sectionId = link.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      
                      return (
                        <button
                          key={link.href}
                          onClick={() => scrollToSection(sectionId)}
                          className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between ${
                            isActive
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          {link.label}
                          {isActive && (
                            <span className="w-2 h-2 bg-current rounded-full"></span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* CTA Section */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Book Your Session</span>
                    <span className="text-lg">→</span>
                  </button>
                  
                  {/* Contact Info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+62 812-3456-7890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@mayomi.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 
