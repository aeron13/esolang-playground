<template>
    <div class="w-full h-full flex flex-col">
        <div class="bg-dark-900 w-full flex-grow rounded-sm p-2">
            <code class="font-semibold h-full text-base inline-block font-sans tracking-wider">
                <span v-html="store.codeHtml.join('')"></span>
                <UiCursor :user-typing="userTyping" />
            </code>
        </div>
        <div class="flex justify-between items-center pt-4 px-5">
            <button type="button" class="underline text-sm font-semibold" @click="showAsciiChart = true">ascii chart</button>
            <UiButtonBig text="Run >" />
        </div>
        <div class="px-5 pt-6 pb-4">
            <UiKeyboard @click="handleClick" class="mx-auto"></UiKeyboard>
        </div>
    </div>
    <AsciiChart v-show="showAsciiChart" @close="showAsciiChart = false"></AsciiChart>
</template>
<script setup lang="ts">
    import { useBfStore } from '~/store/bfStore'

    const store = useBfStore()
    const userTyping = ref<boolean>(false)
    const typingTimeout = ref()
    const showAsciiChart = ref(false)
    const pasteListener = ref()

    const handlePaste = (e: ClipboardEvent) => {
        const text = e.clipboardData?.getData('text')
        if (text) text.split('').forEach(char => parseChar(char))
    }

    const handleClick = (char: string) => {
        userTyping.value = true;
        if (typingTimeout.value) clearTimeout(typingTimeout.value)
        typingTimeout.value = setTimeout(() => {
            userTyping.value = false
        }, 500)

        parseChar(char)
    }

    const parseChar = (char: string) => {
        switch (char) {
            case 'del':
                store.code = store.code?.slice(0, -1) ?? ''
                store.codeHtml.pop() 
            break;
            case '\n':
                store.codeHtml.push('<br>');
            break;
            case 'SPACE':
                store.codeHtml.push('&nbsp;');
            break;
            case '+':
            case '-':
                store.code += char
                store.codeHtml.push(`<span class="text-orange-code">${char}</span>`)
            break;
            case '.':
            case ',':
                store.code += char
                store.codeHtml.push(`<span class="text-fuchsia-code">${char}</span>`) 
            break;
            case '[':
            case ']':
            case '>':
            case '<':
                store.code += char
                store.codeHtml.push(`<span class="text-blue-code">${char}</span>`)
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
        if (typingTimeout.value) clearTimeout(typingTimeout.value)
    })

</script>