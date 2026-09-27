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
  Zap,
  X
} from 'lucide-react';
import { useMobileNav } from './MobileNavContext';

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
  const { isOpen, closeNav } = useMobileNav();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0c101a]">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 bg-gradient-to-b from-[#101726] to-[#0c101a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase">Biomed Lab</h1>
              <p className="text-[10px] text-cyan-400 tracking-tight font-mono">NEURODEGENERATION & AI</p>
            </div>
          </div>
          {/* Close button for mobile drawer */}
          <button
            onClick={closeNav}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
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
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
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
                    onClick={closeNav}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 glow-cyan'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold flex-shrink-0 ${
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
      <div className="p-3 m-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex-shrink-0">
        <p className="font-semibold text-slate-300">UTHealth Houston Target</p>
        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
          Biomedical Informatics Ph.D. Pre-Doctoral Research Laboratory & Training System.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-slate-800 flex-col h-screen sticky top-0 overflow-hidden z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={closeNav}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 md:hidden transform transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0 shadow-2xl shadow-cyan-950/50' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
