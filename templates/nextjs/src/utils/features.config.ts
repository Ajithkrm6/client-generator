/**
 * Feature Module Configuration
 * Defines all available feature gates for the application
 */

export type FeatureModuleKey =
  | 'ops.dashboard'
  | 'workpool.intake'
  | 'workpool.labor-prep'
  | 'workpool.qc-review'
  | 'clients.management'
  | 'strategy.report-generator'
  | 'documents.reference'
  | 'admin.settings';

export const FEATURE_MODULES: Record<FeatureModuleKey, boolean> = {
  'ops.dashboard': true,
  'workpool.intake': true,
  'workpool.labor-prep': true,
  'workpool.qc-review': true,
  'clients.management': true,
  'strategy.report-generator': true,
  'documents.reference': true,
  'admin.settings': true,
};
