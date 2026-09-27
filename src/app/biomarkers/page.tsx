'use client';

import React, { useState } from 'react';
import { Microscope, Activity, Filter, Info, ShieldCheck, TrendingUp } from 'lucide-react';
import { BIOMARKERS_SEED } from '@/lib/data/reference-data';

export default function BiomarkerLabPage() {
  const [biomarkers] = useState(BIOMARKERS_SEED);
  const [selectedBiomarker, setSelectedBiomarker] = useState(BIOMARKERS_SEED[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Biomarker Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Fluid (plasma/CSF), PET imaging, and structural MRI biomarkers for Alzheimer's and neurodegenerative staging (ATN Framework).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biomarkers List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Standardized Biomarker Panel
          </h2>
          {biomarkers.map((b) => (
            <button
              key={b.abbreviation}
              onClick={() => setSelectedBiomarker(b)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedBiomarker.abbreviation === b.abbreviation
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{b.abbreviation}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {b.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{b.name}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-cyan-400">
                <span>Sens: {b.clinical_sensitivity}%</span>
                <span>Spec: {b.clinical_specificity}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Biomarker Detail & Informatics Evaluation */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-100">{selectedBiomarker.name}</h2>
              <span className="text-xs text-cyan-400 font-mono font-bold">{selectedBiomarker.abbreviation} — {selectedBiomarker.category}</span>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Target Process</span>
              <span className="text-xs text-emerald-400 font-semibold">{selectedBiomarker.pathological_process}</span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Clinical Sensitivity</span>
              <span className="text-xl font-bold text-cyan-400">{selectedBiomarker.clinical_sensitivity}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Clinical Specificity</span>
              <span className="text-xl font-bold text-emerald-400">{selectedBiomarker.clinical_specificity}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase block">Assay Platform</span>
              <span className="text-xs font-bold text-slate-200 mt-1 block truncate">{selectedBiomarker.measurement_method}</span>
            </div>
          </div>

          {/* Research & Clinical Context */}
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Biological Target & Pathophysiology</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedBiomarker.biological_target}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Clinical Translation & Utility</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedBiomarker.clinical_context}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-emerald-300 uppercase font-semibold">Early Detection & Research Trajectory</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedBiomarker.research_summary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200">
              <h5 className="font-mono text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Known Limitations & Research Considerations</span>
              </h5>
              <p className="text-[11px] mt-1 leading-relaxed text-amber-200/90">
                {selectedBiomarker.limitations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
