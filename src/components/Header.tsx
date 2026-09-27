'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, RefreshCw, Menu, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMobileNav } from './MobileNavContext';

export function Header() {
  const router = useRouter();
  const { toggleNav } = useMobileNav();
  const [searchQuery, setSearchQuery] = useState('');
  const [syncTime, setSyncTime] = useState('Syncing...');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setSyncTime(`Synchronized ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await fetch('/api/sync', { method: 'POST' });
      setSyncTime(`Synchronized ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <header className="h-14 bg-[#0a0e17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 gap-3">
      {/* Left side: Hamburger on mobile + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={toggleNav}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PubMed, Biomarkers, Genes..."
            className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs pl-9 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-sans transition-all"
          />
        </form>
      </div>

      {/* Status Indicators & Controls */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Sync Status - Hidden on extra small mobile screens for clean layout */}
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-slate-200 transition-colors font-mono"
        >
          <RefreshCw className={`w-3 h-3 text-cyan-400 ${isSyncing ? 'animate-spin text-cyan-300' : ''}`} />
          <span className="hidden lg:inline">{syncTime}</span>
          <span className="lg:hidden">Sync</span>
        </button>

        {/* Provenance Badge */}
        <div className="hidden xs:flex items-center space-x-1.5 px-2 py-1 rounded bg-emerald-950/30 border border-emerald-800/50 text-[10px] sm:text-[11px] text-emerald-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">PROVENANCE VERIFIED</span>
          <span className="sm:hidden">VERIFIED</span>
        </div>

        {/* Researcher Indicator */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            CB
          </div>
        </div>
      </div>
    </header>
  );
}
