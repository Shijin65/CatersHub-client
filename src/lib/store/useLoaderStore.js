import { create } from 'zustand'

/**
 * @typedef {Object} LoaderType
 * @property {boolean} loading - The current loading state.
 * @property {(loading: boolean) => void} setLoading - Function to update the loading state.
 */

/**
 * Zustand store for managing loading state.
 * @type {import('zustand').StoreApi<LoaderType>}
 */

const useLoaderStore = create((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}))

/**
 * 
 * @returns {LoaderType}
 */
export const useLoader = () => useLoaderStore((state) => state)