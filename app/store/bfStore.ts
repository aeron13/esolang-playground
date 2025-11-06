import { defineStore } from 'pinia'
import type { IBfCodeStore } from '~/types'
import {addDoc, collection} from 'firebase/firestore'
import { useFirestore } from '~/composables/useFirestore';

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
            const data = {
                language: 'bf',
                title: 'my pr',
                code : this.code,
                user_id: null,
                deleted_at: null,
                public: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            console.log(data)
            addDoc(collection(db, "programs"), data)

            // - Language
            // - Title
            // - Code
            // - createdAt
            // - updatedAt
            // - UserId
            // - DeletedAt
            // - public
        }
    }
})