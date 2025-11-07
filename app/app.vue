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
  </div>
</template>
<script setup lang=ts>
import { useUiStore } from '~/stores/uiStore'
import { useUserStore } from '~/stores/userStore'
const store = useUiStore()
const user = useUserStore()
import { not_authenticated_menu } from '~/data'

const userMenu = computed(() => {
  return user.isAuthenticated ? []
  : not_authenticated_menu
});

onMounted(() => {
  user.init()
})
</script>
