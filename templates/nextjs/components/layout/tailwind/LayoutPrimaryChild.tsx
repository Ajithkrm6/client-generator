/**
 * Layout Primary Child Component
 * Wrapper component that provides consistent layout structure
 * Used to wrap main content area with proper spacing and styling
 * 
 * @example
 * <LayoutPrimaryChild>
 *   <YourContent />
 * </LayoutPrimaryChild>
 */

'use client'

import React from 'react'

interface LayoutPrimaryChildProps {
  children: React.ReactNode
  className?: string
}

export const LayoutPrimaryChild: React.FC<LayoutPrimaryChildProps> = ({
  children,
  className = '',
}) => {
  return (
    <main
      className={`
        flex-1 
        overflow-auto 
        bg-background 
        p-6 
        md:p-8 
        ${className}
      `}
    >
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </main>
  )
}

export default LayoutPrimaryChild
