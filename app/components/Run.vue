<template>
    <div class="w-full h-full flex flex-col">
        <div class="bg-dark-900/50 w-full min-h-[180px] flex-grow rounded-sm p-2 overflow-scroll">
            <code ref="code-ref" v-html="store.codeHtml?.join('')" class="font-semibold text-base inline-block font-sans tracking-wider">
            </code>
        </div>
        <div class="px-5 py-4">
            <div class="mt-1">
                <UiInputField class="flex items-baseline gap-3" label="Input" name="input" v-model="store.input"></UiInputField>
            </div>
            <div v-if="error" class="text-orange-code mt-2">
                {{ error }}
            </div>
            <div class="mt-5">
                <UiRangeInputField name="speed" label="Speed"v-model="speed" />
            </div>
            <div class="mt-6 flex gap-3">
                <UiButtonBig text="Run >" @click="handleRun" :disabled="running || paused" />
                <UiButtonBig :text="paused ? 'Continue' : 'Pause'" @click="paused ? handleContinue() : handlePause()" :disabled="!running && !paused" />
                <UiButtonBig text="Stop" :disabled="!running || paused" />
            </div>
            <div class="mt-8 w-fit grid grid-cols-9 md:flex items-center justify-center gap-[1px] mb-4">
                <div v-for="(cell, i) in memory" :key="i" :class="i === memoryPointer && 'bg-purple-300/25'" class="bg-dark-700 border border-purple-300/50 rounded-[3px] w-[32px] h-[25px] text-center text-sm py-[4px] leading-[1]">
                    {{ cell }}
                </div>
            </div>
            <div class="mt-4 flex items-baseline gap-3">
                <div id="" class="block bg-dark-900/50 w-full p-2">
                    <p class="min-h-[3rem] block">
                        <span v-if="store.output">{{ store.output }}</span>
                        <span v-else class="opacity-50">Output</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBfStore } from '~/stores/bfStore'
import Compiler from '~~/bf-compiler/src/bf-compiler'
import type { ICompiler } from '~~/bf-compiler/src/compiler'

const store = useBfStore()
const compiler = ref<ICompiler>()
const code = computed(() => {
    return store.code
})
const memory = ref<number[]>()
const pointer = ref<number>(0)
const memoryPointer = ref<number>(0)
const error = ref<string>()
const running = ref<boolean>(false)
const paused = ref<boolean>(false)
const speed = ref('0')

const codeRef = useTemplateRef('code-ref')

onMounted(() => {
    compiler.value = new Compiler(code.value ?? '')
    memory.value = [...compiler.value.memory]
})

watch(code, () => {
    compiler.value = new Compiler(code.value ?? '')
})

const handleRun = () => {
    error.value = ''
    store.output = ''
    pointer.value = 0
    running.value = true
    try {
        compiler.value!.clean()
        compiler.value!.setInput(store.input)
        compiler.value!.checkCode()
    } catch(e) {
        error.value = e as string
    }
    runCode()
}

const handlePause = () => {
    running.value = false
    paused.value = true
}

const handleContinue = () => {
    running.value = true
    paused.value = false
    runCode()
}

const runCode = async () => {
    if (+speed.value === 0) {
        try {
            compiler.value?.compile()
            memory.value = [...compiler.value!.memory]
            memoryPointer.value = compiler.value!.memoryPointer
        } catch(e) {
            error.value = e as string
        }
    } else { 
        try {
            while (store.code!.length > pointer.value && running.value) {
                await runStep()
            }
        } catch(e) {
            error.value = e as string
        }
    }
    running.value = false
    store.output = compiler.value?.output.join('')
}

const runStep = async () => {
    codeRef.value?.querySelector(`.active`)?.classList.remove('active')
    codeRef.value?.querySelector(`#t${pointer.value}`)?.classList.add('active')
    const { next } = compiler.value!.runNextChar()
    memory.value = [...compiler.value!.memory]
    memoryPointer.value = compiler.value!.memoryPointer
    await new Promise(r => {setTimeout(r, 100 * +speed.value)});
    pointer.value = next
}

</script>
<style lang="css">
    span.active {
        background-color: white;
        color: red
    }
</style>