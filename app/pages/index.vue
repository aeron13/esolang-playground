<template>
    <div class="px-5 h-full py-4">
        <UiTabs 
            :tabs="[{ title: 'Code'}, { title: 'Run' }]" 
            v-model="activeTab"
        >
            <template #tab1>
                <Code @go-to-run="activeTab = 1"></Code>
            </template>
            <template #tab2>
                <Run></Run>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">

const activeTab = ref(0)

</script>