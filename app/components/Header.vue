<template>
    <header class="pt-[22px] px-6">
        <div class="flex justify-between w-full ">
            <UiButtonSmall :text="'<>'" />
            <UiAppTitle />
            <UiButtonSmall :text="'<3'" :priority="2" @click="store.openUserMenu" />
        </div>
        <h2 class="mt-1 text-center">
            Brainfuck
        </h2>
    </header>
</template>
<script setup lang="ts">
import { useUiStore } from '~/store/uiStore'
const store = useUiStore()
</script>