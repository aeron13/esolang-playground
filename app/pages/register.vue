<template>
    <div class="px-5 h-full py-4">
        <UiTabs 
            :tabs="[{ title: 'Register'}]"
        >
            <template #tab1>
                <div class="px-6 py-6">
                    <h1 class="font-mono text-lg max-w-[200px]">Create<br/> an account</h1>
                    <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 mt-6" autocomplete="on" autocorrect="on">
                        <UiInputField type="email" name="email" label="Email" v-model="email" />
                        <UiInputField type="password" name="password" label="Password" v-model="password" />
                        <div v-if="error" class="text-orange-code">{{ error }}</div>
                        <UiButtonBig class="mt-4" type="submit" text="Register" />
                    </form>
                </div>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref('');
const password = ref('');
const error = ref('');

onMounted(() => {
    useFirestore()
})

const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
    })
    .catch((e) => {
        console.log(e.code)
        error.value = e.message.replace('Firebase: ', '');
    });

}
</script>