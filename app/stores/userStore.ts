import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useFirestore } from '~/composables/useFirebase'
import type { IProgram } from '~/types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const useUserStore = defineStore('user', {
    state: () => ({
      user: null as User | null,
      programs: [] as IProgram[],
      loading: true,
    }),
  
    actions: {
      init() {
        const { auth } = useFirestore()
        onAuthStateChanged(auth, (user) => {
          this.user = user
          this.loading = false
        })
      },

      register(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const { auth } = useFirestore()
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              this.user = userCredential.user;
              resolve('Registration successful! Welcome aboard.')
          })
          .catch((e) => {
              console.log(e.code)
              reject(e.message.replace('Firebase: ', ''))
          })
        })
      },

      login(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const { auth } = useFirestore()
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            this.user = userCredential.user;
            resolve('Login successful! Welcome back.')
          })
          .catch((e) => {
            console.log(e.code)
            reject(e.message.replace('Firebase: ', ''))
          })
        })
      },
  
      logout() {
        const { auth } = useFirestore()
        signOut(auth)
      },
    },
  
    getters: {
      isAuthenticated: (state) => !!state.user,
    },
  })