<template>
    <div class="px-5 h-full py-4">
        <UiTabs :tabs="[
            { title: 'Code'},
            { title: 'Run' }
            ]">
            <template #tab1>
                <textarea></textarea>
            </template>
            <template #tab2>
                <div>
                    Run
                </div>
            </template>
        </UiTabs>
    </div>
</template>
<script setup lang="ts">
</script>