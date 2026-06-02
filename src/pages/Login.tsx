import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className={`relative w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/30 mb-5 animate-float">
            <i className="fa-solid fa-bolt text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">ShopDrop</h1>
          <p className="text-gray-400">Espace Administration</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i className="fa-solid fa-shield-halved text-orange-500 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
            <p className="text-sm text-gray-500 mt-1">Accédez au panneau d'administration</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-exclamation text-red-500 text-sm"></i>
              </div>
              <span className="text-sm text-red-600 font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="fa-solid fa-envelope mr-2 text-orange-500 text-xs"></i>
                Adresse email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sitrakiniaina.rinah.safidy@gmail.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm input-focus"
                  required
                />
                <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="fa-solid fa-key mr-2 text-orange-500 text-xs"></i>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-14 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm input-focus"
                  required
                />
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-xl text-white font-bold text-base shadow-xl shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Vérification...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Back */}
          <div className="mt-8 text-center">
            <a href="#/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors font-medium group">
              <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
              Retour à l'accueil
            </a>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-gray-600 text-xs">
          <i className="fa-solid fa-lock text-orange-500/50"></i>
          <span>Connexion sécurisée · Accès réservé aux administrateurs</span>
        </div>
      </div>
    </div>
  );
}
