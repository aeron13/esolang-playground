<template>
    <div class="absolute top-0 left-0 z-[9] w-screen h-screen flex items-center justify-center bg-dark-900/75 px-8 pb-10">
        <div class="bg-dark-700 w-full max-w-[780px] min-h-[25vh] px-4 pb-16">
            <div class="flex w-full justify-end pt-4 pb-6">
                <UiButtonSmall :text="'><'" @click="$emit('close')" />
            </div>
            <slot>
            </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
defineEmits(['close'])
</script>