<template>
    <div class="pb-6">
            
        <!-- <p class="text-xs">
            Project:
        </p> -->
        <div class="flex justify-between items-baseline gap-4">
            <!-- <p class="flex-grow single-line">
               <span v-if="store.title" class="block font-mono text-sm">{{ store.title }}</span>
               <span class="text-grey-400" v-else>Add title</span>
            </p> -->
                <UiUnderlineButton class="text-xs" @click="$emit('edit')">
                    Edit
                </UiUnderlineButton>
                <UiUnderlineButton class="text-xs" @click="$emit('delete')">
                    Delete
                </UiUnderlineButton>
        </div>
    </div>
</template>
<script setup lang="ts">

const store = useBfStore()
defineEmits(['edit','delete'])

</script>