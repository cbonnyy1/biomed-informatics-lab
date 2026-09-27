'use client';

import React, { useState } from 'react';
import { Dna, Activity, Search, ShieldCheck, Database, GitFork } from 'lucide-react';
import { GENES_SEED } from '@/lib/data/reference-data';

export default function GenomicsLabPage() {
  const [genes] = useState(GENES_SEED);
  const [selectedGene, setSelectedGene] = useState(GENES_SEED[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Dna className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Genomics & Genetics Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Mendelian causal genes, GWAS risk loci, polygenic risk scoring, and NIAGADS / ADSP multi-omics exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gene List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Core Target Loci
          </h2>
          {genes.map((g) => (
            <button
              key={g.symbol}
              onClick={() => setSelectedGene(g)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedGene.symbol === g.symbol
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-mono">{g.symbol}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {g.chromosome}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{g.name}</p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">
                {g.risk_level}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Gene Deep Dive */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-100 font-mono">{selectedGene.symbol} — {selectedGene.name}</h2>
              <span className="text-xs text-cyan-400 font-mono">Locus: {selectedGene.chromosome} | Inheritance: {selectedGene.inheritance_pattern}</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400">
              {selectedGene.risk_level}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Biological Pathway & Functional Role</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedGene.pathway}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Molecular Mechanism of Pathogenicity / Risk</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedGene.mechanism}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-emerald-300 uppercase font-semibold">Clinical & Phenotypic Relevance</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedGene.clinical_relevance}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/40 text-purple-200 flex items-start gap-3">
              <Database className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono text-[10px] uppercase font-bold text-purple-300">
                  NIAGADS / ADSP Sequencing Status
                </h5>
                <p className="text-[11px] mt-0.5 text-purple-200/90 leading-relaxed">
                  {selectedGene.niagads_adsp_status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
