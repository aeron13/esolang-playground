<template>
    <div class="w-full h-full flex flex-col">
        <div class="relative bg-dark-900 w-full flex-grow rounded-sm">
            <textarea 
                ref="textareaRef"
                class="p-2 absolute w-full h-full bg-transparent font-semibold text-base font-sans tracking-wider focus:outline-none focus-visible:outline-none" 
                v-model="store.code" 
                @blur="handleBlur"
                @input.prevent="handleInput"
            ></textarea>
            <code class="p-2 z-1 relative pointer-events-none w-full font-semibold h-full text-base inline-block font-sans tracking-wider">
                <span v-html="store.codeHtml.join('')"></span>
            </code>
        </div>
        <div class="flex justify-between items-center pt-4 px-5">
            <button type="button" class="underline text-sm font-semibold" @click="showAsciiChart = true">ascii chart</button>
            <UiButtonBig text="Run >" @click="$emit('goToRun')" />
        </div>
        <div class="px-5 pt-6 pb-4">
            <UiKeyboard @click="handleKeyboardClick" class="mx-auto"></UiKeyboard>
        </div>
    </div>
    <AsciiChart v-show="showAsciiChart" @close="showAsciiChart = false"></AsciiChart>
</template>
<script setup lang="ts">
    import { useBfStore } from '~/store/bfStore'

    const store = useBfStore()
    const showAsciiChart = ref(false)
    const pasteListener = ref()

    const textarea = useTemplateRef('textareaRef')
    const selectionStart = ref(0)
    const selectionEnd = ref(0)

    defineEmits(['goToRun'])

    const handleInput = (e: InputEvent) => {
        selectionStart.value = textarea.value!.selectionStart
        selectionEnd.value = textarea.value!.selectionEnd
        parseCode()
    }

    const handleBlur = () => {
        selectionStart.value = textarea.value!.selectionStart
        selectionEnd.value = textarea.value!.selectionEnd
    }

    const handlePaste = (e: ClipboardEvent) => {
        const text = e.clipboardData?.getData('text')
        if (text) text.split('').forEach((char, i) => parseChar(char, i))
    }

    const parseCode = () => {
        store.codeHtml = []
        store.code?.split('').forEach((char, i) => {
            parseChar(char, i)
        })
    }

    const handleKeyboardClick = (key: string) => {
        
        textarea.value!.focus()
        nextTick(() => {
            textarea.value!.selectionStart = selectionStart.value + 1
            textarea.value!.selectionEnd = selectionEnd.value + 1
        })

        let char = '';
        const start = selectionStart.value
        const end = selectionEnd.value
        
        switch (key) {
            case 'del':
                if (store.code && start === end && end === store.code.length) {
                    store.code = store.code.slice(0, start - 1)
                } else if (store.code) {
                    store.code = store.code.slice(0, start) + store.code.slice(end)
                }
            break;
            case 'SPACE':
                char = ' '
            break;
            default:
                char = key
            break;
        }
        if (store.code) {
            store.code = store.code.slice(0, start) + char + store.code.slice(end)
        } else if (char !== 'del') {
            store.code = char
        }
        parseCode()
         
    }

    const parseChar = (char: string, index: number) => {
        const charId = `t${index}`
        switch (char) {
            case '\n':
                store.codeHtml.push('<br>');
            break;
            case ' ':
                store.codeHtml.push('&nbsp;');
            break;
            case '+':
            case '-':
                store.codeHtml.push(`<span class="text-orange-code" id="${charId}">${char}</span>`)
            break;
            case '.':
            case ',':
                store.codeHtml.push(`<span class="text-fuchsia-code" id="${charId}">${char}</span>`) 
            break;
            case '[':
            case ']':
            case '>':
            case '<':
                store.codeHtml.push(`<span class="text-blue-code" id="${charId}">${char}</span>`)
            break;
            default:
                store.codeHtml.push(`<span class="text-grey-400">${char}</span>`)
            break;
        }
    }
    
    onMounted(() => {
        pasteListener.value = window.addEventListener('paste', handlePaste)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('paste', pasteListener.value)
    })

</script>