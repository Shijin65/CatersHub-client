import { create } from 'zustand'
import { produce } from 'immer'
/**
 * @typedef {Object} ToastType
 * @property {boolean} open - The current open state.
 * @property {string} message - The current message.
 * @property {string} type - The current type.
 * @property {boolean} sticky - The current sticky state.
 */

/**
 * @typedef {Object} ToastStoreType
 * @property {ToastType} toast - The current toast state.
 * @property {(toast: ToastType) => void} setToast - Function to update the toast state.
 * @property {() => void} closeToast - Function to close the toast.
 */

/**
 * Zustand store for managing toast state.
 * @type {import('zustand').StoreApi<ToastStoreType>}
 */

const initialState = {
    toast: {
      message: "",
      type: "success",
      open: false,
      sticky: false
    }
  };
const useToastStore = create((set, get) => ({
    ...initialState,
    closeToast: () => set(produce((state) => ({ toast: { ...state.toast, open: false } }))),
    setToast: (toast) => {
        set(produce((state) => ({ toast: { ...state.toast, ...toast } })))
        if (toast.open && !toast.sticky) {
            setTimeout(() => {
                get().closeToast()
            }, 3000)
        }
    },
}))

/**
 * @returns {ToastStoreType}
 */
export const useToast = () => useToastStore((state) => state)