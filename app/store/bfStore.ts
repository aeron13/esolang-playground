import { defineStore } from 'pinia'
import type { ICodeStore } from '~/types'

export const useBfStore = defineStore('bf', {
    state: (): ICodeStore => ({
        code: null,
        codeHtml: []
    })
})