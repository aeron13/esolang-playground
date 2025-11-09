import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useFirestore } from '~/composables/useFirebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
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

          if (!this.isAuthenticated) reject('user not logged')

          const { db } = useFirestore()
          const q = query(
            collection(db, "programs"), 
            where("userId", "==", this.userId), 
            where("deletedAt", "==", null)
          );
          onSnapshot(q, (docs) => {
            this.programs = []
            docs.forEach(doc => {
              const data = doc.data()
              this.programs.push({
                id: doc.id,
                language: data.language as string,
                title: data.title as string
              })
            })
          })
          resolve(this.programs)

        })

      }

    },
  
    getters: {
      isAuthenticated: (state) => !!state.userId,
    },
  })