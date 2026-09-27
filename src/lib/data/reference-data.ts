// Static reference data extracted for client-side and server-side components

export interface BiomarkerItem {
  name: string;
  abbreviation: string;
  category: string;
  biological_target: string;
  pathological_process: string;
  measurement_method: string;
  clinical_sensitivity: number;
  clinical_specificity: number;
  clinical_context: string;
  research_summary: string;
  limitations: string;
}

export interface GeneItem {
  symbol: string;
  name: string;
  chromosome: string;
  risk_level: string;
  inheritance_pattern: string;
  pathway: string;
  mechanism: string;
  niagads_adsp_status: string;
  clinical_relevance: string;
}

export interface DatasetItem {
  name: string;
  organization: string;
  purpose: string;
  modalities: string;
  cohort_size: string;
  access_type: string;
  authorization_process: string;
  official_url: string;
  local_access_status: string;
}

export interface CurriculumItem {
  level: number;
  level_title: string;
  module_title: string;
  description: string;
  order_index: number;
}

export const BIOMARKERS_SEED: BiomarkerItem[] = [
  {
    name: 'Phosphorylated Tau 217',
    abbreviation: 'p-tau217',
    category: 'Fluid (Blood/Plasma)',
    biological_target: 'Tau protein phosphorylated at threonine 217',
    pathological_process: 'Tau Pathology & Amyloid-Facilitated Tangle Formation',
    measurement_method: 'Immunoassay (ALZpath Simoa / Mass Spectrometry)',
    clinical_sensitivity: 96.5,
    clinical_specificity: 97.2,
    clinical_context: 'Plasma p-tau217 distinguishes Alzheimer disease from other neurodegenerative disorders with high diagnostic accuracy comparable to CSF biomarkers and Amyloid-PET.',
    research_summary: 'Correlates strongly with brain amyloid-beta plaque burden and anticipates downstream neurofibrillary tangle progression in preclinical and prodromal Alzheimer cohorts.',
    limitations: 'Renal impairment can modestly elevate plasma levels; cut-points require assay-specific standardization.'
  },
  {
    name: 'Amyloid Beta 42/40 Ratio',
    abbreviation: 'Aβ42/Aβ40',
    category: 'Fluid (Blood/Plasma & CSF)',
    biological_target: 'Ratio of 42-amino-acid to 40-amino-acid amyloid-beta peptides',
    pathological_process: 'Amyloid Plaque Deposition',
    measurement_method: 'High-Precision IP-MS (Immunoprecipitation-Mass Spectrometry)',
    clinical_sensitivity: 88.0,
    clinical_specificity: 89.5,
    clinical_context: 'Inverse ratio: decreased plasma Aβ42/Aβ40 indicates cortical amyloid deposition.',
    research_summary: 'Changes occur up to 15-20 years prior to symptomatic cognitive decline; combined with p-tau217 forms a robust dual-marker early-detection panel.',
    limitations: 'Small dynamic percentage change (~10-15% drop) in plasma necessitates ultra-precise mass spectrometry or high-sensitivity immunoassays.'
  },
  {
    name: 'Neurofilament Light Chain',
    abbreviation: 'NfL',
    category: 'Fluid (Blood/Plasma & CSF)',
    biological_target: 'Axonal structural intermediate neurofilament protein',
    pathological_process: 'Active Axonal Damage / Neurodegeneration',
    measurement_method: 'Simoa (Single Molecule Array) / ELISA',
    clinical_sensitivity: 82.0,
    clinical_specificity: 65.0,
    clinical_context: 'Non-specific marker of neuroaxonal injury. Highly sensitive to active neurodegeneration, tracking rate of disease progression.',
    research_summary: 'Monitors disease intensity and rate of decline in AD, FTD, ALS, and vascular cognitive impairment.',
    limitations: 'Lacks disease specificity; elevated in various neurodegenerative disorders, traumatic brain injury, and stroke.'
  },
  {
    name: 'Glial Fibrillary Acidic Protein',
    abbreviation: 'GFAP',
    category: 'Fluid (Blood/Plasma)',
    biological_target: 'Astrocyte intermediate filament protein',
    pathological_process: 'Reactive Astrogliosis & Neuroinflammation',
    measurement_method: 'Simoa / Digital ELISA',
    clinical_sensitivity: 85.0,
    clinical_specificity: 80.0,
    clinical_context: 'Elevates in plasma during early amyloid accumulation, reflecting reactive astrocyte response to amyloid plaques.',
    research_summary: 'Rises earlier in plasma than in CSF during preclinical AD stages, making it an early indicator of amyloid-associated astrocytic reactivity.',
    limitations: 'Also elevated in traumatic brain injury, stroke, and other neuroinflammatory conditions.'
  },
  {
    name: 'Amyloid PET ([11C]PiB / [18F]Florbetapir)',
    abbreviation: 'Amyloid-PET',
    category: 'PET Imaging',
    biological_target: 'Fibrillar cortical amyloid-beta plaques',
    pathological_process: 'Amyloid Plaque Burden (A+)',
    measurement_method: 'Centiloid Scale PET Quantification',
    clinical_sensitivity: 93.0,
    clinical_specificity: 95.0,
    clinical_context: 'Gold standard in vivo molecular imaging for establishing presence of brain amyloidosis (ATN framework: A+).',
    research_summary: 'Centiloid scale standardizes quantitative PET tracer retention across PiB, Florbetapir, Florbetaben, and Flutemetamol.',
    limitations: 'High cost, cyclotron/radiotracer infrastructure requirements, radiation exposure.'
  },
  {
    name: 'Tau PET ([18F]Flortaucipir)',
    abbreviation: 'Tau-PET',
    category: 'PET Imaging',
    biological_target: 'Paired helical filament (PHF) hyperphosphorylated tau',
    pathological_process: 'Neurofibrillary Tangles (T+)',
    measurement_method: 'Braak Staging SUVr Quantification',
    clinical_sensitivity: 90.0,
    clinical_specificity: 92.0,
    clinical_context: 'Visualizes anatomical distribution and density of tau neurofibrillary tangles; correlates closely with concurrent cognitive impairment.',
    research_summary: 'Distinguishes Braak stage I-VI distribution: transentorhinal -> limbic -> isocortical neocortex.',
    limitations: 'Off-target binding in basal ganglia and skull; high expense.'
  }
];

