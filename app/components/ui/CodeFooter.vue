<template>
    <div class="pb-6">
        <div class="flex justify-between items-baseline gap-4">
                <div class="flex gap-4">
                    <UiUnderlineButton class="text-xs" @click="$emit('edit')">
                        Edit
                    </UiUnderlineButton>
                    <UiUnderlineButton class="text-xs" @click="$emit('copy')">
                        Share
                    </UiUnderlineButton>
                </div>
                <UiUnderlineButton class="text-xs" @click="$emit('delete')">
                    Delete
                </UiUnderlineButton>
        </div>
    </div>
</template>
<script setup lang="ts">

defineEmits(['edit','delete','copy'])

</script>