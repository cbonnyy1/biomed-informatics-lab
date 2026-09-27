// bioRxiv & medRxiv API Client
// Endpoints: https://api.biorxiv.org/details/[server]/[interval]/[cursor]

import { ResearchCardProps } from '@/components/ResearchCard';

export async function fetchPreprints(
  server: 'biorxiv' | 'medrxiv' = 'medrxiv',
  daysBack: number = 60,
  limit: number = 8
): Promise<ResearchCardProps[]> {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - daysBack);

  const startStr = pastDate.toISOString().split('T')[0];
  const endStr = today.toISOString().split('T')[0];

  const url = `https://api.biorxiv.org/details/${server}/${startStr}/${endStr}/0/json`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 7200 },
      headers: { 'User-Agent': 'BiomedicalInformaticsLab/1.0' },
    });

    if (!res.ok) {
      throw new Error(`${server} HTTP error: ${res.statusText}`);
    }

    const data = await res.json();
    const collection = data.collection || [];

    // Filter relevant neurodegeneration & Alzheimer's papers
    const relevant = collection.filter((item: any) => {
      const text = `${item.title || ''} ${item.abstract || ''} ${item.category || ''}`.toLowerCase();
      return (
        text.includes('alzheimer') ||
        text.includes('dementia') ||
        text.includes('tau') ||
        text.includes('amyloid') ||
        text.includes('neurodegeneration') ||
        text.includes('mci') ||
        text.includes('cognitive')
      );
    });

    return relevant.slice(0, limit).map((item: any) => {
      const doi = item.doi || '';
      const sourceUrl = doi ? `https://doi.org/${doi}` : `https://www.${server}.org/content/${doi}v1`;

      return {
        id: `preprint-${item.doi || item.version || Math.random()}`,
        source: server === 'medrxiv' ? 'medRxiv (Preprint)' : 'bioRxiv (Preprint)',
        source_record_id: item.doi || 'PREPRINT',
        doi: item.doi || undefined,
        title: item.title ? item.title.replace(/<[^>]*>/g, '') : 'Preprint Research Article',
        abstract: item.abstract ? item.abstract.replace(/<[^>]*>/g, '').slice(0, 450) + '...' : 'Preprint manuscript abstract available at source DOI link.',
        authors: item.authors ? item.authors.split(';').map((a: string) => a.trim()).slice(0, 6) : ['Contributing Investigators'],
        journal: server === 'medrxiv' ? 'medRxiv Cold Spring Harbor' : 'bioRxiv Cold Spring Harbor',
        publication_date: item.date || endStr,
        category: 'Early Detection & Biomarkers',
        research_category: 'Early Detection & Biomarkers',
        evidence_type: 'PREPRINT',
        citation_count: 0,
        source_url: sourceUrl,
        retrieved_at: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn(`[Preprints Warning] ${server} API lookup failed:`, error);
    return [];
  }
}
