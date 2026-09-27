'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  RefreshCw, 
  Tag, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { ResearchCard, ResearchCardProps } from '@/components/ResearchCard';

const CATEGORIES = [
  'All Research',
  'Biomarkers (Tau / p-tau217)',
  'Biomarkers (Amyloid-Beta)',
  'Genetics & Genomics',
  'Neuroimaging (MRI/PET)',
  'AI & Machine Learning',
  'Early Detection Research',
  'Clinical Trials & Therapeutics'
];

export default function ResearchFeedPage() {
  const [papers, setPapers] = useState<ResearchCardProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Research');
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        const res = await fetch('/api/research/feed');
        const data = await res.json();
        setPapers(data.articles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFeed();
  }, []);

  const filteredPapers = papers.filter((p) => {
    const matchesCategory = selectedCategory === 'All Research' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.authors && p.authors.some(a => a.toLowerCase().includes(searchFilter.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Live Research Intelligence Feed
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time automated stream of biomedical literature ingested from NCBI/PubMed, OpenAlex, and scholarly registries.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            {filteredPapers.length} Records Indexed
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by title, keywords, authors, biomarkers (e.g. p-tau217, APOE4)..."
              className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs animate-pulse">
          Ingesting scientific intelligence streams from NCBI E-Utilities...
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-xl border border-slate-800 space-y-2">
          <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-mono text-slate-300">No records match your active query filters.</p>
          <p className="text-xs text-slate-500">Try broadening your search term or selecting 'All Research'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPapers.map((paper) => (
            <ResearchCard key={paper.source_record_id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
