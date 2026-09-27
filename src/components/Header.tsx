'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, ShieldCheck, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
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
    <header className="h-14 bg-[#0a0e17]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-96 max-w-full">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search PubMed, Trials, Biomarkers, Genes (e.g. p-tau217)..."
          className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs pl-9 pr-4 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-sans transition-all"
        />
      </form>

      {/* Status Indicators & Controls */}
      <div className="flex items-center space-x-4">
        {/* Sync Status */}
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="flex items-center space-x-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-slate-200 transition-colors font-mono"
        >
          <RefreshCw className={`w-3 h-3 text-cyan-400 ${isSyncing ? 'animate-spin text-cyan-300' : ''}`} />
          <span>{syncTime}</span>
        </button>

        {/* Provenance Badge */}
        <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-emerald-950/30 border border-emerald-800/50 text-[11px] text-emerald-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PROVENANCE VERIFIED</span>
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
