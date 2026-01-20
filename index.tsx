import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl flex items-center justify-center font-bold text-black font-orbitron shadow-lg shadow-orange-600/20 group-hover:rotate-12 transition-transform">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-orbitron font-black tracking-tighter text-white uppercase italic leading-none">
              TDN<span className="text-orange-500">OFFICIAL</span>
            </span>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.4em] leading-none mt-1">
              Bangladesh
            </span>
          </div>
        </div>
        
        {/* Desktop Links (Hidden on small screens) */}
        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 font-orbitron">
          <a href="#home" className="hover:text-orange-500 transition-colors py-2">Base</a>
          <a href="#about" className="hover:text-orange-500 transition-colors py-2">Intel</a>
          <a href="#squad" className="hover:text-orange-500 transition-colors py-2">Squad</a>
          <a href="#tournaments" className="hover:text-orange-500 transition-colors py-2">Command</a>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-2xl border border-white/10 transition-all active:scale-95"
              >
                <div className="relative">
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-xl border border-orange-500/50 object-cover" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col items-start text-left hidden sm:flex">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{user.name}</span>
                  <span className="text-[8px] text-orange-500 font-black uppercase">Verified</span>
                </div>
              </button>
              
              {/* Profile Dropdown */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="px-5 py-3 border-b border-white/5 mb-2">
                    <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Status</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Encrypted Link Active
                    </p>
                  </div>
                  <a 
                    href="#profile" 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center px-5 py-3 text-[10px] text-white hover:bg-white/5 transition-colors font-bold uppercase tracking-widest"
                  >
                    Operator Dashboard
                  </a>
                  <button 
                    onClick={() => { logout(); setShowDropdown(false); }}
                    className="w-full text-left flex items-center px-5 py-3 text-[10px] text-red-500 hover:bg-red-500/10 transition-colors font-bold uppercase tracking-widest"
                  >
                    Terminate Link
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="group relative px-6 py-2.5 overflow-hidden rounded-xl bg-orange-600 transition-all hover:bg-orange-500 active:scale-95"
            >
              <span className="relative z-10 text-white font-bold text-[10px] uppercase tracking-[0.2em]">
                Link Identity
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Sub-Nav Indication */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mt-4 opacity-50"></div>
    </nav>
  );
};

export default Navbar;
