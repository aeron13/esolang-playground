<template>
    <div ref="codeEditorRef" class="relative bg-dark-900 w-full flex-grow rounded-sm max-h-[52vh] overflow-scroll">
        <textarea
            autofocus="true"
            inputmode="none"
            ref="textareaRef"
            class="p-2 absolute w-full h-full bg-transparent font-semibold text-base font-sans tracking-wider focus:outline-none focus-visible:outline-none overflow-hidden" 
            v-model="code" 
            @blur="handleBlur"
            @input.prevent="handleInput" 
        ></textarea>
        <code ref="codeRef" class="p-2 z-1 relative pointer-events-none w-full font-semibold h-fit text-base inline-block font-sans tracking-wider">
            <span v-html="codeHtml?.join('')"></span>
        </code>
    </div>
</template>
<script setup lang="ts">

const $emit = defineEmits(['input','blur'])

const code = defineModel<string>('code')
const codeHtml = defineModel<string[]>('codeHtml')
const selectionStart = defineModel<number>('selectionStart')
const selectionEnd = defineModel<number>('selectionEnd')

const codeElement = useTemplateRef('codeRef')
const codeEditorElement = useTemplateRef('codeEditorRef')
const textarea = useTemplateRef('textareaRef')
const selectionListener = ref()

const handleInput = () => {
    $emit('input')
    nextTick(() => {
        updateCodeEditorHeight()
    })
}

const handleBlur = () => {
    selectionStart.value = textarea.value!.selectionStart
    selectionEnd.value = textarea.value!.selectionEnd
}

const updateCodeEditorHeight = () => {
    if (!textarea.value || !codeEditorElement.value || !codeElement.value)
        return;
    const height = codeElement.value.offsetHeight
    const containerHeight = codeEditorElement.value.offsetHeight-2
    textarea.value.style.height = `${Math.max(containerHeight, height)}px`
}

watch(selectionStart, (val) => {
    if (textarea.value && val)
        textarea.value.selectionStart = val
})

watch(selectionEnd, (val) => {
    if (textarea.value && val)
        textarea.value.selectionEnd = val
})

watch(code, () => {
    textarea.value!.focus()
})

onMounted(() => {
    selectionListener.value = document.addEventListener('selectionchange', () => {
        selectionStart.value = textarea.value?.selectionStart ?? 0
        selectionEnd.value = textarea.value?.selectionEnd ?? 0
    })
    updateCodeEditorHeight()
})

onBeforeUnmount(() => {
    document.removeEventListener('selectionchange', selectionListener.value)
})


</script>