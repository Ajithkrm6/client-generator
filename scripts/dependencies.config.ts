export const DEPENDENCIES = {
  shared: {
    // UI & Forms
    'tailwindcss': '4.3.3',
    '@tailwindcss/forms': '0.5.11',
    'react-hook-form': '7.87.0',
    'zod': '4.5.4',
    '@hookform/resolvers': '5.9.1',
    'clsx': '2.1.1',
    'tailwind-merge': '3.6.0',
    
    // State Management
    'zustand': '5.0.15',
    'immer': '11.1.18',
    
    // Data Fetching
    '@tanstack/react-query': '5.102.8',
    'axios': '1.20.0'
  },

  nextjs: {
    core: {
      'next': '16.3.4',
      'react': '19.2.8',
      'react-dom': '19.2.8'
    },
    storybook: {
      '@storybook/nextjs': '10.6.0',
      '@storybook/react': '10.6.0',
      '@storybook/addon-essentials': '^7.6.0',
      '@storybook/addon-interactions': '^7.6.0'
    },
    dev: {
      'typescript': '7.0.2',
      '@types/react': '19.2.18',
      '@types/node': '26.4.1',
      'eslint': '10.10.0',
      'eslint-config-next': '14.2.3',
      'prettier': '3.9.6',
      'storybook': '^7.6.0'
    }
  },

  vite: {
    core: {
      'vite': '8.2.2',
      'react': '19.2.8',
      'react-dom': '19.2.8',
      'react-router-dom': '7.18.3'
    },
    storybook: {
      '@storybook/react': '10.6.0',
      '@storybook/addon-essentials': '^7.6.0',
      '@storybook/addon-interactions': '^7.6.0'
    },
    dev: {
      'typescript': '7.0.2',
      '@types/react': '19.2.18',
      '@types/node': '26.4.1',
      '@vitejs/plugin-react': '6.1.1',
      'eslint': '10.10.0',
      'prettier': '3.9.6',
      'storybook': '^7.6.0'
    }
  }
}
