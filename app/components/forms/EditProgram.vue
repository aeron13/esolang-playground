<template>
<form class="flex flex-col gap-4 px-4 mx-auto md:flex-wrap max-w-xl">
    <UiInputField 
        class="flex-grow" 
        label="Title" 
        name="title" 
        v-model="title"
        :show-error="v$.title.$dirty && v$.title.$error" 
        :error-message="v$.title.$errors[0]?.$message as string" 
    ></UiInputField>
    <UiInputField 
        type="checkbox"
        class="flex flex-row-reverse items-baseline justify-end w-[1em] h-[1em] gap-2 my-1"
        label="Public" 
        name="public" 
        v-model="isPublic"
    ></UiInputField>
    <UiButtonSmall class="md:w-fit" text="Save" @click="handleSubmit" :disabled="isSubmitting"></UiButtonSmall>
    <div v-if="error" class="text-orange-code text-sm">{{ error }}</div>
</form>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const store = useBfStore()
const title = ref('')
const isPublic = ref<boolean>()
const error = ref<string|null>(null);
const isSubmitting = ref(false)

const showForm = defineModel()

const rules = computed(() => ({
    title: {
        required: helpers.withMessage('Title is required', required),
    },
}))
const v$ = useVuelidate(rules, { title })

onMounted(() => {
    title.value = store.title ?? ''
    isPublic.value = store.isPublic
})

const handleSubmit = () => {
    v$.value.$touch()
    if (v$.value.$invalid) {
        return
    }
    isSubmitting.value = true
    error.value = ''
    store.title = title.value
    store.isPublic = isPublic.value
    store.update().then(() => {
        showForm.value = false
        console.log(store.isPublic)
    }).catch((e) => {
        error.value = e as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>