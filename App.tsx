import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SquadCard from './components/SquadCard';
import TacticalAdvisor from './components/TacticalAdvisor';
import TournamentCenter from './components/TournamentCenter';
import BattleComms from './components/BattleComms';
import ProfileFeed from './ProfileFeed';
import { useAuth } from './context/AuthContext';
import { SQUAD_MEMBERS } from './constants';
import { Player } from './types';

const App: React.FC = () => {
  const { user, loginWithProvider, loading, authStep } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeCallTarget, setActiveCallTarget] = useState<Player | null>(null);

  useEffect(() => {
    document.title = user ? `${user.name} @ TDN Official` : "TDN Official | Elite Squad Hub";
  }, [user]);

  const handleLinkAuth = async (provider: 'whatsapp' | 'google' | 'facebook' | 'apple') => {
    await loginWithProvider(provider);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white scroll-smooth relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 text-center">
          <h1 className="font-orbitron text-6xl md:text-[8rem] font-black uppercase italic">TDN <span className="text-orange-500">OFFICIAL</span></h1>
      </section>
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <TacticalAdvisor />
        {user && <ProfileFeed />}
        <section id="squad" className="py-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SQUAD_MEMBERS.map(player => (
              <SquadCard key={player.id} player={player} onConnect={(p) => setActiveCallTarget(p)} />
            ))}
        </section>
        <TournamentCenter />
      </div>
      {activeCallTarget && <BattleComms targetPlayer={activeCallTarget} onClose={() => setActiveCallTarget(null)} />}
    </div>
  );
};
export default App;
