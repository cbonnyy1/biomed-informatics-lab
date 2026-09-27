'use client';

import React, { useState } from 'react';
import { FolderGit2, Plus, Target, FileText, Database, Activity, ArrowRight } from 'lucide-react';

interface ProjectWorkspace {
  id: string;
  title: string;
  objective: string;
  background: string;
  hypothesis: string;
  methodology: string;
  modalities: string[];
  status: 'Planning' | 'Active Analysis' | 'Completed' | 'Published';
}

const INITIAL_PROJECTS: ProjectWorkspace[] = [
  {
    id: 'proj-1',
    title: 'Multimodal Machine Learning for 3-Year MCI Conversion Prediction in Preclinical AD',
    objective: 'Build and validate a participant-stratified gradient boosting and survival ML pipeline combining plasma p-tau217 with volumetric MRI.',
    background: 'Current preclinical screening methods rely heavily on single static biomarkers, which exhibit high variance across ethnoculturally diverse cohorts.',
    hypothesis: 'Integrating longitudinal change rates of plasma p-tau217 and hippocampal volume will increase AUC for 36-month MCI conversion by >0.08 over baseline static models.',
    methodology: 'Harmonize ADNI-1/2/3 tabular data, compute individualized longitudinal trajectories using linear mixed-effects modeling, and train nested cross-validated XGBoost models.',
    modalities: ['Plasma p-tau217', 'Volumetric 3T MRI', 'APOE Genotype', 'ADAS-Cog 13'],
    status: 'Active Analysis',
  }
];

export default function ProjectsPage() {
  const [projects] = useState<ProjectWorkspace[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ProjectWorkspace>(INITIAL_PROJECTS[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Research Project Workspaces
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured scientific workflows organizing formal hypotheses, target datasets, methodology plans, and analytical code.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="space-y-2">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedProject.id === p.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {p.status}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-100 mt-2 leading-snug">{p.title}</h3>
            </button>
          ))}
        </div>

        {/* Project Details */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-100">{selectedProject.title}</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
              {selectedProject.status}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Primary Scientific Objective</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                {selectedProject.objective}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Formal Hypothesis</h4>
              <p className="text-slate-300 mt-1 leading-relaxed italic">
                "{selectedProject.hypothesis}"
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-emerald-300 uppercase font-semibold">Analytical Methodology & Ingestion Plan</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedProject.methodology}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-purple-300 uppercase font-semibold">Target Cohort Modalities</h4>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {selectedProject.modalities.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
