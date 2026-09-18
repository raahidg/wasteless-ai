'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BrainCircuit,
  Lightbulb,
  Database,
  LineChart,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Activity,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navSections = [
  {
    heading: 'Analytics & Data',
    items: [
      {
        name: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        badge: 'Live',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      },
      {
        name: 'Data Explorer',
        href: '/data-explorer',
        icon: Database,
        badge: '5k Rows',
        badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      },
    ],
  },
  {
    heading: 'AI & Interventions',
    items: [
      {
        name: 'AI Predictor',
        href: '/predict',
        icon: BrainCircuit,
        badge: 'Ridge ML',
        badgeColor: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
      },
      {
        name: 'Waste Insights',
        href: '/insights',
        icon: Lightbulb,
        badge: '6 Playbooks',
        badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      },
    ],
  },
  {
    heading: 'Academic & Evaluation',
    items: [
      {
        name: 'Model Benchmarking',
        href: '/model-performance',
        icon: LineChart,
        badge: 'R² 0.95',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      },
      {
        name: 'Academic Defense',
        href: '/about',
        icon: GraduationCap,
        badge: 'Deck',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      },
    ],
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-2xl border-r border-emerald-500/15 text-slate-200 transition-all duration-300 ease-in-out lg:static ${
          collapsed ? 'w-20' : 'w-72'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-emerald-500/10">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-forest-800 shadow-glow text-white group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime-400 border-2 border-slate-950" />
            </div>
            {!collapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">
                    WasteLess <span className="text-emerald-400">AI</span>
                  </span>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400/80">
                  Global Food Intelligence
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-emerald-950/60 text-slate-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700/50 transition-all shadow-sm"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              {!collapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {section.heading}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent text-emerald-300 border border-emerald-500/30 shadow-card'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-emerald-400 shadow-glow" />
                    )}
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-300'
                      }`}
                    />
                    {!collapsed && (
                      <div className="flex items-center justify-between flex-1">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Live Engine Telemetry Pill */}
        {!collapsed && (
          <div className="p-4 mx-3 mb-4 rounded-2xl bg-slate-900/70 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Engine Telemetry
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Ridge v1
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              5,000 verified rows loaded across 20 countries with zero synthetic missing values.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
