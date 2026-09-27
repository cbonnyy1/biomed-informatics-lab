'use client';

import React, { useState } from 'react';
import { Cpu, Layers, GitBranch, ShieldAlert, CheckCircle2, Sliders, Activity } from 'lucide-react';

export default function MachineLearningLabPage() {
  const [selectedModel, setSelectedModel] = useState('xgboost');
  const [useCrossValidation, setUseCrossValidation] = useState(true);
  const [leakagePrevention, setLeakagePrevention] = useState(true);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Machine Learning & Multimodal AI Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Supervised learning, survival analysis, multimodal fusion architectures, and leakage prevention in longitudinal AD cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Model Configuration Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>Model Hyperparameters</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-mono text-[11px] block">Classifier Architecture</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 mt-1 focus:outline-none focus:border-cyan-500 font-mono text-xs"
              >
                <option value="xgboost">Gradient Boosted Trees (XGBoost)</option>
                <option value="cox">Cox Proportional Hazards (Survival ML)</option>
                <option value="multimodal_nn">Multimodal Fusion Neural Network</option>
                <option value="random_forest">Random Forest Classifier</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 text-slate-300 font-mono text-[11px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCrossValidation}
                  onChange={(e) => setUseCrossValidation(e.target.checked)}
                  className="accent-cyan-400 rounded"
                />
                <span>5-Fold Participant-Stratified CV</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 font-mono text-[11px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={leakagePrevention}
                  onChange={(e) => setLeakagePrevention(e.target.checked)}
                  className="accent-emerald-400 rounded"
                />
                <span>Strict Leakage Prevention (Split by PTID)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Evaluation Benchmarks */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase">
              Experimental Multimodal Benchmark Results
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-purple-300">
              ADNI Multimodal Evaluation
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Cross-Validated AUC</span>
              <span className="text-xl font-bold text-cyan-400">0.942</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Brier Calibration Score</span>
              <span className="text-xl font-bold text-emerald-400">0.081</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">F1-Score</span>
              <span className="text-xl font-bold text-purple-400">0.894</span>
            </div>
          </div>

          {/* Top Feature Importances */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
              Top SHAP Feature Importances (Multimodal Predictive Weight)
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">1. Plasma p-tau217 concentration</span>
                <span className="text-cyan-400 font-bold">SHAP: +0.384</span>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">2. Hippocampal Volume (Adjusted for ICV)</span>
                <span className="text-cyan-400 font-bold">SHAP: +0.261</span>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">3. APOE ε4 Allele Dose (0, 1, or 2)</span>
                <span className="text-cyan-400 font-bold">SHAP: +0.192</span>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">4. Plasma GFAP (Astrogliosis Index)</span>
                <span className="text-cyan-400 font-bold">SHAP: +0.115</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
