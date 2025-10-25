<template>
    <div class="flex flex-col h-full w-full mt-1">
        <div>
            <button 
                v-for="tab, index in tabs" :key="index" 
                type="button" 
                class="border-green-300 border rounded-t-[8px] pt-1 px-4 pb-2 tab-button relative"
                :class="index === activeTab && 'bg-[#352E36]'"
                :style="`z-index: ${index === activeTab ? 1 : 0}`"
                @click="activeTab = index"
            >
                {{ tab.title }}
            </button>
        </div>
        <div class="flex-grow border border-green-300 rounded-[4px] bg-dark-700 -mt-1 p-1" :style="`z-index: ${tabs.length + 1}`">
            <div v-for="tab, index in tabs" :key="index" v-show="activeTab === index">
                <slot :name="`tab${index+1}`"></slot>
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
    
    const activeTab = ref(0);
    
</script>
<style>
    .tab-button:not(:first-child) {
        margin-left: -4px;
    }
</style>