<template>
<div class="px-4">
    <p class="my-4">Are you sure you want to delete <i>"{{ store.title }}"</i>?</p>
    <UiButtonSmall text="Yes, delete" @click="handleDelete" :disabled="isSubmitting"></UiButtonSmall>
    <div v-if="error" class="text-orange-code text-sm">{{ error }}</div>
</div>
</template>
<script setup lang="ts">

const store = useBfStore()
const ui = useUiStore()
const error = ref<string|null>(null);
const isSubmitting = ref(false)

const confirmDelete = defineModel()

const handleDelete = () => {
    isSubmitting.value = true
    error.value = ''
    const title = store.title
    store.delete().then(() => {
        confirmDelete.value = false
        navigateTo('/')
        ui.setToast(`<i>${title}</i> deleted`)
    })
    .catch((e) => {
        error.value = e as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>