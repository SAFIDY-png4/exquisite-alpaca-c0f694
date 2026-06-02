import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress >= 1) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <div ref={ref} className="text-3xl lg:text-4xl font-extrabold text-white">{count.toLocaleString()}{suffix}</div>;
}

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { badge: '🔥 Nouveau', title: 'Découvrez les', highlight: 'Meilleures Tendances', desc: 'Des produits uniques et tendance à prix imbattables. Livraison rapide et sécurisée partout.', img: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=600&fit=crop' },
    { badge: '⚡ Flash Sale', title: 'Offres', highlight: 'Exceptionnelles', desc: 'Profitez de réductions incroyables sur une sélection exclusive de produits premium.', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop' },
    { badge: '🎁 Promo', title: 'Livraison', highlight: '100% Gratuite', desc: 'Sur l\'ensemble de votre commande, sans minimum d\'achat.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: 'fa-truck-fast', title: 'Livraison Rapide', desc: 'Expédition sous 24-48h partout dans le monde', color: '#3B82F6', bgFrom: '#EFF6FF', bgTo: '#DBEAFE', border: '#BFDBFE' },
    { icon: 'fa-shield-halved', title: 'Paiement Sécurisé', desc: 'Transactions 100% protégées et cryptées SSL', color: '#10B981', bgFrom: '#ECFDF5', bgTo: '#D1FAE5', border: '#A7F3D0' },
    { icon: 'fa-rotate-left', title: 'Retour Gratuit', desc: '30 jours pour changer d\'avis, sans aucun frais', color: '#8B5CF6', bgFrom: '#F5F3FF', bgTo: '#EDE9FE', border: '#DDD6FE' },
    { icon: 'fa-headset', title: 'Support WhatsApp', desc: '034 21 409 47 — Disponible 24h/24 et 7j/7', color: '#22C55E', bgFrom: '#F0FDF4', bgTo: '#DCFCE7', border: '#BBF7D0' },
  ];

  const testimonials = [
    { name: 'Hery R.', avatar: 'H', gradient: 'from-orange-400 to-orange-600', rating: 5, text: 'Produits de qualité et livraison super rapide ! Je recommande vivement ShopDrop à tous mes proches. Service impeccable du début à la fin.', location: 'Antananarivo', product: 'Écouteurs Bluetooth', time: 'Il y a 2 jours' },
    { name: 'Nomena L.', avatar: 'N', gradient: 'from-blue-400 to-blue-600', rating: 5, text: 'Service client exceptionnel via WhatsApp. Ils répondent vite et sont très professionnels. J\'ai reçu ma commande en parfait état.', location: 'Fianarantsoa', product: 'Montre Connectée', time: 'Il y a 5 jours' },
    { name: 'Toky R.', avatar: 'T', gradient: 'from-emerald-400 to-emerald-600', rating: 5, text: 'Les prix sont imbattables et la qualité est au rendez-vous. Mon site préféré pour le shopping en ligne ! Je recommande à 100%.', location: 'Mahajanga', product: 'Sac à Dos Vintage', time: 'Il y a 1 semaine' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.15)_0%,_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,107,53,0.1)_0%,_transparent_50%)]"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  <span className="text-orange-400 text-sm font-medium">{heroSlides[currentSlide].badge}</span>
                </div>
                <a href="https://wa.me/261342140947" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 hover:bg-green-500/20 transition-all backdrop-blur-sm group">
                  <i className="fa-brands fa-whatsapp text-green-400 group-hover:scale-110 transition-transform"></i>
                  <span className="text-green-400 text-sm font-medium">034 21 409 47</span>
                </a>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 animate-fade-in-up animate-delay-100">
                {heroSlides[currentSlide].title}
                <span className="block gradient-text mt-2">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animate-delay-200">{heroSlides[currentSlide].desc}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-300">
                <Link to="/products" className="btn-primary group inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/25">
                  <i className="fa-solid fa-bag-shopping group-hover:rotate-12 transition-transform duration-300"></i>
                  Voir le catalogue
                </Link>
                <Link to="/products?cat=electronics" className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <i className="fa-solid fa-bolt text-orange-400"></i>
                  Électronique
                </Link>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start mt-10 animate-fade-in-up animate-delay-400">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-orange-500' : 'w-4 bg-gray-700 hover:bg-gray-600'}`} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative animate-slide-right">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/20 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-orange-500/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
                <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 card-3d-up preserve-3d">
                  <img src={heroSlides[currentSlide].img} alt="Shopping" className="w-full h-full object-cover transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -left-4 top-1/4 animate-float-3d">
                  <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center"><i className="fa-solid fa-check text-green-400"></i></div>
                    <div><div className="text-white text-sm font-semibold">+2.5k</div><div className="text-gray-400 text-xs">Ventes ce mois</div></div>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-1/4 animate-float-3d" style={{ animationDelay: '1.5s' }}>
                  <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center"><i className="fa-solid fa-star text-orange-400"></i></div>
                    <div><div className="text-white text-sm font-semibold">4.8/5</div><div className="text-gray-400 text-xs">Note moyenne</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animate-delay-500">
            {[
              { icon: 'fa-users', label: 'Clients satisfaits', end: 50000, suffix: '+' },
              { icon: 'fa-box-open', label: 'Produits disponibles', end: 1200, suffix: '+' },
              { icon: 'fa-star', label: 'Note moyenne', end: 48, suffix: '/5', divide: 10 },
              { icon: 'fa-truck-fast', label: 'Livraisons réussies', end: 98, suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"><i className={`fa-solid ${stat.icon} text-orange-400`}></i></div>
                <AnimatedCounter end={stat.divide ? stat.end / stat.divide : stat.end} suffix={stat.suffix} />
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-5 py-2 rounded-full mb-4"><i className="fa-solid fa-compass"></i>Explorer</span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">Nos Catégories</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">Trouvez exactement ce que vous cherchez parmi nos collections</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((cat, i) => (
              <Link key={cat.id} to={`/products?cat=${cat.id}`} className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 card-hover shadow-sm" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500 group-hover:shadow-lg group-hover:shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3">
                  <i className={`${cat.icon} text-2xl text-orange-500 group-hover:text-white transition-colors duration-500`}></i>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300 text-sm text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-5 py-2 rounded-full mb-4"><i className="fa-solid fa-fire"></i>Best-sellers</span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900">Produits Populaires</h2>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-105">
              Voir tout <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-white px-8 py-4 rounded-2xl font-bold">Voir tous les produits <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES — ULTRA PROPRE ==================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <div className="absolute inset-0 dot-pattern opacity-[0.15]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header épuré */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold px-6 py-2.5 rounded-full mb-6">
              <i className="fa-solid fa-gem text-xs"></i>
              Nos avantages
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.15]">
              Une expérience shopping<br />
              <span className="gradient-text">exceptionnelle</span>
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Chaque commande est une promesse de qualité, de rapidité et de satisfaction garantie
            </p>
          </div>

          {/* 4 Cards — spacieuses et aérées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-[1.75rem] p-8 lg:p-9 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 card-3d preserve-3d shine-3d shadow-3d"
              >
                {/* Icon */}
                <div
                  className="w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl icon-3d preserve-3d"
                  style={{ background: `linear-gradient(135deg, ${f.bgFrom}, ${f.bgTo})`, border: `1.5px solid ${f.border}` }}
                >
                  <i className={`fa-solid ${f.icon} text-2xl`} style={{ color: f.color }}></i>
                </div>

                {/* Texte */}
                <div className="text-3d">
                  <h3 className="font-bold text-gray-900 text-[17px] mb-3">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-[1.7]">{f.desc}</p>
                </div>

                {/* Ligne décorative */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full transition-all duration-700" style={{ background: `linear-gradient(90deg, transparent, ${f.color}00, transparent)` }}></div>
                <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ background: `linear-gradient(90deg, transparent, ${f.color}40, transparent)` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROMO — ULTRA PROPRE ==================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Fond dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600"></div>
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-full px-6 py-2.5 mb-10 border border-white/20">
              <i className="fa-solid fa-gift text-white text-sm"></i>
              <span className="text-white font-bold text-sm tracking-wide">Offre spéciale</span>
            </div>

            {/* Titre géant */}
            <div className="mb-10">
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-2">
                -10% sur votre
              </h2>
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-yellow-200 leading-[1.05]">
                première commande
              </h2>
            </div>

            {/* Description */}
            <p className="text-orange-100/90 text-lg lg:text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
              Inscrivez-vous à notre newsletter et recevez un code promo exclusif.<br className="hidden sm:block" />
              Ne manquez pas cette opportunité !
            </p>

            {/* Formulaire */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="flex-1 relative group">
                <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-orange-200/60 group-focus-within:text-white transition-colors"></i>
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  className="w-full pl-13 pr-5 py-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-orange-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/25 focus:border-white/40 transition-all text-base"
                />
              </div>
              <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-black/30 flex items-center justify-center gap-2.5 shrink-0 active:scale-[0.98]">
                S'inscrire
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>

            {/* Trust */}
            <div className="flex items-center justify-center gap-2 text-orange-200/40 text-sm">
              <i className="fa-solid fa-lock text-xs"></i>
              <span>Vos données sont protégées. Désabonnement possible à tout moment.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS — ULTRA PROPRE ==================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute inset-0 dot-pattern opacity-[0.12]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold px-6 py-2.5 rounded-full mb-6">
              <i className="fa-solid fa-quote-left text-xs"></i>
              Témoignages
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.15]">
              Ce que disent<br />
              <span className="gradient-text">nos clients</span>
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto">
              Des milliers de clients satisfaits nous font confiance à Madagascar
            </p>
          </div>

          {/* Cards témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className="group bg-white rounded-[1.75rem] p-8 lg:p-9 border border-gray-100 hover:border-orange-100 transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(255,107,53,0.12)] hover:-translate-y-2 review-3d preserve-3d shine-3d shadow-3d relative overflow-hidden"
              >
                {/* Quote bg */}
                <div className="absolute -top-2 -right-2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                  <i className="fa-solid fa-quote-right text-[100px] text-orange-500"></i>
                </div>

                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-6 star-pop">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <i key={j} className="fa-solid fa-star text-amber-400 text-sm"></i>
                  ))}
                  <span className="text-xs text-gray-300 ml-2 font-semibold">5.0</span>
                </div>

                {/* Citation */}
                <p className="text-gray-600 leading-[1.8] mb-8 text-[15px] relative z-10 min-h-[5rem]">
                  « {review.text} »
                </p>

                {/* Badge achat */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 bg-gray-50 text-gray-500 text-xs font-medium px-3.5 py-2 rounded-xl border border-gray-100">
                    <i className="fa-solid fa-circle-check text-[10px] text-green-500"></i>
                    Achat vérifié : {review.product}
                  </span>
                </div>

                {/* Auteur */}
                <div className="flex items-center justify-between pt-7 border-t border-gray-100">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 bg-gradient-to-br ${review.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg icon-3d preserve-3d`}>
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-[15px]">{review.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-location-dot text-orange-400 text-[10px]"></i>
                        {review.location}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium hidden sm:block">{review.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
