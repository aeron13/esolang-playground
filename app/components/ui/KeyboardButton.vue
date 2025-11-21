<template>
    <button 
        type="button" 
        @click="$emit('click', char)" 
        class="border rounded-[4px] bg-dark-700 border-green-500 shadow-button-keyboard min-w-[48px] min-h-[40px] h-full px-2"
    >
        <span class="text-[20px] font-semibold">
            {{ char }}
        </span>
    </button>
</template>

<script setup lang="ts">
    defineProps({
        char: {type: String, required: true}
    })

    defineEmits(['click'])
</script>

<style scoped>
button {
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
}
</style>