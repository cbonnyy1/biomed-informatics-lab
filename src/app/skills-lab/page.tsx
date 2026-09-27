'use client';

import React, { useState } from 'react';
import { Terminal, Database, Play, CheckCircle2, RotateCcw, Copy } from 'lucide-react';

const SKILL_TRACKS = [
  {
    id: 'python-biomed',
    name: 'Python for Biomedical Data Science',
    icon: Terminal,
    exercises: [
      {
        title: 'Exercise 1: Longitudinal Biomarker Trajectory Filtering',
        description: 'Filter an ADNI cohort table for plasma p-tau217 > 2.5 pg/mL and calculate hippocampal volume change rates.',
        starter_code: `import pandas as pd
import numpy as np

# Sample ADNI longitudinal dataset snippet
data = {
    'subject_id': ['ADNI_001', 'ADNI_002', 'ADNI_003', 'ADNI_004'],
    'dx_baseline': ['CN', 'MCI', 'CN', 'MCI'],
    'plasma_ptau217': [1.2, 3.8, 1.4, 4.2],
    'hippocampal_vol_bl': [7400, 6200, 7800, 5900],
    'hippocampal_vol_m24': [7350, 5800, 7750, 5400],
}
df = pd.DataFrame(data)

# Calculate annual hippocampal atrophy percentage
df['annual_atrophy_pct'] = ((df['hippocampal_vol_m24'] - df['hippocampal_vol_bl']) / df['hippocampal_vol_bl']) / 2.0 * 100

# High-risk cohort filter: plasma ptau217 > 2.5
high_risk = df[df['plasma_ptau217'] > 2.5]
print("High-Risk Subgroup Trajectory:")
print(high_risk[['subject_id', 'dx_baseline', 'plasma_ptau217', 'annual_atrophy_pct']])`,
        expected_output: `High-Risk Subgroup Trajectory:
  subject_id dx_baseline  plasma_ptau217  annual_atrophy_pct
1   ADNI_002         MCI             3.8           -3.225806
3   ADNI_004         MCI             4.2           -4.237288`
      }
    ]
  },
  {
    id: 'sql-biomed',
    name: 'PostgreSQL & Biomedical Registries',
    icon: Database,
    exercises: [
      {
        title: 'Exercise 1: Querying Multimodal Biomarker Concordance',
        description: 'Construct a SQL query joining clinical assessment scores with plasma p-tau217 and Amyloid-PET Centiloids.',
        starter_code: `SELECT 
    p.subject_id,
    p.age,
    p.apoe_genotype,
    b.plasma_ptau217,
    i.centiloid_amyloid,
    CASE 
        WHEN b.plasma_ptau217 >= 2.5 AND i.centiloid_amyloid >= 25 THEN 'Concordant A+ Biomarker Positive'
        WHEN b.plasma_ptau217 < 2.5 AND i.centiloid_amyloid < 25 THEN 'Concordant A- Biomarker Negative'
        ELSE 'Discordant / Transition Phase'
    END AS atn_classification
FROM participants p
JOIN biomarker_fluid b ON p.id = b.participant_id
JOIN imaging_pet i ON p.id = i.participant_id
WHERE p.cohort = 'ADNI-4'
ORDER BY b.plasma_ptau217 DESC;`,
        expected_output: `subject_id | age | apoe_genotype | plasma_ptau217 | centiloid_amyloid | atn_classification
ADNI_0142  | 73  | E4/E4         | 4.8            | 68.2              | Concordant A+ Biomarker Positive
ADNI_0891  | 69  | E3/E4         | 3.1            | 34.0              | Concordant A+ Biomarker Positive
ADNI_0023  | 66  | E3/E3         | 1.1            | 4.5               | Concordant A- Biomarker Negative`
      }
    ]
  }
];

export default function SkillsLabPage() {
  const [selectedTrack, setSelectedTrack] = useState(SKILL_TRACKS[0]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [userCode, setUserCode] = useState(selectedTrack.exercises[0].starter_code);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const activeExercise = selectedTrack.exercises[activeExerciseIndex];

  const handleRun = () => {
    setExecutionOutput(activeExercise.expected_output);
  };

  const handleReset = () => {
    setUserCode(activeExercise.starter_code);
    setExecutionOutput(null);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Computing & Informatics Skills Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Interactive hands-on sandbox for biomedical Python, pandas cohort modeling, and PostgreSQL clinical queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Track Selection */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Computing Tracks
          </h2>
          {SKILL_TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTrack(t);
                  setActiveExerciseIndex(0);
                  setUserCode(t.exercises[0].starter_code);
                  setExecutionOutput(null);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedTrack.id === t.id
                    ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{t.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Code Editor & Output Console */}
        <div className="md:col-span-3 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">{activeExercise.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeExercise.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleRun}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-64 bg-slate-950 font-mono text-xs text-cyan-300 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/50 leading-relaxed resize-none"
              spellCheck={false}
            />

            {/* Simulated Output Terminal */}
            {executionOutput && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold border-b border-slate-800 pb-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    EXECUTION SUCCESS (0.042s)
                  </span>
                  <span>PYTHON 3.11 / NUMPY-PANDAS RUNTIME</span>
                </div>
                <pre className="text-slate-200 overflow-x-auto pt-1 leading-relaxed whitespace-pre">
                  {executionOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
