<template>
    <div class="px-5 h-full py-4">
        <UiTabs 
            :tabs="[{ title: 'Login'},{title: 'Register'}]"
            :model-value="activeTab"
            @update:model-value="handleTabClick"
        >
            <template #tab2>
                <div class="px-6 py-6">
                    <div class="h-[65px] flex items-center">
                        <h1 class="font-mono text-lg max-w-[200px]">Create<br/> an account</h1>
                    </div>
                    <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 mt-6" autocomplete="on" autocorrect="on">
                        <UiInputField 
                            type="email" 
                            name="email" 
                            label="Email" 
                            v-model="email" 
                            :disabled="isSubmitting"
                            :show-error="v$.email.$dirty && v$.email.$error" 
                            :error-message="v$.email.$errors[0]?.$message as string" 
                        />
                        <UiInputField 
                            type="password" 
                            name="password" 
                            label="Password" 
                            v-model="password"
                            :disabled="isSubmitting"
                            :show-error="v$.password.$dirty && v$.password.$error" 
                            :error-message="v$.password.$errors[0]?.$message as string" 
                        />
                        <div v-if="error" class="text-orange-code">{{ error }}</div>
                        <UiButtonBig class="mt-4" type="submit" text="Register" :disabled="isSubmitting" />
                        <div v-if="successMessage" class="text-green-400 text-sm">{{ successMessage }}</div>
                    </form>
                </div>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator, minLength, helpers } from '@vuelidate/validators'
import { useUserStore } from '~/stores/userStore'

const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false)
const successMessage = ref('')
const activeTab = ref(1)

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Enter a valid email address', emailValidator)
    },
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(6)),
        hasUppercase: helpers.withMessage('Password must include an uppercase letter', (val: string) => /[A-Z]/.test(val ?? '')),
        hasLowercase: helpers.withMessage('Password must include a lowercase letter', (val: string) => /[a-z]/.test(val ?? '')),
        hasNumber: helpers.withMessage('Password must include a number', (val: string) => /\d/.test(val ?? ''))
    }
}))

const v$ = useVuelidate(rules, { email, password })

const handleSubmit = () => {
    v$.value.$touch()
    if (v$.value.$invalid) {
        return
    }
    isSubmitting.value = true
    error.value = ''

    useUserStore().register(email.value, password.value).then((message) => {
        successMessage.value = message
        navigateTo('/')
    }).catch((error) => {
        error.value = error as string
    }).finally(() => {
        isSubmitting.value = false
    })

}

const handleTabClick = (tab: number) => {
    if (tab === 0) 
        navigateTo('/login')
}

definePageMeta({
    notWhenAuthenticated: true
})
</script>