'use client';

import React, { useState } from 'react';
import { BookOpen, Folder, Plus, Bookmark, Tag, ExternalLink, Trash2 } from 'lucide-react';

interface LibraryCollection {
  id: string;
  name: string;
  count: number;
}

const INITIAL_COLLECTIONS: LibraryCollection[] = [
  { id: 'all', name: 'All Saved Papers', count: 4 },
  { id: 'early-detection', name: 'Early Detection Flagship', count: 2 },
  { id: 'biomarkers', name: 'Fluid Biomarkers (p-tau217/NfL)', count: 2 },
  { id: 'genomics', name: 'APOE & Microglial Genomics', count: 1 },
  { id: 'imaging', name: 'MRI & PET Tracers', count: 1 },
];

export default function ResearchLibraryPage() {
  const [activeCollection, setActiveCollection] = useState('all');
  const [collections, setCollections] = useState<LibraryCollection[]>(INITIAL_COLLECTIONS);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setCollections([
      ...collections,
      {
        id: newCollectionName.toLowerCase().replace(/\s+/g, '-'),
        name: newCollectionName.trim(),
        count: 0,
      },
    ]);
    setNewCollectionName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Personal Research Library
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Organized scholarly publications, verified citations, annotation notebooks, and structured research collections.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {showAddModal && (
        <form onSubmit={handleCreateCollection} className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-3">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name (e.g. Multimodal Deep Learning)..."
            className="flex-1 bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Grid: Collections Sidebar + Papers View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-3 pb-2 font-semibold">
            Collections
          </h2>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                activeCollection === col.id
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Folder className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
                <span className="truncate">{col.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                {col.count}
              </span>
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">
                COLLECTION: {collections.find(c => c.id === activeCollection)?.name.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">3 Verified Articles</span>
            </div>

            {/* Curated Library Item */}
            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  OBSERVATIONAL COHORT
                </span>
                <span className="text-[10px] font-mono text-slate-500">PMID: 38240827</span>
              </div>
              <h3 className="text-xs font-bold text-slate-100">
                Diagnostic Accuracy of a Plasma Phosphorylated Tau 217 Immunoassay for Alzheimer Disease Pathology
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Key Finding: Demonstrates that plasma p-tau217 achieves ~96% sensitivity and 97% specificity for abnormal CSF/PET status, enabling non-invasive early staging.
              </p>
              <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80">
                <span>JAMA Neurology (2024)</span>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/38240827/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open PubMed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  GENOMICS / GWAS
                </span>
                <span className="text-[10px] font-mono text-slate-500">PMID: 35379992</span>
              </div>
              <h3 className="text-xs font-bold text-slate-100">
                A Multi-Tiered Genome-Wide Association Study of Alzheimer's Disease Identifies 75 Risk Loci
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Key Finding: Confirms central role of microglial endocytosis and lipid catabolism pathways alongside amyloid cascade.
              </p>
              <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800/80">
                <span>Nature Genetics (2022)</span>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/35379992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Nature Genetics</span>
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
