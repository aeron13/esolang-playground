<template>
<div class="px-4 flex flex-col">
    <template v-if="showMakePublicForm && !success">    
        <p class="my-4">Are you sure you want to make <i>"{{ store.title }}"</i> public?</p>
        <UiButtonSmall text="Yes, share" @click="handleMakePublic" :disabled="isSubmitting"></UiButtonSmall>
        <div v-if="error" class="text-orange-code text-sm">{{ error }}</div>
    </template>
    <div v-if="success" class="pt-6">
        <p class="text-sm text-green-300"><i>"{{ store.title }}"</i> is a public project</p>
        <div class="bg-dark-900/50 p-2 my-3 rounded-lg md:flex md:justify-between">
            <p>{{ url }}</p>
            <p class="text-xs mt-2 opacity-50 text-right pointer-events-none">Copied</p>
        </div>
        <p class="">Share the link with your friends!</p>
    </div>
</div>
</template>
<script setup lang="ts">

const store = useBfStore()
const showMakePublicForm = ref<boolean>(true);
const error = ref<string|null>(null);
const success = ref<boolean>(false);
const url = ref<string>()
const isSubmitting = ref(false)

const confirmShare = defineModel()

const handleMakePublic = () => {
    isSubmitting.value = true
    error.value = ''
    store.isPublic = true
    store.update().then(() => {
        handleCopy()
    }).catch((e) => {
        error.value = e as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

const handleCopy = () => {
    url.value = `${window.location.origin}/?code=${store.programId}`
    navigator.clipboard.writeText(url.value)
    success.value = true
}

onBeforeMount(() => {
    showMakePublicForm.value = !store.isPublic!
    if (store.isPublic) {
        handleCopy()
    }
})
</script>