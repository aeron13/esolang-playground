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
                    this.codeHtml.push(`<span class="text-grey-400">${char}</span>`)
                break;
            }
        },
        save() {
            const {db} = useFirestore()
            const user = useUserStore()

            if (!user.isAuthenticated || !this.code)
                return

            const data: IProgram = {
                language: 'bf',
                title: 'my pr',
                code : this.code,
                userId: user.userId!,
                deletedAt: null,
                public: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            if (!this.programId) {
                addDoc(collection(db, "programs"), data)
                .then(ref => {
                    this.programId = ref.id
                })
            } else {
                const docRef = doc(db, "programs", this.programId)
                updateDoc(docRef, data as any)
            }
            console.log('Saved program ' + this.programId, data)
        }
    }
})