export const GENES_SEED: GeneItem[] = [
  {
    symbol: 'APOE',
    name: 'Apolipoprotein E',
    chromosome: '19q13.32',
    risk_level: 'High Risk / Susceptibility',
    inheritance_pattern: 'Codominant (ε2, ε3, ε4 alleles)',
    pathway: 'Lipid homeostasis, amyloid-beta clearance, neuroinflammation',
    mechanism: 'APOE ε4 allele decreases clearance and increases aggregation of Aβ peptides; ε4/ε4 homozygosity confers ~12-15x increased lifetime AD risk.',
    niagads_adsp_status: 'Core Target in ADSP Multi-Omics Sequencing',
    clinical_relevance: 'Most potent common genetic risk factor for sporadic Late-Onset Alzheimer Disease (LOAD).'
  },
  {
    symbol: 'APP',
    name: 'Amyloid Beta Precursor Protein',
    chromosome: '21q21.3',
    risk_level: 'Mendelian Causal (Autosomal Dominant)',
    inheritance_pattern: 'Autosomal Dominant',
    pathway: 'Amyloid precursor processing via secretase cleavage',
    mechanism: 'Mutations alter alpha/beta/gamma-secretase cleavage, favoring production of hydrophobic, fibrillogenic Aβ42 peptide.',
    niagads_adsp_status: 'Fully Characterized Early-Onset AD Causal Gene',
    clinical_relevance: 'Causes early-onset Alzheimer disease (symptom onset typically age 30-55).'
  },
  {
    symbol: 'PSEN1',
    name: 'Presenilin 1',
    chromosome: '14q24.2',
    risk_level: 'Mendelian Causal (Autosomal Dominant)',
    inheritance_pattern: 'Autosomal Dominant',
    pathway: 'Catalytic core of gamma-secretase complex',
    mechanism: 'Over 300 pathogenic mutations cause loss of gamma-secretase carboxypeptidase-like processivity, drastically increasing Aβ42/Aβ40 ratio.',
    niagads_adsp_status: 'Core Target in Early-Onset AD Registries',
    clinical_relevance: 'Most common cause of autosomal dominant familial Alzheimer disease with high penetrance.'
  },
  {
    symbol: 'TREM2',
    name: 'Triggering Receptor Expressed on Myeloid Cells 2',
    chromosome: '6p21.1',
    risk_level: 'Moderate-to-High Risk Variant (e.g. R47H)',
    inheritance_pattern: 'Autosomal Recessive / Dominant Risk Heterozygosity',
    pathway: 'Microglial activation, lipid sensing, plaque compaction, phagocytosis',
    mechanism: 'R47H and other variants impair microglial response to Aβ plaques, reducing protective microglial barrier formation around deposits.',
    niagads_adsp_status: 'Major Functional Genomics Research Target',
    clinical_relevance: 'Rare heterozygous variants confer 2-4x odds ratio increase for late-onset AD.'
  }
];

