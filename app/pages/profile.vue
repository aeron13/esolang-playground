<template>
    <div class="px-5 h-full py-4">
        <UiTabs 
            :tabs="[{ title: 'Profile'}]"
            :value="0"
        >
            <template #tab1>
                <div class="px-6 py-6">
                    <div class="h-[65px] flex items-center">
                        <h1 class="block font-mono text-lg max-w-[200px]">Profile</h1>
                    </div>
                    <div>
                        <p class="text-green-300 text-sm">Email</p>
                        <p>{{ user.email }}</p>
                    </div>
                    <UiButtonSmall class="mt-5" text="Logout" @click="logout" />
                </div>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">

const user = useUserStore()
const ui = useUiStore()

const logout = () => {
    user.logout()
    ui.setToast('Logged out successfully')
    navigateTo('/')
}

definePageMeta({
    requiresAuth: true
})
</script>

