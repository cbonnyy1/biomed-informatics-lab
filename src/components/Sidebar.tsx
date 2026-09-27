'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  BookOpen,
  Brain,
  Cpu,
  Database,
  Dna,
  FileCode2,
  FileText,
  FolderGit2,
  HelpCircle,
  Layers,
  LineChart,
  Microscope,
  Network,
  Radio,
  Search,
  Sparkles,
  Stethoscope,
  Terminal,
  Zap
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAVIGATION_SECTIONS: NavSection[] = [
  {
    title: 'COMMAND & INTELLIGENCE',
    items: [
      { name: 'Command Center', href: '/', icon: Activity },
      { name: 'Research Feed', href: '/feed', icon: Radio, badge: 'LIVE' },
      { name: 'Research Library', href: '/library', icon: BookOpen },
      { name: 'Unified Search', href: '/search', icon: Search },
      { name: 'Daily Brief', href: '/brief', icon: Sparkles },
    ],
  },
  {
    title: 'SCIENTIFIC DOMAINS',
    items: [
      { name: 'Alzheimer\'s Knowledge', href: '/knowledge', icon: Brain },
      { name: 'Related Dementias', href: '/related-dementias', icon: Layers },
      { name: 'Biomarker Lab', href: '/biomarkers', icon: Microscope },
      { name: 'Genomics Lab', href: '/genomics', icon: Dna },
      { name: 'Neuroimaging Lab', href: '/neuroimaging', icon: Network },
      { name: 'Clinical Trial Explorer', href: '/trials', icon: Stethoscope },
      { name: 'Dataset Center (ADNI)', href: '/datasets', icon: Database },
      { name: 'Early Detection Program', href: '/early-detection', icon: Zap, badge: 'FLAGSHIP' },
    ],
  },
  {
    title: 'COMPUTATIONAL ACADEMY',
    items: [
      { name: 'Training Academy', href: '/academy', icon: FileCode2 },
      { name: 'Computing Skills Lab', href: '/skills-lab', icon: Terminal },
      { name: 'Biostatistics Lab', href: '/statistics', icon: LineChart },
      { name: 'Machine Learning Lab', href: '/ml-lab', icon: Cpu },
    ],
  },
  {
    title: 'INVESTIGATION & PROJECTS',
    items: [
      { name: 'Research Notebooks', href: '/notebooks', icon: FileText },
      { name: 'Research Questions', href: '/questions', icon: HelpCircle },
      { name: 'Project Workspaces', href: '/projects', icon: FolderGit2 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0c101a] border-r border-slate-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 bg-gradient-to-b from-[#101726] to-[#0c101a]">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase">Biomed Lab</h1>
            <p className="text-[10px] text-cyan-400 tracking-tight font-mono">NEURODEGENERATION & AI</p>
          </div>
        </div>
        <div className="mt-3 py-1 px-2 rounded bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            RESEARCH ENVIRONMENT
          </span>
          <span className="text-slate-500">v1.0-PROD</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {NAVIGATION_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            <h2 className="px-2 text-[10px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              {section.title}
            </h2>
            <div className="space-y-0.5 mt-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 glow-cyan'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        item.badge === 'FLAGSHIP' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Academic Mission Card */}
      <div className="p-3 m-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-300">UTHealth Houston Target</p>
        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
          Biomedical Informatics Ph.D. Pre-Doctoral Research Laboratory & Training System.
        </p>
      </div>
    </aside>
  );
}