export const DATASETS_SEED: DatasetItem[] = [
  {
    name: 'Alzheimer\'s Disease Neuroimaging Initiative (ADNI)',
    organization: 'ADNI / LONI / USC & NIH/NIA',
    purpose: 'Longitudinal study validating multimodal biomarkers (MRI, PET, CSF, plasma, genetics, neuropsychological tests) across normal aging, MCI, and AD.',
    modalities: JSON.stringify(['Structural MRI', 'Amyloid/Tau/FDG-PET', 'Plasma p-tau/Aβ/NfL/GFAP', 'CSF Biomarkers', 'GWAS/WGS', 'Clinical Cognitive Batteries']),
    cohort_size: 'Over 2,200 longitudinal participants across ADNI-1, GO, 2, 3, and ADNI-4',
    access_type: 'Controlled Access / Data Use Agreement (DUA)',
    authorization_process: 'Requires application through LONI ADNI Data portal, institutional affiliation, and formal scientific purpose statement.',
    official_url: 'https://adni.loni.usc.edu/',
    local_access_status: 'Protocol & Ingestion Boundary Configured'
  },
  {
    name: 'NIAGADS (NIA Genetics of Alzheimer\'s Disease Data Storage Site)',
    organization: 'University of Pennsylvania / NIA',
    purpose: 'National genetics repository housing genome-wide association studies (GWAS), whole exome (WES), and whole genome sequencing (WGS) data from the Alzheimer\'s Disease Sequencing Project (ADSP).',
    modalities: JSON.stringify(['WGS', 'WES', 'GWAS Summary Stats', 'Single-Cell RNA-Seq', 'Functional Genomics']),
    cohort_size: '>60,000 sequenced genomes & exomes across diverse cohorts',
    access_type: 'Controlled Access (dbGaP / NIAGADS DSS)',
    authorization_process: 'Requires NIH eRA Commons credentials and formal Data Access Request (DAR) approved by the NIA Data Access Committee.',
    official_url: 'https://www.niagads.org/',
    local_access_status: 'Genomics Explorer Boundary Configured'
  },
  {
    name: 'NCBI Gene & PubMed Knowledge Repositories',
    organization: 'National Center for Biotechnology Information / NLM',
    purpose: 'Public scholarly literature and biological sequence annotations for neurodegenerative disease research.',
    modalities: JSON.stringify(['Biomedical Literature', 'MeSH Ontologies', 'Gene Annotations', 'Variant DBs']),
    cohort_size: 'Global Scientific Knowledge Base',
    access_type: 'Open Access / Official REST APIs (E-Utilities)',
    authorization_process: 'Open HTTP API with NCBI API Key for expanded rate limits.',
    official_url: 'https://pubmed.ncbi.nlm.nih.gov/',
    local_access_status: 'Live API Connected'
  }
];

