import React, { useState, useEffect } from 'react';
import { User, AuthMode } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '' 
  });

  // ব্রাউজারে আগে থেকে ইউজার সেভ আছে কি না চেক করা
  useEffect(() => {
    const savedUser = localStorage.getItem('tdn_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ইমেইল এবং বাংলাদেশি ফোন নম্বর দিয়ে সাইনআপ/লগইন
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // ১.৫ সেকেন্ড লোডিং সিমুলেশন
    await new Promise(r => setTimeout(r, 1500));
    
    const mockUser: User = { 
      id: Math.random().toString(36).substr(2, 9), 
      name: formData.name || formData.email.split('@')[0], 
      email: formData.email 
    };
    
    setUser(mockUser);
    localStorage.setItem('tdn_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  // গুগল দিয়ে ডিরেক্ট লগইন
  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const googleUser: User = {
      id: 'g-' + Math.random().toString(36).substr(2, 5),
      name: 'Google Operator',
      email: 'user@gmail.com'
    };
    
    setUser(googleUser);
    localStorage.setItem('tdn_user', JSON.stringify(googleUser));
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tdn_user');
  };

  // লগইন ও সাইনআপ ইন্টারফেস
  if (!user) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-4 selection:bg-orange-500 overflow-x-hidden">
        {/* ব্যাকগ্রাউন্ড নিওন ইফেক্ট */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-orange-600 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900 blur-[130px] rounded-full"></div>
        </div>

        <div className="w-full max-w-lg z-10">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-black italic font-orbitron drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              TDN <span className="text-orange-500">OFFICIAL</span>
            </h1>
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Node-88 Security Interface</p>
          </div>

          <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
            {/* ট্যাব বাটন (লগইন / সাইনআপ) */}
            <div className="flex bg-black/40 p-1.5 rounded-2xl mb-10 border border-white/5">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${authMode === 'login' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ACCESS
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${authMode === 'signup' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                RECRUIT
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {authMode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3">Full Name</label>
                    <input 
                      type="text" required 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-500 transition-all outline-none text-sm"
                      placeholder="Operational Name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3">Mobile (Bangladesh)</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
                        <span className="text-lg">🇧🇩</span>
                        <span className="text-sm font-bold text-gray-400">+880</span>
                      </div>
                      <input 
                        type="tel" required pattern="[0-9]{10}"
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 pl-[110px] focus:border-orange-500 transition-all outline-none text-sm"
                        placeholder="1XXX XXXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3">Email Address</label>
                <input 
                  type="email" required 
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-500 transition-all outline-none text-sm"
                  placeholder="name@agency.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3">Security Key</label>
                <input 
                  type={showPassword ? "text" : "password"} required 
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-500 transition-all outline-none text-sm pr-16"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-[42px] text-gray-600 hover:text-orange-500 text-[10px] font-black uppercase"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-orange-500 hover:bg-orange-600 rounded-2xl font-black italic tracking-widest text-lg mt-4 shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : (authMode === 'login' ? 'INITIALIZE LOGIN' : 'COMPLETE ENLIST')}
              </button>
            </form>

            {/* গুগল লগইন বাটন */}
            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute w-full border-t border-white/5"></div>
                <span className="relative px-5 bg-[#0a0a0a] text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">Direct Uplink</span>
              </div>
              
              <button 
                onClick={handleGoogleLogin}
                className="w-full py-4.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">Sync Google Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // লগইন করার পরের ড্যাশবোর্ড
  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 h-20 flex items-center justify-between px-8">
        <h1 className="font-orbitron text-2xl font-black italic tracking-tighter">TDN <span className="text-orange-500">OFFICIAL</span></h1>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Active Operator</span>
            <span className="text-sm font-bold">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black transition-all">LOGOUT</button>
        </div>
      </nav>
      
      <main className="pt-32 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs mb-4">Command Center</h2>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black uppercase italic mb-12">
          System Access <span className="text-orange-500">Granted</span>
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl hover:border-orange-500/40 transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-4 uppercase">Battle Intel</h3>
            <p className="text-gray-500 text-sm">Review latest missions and tactical data.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl hover:border-orange-500/40 transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-4 uppercase">Squad Comms</h3>
            <p className="text-gray-500 text-sm">Secure channel for squad communication.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl hover:border-orange-500/40 transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-4 uppercase">The Vault</h3>
            <p className="text-gray-500 text-sm">Check earned rewards and arsenal.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;