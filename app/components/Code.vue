<template>
    <div class="w-full h-full flex flex-col">
        <div class="relative bg-dark-900 w-full flex-grow rounded-sm">
            <textarea
                autofocus="true"
                inputmode="none"
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
    import { useBfStore } from '~/stores/bfStore'
    import { useUserStore } from '~/stores/userStore'

    const store = useBfStore()
    const showAsciiChart = ref(false)
    const pasteListener = ref()

    const textarea = useTemplateRef('textareaRef')
    const selectionStart = ref(0)
    const selectionEnd = ref(0)
    const saveTimer = ref()
    const lastV = ref(0)

    defineEmits(['goToRun'])

    const handleInput = (e: InputEvent) => {
        selectionStart.value = textarea.value!.selectionStart
        selectionEnd.value = textarea.value!.selectionEnd
        store.parseCode()
        lastV.value++
    }

    const handleBlur = () => {
        selectionStart.value = textarea.value!.selectionStart
        selectionEnd.value = textarea.value!.selectionEnd
    }

    const handlePaste = (e: ClipboardEvent) => {
        const text = e.clipboardData?.getData('text')
        lastV.value++
        if (text) text.split('').forEach((char, i) => store.parseChar(char, i))
    }

    const handleKeyboardClick = (key: string) => {
        
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
        store.parseCode()
        lastV.value++
        
        textarea.value!.focus()
        nextTick(() => {
            textarea.value!.selectionStart = selectionStart.value + 1
            textarea.value!.selectionEnd = selectionEnd.value + 1
        })
    }

    const saveOnInterval = (lastVal:number) => {
        if (lastV.value === lastVal) {
            saveTimer.value = setTimeout(() => {saveOnInterval(lastVal)}, 5000)
            return
        }
        const user = useUserStore()
        if (!store.code || !user.isAuthenticated) {
            saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
            return
        }
        store.save()
        saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
    }
    
    onMounted(() => {
        pasteListener.value = window.addEventListener('paste', handlePaste)
        saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('paste', pasteListener.value)
        clearTimeout(saveTimer.value)
    })

</script>