<template>
    <div class="pb-10 pt-2">
            
        <p class="text-xs">
            Project:
        </p>
        <div class="flex justify-between gap-4">
            <p class="flex-grow single-line">
               <span v-if="store.title" class="font-mono text-sm mt-1">{{ store.title }}</span>
               <span class="text-grey-400" v-else>Add title</span>
            </p>
            <UiUnderlineButton @click="editTitle = true">
                Edit
            </UiUnderlineButton>
            <UiUnderlineButton @click="confirmDelete = true">
                Delete
            </UiUnderlineButton>
        </div>
        <UiModal v-if="editTitle" @close="editTitle = false">
            <form class="flex flex-col gap-4 px-4">
                <UiInputField 
                    class="flex-grow" 
                    label="Title" 
                    name="title" 
                    v-model="title"
                    :show-error="v$.title.$dirty && v$.title.$error" 
                    :error-message="v$.title.$errors[0]?.$message as string" 
                ></UiInputField>
                <UiButtonSmall text="Save" @click="handleSubmit" :disabled="isSubmitting"></UiButtonSmall>
                <div v-if="error" class="text-orange-code text-sm">{{ error }}</div>
            </form>
        </UiModal>
        <UiModal v-if="confirmDelete" @close="confirmDelete = false">
            <div class="px-4">
                <p class="my-4">Are you sure you want to delete <i>"{{ store.title }}"</i>?</p>
                <UiButtonSmall text="Yes, delete" @click="handleDelete" :disabled="isSubmitting"></UiButtonSmall>
                <div v-if="error" class="text-orange-code text-sm">{{ error }}</div>
            </div>
        </UiModal>
    </div>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const store = useBfStore()
const editTitle = ref(false)
const confirmDelete = ref(false)
const title = ref('')
const error = ref<string|null>(null);
const isSubmitting = ref(false)

const rules = computed(() => ({
    title: {
        required: helpers.withMessage('Title is required', required),
    },
}))
const v$ = useVuelidate(rules, { title})

onMounted(() => {
    title.value = store.title ?? ''
})

const handleSubmit = () => {
    v$.value.$touch()
    if (v$.value.$invalid) {
        return
    }
    isSubmitting.value = true
    error.value = ''
    store.updateTitle(title.value).then(() => {
        editTitle.value = false
    }).catch((e) => {
        error.value = e as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

const handleDelete = () => {
    isSubmitting.value = true
    error.value = ''
    store.delete().then(() => {
        confirmDelete.value = false
        navigateTo('/')
    })
    .catch((e) => {
        error.value = e as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>