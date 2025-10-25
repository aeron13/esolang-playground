<template>
    <div class="w-full">
        <div class="bg-dark-900 w-full h-[330px] rounded-sm">
            <p v-html="code" class="font-semibold text-base p-2"></p>
        </div>
        <div class="px-5 pt-4">
            <UiKeyboard @click="handleClick"></UiKeyboard>
        </div>
    </div>
</template>
<script setup lang="ts">
    const code = ref('')
    const handleClick = (char: string) => {
        switch (char) {
            case 'del':
                code.value = code.value.slice(0, -1)
                break;
            case '\n':
                code.value += '<br>';
                break;
            default:
                code.value += char;
                break;
        }
    }
</script>