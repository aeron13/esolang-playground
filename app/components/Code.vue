<template>
    <div class="w-full h-full flex flex-col">
        <UiCodeEditor 
            @input="handleInput" 
            v-model:code="store.code"
            v-model:code-html="store.codeHtml"
            v-model:selection-start="selectionStart"
            v-model:selection-end="selectionEnd"
        />
        <div class="flex justify-between items-center pt-4 px-5 pb-3">
            <UiUnderlineButton @click="showAsciiChart = true">ascii chart</UiUnderlineButton>
            <div>
                <UiButtonBig v-if="user.isAuthenticated" :text="isSaving ? 'Saving' : 'Save'" @click.prevent="handleSave" :disabled="isSaving" />
                <UiButtonBig v-else text="Run >" @click="$emit('goToRun')" />
            </div>
        </div>
        <p v-if="error" class="px-5 text-orange-code text-sm">{{ error }}</p>
        <div class="px-5 pt-3 pb-4">
            <UiKeyboard @click="handleKeyboardClick" class="mx-auto"></UiKeyboard>
        </div>
    </div>
    <AsciiChart v-show="showAsciiChart" @close="showAsciiChart = false"></AsciiChart>
</template>
<script setup lang="ts">
    import { useBfStore } from '~/stores/bfStore'
    import { useUserStore } from '~/stores/userStore'

    const store = useBfStore()
    const user = useUserStore()
    const ui = useUiStore()
    const showAsciiChart = ref(false)

    const selectionStart = ref(0)
    const selectionEnd = ref(0)
    const saveTimer = ref()
    const isSaving = ref(false)
    const error = ref('')
    const lastV = ref(0)

    defineEmits(['goToRun'])

    const updateCode = () => {
        store.parseCode()
        lastV.value++
    }

    const handleInput = () => {
        updateCode()
    }

    const handleKeyboardClick = (key: string) => {
        
        let char = '';
        const start = selectionStart.value
        const end = selectionEnd.value
        switch (key) {
            case 'del':
                const singleDel = start === end;
                if (store.code && end === store.code.length) {
                    store.code = store.code.slice(0, start - (singleDel ? 1 : 0))
                } else if (store.code) {
                    store.code = store.code.slice(0, start - (singleDel ? 1 : 0)) + store.code.slice(end)
                }
            break;
            case 'SPACE':
                char = ' '
            break;
            default:
                char = key
            break;
        }
        if (store.code && key !== 'del') {
            store.code = store.code.slice(0, start) + char + store.code.slice(end)
        } else if (key !== 'del') {
            store.code = char
        }

        updateCode()
        
        nextTick(() => {
            if (key !== 'del') {
                selectionStart.value = start + 1
                selectionEnd.value = end + 1
            }
            else {
                selectionStart.value = end - ((end - start) || 1)
                selectionEnd.value = end - ((end - start) || 1)
            }
        })
    }

    const handleSave = () => {
        isSaving.value = true
        store.saveOrUpdate()
        .then(() => {
            isSaving.value = false
            ui.setToast('Saved')
        })
        .catch(e => {
            error.value = e as string
            isSaving.value = false
        })
    }

    const saveOnInterval = (lastVal:number) => {
        console.log('save')
        if (lastV.value === lastVal) {
            saveTimer.value = setTimeout(() => {saveOnInterval(lastVal)}, 5000)
            return
        }
        const user = useUserStore()
        if (!store.code || !user.isAuthenticated) {
            saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
            return
        }
        store.saveOrUpdate()
        saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
    }
    
    onMounted(() => {
        // saveTimer.value = setTimeout(() => {saveOnInterval(lastV.value)}, 5000)
    })

    onBeforeUnmount(() => {
        // clearTimeout(saveTimer.value)
    })

</script>