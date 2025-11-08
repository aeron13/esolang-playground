<template>
  <div class="w-full h-screen flex flex-col max-w-[720px] mx-auto">
    <Header></Header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer></Footer>
    <UiMenu v-show="store.userMenu" @close="store.closeUserMenu">
      <UiMenuNav :menu-list="userMenu"/>
    </UiMenu>
    <UiMenu v-show="store.codeMenu" @close="store.closeCodeMenu">
      <UiMenuNav :menu-list="code_menu"/>
    </UiMenu>
  </div>
</template>
<script setup lang=ts>
import { useUiStore } from '~/stores/uiStore'
import { useUserStore } from '~/stores/userStore'
import { not_authenticated_menu, authenticated_menu, code_menu } from '~/data'

const store = useUiStore()
const user = useUserStore()

const userMenu = computed(() => {
  if (user.isAuthenticated && user.programs.length) {
    authenticated_menu[0]!.items = user.programs.map((item) => {
      return {
        text: item.title,
        link: `/?code=${item.id}`
      }
    })
    return [...authenticated_menu]
  }
  else if (user.isAuthenticated) {
    return authenticated_menu
  }
  return not_authenticated_menu
});

onMounted(() => {
  user.init()
})
</script>
