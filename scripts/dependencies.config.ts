export const DEPENDENCIES = {
  shared: {
    // UI & Forms
    'tailwindcss': '4.0.0',
    '@tailwindcss/forms': '0.5.7',
    'react-hook-form': '7.48.0',
    'zod': '4.4.0',
    '@hookform/resolvers': '3.3.4',
    'clsx': '2.0.0',
    'tailwind-merge': '2.2.1',
    
    // State Management
    'zustand': '5.0.0',
    'immer': '10.0.0',
    
    // Data Fetching
    '@tanstack/react-query': '5.28.0',
    'axios': '1.6.0'
  },

  nextjs: {
    core: {
      'next': '14.2.3',
      'react': '19.0.0',
      'react-dom': '19.0.0'
    },
    storybook: {
      '@storybook/nextjs': '^7.6.0',
      '@storybook/react': '^7.6.0',
      '@storybook/addon-essentials': '^7.6.0',
      '@storybook/addon-interactions': '^7.6.0'
    },
    dev: {
      'typescript': '5.5.2',
      '@types/react': '19.0.0',
      '@types/node': '20.10.6',
      'eslint': '8.55.0',
      'eslint-config-next': '14.2.3',
      'prettier': '3.1.1',
      'storybook': '^7.6.0'
    }
  },

  vite: {
    core: {
      'vite': '5.0.0',
      'react': '19.0.0',
      'react-dom': '19.0.0',
      'react-router-dom': '6.20.0'
    },
    storybook: {
      '@storybook/react': '^7.6.0',
      '@storybook/addon-essentials': '^7.6.0',
      '@storybook/addon-interactions': '^7.6.0'
    },
    dev: {
      'typescript': '5.5.2',
      '@types/react': '19.0.0',
      '@types/node': '20.10.6',
      '@vitejs/plugin-react': '4.2.1',
      'eslint': '8.55.0',
      'prettier': '3.1.1',
      'storybook': '^7.6.0'
    }
  }
}
