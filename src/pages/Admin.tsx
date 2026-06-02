import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/products';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import Toast from '../components/Toast';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: 'electronics', image: '', supplierLink: '', featured: false,
  });

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: 'electronics', image: '', supplierLink: '', featured: false });
    setImagePreview('');
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { notify('Image trop volumineuse (max 5MB)', 'error'); return; }
      const reader = new FileReader();
      reader.onloadend = () => { setFormData(prev => ({ ...prev, image: reader.result as string })); setImagePreview(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    const productData = {
      name: formData.name, description: formData.description, price: parseFloat(formData.price),
      category: formData.category, image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      supplierLink: formData.supplierLink, rating: 4.5, reviews: 0, featured: formData.featured,
    };
    if (editingId) { updateProduct(editingId, productData); notify('Produit modifié avec succès !'); }
    else { addProduct(productData); notify('Nouveau produit ajouté !'); }
    resetForm(); setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, description: product.description, price: product.price.toString(), category: product.category, image: product.image, supplierLink: product.supplierLink, featured: product.featured });
    setImagePreview(product.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Supprimer "${product.name}" ?`)) { deleteProduct(product.id); notify('Produit supprimé'); }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()) || p.category.toLowerCase().includes(searchFilter.toLowerCase()));

  const stats = [
    { label: 'Produits', value: products.length, icon: 'fa-box', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50' },
    { label: 'Catégories', value: categories.length, icon: 'fa-tags', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
    { label: 'Populaires', value: products.filter(p => p.featured).length, icon: 'fa-fire', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Prix moyen', value: products.length > 0 ? formatPrice(Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)) : '0 Ar', icon: 'fa-chart-line', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast message={toastMsg} type={toastType} isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.15)_0%,_transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <a href="#/" className="hover:text-orange-400 transition-colors">Accueil</a>
                <i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i>
                <span className="text-white font-medium">Administration</span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-shield-halved text-orange-400"></i>
                </div>
                Dashboard Admin
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { resetForm(); setShowForm(!showForm); }}
                className="btn-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <i className={`fa-solid ${showForm ? 'fa-xmark' : 'fa-plus'}`}></i>
                {showForm ? 'Fermer' : 'Ajouter'}
              </button>
              <button
                onClick={logout}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 -mt-16 relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <i className={`fa-solid ${stat.icon} text-lg bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}></i>
                </div>
              </div>
              <div className="text-2xl font-extrabold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border-2 border-orange-200 animate-scale-in">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className={`fa-solid ${editingId ? 'fa-pen-to-square' : 'fa-plus-circle'} text-orange-500`}></i>
              </div>
              {editingId ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nom du produit *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Ex: Écouteurs Bluetooth" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all input-focus" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Prix (Ar) *</label>
                <input type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} placeholder="29.99" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all input-focus" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Décrivez le produit..." rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none input-focus" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-white input-focus">
                  {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Lien fournisseur</label>
                <input type="url" value={formData.supplierLink} onChange={(e) => setFormData(prev => ({ ...prev, supplierLink: e.target.value }))} placeholder="https://aliexpress.com/..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all input-focus" />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Image du produit</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div onClick={() => fileInputRef.current?.click()} className="flex-1 border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-orange-50/50">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto shadow-lg" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, image: '' })); setImagePreview(''); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-300 mb-2"></i>
                        <p className="text-sm text-gray-500"><span className="text-orange-500 font-semibold">Cliquez pour uploader</span></p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <p className="text-xs text-gray-400">Ou URL d'image :</p>
                    <input type="url" value={formData.image.startsWith('data:') ? '' : formData.image} onChange={(e) => { setFormData(prev => ({ ...prev, image: e.target.value })); setImagePreview(e.target.value); }} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm input-focus" />
                  </div>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="sr-only peer" />
                    <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500 shadow-inner"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                    <i className="fa-solid fa-fire mr-1 text-orange-400"></i>Marquer comme populaire
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex gap-3 pt-4 border-t border-gray-100">
                <button type="submit" className="btn-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/25 flex items-center gap-2">
                  <i className={`fa-solid ${editingId ? 'fa-check' : 'fa-plus'}`}></i>
                  {editingId ? 'Enregistrer' : 'Ajouter le produit'}
                </button>
                <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold transition-all">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-list text-orange-500 text-sm"></i>
                </div>
                Catalogue ({filteredProducts.length})
              </h2>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input type="text" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} placeholder="Filtrer..." className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm w-64 input-focus" />
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Produit</th>
                  <th className="text-left py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th className="text-left py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="text-left py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Note</th>
                  <th className="text-left py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="text-center py-3.5 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:shadow-md transition-shadow" />
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{product.name}</div>
                          <div className="text-xs text-gray-400 line-clamp-1 max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <i className={`${categories.find(c => c.id === product.category)?.icon} text-[10px]`}></i>
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6"><span className="font-extrabold text-orange-500 text-lg">{formatPrice(product.price)}</span></td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {product.featured ? (
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-lg">
                          <i className="fa-solid fa-fire text-[10px]"></i> Populaire
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-lg">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEdit(product)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 hover:scale-110 transition-all" title="Modifier"><i className="fa-solid fa-pen text-sm"></i></button>
                        <button onClick={() => handleDelete(product)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-110 transition-all" title="Supprimer"><i className="fa-solid fa-trash-can text-sm"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 hover:bg-orange-50/30 transition-colors">
                <div className="flex gap-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                        <span className="inline-block bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-md mt-1 font-semibold">{categories.find(c => c.id === product.category)?.name}</span>
                      </div>
                      <span className="font-extrabold text-orange-500">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => handleEdit(product)} className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors text-xs font-bold"><i className="fa-solid fa-pen mr-1"></i>Modifier</button>
                      <button onClick={() => handleDelete(product)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-xs font-bold"><i className="fa-solid fa-trash-can mr-1"></i>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="fa-solid fa-box-open text-3xl text-gray-300"></i></div>
              <p className="text-gray-500 font-semibold">Aucun produit trouvé</p>
              <p className="text-sm text-gray-400 mt-1">{searchFilter ? 'Essayez un autre terme' : 'Ajoutez votre premier produit'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
