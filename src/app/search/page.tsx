'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Radio, Stethoscope, Dna, Microscope, Database, ArrowRight, Globe2 } from 'lucide-react';
import { ResearchCard, ResearchCardProps } from '@/components/ResearchCard';
import { BIOMARKERS_SEED, GENES_SEED } from '@/lib/data/reference-data';

function SearchInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [papers, setPapers] = useState<ResearchCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/research/feed?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setPapers(data.articles || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const matchingBiomarkers = BIOMARKERS_SEED.filter(
    b => b.name.toLowerCase().includes(query.toLowerCase()) || b.abbreviation.toLowerCase().includes(query.toLowerCase())
  );

  const matchingGenes = GENES_SEED.filter(
    g => g.symbol.toLowerCase().includes(query.toLowerCase()) || g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Unified Multi-Source Biomedical Search
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Simultaneous querying across OpenAlex, Europe PMC, medRxiv preprints, PubMed, biomarkers, and genomic loci with direct DOI verification.
        </p>
      </div>

      {/* Search Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, biomarker, gene, or keyword (e.g. p-tau217, APOE, MRI atrophy)..."
          className="flex-1 bg-slate-900 text-slate-200 text-xs px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs shadow-md shadow-cyan-500/20"
        >
          Search
        </button>
      </form>

      {/* Quick Matches (Biomarkers / Genes) */}
      {query.trim() && (matchingBiomarkers.length > 0 || matchingGenes.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingBiomarkers.map((b) => (
            <div key={b.abbreviation} className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs space-y-1">
              <div className="flex items-center justify-between text-cyan-400 font-mono font-bold">
                <span className="flex items-center gap-1.5"><Microscope className="w-3.5 h-3.5" /> Biomarker Match</span>
                <span>{b.category}</span>
              </div>
              <h3 className="font-bold text-slate-100">{b.name} ({b.abbreviation})</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{b.clinical_context}</p>
            </div>
          ))}

          {matchingGenes.map((g) => (
            <div key={g.symbol} className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-xs space-y-1">
              <div className="flex items-center justify-between text-purple-400 font-mono font-bold">
                <span className="flex items-center gap-1.5"><Dna className="w-3.5 h-3.5" /> Genomic Target Match</span>
                <span>{g.chromosome}</span>
              </div>
              <h3 className="font-bold text-slate-100">{g.symbol} — {g.name}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{g.pathway}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search Results Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase text-slate-400 font-bold">
          Multi-Source Scientific Ingestions ({papers.length})
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs animate-pulse">
            Querying OpenAlex, Europe PMC, medRxiv, and PubMed knowledge graphs...
          </div>
        ) : papers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            Enter a research query above to search live biomedical registries.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {papers.map((paper) => (
              <ResearchCard key={`${paper.source}-${paper.source_record_id}`} paper={paper} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-slate-500">Loading Search Portal...</div>}>
      <SearchInner />
    </Suspense>
  );
}
