<template>
    <div class="flex flex-col h-full w-full mt-1">
        <div class="w-full flex justify-between">
            <div>
                <button 
                v-for="tab, index in tabs" :key="index" 
                type="button" 
                class="border-green-300 border rounded-t-[8px] pt-1 px-4 pb-2 tab-button relative font-medium text-[14px]"
                :class="index === activeTab && 'bg-[#352E36]'"
                :style="`z-index: ${index === activeTab ? 1 : 0}`"
                @click="$emit('update:modelValue', index)"
            >
                {{ tab.title }}
            </button>
            </div>
            <div>
                <slot name="header-link"></slot>
            </div>
        </div>
        <div class="flex-grow border border-green-300 rounded-[4px] bg-dark-700 -mt-1 p-1" :style="`z-index: ${tabs.length + 1}`">
            <div v-for="tab, index in tabs" :key="index" v-show="activeTab === index" class="w-full h-full">
                <slot :name="`tab${index+1}`" v-if="activeTab === index"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {ITabs} from "@/types"

defineProps({
    tabs: {
        type: Array<ITabs>,
            default: [{
                title: 'Title',
            }]
        }
    })
    
const activeTab = defineModel({default: 0});

defineEmits(['update:modelValue'])
    
</script>
<style>
    .tab-button:not(:first-child) {
        margin-left: -4px;
    }
</style>