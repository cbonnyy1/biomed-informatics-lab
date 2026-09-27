'use client';

import React, { useState } from 'react';
import { Zap, Activity, Brain, ShieldAlert, CheckCircle2, ChevronRight, Dna, Microscope, Network } from 'lucide-react';

const RESEARCH_PHASES = [
  {
    phase: 'PHASE 0',
    title: 'Biological Foundations & Pathophysiological Trajectories',
    status: 'COMPLETED / ACTIVE REFERENCE',
    objective: 'Establish rigorous mechanistic understanding of amyloid cascade, tau phosphorylation kinetics, microglial neuroinflammation, and synaptic failure.',
    informatics_deliverable: 'Knowledge bases and ontology mappings linking cellular mechanisms to measurable fluid and imaging biomarkers.'
  },
  {
    phase: 'PHASE 1',
    title: 'Literature Synthesis & Landmark Preclinical Cohorts',
    status: 'ACTIVE INVESTIGATION',
    objective: 'Systematically catalog longitudinal transition rates from cognitively unimpaired (CU) status to Mild Cognitive Impairment (MCI) across AIBL, ADNI, BioFINDER, and WRAP cohorts.',
    informatics_deliverable: 'Meta-analysis data pipeline mapping biomarker cut-points (p-tau217, Centiloid PET thresholds).'
  },
  {
    phase: 'PHASE 2',
    title: 'Single-Modality Longitudinal Trajectory Modeling',
    status: 'UNDER DEVELOPMENT',
    objective: 'Model longitudinal rates of change (slopes) in individual biomarker streams (plasma p-tau217 dynamics vs hippocampal volume atrophy velocity).',
    informatics_deliverable: 'Linear mixed-effects (LME) and generalized additive models (GAM) in Python/statsmodels.'
  },
  {
    phase: 'PHASE 3',
    title: 'Multimodal Feature Engineering & Integration',
    status: 'SCHEDULED',
    objective: 'Integrate plasma biomarkers, polygenic risk scores (PRS), volumetric MRI segmentation, and baseline cognitive test performance.',
    informatics_deliverable: 'Harmonized tabular multimodal dataset schema with missing-data imputation pipelines.'
  },
  {
    phase: 'PHASE 4',
    title: 'Experimental Predictive Modeling & Cross-Validation',
    status: 'SCHEDULED (RESEARCH ONLY)',
    objective: 'Evaluate machine learning models (Gradient Boosting, Survival Analysis / Cox Proportional Hazards) for time-to-MCI-conversion prediction.',
    informatics_deliverable: 'Stratified participant-level nested cross-validation with strict data-leakage prevention.'
  },
  {
    phase: 'PHASE 5',
    title: 'External Validation, Calibration & Reproducibility',
    status: 'LONG-TERM DOCTORAL GOAL',
    objective: 'Validate computational models on independent external cohorts to evaluate generalizability across diverse demographic populations.',
    informatics_deliverable: 'Reproducible Dockerized analytical pipeline and published pre-doctoral manuscript.'
  }
];

export default function EarlyDetectionProgramPage() {
  const [selectedPhase, setSelectedPhase] = useState(RESEARCH_PHASES[1]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Long-Term Early Detection Flagship Program
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Structured 6-phase scientific roadmap investigating computational multimodal early identification of Alzheimer's progression.
        </p>
      </div>

      {/* Scientific Disclaimer & Integrity Notice */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 space-y-2">
        <div className="flex items-center gap-2 font-mono font-bold text-purple-300 uppercase">
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          <span>Scientific Integrity & Diagnostic Boundary</span>
        </div>
        <p className="leading-relaxed text-[11px] text-purple-200/90">
          This flagship program constitutes a <strong>long-term academic computational research framework</strong>. In strict compliance with biomedical ethics and scientific methodology, this platform does not make individual clinical diagnoses or direct health predictions. Early detection remains an active pre-doctoral scientific inquiry.
        </p>
      </div>

      {/* Flagship Question Box */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 glow-cyan space-y-2">
        <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
          Primary Guiding Research Question
        </span>
        <h2 className="text-sm font-semibold text-slate-100 leading-snug">
          "Can multimodal longitudinal biomedical data (plasma p-tau217/NfL, polygenic risk scores, and volumetric MRI atrophy dynamics) identify measurable latent patterns associated with future progression toward mild cognitive impairment before conventional clinical diagnosis?"
        </h2>
      </div>

      {/* Phase Progression Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Program Phases
          </h2>
          {RESEARCH_PHASES.map((p) => (
            <button
              key={p.phase}
              onClick={() => setSelectedPhase(p)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedPhase.phase === p.phase
                  ? 'bg-purple-500/10 text-purple-200 border-purple-500/40 glow-purple'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-purple-400">{p.phase}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {p.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">{p.title}</p>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">{selectedPhase.phase}</span>
              <h3 className="text-base font-bold text-slate-100">{selectedPhase.title}</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              {selectedPhase.status}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Core Scientific Objective</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedPhase.objective}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Computational & Informatics Deliverable</h4>
              <p className="text-slate-300 mt-1 leading-relaxed font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedPhase.informatics_deliverable}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
