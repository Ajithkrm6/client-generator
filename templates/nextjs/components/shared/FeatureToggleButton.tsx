'use client';

import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Feature Toggle Button for TopNav
 * Provides quick access to the Feature Admin Panel
 */
export function FeatureToggleButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      title="Open Feature Admin Panel"
      className="h-8 w-8 p-0"
      onClick={() => router.push('/admin/features')}
    >
      <Settings className="w-4 h-4" />
    </Button>
  );
}
