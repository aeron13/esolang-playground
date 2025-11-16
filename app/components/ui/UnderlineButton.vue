<template>
<button type="button" class="hover:underline uppercase pt-1" @click="$emit('click')">
    <slot></slot>
</button>
</template>
<script setup lang="ts">
defineEmits(['click'])
</script>