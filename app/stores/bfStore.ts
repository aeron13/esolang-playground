import { defineStore } from 'pinia'
import type { IBfCodeStore, IProgram } from '~/types'
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import { useFirestore } from '~/composables/useFirebase';

export const useBfStore = defineStore('bf', {
    state: (): IBfCodeStore => ({
        code: '',
        codeHtml: []
    }),
    actions: {
        parseCode() {
            this.codeHtml = []
            this.code?.split('').forEach((char, i) => {
                this.parseChar(char, i)
            })
        },
        parseChar(char: string, index: number) {
            const charId = `t${index}`
            switch (char) {
                case '\n':
                    this.codeHtml.push('<br>');
                break;
                case ' ':
                    this.codeHtml.push('&nbsp;');
                break;
                case '+':
                case '-':
                    this.codeHtml.push(`<span class="text-orange-code" id="${charId}">${char}</span>`)
                break;
                case '.':
                case ',':
                    this.codeHtml.push(`<span class="text-fuchsia-code" id="${charId}">${char}</span>`) 
                break;
                case '[':
                case ']':
                case '>':
                case '<':
                    this.codeHtml.push(`<span class="text-blue-code" id="${charId}">${char}</span>`)
                break;
                default:
                    this.codeHtml.push(`<span class="text-grey-400" id="${charId}">${char}</span>`)
                break;
            }
        },
        saveOrUpdate() {
            return new Promise((resolve, reject) => {
                if (this.programId) {
                    this.update()
                    .then(resolve)
                    .catch(reject)
                } else {
                    this.save()
                    .then(resolve)
                    .catch(reject)
                }
            })
        },
        save() {
            return new Promise((resolve, reject) => {
                const {db} = useFirestore()
                const user = useUserStore()

                if (!user.isAuthenticated)
                    reject('user not logged')
    
                if (this.programId) {
                    this.update().then(() => {
                        resolve(true)
                    }).catch((e) => {
                        reject(e)
                    })
                }

                if (!this.code)
                    reject('Missing code')

                const data: IProgram = {
                    language: 'bf',
                    title: this.title ?? 'New project',
                    code : this.code!,
                    userId: user.userId!,
                    deletedAt: null,
                    public: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
                addDoc(collection(db, "programs"), data)
                .then(ref => {
                    this.programId = ref.id
                    resolve(true)
                })
                .catch((e) => {
                    reject(e)
                })

            })

        },
        update() {
            return new Promise((resolve, reject) => {
                const {db} = useFirestore()
                const user = useUserStore()
    
                if (!user.isAuthenticated)
                    reject('user not logged')

                if (!this.programId)
                    reject('missing ID')

                const docRef = doc(db, "programs", this.programId!)
                updateDoc(docRef, {
                    title: this.title,
                    code : this.code,
                    userId: user.userId!,
                    updatedAt: new Date().toISOString()
                }).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })
            })
        },
        updateTitle(title: string) {
            return new Promise((resolve, reject) => {
                const {db} = useFirestore()
                const user = useUserStore()
    
                if (!user.isAuthenticated) {
                    reject("Must be authenticated")
                }
                if (!this.programId) {
                    reject("missing programId")
                }
    
                const docRef = doc(db, "programs", this.programId!)
                updateDoc(docRef, {title: title, updatedAt: new Date().toISOString()})
                .then(() => {
                    this.title = title
                    resolve(true)
                })
                .catch(e => {
                    reject("Problem while saving, please retry")
                })
            })
        },
        delete() {
            return new Promise((resolve, reject) => {
                const {db} = useFirestore()
                const user = useUserStore()
    
                if (!user.isAuthenticated) {
                    reject("Must be authenticated")
                }
                if (!this.programId) {
                    reject("missing programId")
                }
    
                const docRef = doc(db, "programs", this.programId!)
                updateDoc(docRef, {deletedAt: new Date().toISOString()})
                .then(() => {
                    this.reset()
                    const user = useUserStore()
                    user.queryPrograms().then(() => {
                        resolve(true)
                    })
                })
                .catch(e => {
                    reject("Problem while deleting, please retry")
                })
            })
        },
        reset() {
            this.programId = undefined
            this.title = ''
            this.code = ''
            this.codeHtml = []
            this.input = ''
            this.output = ''
        }
    }
})