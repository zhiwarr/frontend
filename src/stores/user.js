import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('https://kebazaar.xyz/api/v1/getUser')
        this.user = response.data.user
        this.token = localStorage.getItem('token')
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    setUser(user) {
      this.user = user;
    },
    setToken(token){
      this.token = token;
    }
  }
})
