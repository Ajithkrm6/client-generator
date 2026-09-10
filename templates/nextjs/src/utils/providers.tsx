'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
