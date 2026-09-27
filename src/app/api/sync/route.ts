import { NextResponse } from 'next/server';
import { fetchPubMedArticles } from '@/lib/ingestion/pubmed';
import { fetchClinicalTrials } from '@/lib/ingestion/clinicaltrials';
import { fetchNIHAwards } from '@/lib/ingestion/nihreporter';

export const dynamic = 'force-dynamic';

export async function POST() {
  const startedAt = new Date();
  try {
    const [papers, trials, grants] = await Promise.all([
      fetchPubMedArticles("Alzheimer's disease biomarkers OR p-tau217", 10),
      fetchClinicalTrials("Alzheimer Disease", 5),
      fetchNIHAwards("Alzheimer biomarker machine learning", 5),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Automated research synchronization completed successfully.',
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      metrics: {
        pubmed_records_ingested: papers.length,
        clinical_trials_ingested: trials.length,
        nih_grants_ingested: grants.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      completedAt: new Date().toISOString(),
    }, { status: 500 });
  }
}
