<template>
    <div class="px-5 h-full flex flex-col">
        <div class="flex-grow py-4">
            <UiTabs 
                :tabs="[{ title: 'Code'}, { title: 'Run' }]" 
                v-model="activeTab"
            >
                <template #header-text>
                    <p v-if="store.programId" class="single-line text-right block text-sm text-grey-400">
                        <template v-if="store.title">{{ store.title }}</template>
                        <template v-else>Add title</template>
                    </p>
                    <UiUnderlineButton v-else class="text-xs" :underlined="false" @click="store.setDummyProgram">
                        + EXAMPLE CODE
                    </UiUnderlineButton>
                </template>
                <template #tab1>
                    <Code @go-to-run="activeTab = 1"></Code>
                </template>
                <template #tab2>
                    <Run></Run>
                </template>
            </UiTabs>
        </div>
        <UiCodeFooter 
            v-if="user.isAuthenticated && store.programId"
            @edit="editTitle = true"
            @delete="confirmDelete = true"
            @copy="confirmShare = true"
        >
        </UiCodeFooter>
        <Footer v-else></Footer>
        <UiModal v-if="editTitle && user.isAuthenticated && store.programId" @close="editTitle = false">
            <FormsEditProgram v-model="editTitle"></FormsEditProgram>
        </UiModal>
        <UiModal v-if="confirmShare && user.isAuthenticated && store.programId" @close="confirmShare = false">
            <FormsConfirmShare v-model="confirmShare"></FormsConfirmShare>
        </UiModal>
        <UiModal v-if="confirmDelete && user.isAuthenticated && store.programId" @close="confirmDelete = false">
            <FormsConfirmDelete v-model="confirmDelete"></FormsConfirmDelete>
        </UiModal>
    </div>
</template>
<script setup lang="ts">
import loadCodeFromId from '~/middleware/loadCodeFromId';
import resetCode from '~/middleware/resetCode';

const activeTab = ref(0)
const user = useUserStore()
const store = useBfStore()

const editTitle = ref(false)
const confirmDelete = ref(false)
const confirmShare = ref(false)

definePageMeta({
  middleware: [loadCodeFromId, resetCode],
  hideFooter: true
})

</script>