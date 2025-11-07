<template>
    <div class="px-5 h-full py-4">
        <UiTabs 
            :tabs="[{ title: 'Login'},{title: 'Register'}]"
            :value="activeTab"
            @update:model-value="handleTabClick"
        >
            <template #tab1>
                <div class="px-6 py-6">
                    <div class="h-[65px] flex items-center">
                        <h1 class="block font-mono text-lg max-w-[200px]">Login</h1>
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
                        <UiButtonBig class="mt-4" type="submit" text="Login" :disabled="isSubmitting" />
                        <div v-if="successMessage" class="text-green-400 text-sm">{{ successMessage }}</div>
                    </form>
                </div>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator, helpers } from '@vuelidate/validators'

const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false)
const successMessage = ref('')
const activeTab = ref(0)

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Enter a valid email address', emailValidator)
    },
    password: {
        required: helpers.withMessage('Password is required', required)
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
    useUserStore().login(email.value, password.value).then((message) => {
        successMessage.value = message
        navigateTo('/')
    }).catch((error) => {
        error.value = error as string
    }).finally(() => {
        isSubmitting.value = false
    })
}

const handleTabClick = (tab: number) => {
    if (tab === 1) 
        navigateTo('/register')
}

definePageMeta({
    notWhenAuthenticated: true
})
</script>

