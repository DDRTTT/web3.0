'use client';

import { XProvider } from '../components/XProvider';

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <XProvider>{children}</XProvider>;
}
