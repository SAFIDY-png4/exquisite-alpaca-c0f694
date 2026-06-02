import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<i key={i} className="fa-solid fa-star text-amber-400"></i>);
      else if (i - 0.5 <= rating) stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-amber-400"></i>);
      else stars.push(<i key={i} className="fa-regular fa-star text-amber-400"></i>);
    }
    return stars;
  };

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 overflow-hidden border border-gray-100/80 hover:border-orange-200/50 card-hover">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3] bg-gray-100">
        {!imageLoaded && <div className="absolute inset-0 skeleton"></div>}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-orange-500/30">
              <i className="fa-solid fa-fire text-[10px]"></i>Populaire
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <button
            onClick={handleAddToCart}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
              isAdding ? 'bg-green-500 text-white scale-110' : 'bg-white/95 backdrop-blur-sm text-orange-500 hover:bg-orange-500 hover:text-white hover:scale-110'
            }`}
          >
            <i className={`fa-solid ${isAdding ? 'fa-check' : 'fa-cart-plus'} text-base`}></i>
          </button>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5 text-xs">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-400 font-medium">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 mb-2 text-[15px] leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-orange-500">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              isAdding ? 'bg-green-500 text-white' : 'btn-primary text-white shadow-md shadow-orange-500/20'
            }`}
          >
            <span className={`flex items-center gap-1.5 transition-transform duration-300 ${isAdding ? 'scale-90' : ''}`}>
              {isAdding ? (<><i className="fa-solid fa-check text-xs"></i>Ajouté !</>) : (<><i className="fa-solid fa-plus text-xs"></i>Ajouter</>)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