export const CURRICULUM_SEED: CurriculumItem[] = [
  { level: 1, level_title: 'Level 1: Alzheimer\'s & Neuroscience Foundations', module_title: 'Neuroanatomy, Synaptic Transmission & Aging', description: 'Brain regions (hippocampus, entorhinal cortex, neocortex), neuron architecture, neurotransmitters, and physiological aging vs neurodegeneration.', order_index: 1 },
  { level: 1, level_title: 'Level 1: Alzheimer\'s & Neuroscience Foundations', module_title: 'Alzheimer\'s Neuropathology: Amyloid, Tau & Neuroinflammation', description: 'The amyloid cascade hypothesis, tau hyperphosphorylation and paired helical filaments, reactive astrogliosis, and microglial activation.', order_index: 2 },
  { level: 2, level_title: 'Level 2: Biomedical Informatics Foundations', module_title: 'Health Ontologies, MeSH, SNOMED & Clinical Data Standards', description: 'Structured biomedical vocabularies, biomedical knowledge graphs, and electronic health record (EHR) phenotypes.', order_index: 3 },
  { level: 3, level_title: 'Level 3: Research Computing & Tooling', module_title: 'Linux Shell, Git Workflow & Reproducible Research Environments', description: 'Command line data processing, Unix pipelines, version control, and containerization for scientific workflows.', order_index: 4 },
  { level: 4, level_title: 'Level 4: Python for Biomedical Research', module_title: 'NumPy, pandas & Scientific Computing Data Structures', description: 'Vectorized arrays, tidy biomedical data frames, missing value handling in longitudinal cohorts.', order_index: 5 },
  { level: 5, level_title: 'Level 5: SQL & Biomedical Databases', module_title: 'Relational Modeling, Query Optimization & PostgreSQL for Clinical Data', description: 'Designing schemas for patient registries, joins across longitudinal visits, and indexing biomedical time series.', order_index: 6 },
  { level: 6, level_title: 'Level 6: Biostatistics for Medical Research', module_title: 'Hypothesis Testing, Effect Sizes & ROC/AUC Analysis', description: 'Parametric vs non-parametric tests, p-value interpretation, ROC curve derivation, sensitivity/specificity, and PPV/NPV.', order_index: 7 },
  { level: 7, level_title: 'Level 7: Biomedical Data Science', module_title: 'Exploratory Data Analysis & Quality Control in Clinical Cohorts', description: 'Batch effect detection, normalization pipelines, and multivariate data distributions in aging studies.', order_index: 8 },
  { level: 8, level_title: 'Level 8: Genomics & Bioinformatics', module_title: 'GWAS Analysis, Polygenic Risk Scores (PRS) & NIAGADS Workflows', description: 'Quality control of genotype arrays, Manhattan plots, linkage disequilibrium, and calculating polygenic risk in AD cohorts.', order_index: 9 },
  { level: 9, level_title: 'Level 9: Neuroimaging Informatics', module_title: 'Structural MRI Volumetrics, PET Centiloids & FreeSurfer Pipelines', description: 'Hippocampal volume extraction, cortical thickness measurements, NIfTI file structures, and Centiloid standardization.', order_index: 10 },
  { level: 10, level_title: 'Level 10: Machine Learning in Biomedicine', module_title: 'Supervised Learning, Cross-Validation & Data Leakage Prevention', description: 'Train/test splitting by participant (not visit), addressing class imbalance, calibration curves, and feature importance.', order_index: 11 },
  { level: 11, level_title: 'Level 11: Deep Learning & Multimodal AI', module_title: 'Multimodal Fusion: Combining Fluid Biomarkers, Imaging & Genetics', description: 'Early vs late fusion architectures, handling missing modalities, and attention mechanisms for disease progression.', order_index: 12 },
  { level: 12, level_title: 'Level 12: Research Methods & Scientific Integrity', module_title: 'Study Design, Observational Pitfalls & Reproducibility Standards', description: 'Confounding, survivor bias in aging cohorts, pre-registration of analytical protocols, and publication ethics.', order_index: 13 },
  { level: 13, level_title: 'Level 13: Independent Alzheimer\'s Research', module_title: 'Early Detection Flagship: Longitudinal Modeling of Preclinical AD', description: 'Synthesizing knowledge into formal research proposals, grant drafting, and reproducible scientific workflows.', order_index: 14 }
];
