import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Brain, 
  Dna, 
  Microscope, 
  Stethoscope, 
  Network, 
  FileCode2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Database,
  Terminal,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { fetchPubMedArticles } from '@/lib/ingestion/pubmed';
import { fetchClinicalTrials } from '@/lib/ingestion/clinicaltrials';
import { fetchNIHAwards } from '@/lib/ingestion/nihreporter';
import { ResearchCard } from '@/components/ResearchCard';

export const revalidate = 1800; // 30 mins

export default async function CommandCenterPage() {
  const [pubmedArticles, clinicalTrials, nihAwards] = await Promise.all([
    fetchPubMedArticles("Alzheimer's disease biomarkers OR p-tau217 OR early detection", 6),
    fetchClinicalTrials("Alzheimer Disease", 4),
    fetchNIHAwards("Alzheimer biomarker machine learning", 3),
  ]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Mission Statement */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1527] via-[#0b101c] to-[#07090e] border border-cyan-500/20 p-5 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Brain className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>BIOMEDICAL INFORMATICS RESEARCH ENVIRONMENT</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            Alzheimer's Disease, Neurodegeneration & Computational Early-Detection Lab
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            A permanent pre-doctoral scientific platform engineered for computational research into Alzheimer's Disease and Related Dementias (ADRD). Dedicated to mastering multimodal biomarkers, genomics, neuroimaging, biostatistics, and machine learning toward early disease identification.
          </p>

          <div className="flex items-center gap-2 sm:gap-3 pt-2 flex-wrap text-xs">
            <Link
              href="/early-detection"
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all font-mono"
            >
              <Zap className="w-4 h-4" />
              <span>EARLY DETECTION PROGRAM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/academy"
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium flex items-center gap-2 font-mono transition-all"
            >
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>TRAINING ACADEMY (13 LEVELS)</span>
            </Link>
            <Link
              href="/brief"
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-mono flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>DAILY BRIEF</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Real-time KPI / Research Stream Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">LIVE PUBMED INGESTION</span>
            <Microscope className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{pubmedArticles.length} Recent</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            E-Utilities API Active
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">ACTIVE CLINICAL TRIALS</span>
            <Stethoscope className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{clinicalTrials.length} Monitored</div>
          <div className="text-[11px] text-purple-400 font-mono">ClinicalTrials.gov v2</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">NIH FUNDED GRANTS</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{nihAwards.length} Active</div>
          <div className="text-[11px] text-blue-400 font-mono">NIH RePORTER Synchronized</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">CURRICULUM MODULES</span>
            <FileCode2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">14 Core</div>
          <div className="text-[11px] text-emerald-400 font-mono">13 Progressive Levels</div>
        </div>
      </div>

      {/* Main Content Split: Research Feed + Live Clinical Trials / Grants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: Latest Scientific Intelligence (PubMed) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-bold tracking-tight text-white uppercase font-mono">
                Latest Biomedical Research Stream
              </h2>
            </div>
            <Link href="/feed" className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1">
              <span>Full Feed</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pubmedArticles.map((paper) => (
              <ResearchCard key={paper.source_record_id} paper={paper} />
            ))}
          </div>
        </div>

        {/* Right Col: Active Trials & NIH RePORTER Grants */}
        <div className="space-y-6">
          {/* Clinical Trials Widget */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase font-mono text-slate-200">
                  Monitored Clinical Trials
                </h3>
              </div>
              <Link href="/trials" className="text-[11px] text-purple-400 hover:underline font-mono">
                All Trials
              </Link>
            </div>

            <div className="space-y-3">
              {clinicalTrials.map((trial) => (
                <div key={trial.nct_id} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-purple-400 font-bold">{trial.nct_id}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {trial.phase}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-200 line-clamp-2">
                    <a href={trial.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                      {trial.title}
                    </a>
                  </h4>
                  <div className="text-[10px] text-slate-500 truncate">
                    Sponsor: {trial.sponsor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NIH Grants Widget */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase font-mono text-slate-200">
                  NIH Funded Projects
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">NIH RePORTER</span>
            </div>

            <div className="space-y-3">
              {nihAwards.map((grant) => (
                <div key={grant.project_num} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-blue-400 font-bold">{grant.project_num}</span>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">
                      ${Number(grant.award_amount).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-200 line-clamp-2">
                    <a href={grant.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                      {grant.title}
                    </a>
                  </h4>
                  <div className="text-[10px] text-slate-500 truncate">
                    PI: {grant.principal_investigator} ({grant.organization})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
