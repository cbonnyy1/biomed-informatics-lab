import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uptime = process.uptime();
  return NextResponse.json({
    status: 'healthy',
    service: 'biomed-informatics-lab',
    environment: process.env.NODE_ENV || 'production',
    uptimeSeconds: Math.floor(uptime),
    timestamp: new Date().toISOString(),
    connectors: {
      ncbi_eutilities: 'operational',
      clinicaltrials_gov: 'operational',
      nih_reporter: 'operational',
      openalex: 'operational',
      database_pool: 'standby_active',
    },
    provenanceEngine: 'active_immutable',
  });
}
