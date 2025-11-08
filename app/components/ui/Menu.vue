<template>
<div class="absolute w-screen h-screen bg-purple-500 z-[9]">
    <div class="pt-[22px] px-6 relative">
        <div class="w-full left-0 absolute text-center pointer-events-none">
            <UiAppTitle />
        </div>
        <div class="w-full h-full flex justify-end">
            <UiButtonSmall :text="'><'" @click="$emit('close')" />
        </div>
    </div>
    <div class="py-10">
        <slot></slot>
    </div>
</div>
</template>
<script setup lang="ts">
defineEmits(['close'])
</script>