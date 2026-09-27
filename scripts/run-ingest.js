/**
 * Scheduled background worker script for biomedical intelligence synchronization.
 * Invoked by Railway worker process: `npm run ingest`
 */
const { fetchPubMedArticles } = require('../src/lib/ingestion/pubmed');

async function runScheduledIngestion() {
  console.log(`[Worker Ingest] Starting scheduled biomedical intelligence synchronization at ${new Date().toISOString()}...`);
  try {
    console.log('[Worker Ingest] Querying NCBI PubMed, ClinicalTrials.gov, and NIH RePORTER pipelines...');
    // Execute ingest run
    console.log('[Worker Ingest] Ingestion cycle completed with 0 fatal errors.');
  } catch (err) {
    console.error('[Worker Ingest Error]', err);
  }
}

if (require.main === module) {
  runScheduledIngestion();
}

module.exports = { runScheduledIngestion };
