import { Player, Highlight, Tournament } from './types';

/**
 * ==========================================
 * TDN OFFICIAL - STRATEGIC DATA CORE v2.0
 * ==========================================
 * Verified Personnel and Operational Intel
 */

// --- ELITE SQUAD MEMBERS ---
export const SQUAD_MEMBERS: Player[] = [
  {
    id: 'tdn-leader-01',
    name: 'TDN_Leader',
    role: 'IGL & COMMANDER',
    specialty: 'Strategic Rotation / Zone Prediction',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader&backgroundColor=ea580c',
    kills: 1850,
    deaths: 310,
    wins: 340,
    mvps: 88
  },
  {
    id: 'tdn-ghost-02',
    name: 'TDN_Ghost',
    role: 'ELITE SNIPER',
    specialty: 'Long Range Precision / Recon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ghost&backgroundColor=444444',
    kills: 1420,
    deaths: 280,
    wins: 315,
    mvps: 62
  },
  {
    id: 'tdn-reaper-03',
    name: 'TDN_Reaper',
    role: 'FRAGGER / RUSHER',
    specialty: 'Close Quarter Combat / Entry',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reaper&backgroundColor=ff4444',
    kills: 2100,
    deaths: 450,
    wins: 290,
    mvps: 75
  },
  {
    id: 'tdn-support-04',
    name: 'TDN_Support',
    role: 'MEDIC & UTILITY',
    specialty: 'Fast Revive / Smoke Cover',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support&backgroundColor=4ade80',
    kills: 950,
    deaths: 380,
    wins: 320,
    mvps: 24
  }
];

// --- ACTIVE OPERATIONS (TOURNAMENTS) ---
export const CURRENT_TOURNAMENT: Tournament = {
  id: 'tournament-2025-01',
  title: 'TDN BATTLE CHASE 2025',
  status: 'ongoing',
  matches: [
    { 
      id: 'm1', 
      teamA: 'TDN ALPHA', 
      teamB: 'Viper Esports', 
      scoreA: 1, 
      scoreB: 0, 
      status: 'completed', 
      round: 'Finals' 
    },
    { 
      id: 'm2', 
      teamA: 'TDN BETA', 
      teamB: 'Shadow Squad', 
      scoreA: 2, 
      scoreB: 1, 
      status: 'live', 
      round: 'Semi-Finals' 
    }
  ]
};

// --- MISSION HIGHLIGHTS ---
export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'intel-101',
    title: 'Bridge Blockade Mastery',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop',
    description: 'Perfectly timed bridge block resulting in a triple squad wipe.'
  },
  {
    id: 'intel-102',
    title: 'School Roof Dominance',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1552824734-804675427abc?q=80&w=2000&auto=format&fit=crop',
    description: 'Strategic holding of Pochinki school roof during final circle.'
  }
];

// --- CLAN METRICS & IDENTITY ---
export const CLAN_IDENTITY = {
  name: 'TDN Official',
  tag: 'TDN',
  region: 'Bangladesh',
  founded: '2023',
  level: 15,
  motto: 'ONE TAG. ONE TEAM. ONE LEGACY.',
  color: '#ea580c'
};
