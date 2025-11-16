import { defineStore } from 'pinia'
import type { IBfCodeStore, IProgram, ProgramModel, ICreateProgramData } from '~/types'
import Program from '~/models/program'
import { hello_world_program } from '~/data'

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
        load(id: string) {
            return new Promise((resolve, reject) => {
                new Program().get(id)
                .then((data) => {
                    this.programId = data.id
                    this.code = data.code
                    this.title = data.title
                    this.parseCode()
                    resolve(true)
                })
                .catch(e => reject(e))
            })
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

                const user = useUserStore()

                if (!user.isAuthenticated)
                    reject('user not logged')

                if (!this.code)
                    reject('Missing code')

                new Program().create({
                    title: this.title,
                    code: this.code!,
                    userId: user.userId!
                })
                .then((id) => {
                    this.programId = id
                    resolve(true)
                })
                .catch(e => reject(e))
            })

        },
        update() {
            return new Promise((resolve, reject) => {
                const user = useUserStore()
    
                if (!user.isAuthenticated)
                    reject('user not logged')

                if (!this.programId)
                    reject('missing ID')

                new Program().update({
                    id: this.programId!, 
                    code: this.code ?? ''
                })
                .then(() => {
                    resolve(true)
                })
                .catch((e) => reject(e))
            })
        },
        updateTitle(title: string) {
            return new Promise((resolve, reject) => {
                const user = useUserStore()
    
                if (!user.isAuthenticated) {
                    reject("Must be authenticated")
                }
                if (!this.programId) {
                    reject("missing programId")
                }

                new Program().updateTitle(this.programId!, title)
                .then(resolve)
                .catch(reject)
            })
        },
        setDummyProgram() {
            this.reset()
            this.code = hello_world_program
            this.parseCode()
        },
        delete() {
            return new Promise((resolve, reject) => {
                const user = useUserStore()
    
                if (!user.isAuthenticated) {
                    reject("Must be authenticated")
                }
                if (!this.programId) {
                    reject("missing programId")
                }

                new Program().delete(this.programId!)
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