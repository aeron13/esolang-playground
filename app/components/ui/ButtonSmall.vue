<template>
    <button type="button" class="text-[14px]" @click="$emit('click')" :disabled="disabled">
        <span 
            class="block font-white font-semibold border rounded-[3px] px-3 py-1 "
            :class="!disabled ? 'bg-purple-500 border-purple-300 shadow-button-dark' : 'bg-dark-700 border-purple-300/50 shadow-button-2-dark' "
        >
            {{ text }}
        </span>
    </button>
</template>
<script setup lang="ts">
defineProps({
    text: {type: String, required: true},
    disabled: {type: Boolean, default: false}
})
defineEmits(['click'])
</script>