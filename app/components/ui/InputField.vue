<template>
    <div>
        <label :for="id" class="block mb-2">{{ props.label }}</label>
        <input :name="props.name" :type="props.type" :id="id" class="block bg-dark-900 w-full p-2" v-model="value" :disabled="disabled" :required="required" />
        <div v-if="showError" class="text-orange-code text-sm">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {type: String, required: true},
    type: {type: String, default: 'text'},
    label: {type: String, required: true},
    id: {type: String, required: false},
    disabled: {type: Boolean, default: false},
    required: {type: Boolean, default: false},
    showError: {type: Boolean, default: false},
    errorMessage: {type: String, required: false}
})

const id = computed(() => {
    return props.id ?? props.name
})

const value = defineModel()
</script>