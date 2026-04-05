/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  ShieldCheck, 
  Camera, 
  LayoutDashboard, 
  Settings, 
  MessageSquare,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Lock,
  Activity,
  Leaf,
  Droplets,
  Thermometer,
  HeartPulse,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { MarketPrice, WeatherData, TokenVaultConnection } from './types';
import { GoogleGenAI } from "@google/genai";

// Mock data for initial state
const MOCK_PRICES: MarketPrice[] = [
  { crop: 'Maize', price: 450, unit: 'kg', trend: 'up', location: 'Kaduna' },
  { crop: 'Cassava', price: 280, unit: 'kg', trend: 'stable', location: 'Oyo' },
  { crop: 'Rice', price: 620, unit: 'kg', trend: 'down', location: 'Kano' },
];

const MOCK_CONNECTIONS: TokenVaultConnection[] = [
  { provider: 'AgroAPI Weather', status: 'connected', lastSynced: '2 mins ago' },
  { provider: 'Gov Agri-Database', status: 'disconnected' },
  { provider: 'MarketLink Pro', status: 'connected', lastSynced: '1 hour ago' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pest' | 'market' | 'vault'>('dashboard');
  const [pestMode, setPestMode] = useState<'pest' | 'health'>('pest');
  const [isVaultConnecting, setIsVaultConnecting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    score: number;
    status: string;
    soil: string[];
    vitality: string[];
  }>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalysisResult({
        score: 82,
        status: 'Good',
        soil: [
          'Nitrogen levels are slightly low. Consider adding organic compost.',
          'Moisture retention is optimal for current crop stage.'
        ],
        vitality: [
          'Leaf color indicates healthy photosynthesis.',
          'Stem strength is above average for this variety.'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] text-slate-900 font-sans">
      {/* Sidebar / Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-screen md:border-t-0 md:border-r z-50">
        <div className="hidden md:flex mb-8 mt-4 text-emerald-600">
          <Sprout size={32} weight="bold" />
        </div>
        
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
          icon={<LayoutDashboard size={24} />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'pest'} 
          onClick={() => setActiveTab('pest')} 
          icon={<Camera size={24} />} 
          label="Scan" 
        />
        <NavButton 
          active={activeTab === 'market'} 
          onClick={() => setActiveTab('market')} 
          icon={<TrendingUp size={24} />} 
          label="Market" 
        />
        <NavButton 
          active={activeTab === 'vault'} 
          onClick={() => setActiveTab('vault')} 
          icon={<ShieldCheck size={24} />} 
          label="Vault" 
        />
        
        <div className="hidden md:flex mt-auto mb-4 text-slate-400">
          <Settings size={24} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pb-24 md:pb-0 md:pl-20 min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">AgriGenius</h1>
            <p className="text-xs text-slate-500">Welcome back, Farmer Torkuma</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live Insights
            </div>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Weather Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200/50 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-emerald-100 text-sm font-medium">Local Weather • Kaduna</p>
                        <h2 className="text-4xl font-bold mt-1">31°C</h2>
                        <p className="text-emerald-50 text-sm mt-1">Partly Cloudy • Humidity 45%</p>
                      </div>
                      <CloudSun size={48} className="text-white/80" />
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                      <ForecastItem day="Mon" temp="32°" />
                      <ForecastItem day="Tue" temp="30°" />
                      <ForecastItem day="Wed" temp="29°" />
                      <ForecastItem day="Thu" temp="31°" />
                    </div>
                  </div>
                  {/* Abstract background shapes */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <QuickActionCard 
                    icon={<Camera className="text-emerald-600" />} 
                    title="Pest Scan" 
                    subtitle="Identify diseases"
                    onClick={() => setActiveTab('pest')}
                  />
                  <QuickActionCard 
                    icon={<TrendingUp className="text-blue-600" />} 
                    title="Market Prices" 
                    subtitle="Check daily rates"
                    onClick={() => setActiveTab('market')}
                  />
                </div>

                {/* Token Vault Promotion Banner */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-xl text-white">
                    <Lock size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-indigo-900">Auth0 Token Vault Active</h3>
                    <p className="text-xs text-indigo-700">Your connections to government data and market APIs are secured by Auth0 for AI Agents.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('vault')}
                    className="text-indigo-600 text-xs font-bold flex items-center gap-1"
                  >
                    Manage <ChevronRight size={14} />
                  </button>
                </div>

                {/* Recent Activity */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Insights</h3>
                  <div className="space-y-3">
                    <InsightCard 
                      title="Maize Price Alert" 
                      description="Prices in Kaduna rose by 5% today. Consider selling your surplus now."
                      type="market"
                      time="2h ago"
                    />
                    <InsightCard 
                      title="Rainfall Expected" 
                      description="Heavy rain predicted for Wednesday. Delay fertilizer application."
                      type="weather"
                      time="5h ago"
                    />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'vault' && (
              <motion.div 
                key="vault"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="text-center py-4">
                  <div className="inline-flex p-4 bg-indigo-100 rounded-full text-indigo-600 mb-4">
                    <ShieldCheck size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Auth0 Token Vault</h2>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">
                    Securely manage your agent's access to third-party agricultural services.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">Connected Services</h3>
                    <p className="text-xs text-slate-500 mt-1">AgriGenius uses these tokens to fetch real-time data on your behalf.</p>
                  </div>
                  
                  <div className="divide-y divide-slate-100">
                    {MOCK_CONNECTIONS.map((conn) => (
                      <div key={conn.provider} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            conn.status === 'connected' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                          )}>
                            <Sprout size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{conn.provider}</p>
                            <p className="text-[10px] text-slate-500">
                              {conn.status === 'connected' ? `Last synced ${conn.lastSynced}` : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <button className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          conn.status === 'connected' 
                            ? "text-slate-500 border border-slate-200 hover:bg-slate-100" 
                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                        )}>
                          {conn.status === 'connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-600 p-2 rounded-lg text-white">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm">Why Token Vault?</h4>
                      <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                        Token Vault allows AgriGenius to act on your behalf without ever seeing your actual passwords. 
                        It manages OAuth flows and token rotation automatically, keeping your agricultural data private and secure.
                      </p>
                      <a href="https://auth0.com/ai-agents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] mt-3 uppercase tracking-wider">
                        Learn More <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div 
                key="market"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Market Trends</h2>
                    <p className="text-slate-500 text-sm">Daily commodity prices across Nigeria</p>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    Updated 10m ago
                  </div>
                </div>

                <div className="grid gap-4">
                  {MOCK_PRICES.map((item) => (
                    <div key={item.crop} className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                          <Sprout size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{item.crop}</h4>
                          <p className="text-xs text-slate-500">{item.location} Market</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800">₦{item.price}<span className="text-xs text-slate-400 font-normal">/{item.unit}</span></p>
                        <div className={cn(
                          "text-[10px] font-bold flex items-center justify-end gap-0.5",
                          item.trend === 'up' ? "text-emerald-600" : item.trend === 'down' ? "text-rose-500" : "text-slate-400"
                        )}>
                          {item.trend === 'up' ? '▲ 2.4%' : item.trend === 'down' ? '▼ 1.1%' : 'Stable'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors">
                  View Detailed Analysis
                </button>
              </motion.div>
            )}

            {activeTab === 'pest' && (
              <motion.div 
                key="pest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Mode Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button 
                    onClick={() => { setPestMode('pest'); setAnalysisResult(null); }}
                    className={cn(
                      "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                      pestMode === 'pest' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    )}
                  >
                    Pest Detection
                  </button>
                  <button 
                    onClick={() => { setPestMode('health'); setAnalysisResult(null); }}
                    className={cn(
                      "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                      pestMode === 'health' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    )}
                  >
                    Health Analysis
                  </button>
                </div>

                {!analysisResult ? (
                  <>
                    <div className="bg-slate-900 rounded-[2.5rem] aspect-square flex flex-col items-center justify-center text-white relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6">
                          {pestMode === 'pest' ? <Camera size={32} /> : <HeartPulse size={32} className="text-emerald-400" />}
                        </div>
                        <h3 className="text-xl font-bold">
                          {pestMode === 'pest' ? 'AI Pest Detection' : 'Crop Health Analysis'}
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 text-center px-12">
                          {pestMode === 'pest' 
                            ? 'Point your camera at a leaf or crop to identify pests and diseases instantly.'
                            : 'Scan your crop to analyze overall vitality and receive soil recommendations.'}
                        </p>
                      </div>
                      
                      {/* Scanning animation overlay */}
                      {(isAnalyzing || true) && (
                        <motion.div 
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Camera size={18} />
                            Scan Now
                          </>
                        )}
                      </button>
                      <button className="py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm">
                        Upload Photo
                      </button>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                      <AlertCircle className="text-amber-600 shrink-0" size={20} />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Tip:</strong> {pestMode === 'pest' 
                          ? 'Ensure the leaf is well-lit and in focus for the most accurate AI diagnosis.'
                          : 'Try to capture the whole plant and some surrounding soil for better vitality analysis.'}
                      </p>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <button 
                      onClick={() => setAnalysisResult(null)}
                      className="flex items-center gap-2 text-slate-500 text-sm font-bold"
                    >
                      <ArrowLeft size={16} /> Back to Scanner
                    </button>

                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Health Score</h3>
                          <p className="text-xs text-slate-500">Based on visual vitality markers</p>
                        </div>
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                            <circle 
                              cx="32" cy="32" r="28" fill="none" stroke="#10B981" strokeWidth="6" 
                              strokeDasharray={2 * Math.PI * 28}
                              strokeDashoffset={2 * Math.PI * 28 * (1 - analysisResult.score / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-sm font-bold text-emerald-600">{analysisResult.score}%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 text-emerald-600 mb-1">
                            <Leaf size={14} />
                            <span className="text-[10px] font-bold uppercase">Vitality</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{analysisResult.status}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 text-blue-600 mb-1">
                            <Droplets size={14} />
                            <span className="text-[10px] font-bold uppercase">Hydration</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">Optimal</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Sprout size={14} /> Soil Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {analysisResult.soil.map((item, i) => (
                              <li key={i} className="text-xs text-slate-600 flex gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>

                        <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Activity size={14} /> Plant Vitality Tips
                          </h4>
                          <ul className="space-y-2">
                            {analysisResult.vitality.map((item, i) => (
                              <li key={i} className="text-xs text-slate-600 flex gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200">
                      Save to Farm Log
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-24 right-6 md:hidden">
        <button className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300 md:w-full md:py-4",
        active ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all",
        active ? "bg-emerald-50" : "bg-transparent"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="hidden md:block absolute left-0 w-1 h-8 bg-emerald-600 rounded-r-full"
        />
      )}
    </button>
  );
}

function ForecastItem({ day, temp }: { day: string, temp: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px] bg-white/10 rounded-2xl py-3 backdrop-blur-sm border border-white/10">
      <span className="text-[10px] font-medium opacity-80">{day}</span>
      <CloudSun size={16} className="my-2" />
      <span className="text-sm font-bold">{temp}</span>
    </div>
  );
}

function QuickActionCard({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-4 rounded-3xl border border-slate-200 text-left hover:border-emerald-200 hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
      <p className="text-[10px] text-slate-500 mt-0.5">{subtitle}</p>
    </button>
  );
}

function InsightCard({ title, description, type, time }: { title: string, description: string, type: 'market' | 'weather', time: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
        type === 'market' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
      )}>
        {type === 'market' ? <TrendingUp size={18} /> : <CloudSun size={18} />}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
