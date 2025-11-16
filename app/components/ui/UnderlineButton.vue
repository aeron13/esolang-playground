<template>
<button type="button" class="border-b border-grey-400 hover:border-purple-400 uppercase text-sm pt-1" @click="$emit('click')">
    <slot></slot>
</button>
</template>
<script setup lang="ts">
defineEmits(['click'])
</script>