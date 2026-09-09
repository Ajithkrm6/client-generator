declare module 'react/jsx-runtime' {
  export const Fragment: any
  export const jsx: any
  export const jsxs: any
}

declare module 'react' {
  export * from 'react'
  export { default } from 'react'
}

declare module 'next/link' {
  export * from 'next/link'
  export { default } from 'next/link'
}

declare module 'lucide-react' {
  export * from 'lucide-react'
}
