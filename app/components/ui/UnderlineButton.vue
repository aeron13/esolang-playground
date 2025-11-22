<template>
<button type="button" class="uppercase pt-1" :class="underlined && 'border-b border-grey-400'" @click="$emit('click')">
    <slot></slot>
</button>
</template>
<script setup lang="ts">

defineProps({
    underlined: {type: Boolean, default: true}
})

defineEmits(['click'])

</script>