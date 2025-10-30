<template>
    <div class="w-full h-full">
        <div class="bg-dark-900/50 w-full h-[330px] max-h-[50%] rounded-sm p-2 overflow-scroll">
            <code v-html="store.codeHtml?.join('')" class="font-semibold text-base inline-block font-sans tracking-wider">
            </code>
        </div>
        <div class="px-5 pt-4">
            <div class="flex flex-wrap gap-[1px] mb-4">
                <div v-for="(cell, i) in memory" :key="i" class="bg-dark-700 border border-purple-300/50 rounded-[3px] w-[32px] h-[25px] text-center text-sm py-[4px] leading-[1]">
                    {{ cell }}
                </div>
            </div>
            <div class="flex gap-3">
                <UiButtonBig text="Run >" @click="runCode" />
                <UiButtonBig text="Pause" :priority="2" />
                <UiButtonBig text="Stop" :priority="2" />
            </div>
            <div v-if="error" class="text-orange-code mt-2">
                {{ error }}
            </div>
            <div class="mt-5">
                <label for="" class="block mb-2">Input</label>
                <input type="text" id="" class="block bg-dark-900 w-full p-2" v-model="store.input" />
            </div>
            <div class="mt-5">
                <label class="block mb-2">Output</label>
                <div id="" class="block bg-dark-900 w-full p-2">
                    <p class="min-h-[1em] block">
                        {{ store.output }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBfStore } from '~/store/bfStore'
import Compiler from '~~/bf-compiler/src/bf-compiler'
import type { ICompiler } from '~~/bf-compiler/src/compiler'

const store = useBfStore()
const compiler = ref<ICompiler>()
const code = computed(() => {
    return store.code
})
const memory = computed(() => {
    return compiler.value?.memory
})

const error = ref<string>()


onMounted(() => {
    compiler.value = new Compiler(code.value ?? '')
})

watch(code, () => {
    compiler.value = new Compiler(code.value ?? '')
})

const runCode = () => {
    error.value = ''
    try {
        compiler.value?.compile(store.input)
    } catch(e) {
        error.value = e as string
    }
    nextTick(() => {
        store.output = compiler.value?.output.join('')
    })
}

</script>