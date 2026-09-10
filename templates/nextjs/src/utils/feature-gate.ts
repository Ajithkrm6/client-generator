/**
 * Feature Gate Utility
 * Handles feature flag checks and toggles
 */

import { FEATURE_MODULES, type FeatureModuleKey } from './features.config';

class FeatureGate {
  private enabledFeatures: Set<FeatureModuleKey>;

  constructor() {
    // Initialize with all features enabled by default
    this.enabledFeatures = new Set(
      Object.keys(FEATURE_MODULES).filter(
        (key) => FEATURE_MODULES[key as FeatureModuleKey]
      ) as FeatureModuleKey[]
    );
  }

  /**
   * Check if a feature is enabled
   */
  isEnabled(feature: FeatureModuleKey): boolean {
    return this.enabledFeatures.has(feature);
  }

  /**
   * Enable a feature
   */
  enable(feature: FeatureModuleKey): void {
    this.enabledFeatures.add(feature);
  }

  /**
   * Disable a feature
   */
  disable(feature: FeatureModuleKey): void {
    this.enabledFeatures.delete(feature);
  }

  /**
   * Toggle a feature
   */
  toggle(feature: FeatureModuleKey): void {
    if (this.isEnabled(feature)) {
      this.disable(feature);
    } else {
      this.enable(feature);
    }
  }

  /**
   * Get all enabled features
   */
  getEnabledFeatures(): FeatureModuleKey[] {
    return Array.from(this.enabledFeatures);
  }

  /**
   * Reset to default configuration
   */
  reset(): void {
    this.enabledFeatures = new Set(
      Object.keys(FEATURE_MODULES).filter(
        (key) => FEATURE_MODULES[key as FeatureModuleKey]
      ) as FeatureModuleKey[]
    );
  }
}

export const featureGate = new FeatureGate();
