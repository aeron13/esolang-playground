<template>
    <div class="flex gap-3">
        <label v-if="label" :for="id">{{ props.label }}</label>
        <input :name="props.name" type="range" :min="props.min" :max="props.max"  :id="id" class="w-full" v-model="value" :disabled="disabled" :required="required" />
        <div v-if="showError" class="text-orange-code text-sm">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    name: {type: String, required: true},
    label: {type: String, required: false},
    id: {type: String, required: false},
    disabled: {type: Boolean, default: false},
    required: {type: Boolean, default: false},
    showError: {type: Boolean, default: false},
    errorMessage: {type: String, required: false},
    min: {type: Number, default: 0},
    max: {type: Number, default: 10}
})

const id = computed(() => {
    return props.id ?? props.name
})

const value = defineModel()
</script>

<style>
/*********** Baseline, reset styles ***********/
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  background-color: #e8e8e8;
  border-radius: 0rem;
  height: 0.25rem;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -6px; /* Centers thumb on the track */
  background-color: #938dfc;
  border-radius: 0.25rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: 3px solid #938dfc;
  outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: #e8e8e8;
  border-radius: 0.5rem;
  height: 0.25rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  background-color: #938dfc;
  border: none; /*Removes extra border that FF applies*/
  border-radius: 1rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-moz-range-thumb{
  outline: 3px solid #938dfc;
  outline-offset: 0.125rem;
}
</style>