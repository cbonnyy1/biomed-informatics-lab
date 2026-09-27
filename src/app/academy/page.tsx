'use client';

import React, { useState } from 'react';
import { FileCode2, CheckCircle, Circle, ArrowRight, Award, Brain, Lock } from 'lucide-react';
import { CURRICULUM_SEED } from '@/lib/data/reference-data';

export default function TrainingAcademyPage() {
  const [modules, setModules] = useState(
    CURRICULUM_SEED.map((m, idx) => ({
      ...m,
      completed: idx < 3, // Initial progress state
    }))
  );
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const toggleComplete = (orderIndex: number) => {
    setModules(
      modules.map((m) =>
        m.order_index === orderIndex ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Biomedical Informatics Training Academy
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured 13-level computational biology, data science, and neurodegeneration doctoral preparatory curriculum.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Competency Progress</span>
            <span className="text-cyan-400 font-bold">{completedCount} of {modules.length} Modules ({progressPercent}%)</span>
          </div>
          <div className="w-24 h-2 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Modules List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Curriculum Roadmap (Levels 1 - 13)
          </h2>
          {modules.map((m) => (
            <button
              key={m.order_index}
              onClick={() => setSelectedModule(m)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedModule.order_index === m.order_index
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400">
                  Level {m.level}
                </span>
                {m.completed ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-200 mt-1">{m.module_title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{m.description}</p>
            </button>
          ))}
        </div>

        {/* Module Content & Exercise Sandbox */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">{selectedModule.level_title}</span>
              <h2 className="text-base font-bold text-slate-100">{selectedModule.module_title}</h2>
            </div>
            <button
              onClick={() => toggleComplete(selectedModule.order_index)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                selectedModule.completed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-500/50'
              }`}
            >
              {selectedModule.completed ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>COMPLETED</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" />
                  <span>MARK COMPLETED</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Module Syllabus & Description</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                {selectedModule.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Hands-on Computational Challenge</span>
              </span>
              <p className="text-[11px] text-slate-300">
                Implement a vectorized Python function using <code className="text-cyan-300 font-mono">pandas</code> to filter an ADNI cognitive test table for participants converting from CU to MCI over a 24-month window.
              </p>
              <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-200 overflow-x-auto border border-slate-800">
{`import pandas as pd

def detect_mci_converters(df: pd.DataFrame) -> pd.DataFrame:
    """
    Identifies baseline cognitively unimpaired (DX_bl == 'CN')
    participants converting to MCI within 24 months.
    """
    converters = df[
        (df['DX_bl'] == 'CN') & 
        (df['DX_m24'] == 'MCI') & 
        (df['PTAU217_plasma'].notna())
    ]
    return converters[['PTID', 'AGE', 'APOE4', 'PTAU217_plasma', 'CDRSB_m24']]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
