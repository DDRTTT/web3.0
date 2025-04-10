'use client';

import { Suspense } from 'react';
import PageLoading from './components/PageLoading';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  );
}
