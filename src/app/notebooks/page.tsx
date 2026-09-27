'use client';

import React, { useState } from 'react';
import { FileText, Plus, Save, Trash2, Calendar, Tag } from 'lucide-react';

interface NotebookEntry {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
}

const INITIAL_NOTES: NotebookEntry[] = [
  {
    id: '1',
    title: 'Hypothesis on Plasma p-tau217 vs Centiloid Thresholds',
    category: 'Biomarkers & Longitudinal Dynamics',
    content: 'Observing that plasma p-tau217 begins rising when Amyloid-PET centiloids cross ~15-20 CL, well before the classic 25-30 CL positivity cutoff. This 10 CL transition zone may represent the prime window for preventative anti-amyloid intervention.',
    date: '2026-03-30',
  },
  {
    id: '2',
    title: 'Nested Cross-Validation Leakage Protocol for ADNI',
    category: 'Machine Learning & Integrity',
    content: 'Crucial requirement: When splitting train/test folds in longitudinal cohorts, stratification must occur at the participant level (PTID), never at the visit row level. Random row splitting leaks subject-specific baseline features and leads to inflated AUCs (0.99 vs true 0.88).',
    date: '2026-03-29',
  }
];

export default function NotebooksPage() {
  const [notes, setNotes] = useState<NotebookEntry[]>(INITIAL_NOTES);
  const [selectedNote, setSelectedNote] = useState<NotebookEntry>(INITIAL_NOTES[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleCreateNote = () => {
    const newNote: NotebookEntry = {
      id: Date.now().toString(),
      title: 'Untitled Research Observation',
      category: 'General Investigation',
      content: 'Record scientific hypotheses, methodology notes, or paper critiques here...',
      date: new Date().toISOString().split('T')[0],
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setNewTitle(newNote.title);
    setNewContent(newNote.content);
  };

  const handleSaveNote = () => {
    const updated = notes.map((n) =>
      n.id === selectedNote.id ? { ...n, title: newTitle, content: newContent } : n
    );
    setNotes(updated);
    setSelectedNote({ ...selectedNote, title: newTitle, content: newContent });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Persistent Research Notebooks
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured scientific lab notebooks, hypothesis records, and analytical notes persisted across research sessions.
          </p>
        </div>

        <button
          onClick={handleCreateNote}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Lab Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="space-y-2">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                setSelectedNote(note);
                setIsEditing(false);
                setNewTitle(note.title);
                setNewContent(note.content);
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedNote.id === note.id
                  ? 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{note.category}</span>
                <span>{note.date}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-100 mt-1 truncate">{note.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{note.content}</p>
            </button>
          ))}
        </div>

        {/* Note Editor / Viewer */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
              {selectedNote.category}
            </span>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Entry</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setNewTitle(selectedNote.title);
                    setNewContent(selectedNote.content);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono"
                >
                  Edit Entry
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 font-bold text-sm px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 text-slate-300 text-xs p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans leading-relaxed resize-none"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-100">{selectedNote.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedNote.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
