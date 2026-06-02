import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProduct } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'info'>('desc');

  const product = getProduct(id || '');

  useEffect(() => {
    if (!product && id) navigate('/products');
    window.scrollTo(0, 0);
    setQuantity(1);
    setImageLoaded(false);
  }, [id, product, navigate]);

  if (!product) return null;

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<i key={i} className="fa-solid fa-star text-amber-400"></i>);
      else if (i - 0.5 <= rating) stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-amber-400"></i>);
      else stars.push(<i key={i} className="fa-regular fa-star text-amber-400"></i>);
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
  };

  const oldPrice = Math.round(product.price * 1.4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast message="Produit ajouté au panier !" type="success" isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-500 transition-colors font-medium">Accueil</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <Link to="/products" className="hover:text-orange-500 transition-colors font-medium">Produits</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-gray-50 p-6 lg:p-10">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
                {!imageLoaded && <div className="absolute inset-0 skeleton"></div>}
                <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />
              </div>
              {product.featured && (
                <span className="absolute top-10 left-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-5 py-2 rounded-xl shadow-lg shadow-orange-500/30 z-10">
                  <i className="fa-solid fa-fire mr-1.5"></i>Populaire
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg mb-4">
                  <i className="fa-solid fa-tag text-[10px]"></i>{product.category}
                </span>

                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500 font-medium">{product.rating}/5 · {product.reviews} avis</span>
                </div>

                {/* Prix en Ariary */}
                <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                  <span className="text-3xl lg:text-4xl font-extrabold text-orange-500">{formatPrice(product.price)}</span>
                  <span className="text-base text-gray-400 line-through">{formatPrice(oldPrice)}</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">-29%</span>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                  <button onClick={() => setActiveTab('desc')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'desc' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Description</button>
                  <button onClick={() => setActiveTab('info')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'info' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Informations</button>
                </div>

                {activeTab === 'desc' ? (
                  <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
                ) : (
                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Catégorie', value: product.category },
                      { label: 'Note', value: `${product.rating}/5` },
                      { label: 'Avis', value: `${product.reviews} avis` },
                      { label: 'Livraison', value: 'Gratuite' },
                    ].map((info, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-500">{info.label}</span>
                        <span className="text-sm font-semibold text-gray-800">{info.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantité */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Quantité</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-600 hover:text-orange-500">
                        <i className="fa-solid fa-minus text-sm"></i>
                      </button>
                      <span className="w-16 h-12 flex items-center justify-center font-bold text-gray-800 border-x border-gray-200 text-lg">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-600 hover:text-orange-500">
                        <i className="fa-solid fa-plus text-sm"></i>
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Sous-total : <span className="text-lg font-extrabold text-orange-500">{formatPrice(product.price * quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button onClick={handleAddToCart} className="btn-primary w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3">
                  <i className="fa-solid fa-cart-plus"></i>Ajouter au panier
                </button>
                {product.supplierLink && (
                  <a href={product.supplierLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 font-semibold transition-all duration-300">
                    <i className="fa-solid fa-external-link"></i>Voir sur AliExpress
                  </a>
                )}
                <div className="grid grid-cols-2 gap-2 pt-4">
                  {[
                    { icon: 'fa-truck-fast', text: 'Livraison gratuite', sub: 'Expédition 24-48h' },
                    { icon: 'fa-shield-halved', text: 'Garantie 30 jours', sub: 'Satisfait ou remboursé' },
                    { icon: 'fa-rotate-left', text: 'Retour facile', sub: 'Gratuit et simple' },
                    { icon: 'fa-lock', text: 'Paiement sécurisé', sub: '100% protégé' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center transition-all">
                        <i className={`fa-solid ${f.icon} text-orange-500 group-hover:text-white text-xs transition-colors`}></i>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-700">{f.text}</div>
                        <div className="text-[10px] text-gray-400">{f.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                <i className="fa-solid fa-shuffle mr-3 text-orange-500"></i>Produits similaires
              </h2>
              <Link to={`/products?cat=${product.category}`} className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1 group">
                Voir tout <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((p, i) => (
                <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
