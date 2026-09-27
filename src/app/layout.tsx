import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileNavProvider } from '@/components/MobileNavContext';

export const metadata: Metadata = {
  title: 'Biomedical Informatics Research Lab | Alzheimer\'s & Neurodegeneration',
  description: 'Computational Biomedical Informatics Laboratory dedicated to Alzheimer\'s Disease, Neurodegeneration, Biomarkers, Genomics, and AI Early-Detection Research.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07090e] text-slate-100 flex min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
        <MobileNavProvider>
          <div className="flex w-full min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-3 sm:p-5 md:p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </MobileNavProvider>
      </body>
    </html>
  );
}
