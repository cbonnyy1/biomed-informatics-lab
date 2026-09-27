'use client';

import React, { useState } from 'react';
import { Layers, AlertTriangle, GitCompare, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DiseaseProfile {
  id: string;
  name: string;
  abbreviation: string;
  hallmark_pathology: string;
  key_biomarkers: string[];
  early_clinical_presentation: string;
  differential_distinction: string;
  misdiagnosis_risks: string;
  informatics_challenges: string;
}

const DISEASES: DiseaseProfile[] = [
  {
    id: 'lbd',
    name: 'Lewy Body Dementia',
    abbreviation: 'LBD / DLB',
    hallmark_pathology: 'Intracytoplasmic alpha-synuclein inclusions (Lewy bodies) in cortical and subcortical neurons; frequent co-occurring amyloid pathology.',
    key_biomarkers: ['Reduced striatal dopamine transporter uptake (DaTscan SPECT)', 'Reduced myocardial MIBG uptake', 'Normal plasma p-tau217 unless co-pathology exists', 'Polysomnographic REM sleep without atonia'],
    early_clinical_presentation: 'Fluctuating cognition with pronounced variations in attention, recurrent detailed visual hallucinations, REM sleep behavior disorder (RBD), and spontaneous parkinsonism.',
    differential_distinction: 'Distinct from pure AD by prominent fluctuations in alertness, vivid hallucinations early in disease course, and profound neuroleptic hypersensitivity.',
    misdiagnosis_risks: 'Often misdiagnosed as AD when memory complaints precede motor signs, or as psychiatric illness due to visual hallucinations.',
    informatics_challenges: 'High rates of mixed AD/LBD pathology require multimodal classifiers capable of decoupling tau burden from dopaminergic denervation.'
  },
  {
    id: 'vad',
    name: 'Vascular Dementia & VCID',
    abbreviation: 'VaD / VCID',
    hallmark_pathology: 'Cerebral small vessel disease (arteriolosclerosis, cerebral amyloid angiopathy), multiple subcortical lacunar infarcts, and extensive white matter hyperintensities (WMH).',
    key_biomarkers: ['Volumetric MRI T2-FLAIR white matter hyperintensity burden', 'Elevated plasma Neurofilament Light (NfL)', 'CSF/Plasma albumin ratio (blood-brain barrier integrity)'],
    early_clinical_presentation: 'Executive dysfunction, slowed processing speed, impaired set-shifting, gait instability, and pseudobulbar affect; episodic memory preservation until late stages.',
    differential_distinction: 'Stepwise or fluctuating deterioration associated with vascular risk factors; subcortical ischemic lesions predominate over medial temporal atrophy.',
    misdiagnosis_risks: 'Misattributed to pure AD due to common vascular risk factor overlap in aging cohorts.',
    informatics_challenges: 'Automated deep learning segmentation of WMH and quantification of microbleeds on susceptibility-weighted imaging (SWI).'
  },
  {
    id: 'ftd',
    name: 'Frontotemporal Dementia',
    abbreviation: 'FTD / FTLD',
    hallmark_pathology: 'Heterogeneous FTLD pathology: FTLD-tau (Pick bodies, MAPT mutations), FTLD-TDP43 (TDP-43 cytoplasmic aggregates; GRN/C9orf72 mutations), or FTLD-FUS.',
    key_biomarkers: ['Markedly elevated plasma/CSF Neurofilament Light (NfL)', 'Normal p-tau217 and Amyloid-PET', 'Focal frontal and anterior temporal hypometabolism on FDG-PET'],
    early_clinical_presentation: 'Behavioral variant (bvFTD): disinhibition, apathy, loss of empathy, hyperorality. Primary Progressive Aphasia (PPA): non-fluent agrammatic or semantic language deficits.',
    differential_distinction: 'Preserved episodic memory and visuospatial orientation early in course; severe focal frontotemporal atrophy rather than hippocampal-parietal atrophy.',
    misdiagnosis_risks: 'Frequently misdiagnosed as primary psychiatric disorders (depression, bipolar disorder, late-onset schizophrenia) or atypical AD.',
    informatics_challenges: 'Genomic classification of C9orf72 hexanucleotide repeat expansions, GRN, and MAPT variants in non-AD cohorts.'
  },
  {
    id: 'mixed',
    name: 'Mixed Dementia (AD + Cerebrovascular / LBD)',
    abbreviation: 'Mixed AD',
    hallmark_pathology: 'Co-existence of cortical amyloid plaques/tau tangles with cerebral infarcts, severe small vessel ischemic disease, or alpha-synuclein pathology.',
    key_biomarkers: ['Dual positive: Elevated p-tau217 + High MRI FLAIR white matter lesion volume', 'Concomitant Centiloid amyloid elevation + DaTscan dopaminergic deficit'],
    early_clinical_presentation: 'Compound clinical phenotype featuring both amnestic memory consolidation deficits and prominent executive dysfunction / gait disturbance.',
    differential_distinction: 'Accelerated rate of cognitive decline compared to single-etiology dementias; additive burden of dual pathologies lowers the threshold for clinical dementia expression.',
    misdiagnosis_risks: 'Clinical diagnosis typically captures only one contributing pathology (usually AD), ignoring the vascular or Lewy body component.',
    informatics_challenges: 'Designing multimodal multi-label loss functions for deep neural networks rather than simplifying to single-label binary classification.'
  }
];

export default function RelatedDementiasPage() {
  const [selectedDisease, setSelectedDisease] = useState(DISEASES[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Related Neurodegenerative Disorders Center
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Differential neuropathology, biomarker divergence, overlapping phenotypes, and computational distinction across non-AD dementias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Diagnostic Profiles
          </h2>
          {DISEASES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDisease(d)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedDisease.id === d.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{d.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {d.abbreviation}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{d.hallmark_pathology}</p>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-100">{selectedDisease.name}</h2>
              <span className="text-xs text-cyan-400 font-mono">{selectedDisease.abbreviation}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Differential Pathology Specification
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Hallmark Neuropathology</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedDisease.hallmark_pathology}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Distinguishing Biomarkers</h4>
              <ul className="mt-1 space-y-1">
                {selectedDisease.key_biomarkers.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <h5 className="font-mono text-[10px] text-cyan-300 font-bold uppercase">Differential Distinction from AD</h5>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{selectedDisease.differential_distinction}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <h5 className="font-mono text-[10px] text-purple-300 font-bold uppercase">Informatics & Modeling Challenge</h5>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{selectedDisease.informatics_challenges}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
