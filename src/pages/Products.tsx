import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const activeCategory = searchParams.get('cat') || 'all';

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return result;
  }, [products, activeCategory, search, sortBy]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'all') searchParams.delete('cat');
    else searchParams.set('cat', cat);
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearch('');
    handleCategoryChange('all');
    setSortBy('default');
  };

  const activeCat = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <a href="#/" className="hover:text-orange-400 transition-colors">Accueil</a>
                <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                <span className="text-white font-medium">
                  {activeCat ? activeCat.name : 'Tous les produits'}
                </span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
                <i className="fa-solid fa-grid-2 mr-3 text-orange-400"></i>
                {activeCat ? activeCat.name : 'Tous les produits'}
              </h1>
              <p className="text-gray-400 mt-2">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-grid-2 text-sm"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-list text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100">
              {/* Search */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <i className="fa-solid fa-magnifying-glass text-orange-500"></i>
                  Recherche
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm input-focus"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <i className="fa-solid fa-arrow-up-wide-short text-orange-500"></i>
                  Tri
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm bg-white input-focus"
                >
                  <option value="default">Par défaut</option>
                  <option value="price-asc">Prix croissant ↑</option>
                  <option value="price-desc">Prix décroissant ↓</option>
                  <option value="name">Nom A → Z</option>
                  <option value="rating">Meilleures notes ★</option>
                  <option value="popular">Plus populaires 🔥</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <i className="fa-solid fa-tags text-orange-500"></i>
                  Catégories
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`group flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === 'all'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    <i className="fa-solid fa-border-all w-5 text-center"></i>
                    <span className="flex-1">Toutes</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'all' ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                      {products.length}
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`group flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          activeCategory === cat.id
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        <i className={`${cat.icon} w-5 text-center`}></i>
                        <span className="flex-1">{cat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset */}
              {(search || activeCategory !== 'all' || sortBy !== 'default') && (
                <button
                  onClick={resetFilters}
                  className="w-full mt-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-rotate-right text-xs"></i>
                  Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Bar */}
            {(search || activeCategory !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500 font-medium">Filtres actifs :</span>
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {activeCat?.name}
                    <button onClick={() => handleCategoryChange('all')} className="hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    "{search}"
                    <button onClick={() => setSearch('')} className="hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
              }>
                {filteredProducts.map((product, i) => (
                  <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-box-open text-4xl text-gray-300"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Modifiez vos filtres ou votre recherche pour trouver ce que vous cherchez.</p>
                <button
                  onClick={resetFilters}
                  className="btn-primary text-white px-8 py-3 rounded-xl font-semibold"
                >
                  <i className="fa-solid fa-rotate-right mr-2"></i>Réinitialiser
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
