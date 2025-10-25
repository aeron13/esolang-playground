<template>
    <div class="flex flex-col gap-1">
        <div class="grid grid-cols-4 gap-1">
            <UiKeyboardButton char="." @click="$emit('click', '.')"></UiKeyboardButton>
            <UiKeyboardButton char="," @click="$emit('click', ',')"></UiKeyboardButton>
            <UiKeyboardButton char="+" @click="$emit('click', '+')"></UiKeyboardButton>
            <UiKeyboardButton char="-" @click="$emit('click', '-')"></UiKeyboardButton>
        </div>
        <div class="grid grid-cols-4 gap-1">
            <UiKeyboardButton char="[" @click="$emit('click', '[')"></UiKeyboardButton>
            <UiKeyboardButton char="]" @click="$emit('click', ']')"></UiKeyboardButton>
            <UiKeyboardButton char="<" @click="$emit('click', '<')"></UiKeyboardButton>
            <UiKeyboardButton char=">" @click="$emit('click', '>')"></UiKeyboardButton>
        </div>
        <div class="flex gap-1 h-[48px]">
            <UiKeyboardButton char="del" @click="$emit('click', 'del')"></UiKeyboardButton>
            <UiKeyboardButton char=" " @click="$emit('click', ' ')" class="flex-grow"></UiKeyboardButton>
            <UiKeyboardButton char="\n" @click="$emit('click', '\n')"></UiKeyboardButton>
        </div>
    </div>
</template>
<script setup lang="ts">
    defineEmits(['click'])
</script>