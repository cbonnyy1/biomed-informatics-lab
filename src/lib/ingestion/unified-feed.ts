// Multi-Source Biomedical Intelligence Ingestion Orchestrator
// Combines PubMed, OpenAlex, Europe PMC, and medRxiv/bioRxiv Preprints

import { fetchPubMedArticles } from './pubmed';
import { fetchOpenAlexResearch } from './openalex';
import { fetchEuropePMCArticles } from './europepmc';
import { fetchPreprints } from './preprints';
import { ResearchCardProps } from '@/components/ResearchCard';

export async function fetchAggregatedResearchStream(
  query: string = "Alzheimer's disease biomarkers p-tau217",
  limitPerSource: number = 4
): Promise<ResearchCardProps[]> {
  const results = await Promise.allSettled([
    fetchOpenAlexResearch(query, limitPerSource),
    fetchEuropePMCArticles(query, limitPerSource),
    fetchPreprints('medrxiv', 60, limitPerSource),
    fetchPubMedArticles(query, limitPerSource),
  ]);

  const allArticles: ResearchCardProps[] = [];

  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      allArticles.push(...res.value);
    }
  }

  // Deduplicate articles by title / DOI
  const seen = new Set<string>();
  const deduplicated: ResearchCardProps[] = [];

  for (const art of allArticles) {
    const key = (art.doi || art.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (key && !seen.has(key)) {
      seen.add(key);
      deduplicated.push(art);
    }
  }

  // Interleave and sort by publication date descending
  return deduplicated.sort((a, b) => {
    const dateA = new Date(a.publication_date || 0).getTime();
    const dateB = new Date(b.publication_date || 0).getTime();
    return dateB - dateA;
  });
}
