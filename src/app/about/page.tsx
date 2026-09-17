import React from 'react';
import ProjectDocs from '@/components/about/ProjectDocs';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white mb-1">
          Academic Project Overview & Documentation
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Comprehensive project specification, UN Sustainable Development Goal alignment, mathematical formulations, and interactive faculty presentation deck for WasteLess AI.
        </p>
      </div>

      <ProjectDocs />
    </div>
  );
}
