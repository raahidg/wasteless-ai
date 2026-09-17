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
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    badge: 'Real CSV',
  },
  {
    name: 'AI Predictor',
    href: '/predict',
    icon: BrainCircuit,
    badge: 'Ridge ML',
  },
  {
    name: 'Waste Insights',
    href: '/insights',
    icon: Lightbulb,
  },
  {
    name: 'Data Explorer',
    href: '/data-explorer',
    icon: Database,
    badge: '5k Rows',
  },
  {
    name: 'Model Performance',
    href: '/model-performance',
    icon: LineChart,
    badge: 'R² 0.95',
  },
  {
    name: 'About & Academic',
    href: '/about',
    icon: GraduationCap,
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md border-r border-emerald-900/30 text-white transition-all duration-300 ease-in-out lg:static ${
          collapsed ? 'w-20' : 'w-72'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-emerald-900/30">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-glow text-white">
              <Leaf className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
            </div>
            {!collapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white">
                    WasteLess <span className="text-emerald-400">AI</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300/60 font-medium">
                  Smart Waste Intelligence
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-800/40 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600/30 to-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-300'
                  }`}
                />
                {!collapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800/80 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Status Pill */}
        {!collapsed && (
          <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-b from-emerald-950/40 to-slate-900/80 border border-emerald-900/40">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-200">
                Academic Research Core
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Trained on 5,000 real global food wastage observations across 20 countries.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
