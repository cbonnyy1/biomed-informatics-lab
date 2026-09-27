import React from 'react';
import { Sparkles, Calendar, BookOpen, Stethoscope, Database, ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { fetchAggregatedResearchStream } from '@/lib/ingestion/unified-feed';
import { fetchClinicalTrials } from '@/lib/ingestion/clinicaltrials';
import { fetchNIHAwards } from '@/lib/ingestion/nihreporter';

export const revalidate = 3600;

export default async function DailyBriefPage() {
  const [researchArticles, clinicalTrials, nihAwards] = await Promise.all([
    fetchAggregatedResearchStream("Alzheimer's disease biomarkers p-tau217", 4),
    fetchClinicalTrials("Alzheimer Disease", 3),
    fetchNIHAwards("Alzheimer biomarker machine learning", 2),
  ]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Daily Biomedical Research Brief
            </h1>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
            {currentDate}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Synthesized automated daily intelligence digest across OpenAlex, Europe PMC, medRxiv preprints, ClinicalTrials.gov developments, and NIH RePORTER awards.
        </p>
      </div>

      {/* Brief Sections */}
      <div className="space-y-6">
        {/* Section 1: Literature Highlights */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
              <BookOpen className="w-4 h-4" />
              <span>1. Multi-Source Scholarly Ingestions</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Direct DOI Verified</span>
          </div>

          <div className="space-y-3">
            {researchArticles.map((paper) => (
              <div key={`${paper.source}-${paper.source_record_id}`} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{paper.source}</span>
                  <span className="text-[10px] font-mono text-slate-400">{paper.journal}</span>
                </div>
                <h3 className="font-semibold text-slate-100 leading-snug">
                  <a href={paper.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                    {paper.title}
                  </a>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{paper.abstract}</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/60">
                  <span>{paper.authors[0]} et al.</span>
                  <a href={paper.source_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    Open Direct Source →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Clinical Trial Updates */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-2">
            <Stethoscope className="w-4 h-4" />
            <span>2. Monitored Clinical Trial Updates</span>
          </div>

          <div className="space-y-3">
            {clinicalTrials.map((trial) => (
              <div key={trial.nct_id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-400 font-bold">{trial.nct_id}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {trial.phase}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-100">
                  <a href={trial.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    {trial.title}
                  </a>
                </h3>
                <p className="text-[11px] text-slate-400">Sponsor: {trial.sponsor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: NIH Funding Intelligence */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-2">
            <Database className="w-4 h-4" />
            <span>3. Active NIH Funded Projects</span>
          </div>

          <div className="space-y-3">
            {nihAwards.map((grant) => (
              <div key={grant.project_num} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 font-bold">{grant.project_num}</span>
                  <span className="text-[10px] font-mono text-slate-400">${Number(grant.award_amount).toLocaleString()}</span>
                </div>
                <h3 className="font-semibold text-slate-100">
                  <a href={grant.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                    {grant.title}
                  </a>
                </h3>
                <p className="text-[11px] text-slate-400">PI: {grant.principal_investigator} ({grant.organization})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
