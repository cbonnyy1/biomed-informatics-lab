import React from 'react';
import { Stethoscope, ExternalLink, ShieldCheck, Activity, Calendar, Users, Building } from 'lucide-react';
import { fetchClinicalTrials } from '@/lib/ingestion/clinicaltrials';

export const revalidate = 3600;

export default async function ClinicalTrialsPage() {
  const trials = await fetchClinicalTrials("Alzheimer Disease", 12);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Clinical Trial Explorer
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Alzheimer's Disease and Related Dementia clinical trials synchronized directly with ClinicalTrials.gov API v2.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-300">
            {trials.length} Active Trials Monitored
          </span>
        </div>
      </div>

      {/* Educational Callout on Trial Methodology */}
      <div className="glass-panel p-4 rounded-xl border border-purple-500/20 bg-purple-950/10 text-xs text-slate-300 space-y-2">
        <h3 className="font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Biomedical Informatics Clinical Trial Competency</span>
        </h3>
        <p className="leading-relaxed text-[11px] text-slate-300">
          Informatics analysis of clinical trials requires tracking: <strong>Phase</strong> (Phase 1 safety vs Phase 3 confirmatory efficacy), <strong>Primary Outcome Measures</strong> (e.g. CDR-SB, ADAS-Cog, iADRS, amyloid Centiloid clearance), <strong>Biomarker Enrichment Criteria</strong> (e.g., plasma p-tau217/PET inclusion thresholds), and <strong>Adverse Event Phenotypes</strong> (e.g., ARIA-E vasogenic edema, ARIA-H microhemorrhages).
        </p>
      </div>

      {/* Trials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trials.map((trial) => (
          <div key={trial.nct_id} className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">
                  {trial.nct_id}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {trial.phase}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {trial.status}
                  </span>
                </div>
              </div>

              <h2 className="text-sm font-semibold text-slate-100 leading-snug">
                <a href={trial.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 flex items-start gap-1 group">
                  <span>{trial.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-slate-500 group-hover:text-purple-400 transition-colors mt-0.5" />
                </a>
              </h2>

              <div className="text-xs text-slate-400 space-y-1">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase">Intervention(s):</span>
                  <p className="text-slate-300 truncate">{trial.interventions.join(' | ') || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase">Primary Outcome:</span>
                  <p className="text-slate-300 line-clamp-2 text-[11px] leading-relaxed">{trial.primary_outcome}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-1 truncate max-w-[200px]">
                <Building className="w-3 h-3 text-slate-400" />
                <span className="truncate">{trial.sponsor}</span>
              </div>
              {trial.enrollment ? (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span>{trial.enrollment} Enrolled</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
