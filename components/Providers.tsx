'use client';

import { SolanaProvider } from './SolanaProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SolanaProvider>{children}</SolanaProvider>;
}
