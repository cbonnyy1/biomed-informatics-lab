'use client';

import React, { useState } from 'react';
import { Network, Eye, Layers, Activity, FileText, CheckCircle, Database } from 'lucide-react';

const IMAGING_MODALITIES = [
  {
    id: 'mri-volumetrics',
    name: 'Volumetric 3T Structural MRI',
    type: 'Structural Imaging',
    biomarker_role: 'N (Neurodegeneration / Neuronal Injury)',
    target_structures: 'Hippocampal volume, Entorhinal cortical thickness, Whole-brain atrophy rate',
    processing_pipeline: 'FreeSurfer 7.x recon-all segmentation, SPM12 voxel-based morphometry (VBM), FSL SIENA longitudinal atrophy.',
    clinical_informatics_value: 'Provides quantitative spatial mapping of neurodegenerative atrophy. Adjusted hippocampal volume (HVa) serves as a sensitive proxy for disease stage and progression velocity.',
    preclinical_detection_limit: 'Structural atrophy typically manifests after molecular amyloid and tau biomarkers have crossed positivity thresholds.'
  },
  {
    id: 'amyloid-pet',
    name: 'Amyloid-PET ([11C]PiB / [18F]Florbetapir)',
    type: 'Molecular PET Tracer',
    biomarker_role: 'A (Amyloid Pathology)',
    target_structures: 'Cortical fibrillar amyloid plaque distribution (frontal, precuneus, posterior cingulate, temporal cortices).',
    processing_pipeline: 'Centiloid standardization pipeline (GAAIN): PET-to-MRI co-registration, SUV normalization against cerebellar grey matter reference region.',
    clinical_informatics_value: 'The gold standard in vivo imaging biomarker for brain amyloidosis. Centiloid scale (0 = young controls, 100 = typical mild AD dementia) enables harmonized quantitative modeling across tracers.',
    preclinical_detection_limit: 'Detects cortical amyloid accumulation 15 to 20 years prior to mild cognitive impairment (MCI).'
  },
  {
    id: 'tau-pet',
    name: 'Tau-PET ([18F]Flortaucipir / [18F]MK-6240)',
    type: 'Molecular PET Tracer',
    biomarker_role: 'T (Tau Pathology)',
    target_structures: 'Transentorhinal (Braak I-II), Limbic (Braak III-IV), and Neocortical (Braak V-VI) paired helical filament tau.',
    processing_pipeline: 'SUVr calculation using inferior cerebellar cortex or eroded white matter as reference regions; temporal-meta-ROI extraction.',
    clinical_informatics_value: 'Spatial extent and density of tau-PET binding correlates tightly with concurrent cognitive impairment and predicts imminent cognitive decline better than amyloid-PET.',
    preclinical_detection_limit: 'Tau signal in entorhinal cortex begins during preclinical phase; neocortical spread closely precedes clinical symptom onset.'
  },
  {
    id: 'fdg-pet',
    name: '[18F]FDG-PET (Fluorodeoxyglucose)',
    type: 'Metabolic Imaging',
    biomarker_role: 'N (Synaptic Dysfunction / Hypometabolism)',
    target_structures: 'Temporoparietal and posterior cingulate glucose metabolism.',
    processing_pipeline: 'Spatial normalization to MNI template, intensity scaling to pons or cerebellum, AD-typical hypometabolism region-of-interest (ROI) masking.',
    clinical_informatics_value: 'Measures regional cerebral metabolic rate of glucose (rCMRglc), reflecting synaptic loss and neuronal injury.',
    preclinical_detection_limit: 'Shows temporoparietal hypometabolism during late preclinical / prodromal MCI phases.'
  }
];

export default function NeuroimagingLabPage() {
  const [selectedModality, setSelectedModality] = useState(IMAGING_MODALITIES[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Neuroimaging Informatics Laboratory
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Quantitative structural MRI, molecular amyloid/tau PET tracers, Centiloid harmonized metrics, and ADNI neuroimaging pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Modalities List */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Imaging Modalities & Protocols
          </h2>
          {IMAGING_MODALITIES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModality(m)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedModality.id === m.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono">{m.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{m.type}</p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">
                ATN Class: {m.biomarker_role}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Modality Deep Dive */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-100">{selectedModality.name}</h2>
              <span className="text-xs text-cyan-400 font-mono font-bold">ATN Framework: {selectedModality.biomarker_role}</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
              ADNI Protocol Aligned
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-[11px] text-slate-400 uppercase font-semibold">Target Anatomical Regions & Pathology</h4>
              <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                {selectedModality.target_structures}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-cyan-300 uppercase font-semibold">Standard Computational Processing Pipeline</h4>
              <p className="text-slate-300 mt-1 leading-relaxed font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedModality.processing_pipeline}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] text-emerald-300 uppercase font-semibold">Clinical & Research Informatics Utility</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedModality.clinical_informatics_value}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-200 flex items-start gap-3">
              <Database className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono text-[10px] uppercase font-bold text-cyan-300">
                  Preclinical Early-Detection Window
                </h5>
                <p className="text-[11px] mt-0.5 text-cyan-200/90 leading-relaxed">
                  {selectedModality.preclinical_detection_limit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
