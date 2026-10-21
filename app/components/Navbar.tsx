"use client"
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import { MapPin } from 'lucide-react';
import { BRANCHES, OPERATING_HOURS } from '@/lib/branches';
import CartButton from './CartButton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import "@/app/globals.css";
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/server/auth';
import { signOut } from '../(login)/action';
import { useCart } from '@/app/contexts/CartContext'

// `section` links scroll within the home page; the others are separate routes.
const NAV_LINKS = [
  { id: 'home', href: '/', label: 'Beranda', section: 'home' },
  { id: 'about', href: '/#about', label: 'Tentang Kami', section: 'about' },
  { id: 'branches', href: '/#branches', label: 'Cabang', section: 'branches' },
  { id: 'pricing', href: '/pricing', label: 'Layanan' },
  { id: 'blog', href: '/blog', label: 'Blog' },
];
type NavLink = (typeof NAV_LINKS)[number];

/** Home page sections in page order, used for scroll-spy. */
const HOME_SECTIONS = ['home', 'about', 'branches'];
const NAV_OFFSET = 96;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const { userPromise } = useUser()
  const user = use(userPromise)
  const { state, toggleCart } = useCart()

  // Booking goes through a specific branch: checkout from the cart when it
  // has items, otherwise send people to the branch picker.
  const handleBookNow = () => {
    if (state.items.length) {
      toggleCart()
    } else {
      router.push('/#branches')
    }
  }

  async function handleSignOut() {
    await signOut()
    router.refresh();
    router.push('/');
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Scroll-spy: the last section whose top has passed under the navbar
      // wins, so the reservation/gallery blocks still count as "about".
      let current = 'home';
      for (const id of HOME_SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= NAV_OFFSET + 8) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isLinkActive = (link: NavLink) => {
    if (link.section) return pathname === '/' && activeSection === link.section;
    return pathname.startsWith(link.href);
  };



  // Smooth scroll to section or navigate to route
  const handleNavClick = (link: NavLink) => {
    setOpen(false);
    if (link.section && pathname === '/') {
      // Already on the home page: move the pill right away, then scroll.
      setActiveSection(link.section);
      if (link.section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', '/');
        return;
      }
      const element = document.getElementById(link.section);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 16;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', link.href);
      }
      return;
    }
    router.push(link.href);
  };

  return (
    <header
      className={`fixed w-full left-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-transparent'
        }`}
    >
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo-mayomi.png"
              alt="Mayomi Logo"
              width={80}
              height={80}
              className={`rounded transition-all duration-300 ${scrolled ? "hidden" : ""}`}
              priority
            />
          </Link>
          <Link href="/">
            <Image
              src="/mayomi-green.png"
              alt="Mayomi Logo"
              width={80}
              height={80}
              className={`rounded transition-all duration-300 ${scrolled ? "" : "hidden"}`}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link);
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`isolate px-6 py-3 rounded-full font-medium transition-colors duration-300 relative ${scrolled
                  ? isActive
                    ? 'text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                  : isActive
                    ? 'text-primary'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* One shared pill that slides to whichever link is active */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${scrolled ? 'bg-brand shadow-glow' : 'bg-white/90 shadow-md'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
          {user && (
            <button
              onClick={handleSignOut}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative group ${scrolled
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white/90 text-red-500 shadow-md'
                }`}
            >
              Logout
            </button>
          )}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <CartButton scrolled={scrolled} />
          <button
            onClick={handleBookNow}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 border group ${scrolled
              ? 'bg-brand hover:brightness-110 text-white border-transparent'
              : 'bg-brand-warm hover:brightness-105 text-mayomi-900 border-white/40'
              }`}
          >
            Booking
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-3">
          <CartButton scrolled={scrolled} />
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 mb-1 ${scrolled ? 'bg-gray-700' : 'bg-white'
                } ${open ? 'rotate-45 translate-y-1.5' : ''}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 mb-1 ${scrolled ? 'bg-gray-700' : 'bg-white'
                } ${open ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'
                } ${open ? '-rotate-45 -translate-y-1.5' : ''}`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <div
              className="fixed inset-0 z-[9999] lg:hidden"
              style={{ position: 'fixed' }}
              onClick={() => setOpen(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"></div>

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
                style={{ position: 'fixed', right: 0, top: 0, height: '100vh' }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/mayomi-green.png"
                        alt="Mayomi Logo"
                        width={60}
                        height={60}
                      />
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
                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-2">
                      {NAV_LINKS.map((link) => {
                        const isActive = isLinkActive(link);
                        return (
                          <button
                            key={link.id}
                            onClick={() => handleNavClick(link)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between ${isActive
                              ? 'bg-brand text-white shadow-glow'
                              : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                              }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {link.label}
                            {isActive && (
                              <span className="w-2 h-2 bg-current rounded-full"></span>
                            )}
                          </button>
                        );
                      })}
                      {user && (
                        <button
                          onClick={() => {
                            handleSignOut();
                            setOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-red-500 text-white shadow-md"
                        >
                          Logout
                        </button>
                      )}
                    </nav>
                  </div>

                  {/* CTA Section */}
                  <div className="p-6 border-t border-gray-200 flex-shrink-0 space-y-4">
                    {/* Book Session Button - Full Width */}
                    <button
                      onClick={() => { handleBookNow(); setOpen(false); }}
                      className="w-full bg-brand hover:brightness-110 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Booking Sekarang</span>
                      <span className="text-lg">→</span>
                    </button>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{BRANCHES.length} cabang &middot; {OPERATING_HOURS}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                        </svg>
                        <span>mayomi.jkt@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
