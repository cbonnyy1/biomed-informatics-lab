// Europe PMC (Europe PubMed Central & PMC Full Text) Client
// Endpoint: https://www.ebi.ac.uk/europepmc/webservices/rest/search

import { ResearchCardProps } from '@/components/ResearchCard';

export async function fetchEuropePMCArticles(
  query: string = "Alzheimer biomarker plasma p-tau217",
  pageSize: number = 8
): Promise<ResearchCardProps[]> {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
    query
  )}&format=json&pageSize=${pageSize}&sort=P_PD_D%20desc`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'BiomedicalInformaticsLab/1.0' },
    });

    if (!res.ok) {
      throw new Error(`Europe PMC HTTP error: ${res.statusText}`);
    }

    const data = await res.json();
    const list = data.resultList?.result || [];

    return list.map((item: any) => {
      const doi = item.doi || '';
      const pmid = item.pmid || '';
      const pmcid = item.pmcid || '';

      // Direct working link prioritized: DOI first, Europe PMC article page second
      let sourceUrl = `https://europepmc.org/article/MED/${pmid || item.id}`;
      if (doi) {
        sourceUrl = `https://doi.org/${doi}`;
      } else if (pmcid) {
        sourceUrl = `https://europepmc.org/article/PMC/${pmcid}`;
      }

      const authorsStr = item.authorString || '';
      const authors = authorsStr.split(',').map((a: string) => a.trim()).slice(0, 6);

      let evidenceType = 'EMERGING EVIDENCE';
      const pubType = (item.pubTypeList?.pubType || []).join(' ').toLowerCase();
      if (pubType.includes('clinical trial')) evidenceType = 'CLINICAL TRIAL';
      else if (pubType.includes('review') || pubType.includes('systematic')) evidenceType = 'SYSTEMATIC REVIEW';
      else if (pubType.includes('meta-analysis')) evidenceType = 'META-ANALYSIS';

      return {
        id: `epmc-${item.id}`,
        source: 'Europe PMC / EMBL-EBI',
        source_record_id: item.id || pmid || 'EPMC',
        doi: doi || undefined,
        pmid: pmid || undefined,
        title: item.title ? item.title.replace(/<[^>]*>/g, '') : 'European Biomedical Research Article',
        abstract: item.abstractText ? item.abstractText.replace(/<[^>]*>/g, '').slice(0, 400) + '...' : 'Full text and biomedical annotations indexed in Europe PMC repository.',
        authors: authors.length > 0 && authors[0] ? authors : ['Biomedical Research Consortium'],
        journal: item.journalTitle || item.journalInfo?.journal?.title || 'European Journal of Neuroscience',
        publication_date: item.firstPublicationDate || item.pubYear || new Date().toISOString().split('T')[0],
        category: 'Biomarkers & Clinical Informatics',
        research_category: 'Biomarkers & Clinical Informatics',
        evidence_type: evidenceType,
        citation_count: item.citedByCount || 0,
        source_url: sourceUrl,
        retrieved_at: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn('[Europe PMC Warning] Query failed:', error);
    return [];
  }
}
