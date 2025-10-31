import { defineStore } from 'pinia'
import type { IBfCodeStore } from '~/types'

export const useBfStore = defineStore('bf', {
    state: (): IBfCodeStore => ({
        code: '',
        codeHtml: []
    })
})