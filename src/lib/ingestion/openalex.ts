// OpenAlex Scholarly Knowledge Graph Client
// Endpoint: https://api.openalex.org/works

import { ResearchCardProps } from '@/components/ResearchCard';

export async function fetchOpenAlexResearch(
  query: string = "Alzheimer disease biomarker p-tau217",
  perPage: number = 8
): Promise<ResearchCardProps[]> {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query
  )}&per_page=${perPage}&sort=publication_date:desc&mailto=researcher@biomed-lab.local`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'BiomedicalInformaticsLab/1.0' },
    });

    if (!res.ok) {
      throw new Error(`OpenAlex HTTP error: ${res.statusText}`);
    }

    const data = await res.json();
    const results = data.results || [];

    return results.map((work: any) => {
      const doi = work.doi || '';
      // Ensure valid direct DOI or primary location landing page
      const directUrl = doi 
        ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) 
        : (work.primary_location?.landing_page_url || work.id);

      const authors = (work.authorships || [])
        .slice(0, 6)
        .map((a: any) => a.author?.display_name || 'Investigator');

      const journal = work.primary_location?.source?.display_name || 'International Biomedical Journal';

      return {
        id: `openalex-${work.id.replace('https://openalex.org/', '')}`,
        source: 'OpenAlex Scholarly Graph',
        source_record_id: work.id.replace('https://openalex.org/', ''),
        doi: doi || undefined,
        title: work.title || 'Scholarly Publication',
        abstract: work.abstract_inverted_index 
          ? reconstructAbstract(work.abstract_inverted_index) 
          : 'Scholarly article cataloged with citation metrics and open access metadata.',
        authors: authors.length > 0 ? authors : ['Scholarly Research Group'],
        journal: journal,
        publication_date: work.publication_date || `${work.publication_year || 2025}-01-01`,
        category: work.primary_topic?.display_name || 'Neurodegenerative Diseases & AI',
        research_category: work.primary_topic?.display_name || 'Neurodegenerative Diseases & AI',
        evidence_type: work.cited_by_count > 50 ? 'ESTABLISHED EVIDENCE' : 'EMERGING EVIDENCE',
        citation_count: work.cited_by_count || 0,
        source_url: directUrl,
        retrieved_at: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn('[OpenAlex Warning] Live fetch failed:', error);
    return [];
  }
}

function reconstructAbstract(invertedIndex: Record<string, number[]>): string {
  try {
    const pairs: [string, number][] = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
      for (const pos of positions) {
        pairs.push([word, pos]);
      }
    }
    pairs.sort((a, b) => a[1] - b[1]);
    const text = pairs.map((p) => p[0]).join(' ');
    return text.length > 400 ? text.slice(0, 400) + '...' : text;
  } catch {
    return 'Detailed abstract indexed in OpenAlex record.';
  }
}
