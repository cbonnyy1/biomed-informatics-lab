-- Biomedical Informatics Research Lab Database Schema
-- Focus: Alzheimer's Disease, Neurodegeneration, Biomarkers, Genomics, Imaging, Training, Projects

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Lead Researcher',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    api_endpoint VARCHAR(255),
    description TEXT,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS research_papers (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    source_record_id VARCHAR(100) NOT NULL,
    pmid VARCHAR(50),
    doi VARCHAR(255),
    title TEXT NOT NULL,
    abstract TEXT,
    authors JSONB DEFAULT '[]'::jsonb,
    journal VARCHAR(255),
    publication_date DATE,
    mesh_terms JSONB DEFAULT '[]'::jsonb,
    keywords JSONB DEFAULT '[]'::jsonb,
    research_category VARCHAR(100),
    evidence_type VARCHAR(100) DEFAULT 'EMERGING EVIDENCE',
    citation_count INTEGER DEFAULT 0,
    source_url TEXT,
    retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_source_record UNIQUE (source, source_record_id)
);

CREATE TABLE IF NOT EXISTS clinical_trials (
    id SERIAL PRIMARY KEY,
    nct_id VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    status VARCHAR(100) NOT NULL,
    phase VARCHAR(50),
    conditions JSONB DEFAULT '[]'::jsonb,
    interventions JSONB DEFAULT '[]'::jsonb,
    sponsor TEXT,
    enrollment INTEGER,
    start_date DATE,
    completion_date DATE,
    primary_outcome TEXT,
    locations JSONB DEFAULT '[]'::jsonb,
    source_url TEXT,
    retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nih_projects (
    id SERIAL PRIMARY KEY,
    project_num VARCHAR(100) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    principal_investigator TEXT,
    organization TEXT,
    nih_institute VARCHAR(100),
    fiscal_year INTEGER,
    award_amount NUMERIC(15, 2),
    abstract TEXT,
    source_url TEXT,
    retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS biomarkers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    abbreviation VARCHAR(50),
    category VARCHAR(50) NOT NULL, -- Fluid (CSF), Fluid (Blood/Plasma), PET, MRI, Digital
    biological_target TEXT NOT NULL,
    pathological_process VARCHAR(100), -- Amyloid, Tau, Neurodegeneration, Neuroinflammation, Synaptic
    measurement_method TEXT,
    clinical_sensitivity NUMERIC(5, 2),
    clinical_specificity NUMERIC(5, 2),
    clinical_context TEXT,
    research_summary TEXT,
    limitations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS genes (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(50) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    chromosome VARCHAR(20),
    risk_level VARCHAR(50), -- Mendelian / Early-Onset (Causal), High Risk, Susceptibility Locus
    inheritance_pattern VARCHAR(100),
    pathway TEXT,
    mechanism TEXT,
    niagads_adsp_status TEXT,
    clinical_relevance TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS datasets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    organization VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    modalities JSONB DEFAULT '[]'::jsonb,
    cohort_size VARCHAR(100),
    access_type VARCHAR(100) NOT NULL, -- Open, Controlled Access, DUA Required
    authorization_process TEXT,
    official_url TEXT,
    local_access_status VARCHAR(50) DEFAULT 'Not Configured',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_research (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    paper_id INTEGER REFERENCES research_papers(id) ON DELETE CASCADE,
    collection_name VARCHAR(100) DEFAULT 'General Research',
    notes TEXT,
    rating INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]'::jsonb,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_paper UNIQUE (user_id, paper_id)
);

CREATE TABLE IF NOT EXISTS research_notebooks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General Observation',
    content TEXT NOT NULL,
    linked_paper_id INTEGER REFERENCES research_papers(id) ON DELETE SET NULL,
    linked_biomarker_id INTEGER REFERENCES biomarkers(id) ON DELETE SET NULL,
    linked_gene_id INTEGER REFERENCES genes(id) ON DELETE SET NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_questions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    rationale TEXT,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    evidence_basis TEXT,
    status VARCHAR(50) DEFAULT 'Open', -- Open, Exploring, Active Project, Answered
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    background TEXT,
    hypothesis TEXT,
    methodology TEXT,
    target_modalities JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'Planning', -- Planning, Active, Analysis, Completed, Published
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_curriculum (
    id SERIAL PRIMARY KEY,
    level INTEGER NOT NULL,
    level_title VARCHAR(255) NOT NULL,
    module_title VARCHAR(255) NOT NULL,
    description TEXT,
    learning_objectives JSONB DEFAULT '[]'::jsonb,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS training_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    curriculum_id INTEGER REFERENCES training_curriculum(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Not Started', -- Not Started, In Progress, Completed
    score NUMERIC(5, 2),
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_curriculum UNIQUE (user_id, curriculum_id)
);

CREATE TABLE IF NOT EXISTS sync_logs (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL, -- success, partial, failed
    records_received INTEGER DEFAULT 0,
    records_created INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_research_papers_source ON research_papers(source);
CREATE INDEX IF NOT EXISTS idx_research_papers_pub_date ON research_papers(publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_clinical_trials_status ON clinical_trials(status);
CREATE INDEX IF NOT EXISTS idx_biomarkers_category ON biomarkers(category);
CREATE INDEX IF NOT EXISTS idx_genes_symbol ON genes(symbol);
