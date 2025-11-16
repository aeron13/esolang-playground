import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from 'firebase/auth'

import Program from '~/models/program';

import type { IMenuProgram } from '~/types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const useUserStore = defineStore('user', {
    state: () => ({
      userId: undefined as string | undefined,
      email: undefined as string | undefined,
      programs: [] as IMenuProgram[],
      loading: true,
    }),
  
    actions: {
      init() {
        const { auth } = useFirestore()
        onAuthStateChanged(auth, (user) => {
          this.userId = user?.uid
          this.loading = false
          if (user) {
            this.queryPrograms()
            this.email = user.email ?? undefined
          }
        })
        console.log(this.userId)
      },

      register(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const { auth } = useFirestore()
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              this.userId = userCredential.user.uid;
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
            this.userId = userCredential.user.uid;
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
        this.userId = undefined
      },

      queryPrograms() {
        return new Promise(async (resolve, reject) => {

          if (!this.isAuthenticated || !this.userId) reject('user not logged')
          
          new Program().getAll(this.userId!)
          .then(programs => {
            this.programs = programs.map(obj => {
              return {
                id: obj.id!,
                language: obj.language,
                title: obj.title
              }
            })
            resolve(true)
          })

        })

      }

    },
  
    getters: {
      isAuthenticated: (state) => !!state.userId,
    },
  })