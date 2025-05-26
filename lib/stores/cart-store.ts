import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  stock: number
  quantity: number
  category: {
    name: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // Computed values
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (productId: string) => number
  isItemInCart: (productId: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === product.id)

        if (existingItem) {
          // Update quantity if item already exists
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            product.stock
          )
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            )
          })
        } else {
          // Add new item to cart
          const newItem: CartItem = {
            ...product,
            quantity: Math.min(quantity, product.stock)
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getItemQuantity: (productId) => {
        const { items } = get()
        const item = items.find(item => item.id === productId)
        return item?.quantity || 0
      },

      isItemInCart: (productId) => {
        const { items } = get()
        return items.some(item => item.id === productId)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items })
    }
  )
) 