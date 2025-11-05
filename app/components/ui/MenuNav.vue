<template>
 <nav class="px-10">
    <ul>
        <li v-for="(menuBlock, i) in menuList as IMenuBlock[]" :key="i" class="pt-[44px]">
        <p class="text-green-300">{{ menuBlock.title }}</p>
        <ul>
            <li v-for="(menuItem, j) in menuBlock.items" :key="j" class="w-full border-b border-purple-300">
            <nuxt-link :to="menuItem.link" @click="store.closeMenus" class="py-4 w-full flex justify-between gap-[10px]">
                <span class="text-lg font-medium">
                    {{ menuItem.text }}
                </span>
                <span>></span>
            </nuxt-link>
            </li>
        </ul>
        </li>
    </ul>
</nav>
</template>
<script setup lang="ts">
import { useUiStore } from '~/store/uiStore'
const store = useUiStore()
import type { IMenuBlock } from '~/types'

const {menuList} = defineProps({
    menuList: {type: Array, required: true}
})
</script>