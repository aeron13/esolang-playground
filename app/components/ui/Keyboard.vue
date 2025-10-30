<template>
    <div class="max-w-[420px] flex flex-col gap-1">
        <div class="grid grid-cols-4 gap-1">
            <UiKeyboardButton char="." @click="$emit('click', '.')"></UiKeyboardButton>
            <UiKeyboardButton char="," @click="$emit('click', ',')"></UiKeyboardButton>
            <UiKeyboardButton char="+" @click="$emit('click', '+')"></UiKeyboardButton>
            <UiKeyboardButton char="-" @click="$emit('click', '-')"></UiKeyboardButton>
        </div>
        <div class="grid grid-cols-4 gap-1">
            <UiKeyboardButton char="[" @click="$emit('click', '[')"></UiKeyboardButton>
            <UiKeyboardButton char="]" @click="$emit('click', ']')"></UiKeyboardButton>
            <UiKeyboardButton char=">" @click="$emit('click', '>')"></UiKeyboardButton>
            <UiKeyboardButton char="del" @click="$emit('click', 'del')"></UiKeyboardButton>
        </div>
        <div class="flex gap-1 h-[48px]">
            <UiKeyboardButton char="<" @click="$emit('click', '<')" class="w-[56px]"></UiKeyboardButton>
            <UiKeyboardButton char=" " @click="$emit('click', 'SPACE')" class="flex-grow"></UiKeyboardButton>
            <UiKeyboardButton char="\n" @click="$emit('click', '\n')"></UiKeyboardButton>
        </div>
    </div>
</template>
<script setup lang="ts">

    const emit = defineEmits(['click'])
    const keydownListener = ref()

    onMounted(() => {
        keydownListener.value = window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            switch (e.code) {
                case 'Backspace':
                    emit('click', 'del');
                break;
                case 'Space':
                    emit('click', 'SPACE');
                break;
                case 'Enter':
                    emit('click', '\n');
                break;
                default:
                    if (e.key.length !== 1) return;
                    emit('click', e.key)
                break;
            }
        })
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', keydownListener.value)
    })
</script>