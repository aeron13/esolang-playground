import { useBfStore } from "~/stores/bfStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!to.query.code) {
        return;
    }

    const store = useBfStore()
    store.reset()
    store.load(to.query.code as string)
    .catch(e => {
        console.log(e)
        navigateTo('/')
    })

})