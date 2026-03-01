<template>
    <div 
        ref="codeEditorRef" 
        class="relative w-full flex-grow rounded-sm max-h-[52vh] overflow-scroll" 
        :class="editable ? 'bg-dark-900' : 'bg-dark-900/50'"
        @click="textarea?.focus()"
    >
        <textarea
            name="code-editor"
            v-show="editable"
            autofocus="true"
            inputmode="none"
            ref="textareaRef"
            class="p-2 absolute w-full bg-transparent font-semibold text-base font-sans tracking-wider focus:outline-none focus-visible:outline-none overflow-hidden" 
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

const $emit = defineEmits(['input'])

const props = defineProps({
    editable: {
        type: Boolean,
        default: true
    }
})

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
}

const handleBlur = () => {
    selectionStart.value = textarea.value!.selectionStart
    selectionEnd.value = textarea.value!.selectionEnd
}

const updateCodeEditorHeight = () => {
    if (!textarea.value || !codeEditorElement.value || !codeElement.value)
        return;
    const height = codeElement.value.offsetHeight
    const containerHeight = codeEditorElement.value.clientHeight-2
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
    nextTick(() => {
        updateCodeEditorHeight()
    })
})

onMounted(() => {
    selectionListener.value = document.addEventListener('selectionchange', () => {
        selectionStart.value = textarea.value?.selectionStart ?? 0
        selectionEnd.value = textarea.value?.selectionEnd ?? 0
    })
    codeEditorElement.value!.style.height = `${codeEditorElement.value!.clientHeight}px`
    nextTick(() => {
        updateCodeEditorHeight()
    })
})

onBeforeUnmount(() => {
    document.removeEventListener('selectionchange', selectionListener.value)
})


</script>