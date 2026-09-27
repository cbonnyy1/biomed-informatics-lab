import { NextResponse } from 'next/server';
import { fetchAggregatedResearchStream } from '@/lib/ingestion/unified-feed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || "Alzheimer's disease biomarkers p-tau217 early detection";
    const source = searchParams.get('source') || 'all';

    const articles = await fetchAggregatedResearchStream(query, 5);

    const filtered = source === 'all' 
      ? articles 
      : articles.filter(a => a.source.toLowerCase().includes(source.toLowerCase()));

    return NextResponse.json({ 
      success: true, 
      count: filtered.length,
      sourcesQueried: ['OpenAlex Scholarly Graph', 'Europe PMC', 'medRxiv Preprints', 'PubMed / NCBI'],
      articles: filtered 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
