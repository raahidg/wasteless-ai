import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/context/DataContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'WasteLess AI — Smart Food Waste Prediction & Prevention System',
  description:
    'A production-grade AI & Data Science application analyzing 5,000 global food waste observations with machine learning prediction and targeted intervention strategies.',
  keywords: [
    'Food Waste',
    'Machine Learning',
    'Sustainability',
    'SDG 12.3',
    'Data Science',
    'Waste Reduction',
  ],
  authors: [{ name: 'WasteLess AI Academic Research Group' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <DataProvider>
          <AppLayout>{children}</AppLayout>
        </DataProvider>
      </body>
    </html>
  );
}
