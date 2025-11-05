<template>
    <button :type="type as ButtonTypes" class="text-[14px]" :disabled="disabled">
        <span 
            class="block font-white font-semibold border rounded-[3px] px-4 py-1.5"
            :class="!disabled ? 'bg-purple-500 border-purple-300 shadow-button-dark' : 'bg-dark-700 border-purple-300/50 shadow-button-2-dark' "
        >
            {{ text }}
        </span>
    </button>
</template>
<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
type ButtonTypes = ButtonHTMLAttributes['type']

const {text, disabled, type} = defineProps({
    text: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    type: {type: String, default: 'button',}
})
</script>