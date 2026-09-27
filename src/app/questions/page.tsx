'use client';

import React, { useState } from 'react';
import { HelpCircle, Sparkles, Plus, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface QuestionItem {
  id: string;
  question: string;
  category: string;
  rationale: string;
  evidence_basis: string;
  is_ai_generated: boolean;
  status: 'Open' | 'Exploring' | 'Active Project';
}

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: '1',
    question: 'How do baseline plasma p-tau217 kinetics differ between APOE ε4/ε4 homozygotes vs non-carriers during the asymptomatic amyloid accumulation phase?',
    category: 'Biomarkers & Genetics',
    rationale: 'Clarifying whether APOE4 accelerates the rate of tau phosphorylation directly or primarily increases the upstream amyloid plaque burden.',
    evidence_basis: 'Supported by JAMA Neurology (2024) and Nature Genetics (2022) findings on microglial clearance kinetics.',
    is_ai_generated: false,
    status: 'Exploring',
  },
  {
    id: '2',
    question: 'Can temporal graph neural networks combining longitudinal plasma GFAP with hippocampal volume trajectories predict MCI conversion 3 years earlier than static thresholding?',
    category: 'Multimodal AI & Early Detection',
    rationale: 'Static cutoffs fail to capture acceleration or deceleration in individual disease velocity; dynamic temporal models may identify non-linear inflection points.',
    evidence_basis: 'NIH RePORTER Grant U01AG068057 (Cornell / Penn AI Consortia).',
    is_ai_generated: true,
    status: 'Open',
  }
];

export default function ResearchQuestionsPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem>(INITIAL_QUESTIONS[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Research Question Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Formulation, hypothesis tracking, and evidence-backed scientific queries driving computational doctoral research.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Tracked Research Questions
          </h2>
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestion(q)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedQuestion.id === q.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyan-400">{q.category}</span>
                {q.is_ai_generated && (
                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Hypothesis
                  </span>
                )}
              </div>
              <h3 className="text-xs font-semibold text-slate-100 mt-1.5 line-clamp-2 leading-snug">
                {q.question}
              </h3>
            </button>
          ))}
        </div>

        {/* Selected Question Details */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              {selectedQuestion.category}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Status: {selectedQuestion.status}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Scientific Question</h4>
              <p className="text-sm font-semibold text-slate-100 mt-1 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                "{selectedQuestion.question}"
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Theoretical Rationale</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedQuestion.rationale}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-emerald-300 uppercase font-semibold">Grounding & Evidence Basis</h4>
              <p className="text-slate-300 mt-1 leading-relaxed font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedQuestion.evidence_basis}
              </p>
            </div>

            {selectedQuestion.is_ai_generated && (
              <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40 text-purple-200 text-[11px] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Clearly labeled: This question was algorithmically generated from literature patterns and serves as a hypothesis for empirical investigation.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
