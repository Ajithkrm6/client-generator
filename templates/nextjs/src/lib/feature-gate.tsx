/**
 * Feature Gate Component
 * Conditional rendering based on feature flags
 * Example of feature-gated UI implementation
 * 
 * @example
 * <FeatureGate feature="auth.two-factor">
 *   <TwoFactorSettings />
 * </FeatureGate>
 */

'use client'

import React, { ReactNode } from 'react'

interface FeatureGateProps {
  feature: string | string[]
  children: ReactNode
  fallback?: ReactNode
  requireAll?: boolean
}

/**
 * Mock feature flags - in a real app, these would come from a config/API
 */
const FEATURE_FLAGS: Record<string, boolean> = {
  'auth.two-factor': true,
  'auth.social-login': false,
  'dashboard.advanced-analytics': true,
  'dashboard.ai-insights': false,
  'profile.settings': true,
  'profile.preferences': false,
}

/**
 * Check if a feature is enabled
 */
function isFeatureEnabled(feature: string): boolean {
  return FEATURE_FLAGS[feature] ?? false
}

/**
 * Feature Gate Component
 * Conditionally renders children based on feature flags
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback = null,
  requireAll = false,
}) => {
  const features = Array.isArray(feature) ? feature : [feature]

  const isEnabled = requireAll
    ? features.every(isFeatureEnabled)
    : features.some(isFeatureEnabled)

  return isEnabled ? <>{children}</> : <>{fallback}</>
}

/**
 * Hook to check if a feature is enabled
 * Useful for non-rendering logic
 * 
 * @example
 * const isFeatureEnabled = useFeatureGate('auth.two-factor')
 * if (isFeatureEnabled) {
 *   // Do something
 * }
 */
export function useFeatureGate(feature: string | string[], requireAll = false): boolean {
  const features = Array.isArray(feature) ? feature : [feature]

  return requireAll
    ? features.every(isFeatureEnabled)
    : features.some(isFeatureEnabled)
}

/**
 * Component to see all available features (admin only)
 */
export const FeatureGateDebug: React.FC = () => {
  return (
    <div className="space-y-2 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
      <h3 className="font-semibold">🚀 Feature Flags (Debug Mode)</h3>
      <div className="space-y-1 text-sm">
        {Object.entries(FEATURE_FLAGS).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <code className="font-mono">{key}</code>
            <span
              className={`rounded px-2 py-1 text-xs font-semibold ${
                enabled
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Update <code>FEATURE_FLAGS</code> to toggle features
      </p>
    </div>
  )
}

export default FeatureGate
