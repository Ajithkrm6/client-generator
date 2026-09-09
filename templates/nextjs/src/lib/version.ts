/**
 * Version utility
 * Dynamically reads version from project's package.json at root
 */

import packageJson from '../../package.json'

export const getVersion = () => {
  return packageJson.version || '1.0.0'
}

export const getPackageInfo = () => {
  return {
    name: packageJson.name || 'Client Generator',
    version: packageJson.version || '1.0.0',
    description: packageJson.description || '',
  }
}
