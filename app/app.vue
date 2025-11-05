<template>
  <div class="w-full h-screen flex flex-col max-w-[720px] mx-auto">
    <Header></Header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer></Footer>
    <UiMenu v-show="store.userMenu" @close="store.closeUserMenu">
      <UiMenuNav :menu-list="[{
        title: 'Create an account to save programs',
        items: [{
          link: '/register',
          text: 'Register'
        }]
      },
      {
        title: 'Already have an account?',
        items: [{
          link: '/login',
          text: 'Login'
        }]
      }]"
      />
    </UiMenu>
  </div>
</template>
<script setup lang=ts>
import { useUiStore } from '~/store/uiStore'
const store = useUiStore()
</script>
