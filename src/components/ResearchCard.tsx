'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Bookmark, 
  FileText, 
  ShieldCheck, 
  Tag, 
  Calendar, 
  User, 
  BookOpen, 
  CheckCircle, 
  Layers 
} from 'lucide-react';

export interface ResearchCardProps {
  id?: string;
  title: string;
  abstract: string;
  authors: string[];
  journal?: string;
  publication_date: string;
  category?: string;
  research_category?: string;
  evidence_type: string;
  source: string;
  source_record_id: string;
  doi?: string;
  pmid?: string;
  nct_id?: string;
  source_url: string;
  citation_count?: number;
}

export function ResearchCard({ paper }: { paper: ResearchCardProps }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);

  const categoryDisplay = paper.category || paper.research_category || 'Alzheimer Research';

  const getEvidenceBadge = (type: string) => {
    switch (type.toUpperCase()) {
      case 'CLINICAL TRIAL':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'META-ANALYSIS':
      case 'SYSTEMATIC REVIEW':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'OBSERVATIONAL STUDY':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'PREPRINT':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      default:
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getEvidenceBadge(paper.evidence_type)}`}>
              {paper.evidence_type}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {categoryDisplay}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isSaved 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title={isSaved ? "Saved to Research Library" : "Save to Research Library"}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => setShowProvenance(!showProvenance)}
              className="p-1.5 rounded-lg bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-cyan-400 transition-colors"
              title="Inspect Immutable Provenance"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Paper Title */}
        <h3 className="text-sm font-semibold text-slate-100 hover:text-cyan-300 transition-colors leading-snug">
          <a href={paper.source_url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 group">
            <span>{paper.title}</span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors mt-0.5" />
          </a>
        </h3>

        {/* Abstract */}
        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
          {paper.abstract}
        </p>

        {/* Provenance Panel Modal/Drawer if opened */}
        {showProvenance && (
          <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300 space-y-1 animate-fadeIn">
            <div className="flex justify-between border-b border-slate-800 pb-1 text-cyan-400 font-bold">
              <span>PROVENANCE METADATA</span>
              <span className="text-[10px] text-emerald-400">UNALTERED SOURCE</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[10px]">
              <div><span className="text-slate-500">Source:</span> {paper.source}</div>
              <div><span className="text-slate-500">Record ID:</span> {paper.source_record_id}</div>
              {paper.pmid && <div><span className="text-slate-500">PMID:</span> {paper.pmid}</div>}
              {paper.doi && <div><span className="text-slate-500">DOI:</span> {paper.doi}</div>}
              {paper.nct_id && <div><span className="text-slate-500">NCT ID:</span> {paper.nct_id}</div>}
              <div className="col-span-2 truncate"><span className="text-slate-500">Direct URI:</span> {paper.source_url}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <User className="w-3 h-3 text-slate-500" />
            <span className="truncate max-w-[140px]">{paper.authors[0] || 'Author'} et al.</span>
          </span>
          {paper.journal && (
            <span className="truncate max-w-[150px] text-slate-400 hidden sm:inline">
              {paper.journal}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-500" />
          <span>{paper.publication_date}</span>
        </div>
      </div>
    </div>
  );
}
