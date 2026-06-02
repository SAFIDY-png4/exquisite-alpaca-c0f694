import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { formatPrice } from '../utils/format';
import Toast from '../components/Toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleWhatsAppOrder = () => {
    const lines = items.map((item, i) => {
      const subtotal = item.product.price * item.quantity;
      return `${i + 1}. ${item.product.name}\n   Qté: ${item.quantity} x ${formatPrice(item.product.price)} = *${formatPrice(subtotal)}*`;
    });
    const message = [
      `🛒 *COMMANDE SHOPDROP*`,
      ``,
      `━━━━━━━━━━━━━━━━`,
      ...lines,
      `━━━━━━━━━━━━━━━━`,
      ``,
      `💰 *TOTAL: ${formatPrice(totalPrice)}*`,
      `📦 Nombre d'articles: ${totalItems}`,
      ``,
      `Merci de confirmer ma commande !`,
    ].join('\n');
    window.open(`https://wa.me/261342140947?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    setToastMsg(`${name} retiré du panier`);
    setShowToast(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.15)_0%,_transparent_50%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
              <i className="fa-solid fa-cart-shopping mr-3 text-orange-400"></i>Mon Panier
            </h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in-up">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-cart-shopping text-4xl text-gray-300"></i>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Votre panier est vide</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg">Découvrez nos produits tendance et ajoutez vos articles préférés.</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-3 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/25">
            <i className="fa-solid fa-bag-shopping"></i>Commencer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast message={toastMsg} type="info" isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.15)_0%,_transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="#/" className="hover:text-orange-400 transition-colors">Accueil</a>
            <i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i>
            <span className="text-white font-medium">Panier</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
            <i className="fa-solid fa-cart-shopping mr-3 text-orange-400"></i>Mon Panier
          </h1>
          <p className="text-gray-400 mt-2">{totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div key={item.product.id} className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row gap-5 group hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-500 border border-gray-100 hover:border-orange-100 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <Link to={`/product/${item.product.id}`} className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-bold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2 text-lg">{item.product.name}</Link>
                      <span className="inline-block text-xs text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg mt-2 font-semibold">{item.product.category}</span>
                    </div>
                    <button onClick={() => handleRemove(item.product.id, item.product.name)} className="text-gray-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl" title="Supprimer">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-5">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-500 hover:text-orange-500">
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center font-bold text-gray-800 border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-orange-50 transition-colors text-gray-500 hover:text-orange-500">
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-0.5">{formatPrice(item.product.price)} / unité</div>
                      <div className="text-xl font-extrabold text-orange-500">{formatPrice(item.product.price * item.quantity)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 py-2">
              <i className="fa-solid fa-trash-can"></i>Vider le panier
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100 animate-slide-right">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"><i className="fa-solid fa-receipt text-orange-500 text-sm"></i></div>
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total ({totalItems} articles)</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className="font-bold text-green-500 flex items-center gap-1"><i className="fa-solid fa-check text-xs"></i> Gratuite</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-extrabold text-orange-500">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button onClick={handleWhatsAppOrder} className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-xl"></i>Commander via WhatsApp
              </button>

              {/* Payment Info */}
              <div className="mt-5 p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-circle-info"></i>Paiement
                </h3>
                <div className="space-y-2.5 text-sm text-green-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center"><i className="fa-brands fa-whatsapp text-green-600 text-xs"></i></div>
                    <span>WhatsApp : <strong>034 21 409 47</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center"><i className="fa-solid fa-money-bill-wave text-green-600 text-xs"></i></div>
                    <span>Mobile Money / Cash / Mvola</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 p-3 bg-gray-50 rounded-xl">
                <i className="fa-solid fa-shield-halved text-gray-400"></i>
                <span className="text-xs text-gray-500">Paiement sécurisé · Retour 30 jours</span>
              </div>

              <Link to="/products" className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-4 transition-colors text-sm py-2 hover:bg-orange-50 rounded-xl">
                <i className="fa-solid fa-arrow-left text-xs"></i>Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
