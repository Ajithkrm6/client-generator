/**
 * Auth Store
 * Zustand store for managing authentication state
 * Uses Immer for immutable state updates
 * 
 * @example
 * const { user, isLoading, login, logout } = useAuthStore()
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
}

interface AuthState {
  // State
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null

  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, name: string) => Promise<void>
  setUser: (user: AuthUser) => void
  clearError: () => void
}

/**
 * Custom auth store with Zustand + Immer
 * Automatically enables draft mode for immutable updates
 */
export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: null,

    // Actions
    login: async (email: string, password: string) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // })
        // const data = await response.json()

        // Mock successful login
        const mockUser: AuthUser = {
          id: '1',
          email,
          name: 'John Doe',
          role: 'user',
        }

        set((state) => {
          state.user = mockUser
          state.isAuthenticated = true
          state.token = 'mock-token-123'
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Login failed'
          state.isLoading = false
        })
        throw error
      }
    },

    logout: () => {
      set((state) => {
        state.user = null
        state.isAuthenticated = false
        state.token = null
        state.error = null
      })
    },

    signup: async (email: string, password: string, name: string) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // TODO: Replace with actual API call
        const mockUser: AuthUser = {
          id: '1',
          email,
          name,
          role: 'user',
        }

        set((state) => {
          state.user = mockUser
          state.isAuthenticated = true
          state.token = 'mock-token-123'
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Signup failed'
          state.isLoading = false
        })
        throw error
      }
    },

    setUser: (user: AuthUser) => {
      set((state) => {
        state.user = user
        state.isAuthenticated = true
      })
    },

    clearError: () => {
      set((state) => {
        state.error = null
      })
    },
  }))
)

export default useAuthStore
