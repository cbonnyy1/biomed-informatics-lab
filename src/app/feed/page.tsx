'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  RefreshCw, 
  Tag, 
  Layers, 
  ShieldCheck,
  Globe2,
  Database,
  ExternalLink
} from 'lucide-react';
import { ResearchCard, ResearchCardProps } from '@/components/ResearchCard';

const SOURCES = [
  { id: 'all', name: 'All Scientific Sources' },
  { id: 'openalex', name: 'OpenAlex Scholarly Graph' },
  { id: 'europe pmc', name: 'Europe PMC / EMBL-EBI' },
  { id: 'medrxiv', name: 'medRxiv / bioRxiv Preprints' },
  { id: 'pubmed', name: 'PubMed / NCBI' },
];

const CATEGORIES = [
  'All Research',
  'Biomarkers & Clinical Informatics',
  'Biomarkers (Tau / p-tau217)',
  'Genetics & Genomics',
  'Neurodegenerative Diseases & AI',
  'Early Detection & Biomarkers',
  'Clinical Trials & Therapeutics'
];

export default function ResearchFeedPage() {
  const [papers, setPapers] = useState<ResearchCardProps[]>([]);
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Research');
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/research/feed?source=${encodeURIComponent(selectedSource)}`);
      const data = await res.json();
      setPapers(data.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [selectedSource]);

  const filteredPapers = papers.filter((p) => {
    const categoryMatches = selectedCategory === 'All Research' || 
      (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (p.research_category && p.research_category.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch = 
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.authors && p.authors.some(a => a.toLowerCase().includes(searchFilter.toLowerCase())));

    return categoryMatches && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Multi-Source Scientific Intelligence Feed
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated, real-time biomedical research stream pulling simultaneously from OpenAlex, Europe PMC, medRxiv preprints, and NCBI PubMed with verified direct DOI links.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={loadFeed}
            disabled={loading}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
          <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
            {filteredPapers.length} Papers
          </span>
        </div>
      </div>

      {/* Source Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold flex items-center gap-1 pl-1">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Source:
          </span>
          {SOURCES.map((src) => (
            <button
              key={src.id}
              onClick={() => setSelectedSource(src.id)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-mono transition-all ${
                selectedSource === src.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/50 font-bold glow-cyan'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {src.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by title, author, keyword, or biological target..."
            className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Feed Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-xs animate-pulse space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
          <p>Ingesting live multi-repository research streams across OpenAlex, Europe PMC, and medRxiv...</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-xl border border-slate-800 space-y-2">
          <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-mono text-slate-300">No records found matching your active filter criteria.</p>
          <p className="text-xs text-slate-500">Try switching to 'All Scientific Sources' or adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPapers.map((paper) => (
            <ResearchCard key={`${paper.source}-${paper.source_record_id}`} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
