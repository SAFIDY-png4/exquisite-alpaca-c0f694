import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: 'from-green-500 to-emerald-600 shadow-green-500/30',
    error: 'from-red-500 to-rose-600 shadow-red-500/30',
    info: 'from-blue-500 to-indigo-600 shadow-blue-500/30',
  };

  const icons = {
    success: 'fa-solid fa-check-circle',
    error: 'fa-solid fa-xmark-circle',
    info: 'fa-solid fa-info-circle',
  };

  return (
    <div className={`fixed top-24 right-4 z-[100] transition-all duration-400 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <div className={`bg-gradient-to-r ${styles[type]} text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]`}>
        <i className={`${icons[type]} text-lg`}></i>
        <span className="font-medium text-sm">{message}</span>
        <button onClick={() => { setShow(false); setTimeout(onClose, 300); }} className="ml-auto opacity-70 hover:opacity-100 transition-opacity">
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    </div>
  );
}
