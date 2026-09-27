'use client';

import React, { useState } from 'react';
import { Database, Lock, ShieldCheck, Key, ExternalLink, CheckCircle } from 'lucide-react';
import { DATASETS_SEED } from '@/lib/data/reference-data';

export default function DatasetsPage() {
  const [datasets] = useState(DATASETS_SEED);
  const [selectedDataset, setSelectedDataset] = useState(DATASETS_SEED[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Biomedical Dataset Center & Cohorts
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Authorized integration specifications for ADNI (LONI), NIAGADS, and open biomedical repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Datasets List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Tracked Research Repositories
          </h2>
          {datasets.map((d) => (
            <button
              key={d.name}
              onClick={() => setSelectedDataset(d)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedDataset.name === d.name
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono truncate max-w-[180px]">{d.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{d.organization}</p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">
                {d.access_type}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Dataset Detail */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-100">{selectedDataset.name}</h2>
              <span className="text-xs text-cyan-400 font-mono font-bold">{selectedDataset.organization}</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
              {selectedDataset.cohort_size}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Scientific Purpose & Cohort Characterization</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedDataset.purpose}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Supported Modalities</h4>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {JSON.parse(selectedDataset.modalities as any).map((m: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Data Governance & Authorization Boundary</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{selectedDataset.local_access_status}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {selectedDataset.authorization_process}
              </p>
              <div className="pt-2">
                <a
                  href={selectedDataset.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-mono text-xs"
                >
                  <span>Access Official Repository Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
