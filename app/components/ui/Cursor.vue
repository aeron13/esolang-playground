<template>
    <span class="inline-block font-semibold h-5 w-[1px] bg-white transform translate-y-[2px] ml-1" :class="!userTyping && 'cursor-animate'"></span>
</template>
<script setup lang="ts">
    defineProps({
        userTyping: {type: Boolean, default: false}
    })
</script>
<style scoped>
    @keyframes cursor {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    .cursor-animate {
        animation: cursor 0.8s infinite alternate
    }
</style>