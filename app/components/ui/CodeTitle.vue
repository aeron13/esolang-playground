<template>
    <div v-if="store.title" class="pb-10 pt-2">
            
        <p class="text-xs">
            Project:
        </p>
        <button @click="editTitle = true">
            {{ store.title }}
        </button>
        <div v-if="editTitle" class="absolute top-0 left-0 z-[9] w-screen h-screen flex items-center justify-center bg-dark-900/75 px-8 pb-10">
            <div class="bg-dark-700 w-full px-4 pb-16">
                <div class="flex w-full justify-end pt-4 pb-6">
                    <UiButtonSmall :text="'><'" @click="editTitle = false" />
                </div>
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
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const store = useBfStore()
const editTitle = ref(false)
const title = ref('')
const error = ref<string|null>(null);
const isSubmitting = ref(false)

const rules = computed(() => ({
    title: {
        required: helpers.withMessage('Title is required', required),
    },
}))
const v$ = useVuelidate(rules, { title})

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

</script>