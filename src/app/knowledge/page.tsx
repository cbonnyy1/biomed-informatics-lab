'use client';

import React, { useState } from 'react';
import { Brain, Layers, Activity, AlertCircle, CheckCircle, HelpCircle, ChevronRight } from 'lucide-react';

const MODULES = [
  {
    id: 'neuroanatomy',
    title: '1. Normal Brain Function & Synaptic Memory',
    summary: 'The hippocampal-entorhinal circuitry, long-term potentiation (LTP), and age-related physiological changes.',
    content: `
### Normal Hippocampal Architecture
The hippocampus is located in the medial temporal lobe and forms the core of declarative episodic memory encoding and consolidation.
- **Entorhinal Cortex (EC):** The primary bidirectional gateway between the neocortex and the hippocampus proper. Superficial layers (II/III) project via the perforant path to the dentate gyrus and CA3/CA1.
- **Dentate Gyrus (DG):** Exhibits adult neurogenesis and performs pattern separation, converting overlapping sensory inputs into distinct orthogonal representations.
- **Cornu Ammonis (CA3 & CA1):** CA3 features recurrent collaterals facilitating pattern completion; CA1 acts as the primary output hub projecting to the subiculum and deep entorhinal layers.

### Synaptic Plasticity & Aging vs. Neurodegeneration
In normal physiological aging, total neuron loss is minimal; instead, subtle dendritic spine regression and synaptic density reductions occur. In Alzheimer's pathology, massive synaptic loss and neuronal apoptosis occur in the transentorhinal cortex and spread systematically through the limbic system to the neocortex.
    `
  },
  {
    id: 'amyloid-cascade',
    title: '2. Amyloid-Beta Pathology & Secretase Processing',
    summary: 'APP cleavage pathways, Aβ42/Aβ40 oligomerization, plaque dynamics, and the updated cascade formulation.',
    content: `
### APP Proteolytic Processing
Amyloid Precursor Protein (APP) is an integral transmembrane glycoprotein subject to two mutually exclusive cleavage pathways:
1. **Non-Amyloidogenic Pathway:** APP is cleaved within the Aβ domain by **α-secretase** (ADAM10), releasing soluble APPα (sAPPα) and preventing intact Aβ formation.
2. **Amyloidogenic Pathway:** APP undergoes initial cleavage by **β-secretase (BACE1)** at the N-terminus of Aβ, followed by intramembranous cleavage by the **γ-secretase complex** (catalytic subunit Presenilin-1/2, Nicastrin, APH-1, PEN-2).

### Oligomer Toxicity vs. Insoluble Plaques
Soluble Aβ42 oligomers (dimers, trimers, dodecamers) exert the highest synaptotoxicity, binding to synaptic receptors (e.g., EphB2, NMDA-R), inducing calcium dysregulation, mitochondrial oxidative stress, and triggering downstream tau hyperphosphorylation.
    `
  },
  {
    id: 'tau-pathology',
    title: '3. Hyperphosphorylated Tau & Neurofibrillary Tangles',
    summary: 'Microtubule stabilization, kinase/phosphatase imbalance, Braak staging (I-VI), and spatial spread.',
    content: `
### Microtubule-Associated Protein Tau (MAPT)
Tau normally stabilizes axonal microtubules. In Alzheimer's pathology, hyperphosphorylation at pathological epitopes (including **Thr181, Thr217, Thr231, and Ser396/404**) causes tau to detach from microtubules, assemble into paired helical filaments (PHFs), and form intracellular **neurofibrillary tangles (NFTs)**.

### Braak Staging of Tau Pathology
- **Stages I-II (Transentorhinal):** Confined to transentorhinal and entorhinal cortices (clinically silent / preclinical).
- **Stages III-IV (Limbic):** Involves hippocampus, amygdala, and parahippocampal gyrus (Mild Cognitive Impairment).
- **Stages V-VI (Isocortical/Neocortical):** Widespread throughout sensory and motor association neocortex (Severe clinical dementia).
    `
  },
  {
    id: 'neuroinflammation',
    title: '4. Neuroinflammation: Microglia & Astrogliosis',
    summary: 'TREM2 signaling, reactive A1 astrocytes, GFAP elevation, and chronic immune dysregulation.',
    content: `
### Microglial Dynamics & TREM2
Microglia act as the primary resident macrophages of the central nervous system. TREM2 (Triggering Receptor Expressed on Myeloid Cells 2) senses lipids and apolipoproteins, directing microglia to form a protective physical barrier around amyloid plaques to prevent neurotoxic oligomer shedding.

### Astrocytic Reactivity & Plasma GFAP
Reactive astrogliosis occurs in response to initial amyloid deposition. Astrocytes release inflammatory cytokines and upregulate Glial Fibrillary Acidic Protein (**GFAP**), which sheds into the bloodstream and serves as an ultra-early fluid biomarker for neuroinflammation.
    `
  },
  {
    id: 'unanswered-questions',
    title: '5. Major Unanswered Scientific Research Questions',
    summary: 'The spatial/temporal gap between amyloid and tau, resilience factors, and multi-omics early detection.',
    content: `
### Core Open Challenges in Biomedical Informatics:
1. **The Amyloid-Tau Coupling Mechanism:** Why can cortical amyloid deposition remain asymptomatic for 15-20 years before accelerating neocortical tau propagation and neurodegeneration?
2. **Cognitive Reserve & Resilience:** What genomic, transcriptomic, and structural compensatory mechanisms enable certain individuals with high amyloid/tau burden to maintain normal cognitive function?
3. **Multimodal Early Detection Thresholds:** What exact combination of plasma p-tau217, volumetric MRI atrophy rates, and polygenic risk scores can reliably predict conversion from asymptomatic preclinical state to MCI?
    `
  }
];

export default function KnowledgeCenterPage() {
  const [selectedModule, setSelectedModule] = useState(MODULES[0]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
            Alzheimer's Disease Knowledge Center
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Graduate-level neuropathological, molecular, and computational foundations of Alzheimer's disease progression.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module Navigation */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
            Neuropathological Curriculum
          </h2>
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedModule.id === m.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <h3 className="text-xs font-bold leading-tight">{m.title}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{m.summary}</p>
            </button>
          ))}
        </div>

        {/* Detailed Module Content */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              {selectedModule.title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              Biomedical Informatics Reference
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed space-y-3 font-sans">
            {selectedModule.content.trim().split('\n\n').map((block, idx) => {
              if (block.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-sm font-bold text-cyan-300 pt-2 border-b border-slate-800/80 pb-1 font-mono">
                    {block.replace('###', '').trim()}
                  </h3>
                );
              }
              return <p key={idx} className="text-slate-300">{block.replace(/\*\*/g, '')}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
