import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        mode: 'dark',
        userMenu: false,
        codeMenu: false,
    }),

    actions: {
        openUserMenu() {
            this.userMenu = true
        },
        closeUserMenu() {
            this.userMenu = false
        },
        openCodeMenu() {
            this.codeMenu = true
        },
        closeCodeMenu() {
            this.codeMenu = false
        },
        closeMenus() {
            this.userMenu = false
            this.codeMenu = false
        }
    }
})