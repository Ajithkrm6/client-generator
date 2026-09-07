#!/usr/bin/env node

/**
 * Fetch latest versions from npm registry and update dependencies.config.ts
 * Then regenerate README with the new versions
 * Usage: node scripts/fetch-latest-versions.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// List of packages to fetch latest versions for
const PACKAGES = {
  // Core
  'next': true,
  'vite': true,
  'react': true,
  'react-dom': true,
  'react-router-dom': true,
  
  // TypeScript & Types
  'typescript': true,
  '@types/react': true,
  '@types/node': true,
  
  // State Management
  'zustand': true,
  'immer': true,
  
  // Data Fetching
  '@tanstack/react-query': true,
  'axios': true,
  
  // Forms & Validation
  'react-hook-form': true,
  'zod': true,
  '@hookform/resolvers': true,
  
  // UI & Styling
  'tailwindcss': true,
  '@tailwindcss/forms': true,
  'clsx': true,
  'tailwind-merge': true,
  
  // Developer Tools
  'eslint': true,
  'prettier': true,
  '@storybook/react': true,
  '@storybook/nextjs': true,
  '@vitejs/plugin-react': true
}

/**
 * Fetch latest version from npm registry
 */
function fetchLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`
    
    https.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json.version)
        } catch (e) {
          reject(new Error(`Failed to parse version for ${packageName}`))
        }
      })
    }).on('error', (err) => {
      reject(new Error(`Failed to fetch ${packageName}: ${err.message}`))
    })
  })
}

/**
 * Fetch all latest versions
 */
async function fetchAllVersions() {
  console.log('🔄 Fetching latest versions from npm...\n')
  
  const versions = {}
  const errors = []
  
  for (const [pkg, _] of Object.entries(PACKAGES)) {
    try {
      const version = await fetchLatestVersion(pkg)
      versions[pkg] = version
      console.log(`✅ ${pkg.padEnd(30)} → ${version}`)
    } catch (e) {
      console.log(`❌ ${pkg.padEnd(30)} → ERROR`)
      errors.push({ pkg, error: e.message })
    }
  }
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Failed to fetch ${errors.length} packages. Using existing versions.`)
  }
  
  return versions
}

/**
 * Update dependencies.config.ts with new versions
 */
function updateDependenciesConfig(versions) {
  const configPath = path.join(__dirname, 'dependencies.config.ts')
  let content = fs.readFileSync(configPath, 'utf-8')
  
  // Update each package version
  for (const [pkg, version] of Object.entries(versions)) {
    // Match patterns like 'next': '14.2.3', or "next": "14.2.3"
    const regex = new RegExp(`(['"])${pkg}\\1\\s*:\\s*['"][^'"]*['"]`, 'g')
    const replacement = `'${pkg}': '${version}'`
    
    if (regex.test(content)) {
      content = content.replace(regex, replacement)
    }
  }
  
  fs.writeFileSync(configPath, content, 'utf-8')
  console.log('\n✅ Updated scripts/dependencies.config.ts')
}

/**
 * Run the README update script
 */
function updateReadme() {
  try {
    execSync('node scripts/update-readme-versions.js', { cwd: path.join(__dirname, '..') })
    console.log('✅ Updated README.md with new versions')
  } catch (err) {
    console.error('❌ Failed to update README:', err.message)
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    const versions = await fetchAllVersions()
    
    if (Object.keys(versions).length > 0) {
      updateDependenciesConfig(versions)
      updateReadme()
      
      console.log('\n' + '='.repeat(50))
      console.log('✅ ALL VERSIONS UPDATED SUCCESSFULLY!')
      console.log('='.repeat(50))
      console.log('\n📝 Next steps:')
      console.log('  1. Review changes: git diff')
      console.log('  2. Commit: git add -A && git commit')
      console.log('  3. Build: pnpm run build')
    } else {
      console.error('❌ No versions fetched. Please try again.')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
