import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: ReactNode }) {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group perspective-1000">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 transition-all duration-500 group-hover:scale-110 icon-3d preserve-3d">
                <i className="fa-solid fa-bolt text-white text-lg"></i>
              </div>
              <span className="text-2xl font-extrabold gradient-text">ShopDrop</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive('/') ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}>
                <i className="fa-solid fa-home mr-2"></i>Accueil
              </Link>
              <Link to="/products" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive('/products') ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}>
                <i className="fa-solid fa-grid-2 mr-2"></i>Produits
              </Link>
              <Link to="/admin" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive('/admin') || isActive('/login') ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}>
                <i className={`fa-solid ${isAuthenticated ? 'fa-shield-halved' : 'fa-lock'} mr-2`}></i>
                {isAuthenticated ? 'Admin' : 'Connexion'}
              </Link>
              {isAuthenticated && (
                <button onClick={logout} className="px-3 py-2 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-all duration-300 ml-1" title="Déconnexion">
                  <i className="fa-solid fa-right-from-bracket mr-1"></i>
                  <span className="hidden lg:inline">Déconnexion</span>
                </button>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative flex items-center gap-2 bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-full transition-all duration-300 group">
                <i className="fa-solid fa-cart-shopping text-gray-600 group-hover:text-orange-500 transition-colors"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-bounce">{totalItems}</span>
                )}
                <span className="hidden sm:inline text-gray-600 group-hover:text-orange-500 font-medium transition-colors">Panier</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-gray-600 text-xl`}></i>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
              <nav className="flex flex-col gap-2">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-lg font-medium transition-all ${isActive('/') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-50'}`}>
                  <i className="fa-solid fa-home mr-3"></i>Accueil
                </Link>
                <Link to="/products" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-lg font-medium transition-all ${isActive('/products') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-50'}`}>
                  <i className="fa-solid fa-grid-2 mr-3"></i>Produits
                </Link>
                <Link to={isAuthenticated ? '/admin' : '/login'} onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-lg font-medium transition-all ${isActive('/admin') || isActive('/login') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-50'}`}>
                  <i className={`fa-solid ${isAuthenticated ? 'fa-shield-halved' : 'fa-lock'} mr-3`}></i>
                  {isAuthenticated ? 'Administration' : 'Connexion Admin'}
                </Link>
                {isAuthenticated && (
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-all text-left">
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>Déconnexion
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer 3D */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-600/5 rounded-full blur-[80px]"></div>
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-5 group perspective-1000">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 icon-3d preserve-3d group-hover:shadow-orange-500/40 transition-all">
                  <i className="fa-solid fa-bolt text-white text-lg"></i>
                </div>
                <span className="text-2xl font-extrabold text-white">ShopDrop</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Votre destination shopping en ligne. Des produits tendance à prix imbattables, livrés directement chez vous.
              </p>
              {/* Social 3D */}
              <div className="flex gap-3">
                <a href="https://wa.me/261342140947" target="_blank" rel="noopener noreferrer" className="social-3d w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/30 preserve-3d">
                  <i className="fa-brands fa-whatsapp text-white"></i>
                </a>
                <a href="#" className="social-3d w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg preserve-3d hover:bg-orange-500 hover:shadow-orange-500/30">
                  <i className="fa-brands fa-facebook-f text-white"></i>
                </a>
                <a href="#" className="social-3d w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg preserve-3d hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/30">
                  <i className="fa-brands fa-instagram text-white"></i>
                </a>
                <a href="#" className="social-3d w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg preserve-3d hover:bg-gray-950 hover:shadow-gray-950/30">
                  <i className="fa-brands fa-tiktok text-white"></i>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-compass text-orange-500 text-xs"></i>
                </div>
                Navigation
              </h3>
              <ul className="space-y-3">
                {[
                  { to: '/', icon: 'fa-home', label: 'Accueil' },
                  { to: '/products', icon: 'fa-grid-2', label: 'Tous les produits' },
                  { to: '/cart', icon: 'fa-cart-shopping', label: 'Mon panier' },
                  { to: '/login', icon: 'fa-lock', label: 'Administration' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="footer-link-3d text-gray-400 text-sm flex items-center gap-2.5 py-1 preserve-3d">
                      <i className={`fa-solid ${link.icon} text-xs w-4 text-center text-gray-600`}></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-tags text-orange-500 text-xs"></i>
                </div>
                Catégories
              </h3>
              <ul className="space-y-3">
                {[
                  { to: '/products?cat=electronics', icon: 'fa-microchip', label: 'Électronique' },
                  { to: '/products?cat=fashion', icon: 'fa-shirt', label: 'Mode' },
                  { to: '/products?cat=home', icon: 'fa-house', label: 'Maison' },
                  { to: '/products?cat=beauty', icon: 'fa-spa', label: 'Beauté' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="footer-link-3d text-gray-400 text-sm flex items-center gap-2.5 py-1 preserve-3d">
                      <i className={`fa-solid ${link.icon} text-xs w-4 text-center text-gray-600`}></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-paper-plane text-orange-500 text-xs"></i>
                </div>
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-green-600/10 rounded-xl flex items-center justify-center group-hover:bg-green-600/20 transition-colors icon-3d preserve-3d">
                    <i className="fa-brands fa-whatsapp text-green-500 text-sm"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">034 21 409 47</div>
                    <div className="text-gray-500 text-xs">WhatsApp - Disponible 24/7</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors icon-3d preserve-3d">
                    <i className="fa-solid fa-envelope text-orange-500 text-sm"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Email</div>
                    <div className="text-gray-500 text-xs break-all">sitrakiniaina.rinah.safidy@gmail.com</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors icon-3d preserve-3d">
                    <i className="fa-solid fa-location-dot text-blue-500 text-sm"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Localisation</div>
                    <div className="text-gray-500 text-xs">Madagascar</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 <span className="font-semibold text-gray-400">ShopDrop</span> - Tous droits réservés
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <i className="fa-brands fa-whatsapp text-green-500"></i>
              <span>WhatsApp : <strong className="text-gray-400">034 21 409 47</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
