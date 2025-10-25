<template>
    <div class="px-6 h-screen w-full absolute z-[99] top-0 left-0 bg-dark-900" >
        <div class="w-full flex justify-end pt-[22px]">
            <UiButtonSmall :text="'><'" @click="$emit('close')" />
        </div>
        <div class="overflow-scroll w-full h-full relative">
            <h2 class="font-semibold mb-8 text-lg">ASCII table</h2>
            <div class="mb-6" v-for="item, key in ascii">
                <h3 class="mb-2 italic text-sm">{{ key }}</h3>
                <div class="grid grid-cols-3 text-center w-full text-sm">
                    <p v-for="number, char in item">
                        <span class="font-mono text-xs">{{ char }}</span>: 
                        <span>{{ number }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ascii_map } from '~/data';

const ascii = ref(ascii_map)

defineEmits(['close'])
</script>