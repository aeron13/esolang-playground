<template>
    <div class="px-5 h-full flex flex-col">
        <div class="flex-grow py-4">
            <UiTabs 
                :tabs="[{ title: 'Code'}, { title: 'Run' }]" 
                v-model="activeTab"
            >
                <template #header-link>
                    <button @click="store.setDummyProgram" class="text-xs uppercase">+ Example code</button>
                </template>
                <template #tab1>
                    <Code @go-to-run="activeTab = 1"></Code>
                </template>
                <template #tab2>
                    <Run></Run>
                </template>
            </UiTabs>
        </div>
        <UiCodeTitle v-if="user.isAuthenticated && store.programId"></UiCodeTitle>
        <Footer v-else>
        </Footer>
    </div>
</template>
<script setup lang="ts">
import loadCodeFromId from '~/middleware/loadCodeFromId';
import resetCode from '~/middleware/resetCode';

const activeTab = ref(0)
const user = useUserStore()
const store = useBfStore()

definePageMeta({
  middleware: [loadCodeFromId, resetCode],
  hideFooter: true
})
</script>