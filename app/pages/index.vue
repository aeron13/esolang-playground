<template>
    <div class="px-5 h-full flex flex-col">
        <div class="flex-grow py-4">
            <UiTabs 
                :tabs="[{ title: 'Code'}, { title: 'Run' }]" 
                v-model="activeTab"
            >
                <template #tab1>
                    <Code @go-to-run="activeTab = 1"></Code>
                </template>
                <template #tab2>
                    <Run></Run>
                </template>
            </UiTabs>
        </div>
        <UiCodeTitle></UiCodeTitle>
    </div>
</template>
<script setup lang="ts">
import loadCodeFromId from '~/middleware/loadCodeFromId';
import resetCode from '~/middleware/resetCode';

const activeTab = ref(0)

definePageMeta({
  middleware: [loadCodeFromId, resetCode],
  hideFooter: true
})
</script>