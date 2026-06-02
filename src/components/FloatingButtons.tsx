import { useState, useEffect } from 'react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/261342140947?text=Bonjour%20!%20Je%20suis%20intéressé%20par%20vos%20produits"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 group-hover:shadow-green-500/60 group-hover:scale-110 transition-all duration-300">
            <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
          </div>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Contactez-nous !
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      </a>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 bg-white rounded-full shadow-xl shadow-gray-900/10 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-500 border border-gray-100 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}
