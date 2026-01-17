import { defineStore } from 'pinia'
import { getMe } from '@/api/queries'

const STORAGE_KEY = 'userStore'

interface UserState {
  id: string | null
  email: string | null
  role: string | null
  name: string | null
  lastName: string | null
  loaded: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    email: null,
    role: null,
    name: null,
    lastName: null,
    loaded: false,
  }),

  actions: {
    setUser(user: unknown) {
      const userData = user as {
        id?: string
        email?: string
        role?: string
        name?: string
        lastName?: string
      }
      this.id = userData.id || null
      this.email = userData.email || null
      this.role = userData.role || null
      this.name = userData.name || null
      this.lastName = userData.lastName || null
      this.loaded = true
      this.save()
    },

    clear() {
      this.$reset()
      localStorage.removeItem(STORAGE_KEY)
    },

    save() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          id: this.id,
          email: this.email,
          role: this.role,
          name: this.name,
          lastName: this.lastName,
        })
      )
    },

    load() {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        try {
          const parsed = JSON.parse(data)
          this.id = parsed.id
          this.email = parsed.email
          this.role = parsed.role
          this.name = parsed.name
          this.lastName = parsed.lastName
          this.loaded = true
        } catch (error) {
          console.warn('Failed to load user from localStorage:', error)
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    },

    async fetchUser() {
      try {
        const me = await getMe()
        this.setUser(me)
      } catch (error) {
        console.warn('Failed to fetch user:', error)
        this.clear()
      }
    },
  },
})
