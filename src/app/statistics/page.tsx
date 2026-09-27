'use client';

import React, { useState } from 'react';
import { LineChart, Activity, Calculator, CheckCircle2, Info } from 'lucide-react';

export default function BiostatisticsLabPage() {
  const [tp, setTp] = useState(96);
  const [fn, setFn] = useState(4);
  const [tn, setTn] = useState(97);
  const [fp, setFp] = useState(3);
  const [prevalence, setPrevalence] = useState(15); // 15% prevalence in memory clinic

  // Calculations
  const sensitivity = (tp / (tp + fn)) * 100;
  const specificity = (tn / (tn + fp)) * 100;
  
  // Bayes theorem for Positive Predictive Value (PPV) & Negative Predictive Value (NPV)
  const prevDecimal = prevalence / 100;
  const sensDecimal = sensitivity / 100;
  const specDecimal = specificity / 100;

  const ppv = ((sensDecimal * prevDecimal) / ((sensDecimal * prevDecimal) + ((1 - specDecimal) * (1 - prevDecimal)))) * 100;
  const npv = ((specDecimal * (1 - prevDecimal)) / ((specDecimal * (1 - prevDecimal)) + ((1 - sensDecimal) * prevDecimal))) * 100;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Biostatistics & Diagnostic Accuracy Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Interactive Bayesian diagnostic accuracy modeling, ROC/AUC metrics, sensitivity/specificity tradeoffs, and prevalence adjustment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls & Confusion Matrix Inputs */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Diagnostic Matrix Parameters</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-mono text-[11px] block">True Positives (TP): {tp}</label>
              <input
                type="range"
                min="50"
                max="100"
                value={tp}
                onChange={(e) => setTp(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block">False Negatives (FN): {fn}</label>
              <input
                type="range"
                min="1"
                max="50"
                value={fn}
                onChange={(e) => setFn(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block">True Negatives (TN): {tn}</label>
              <input
                type="range"
                min="50"
                max="100"
                value={tn}
                onChange={(e) => setTn(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block">False Positives (FP): {fp}</label>
              <input
                type="range"
                min="1"
                max="50"
                value={fp}
                onChange={(e) => setFp(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="text-purple-300 font-mono text-[11px] block font-bold">
                Target Population Disease Prevalence: {prevalence}%
              </label>
              <p className="text-[10px] text-slate-500 mb-1">e.g. 5% primary care vs 25% memory clinic</p>
              <input
                type="range"
                min="1"
                max="60"
                value={prevalence}
                onChange={(e) => setPrevalence(Number(e.target.value))}
                className="w-full accent-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Calculated Statistical Outputs */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase">
              Derived Diagnostic Performance Metrics
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
              Bayesian Formulation
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Sensitivity (Recall)</span>
              <div className="text-2xl font-bold text-cyan-400">{sensitivity.toFixed(1)}%</div>
              <p className="text-[10px] text-slate-400">TP / (TP + FN)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Specificity</span>
              <div className="text-2xl font-bold text-emerald-400">{specificity.toFixed(1)}%</div>
              <p className="text-[10px] text-slate-400">TN / (TN + FP)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-purple-400 uppercase font-bold">Positive Predictive Value (PPV)</span>
              <div className="text-2xl font-bold text-purple-300">{ppv.toFixed(1)}%</div>
              <p className="text-[10px] text-slate-400">P(AD+ | Test+)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-blue-400 uppercase font-bold">Negative Predictive Value (NPV)</span>
              <div className="text-2xl font-bold text-blue-300">{npv.toFixed(1)}%</div>
              <p className="text-[10px] text-slate-400">P(AD- | Test-)</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <h4 className="font-mono text-[11px] font-bold text-cyan-400 uppercase flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Informatics Interpretation</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Notice how <strong>PPV changes drastically with disease prevalence</strong> even while sensitivity and specificity remain constant. In low-prevalence screening populations (e.g., primary care 5%), false positives outnumber true positives, demonstrating why two-tiered screening protocols (plasma p-tau217 confirmatory testing) are required in clinical practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
