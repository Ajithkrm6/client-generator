#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import { program } from 'commander'
import { fileURLToPath } from 'url'
import { createProject } from '../create-project.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read package.json for version
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
)

program
  .name('bs-frontend-generator')
  .description('Professional frontend scaffolding framework for Next.js and Vite')
  .version(packageJson.version)

program
  .argument('<app-name>', 'Name of the project to create (kebab-case)')
  .description('Create a new frontend project')
  .action(async (appName) => {
    try {
      await createProject(appName)
    } catch (error) {
      console.error('❌ Error:', error.message)
      process.exit(1)
    }
  })

program.parse(process.argv)
