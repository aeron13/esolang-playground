<template>
    <div class="px-5 h-full py-4">
        <UiTabs :tabs="[
            { title: 'Code'},
            { title: 'Run' }
            ]">
            <template #tab1>
                <Code></Code>
            </template>
            <template #tab2>
                <Run></Run>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">
</script>