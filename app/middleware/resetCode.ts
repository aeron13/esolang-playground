export default defineNuxtRouteMiddleware(async (to, from) => {

    if (!to.query.new || to.query.new !== '1')
        return;
    
    const store = useBfStore()
    store.reset()

  }) 