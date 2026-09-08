/**
 * Example Dashboard Store
 * Zustand store for dashboard state management
 * Shows how to structure stores for different modules
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface DashboardStats {
  revenue: number
  activeUsers: number
  transactions: number
  growthRate: number
}

interface DashboardState {
  // State
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchStats: () => Promise<void>
  updateStats: (stats: Partial<DashboardStats>) => void
  clearError: () => void
}

/**
 * Dashboard store with Zustand + Immer
 * Example of how to structure module-specific stores
 */
export const useDashboardStore = create<DashboardState>()(
  immer((set) => ({
    // Initial state
    stats: null,
    isLoading: false,
    error: null,

    // Actions
    fetchStats: async () => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/dashboard/stats')
        // const data = await response.json()

        // Mock data
        const mockStats: DashboardStats = {
          revenue: 45231,
          activeUsers: 2345,
          transactions: 1234,
          growthRate: 23.5,
        }

        set((state) => {
          state.stats = mockStats
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to fetch stats'
          state.isLoading = false
        })
      }
    },

    updateStats: (updates: Partial<DashboardStats>) => {
      set((state) => {
        if (state.stats) {
          Object.assign(state.stats, updates)
        }
      })
    },

    clearError: () => {
      set((state) => {
        state.error = null
      })
    },
  }))
)

export default useDashboardStore
