import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Coding with AJ - Phase 0', description: 'AI-powered coding education with AJ' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
