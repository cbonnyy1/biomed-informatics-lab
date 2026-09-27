import { NextResponse } from 'next/server';
import { fetchPubMedArticles } from '@/lib/ingestion/pubmed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || "Alzheimer's disease biomarkers OR p-tau217 OR early detection";
    const articles = await fetchPubMedArticles(query, 20);
    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
