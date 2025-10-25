<template>
    <div class="w-full">
        <div class="bg-dark-900 w-full h-[330px] rounded-sm p-2">
            <code class="font-semibold text-base inline-block font-sans tracking-wider">
                <span v-html="codeHtml.join('')"></span>
                <UiCursor :user-typing="userTyping" />
            </code>
        </div>
        <div class="px-5 pt-4">
            <UiKeyboard @click="handleClick"></UiKeyboard>
        </div>
    </div>
</template>
<script setup lang="ts">

    const code = ref<string>('')
    const codeHtml = ref<string[]>([])
    const userTyping = ref<boolean>(false)
    const typingTimeout = ref()

    const handleClick = (char: string) => {

        userTyping.value = true;
        if (typingTimeout.value) clearTimeout(typingTimeout.value)
        typingTimeout.value = setTimeout(() => {
            userTyping.value = false
        }, 500)

        switch (char) {
            case 'del':
                code.value = code.value.slice(0, -1)
                codeHtml.value.pop()
            break;
            case '\n':
                codeHtml.value.push('<br>');
            break;
            case 'SPACE':
                codeHtml.value.push('&nbsp;');
            break;
            case '+':
            case '-':
                code.value += char
                codeHtml.value.push(`<span class="text-orange-code">${char}</span>`)
            break;
            case '.':
            case ',':
                code.value += char
                codeHtml.value.push(`<span class="text-fuchsia-code">${char}</span>`) 
            break;
            case '[':
            case ']':
            case '>':
            case '<':
                code.value += char
                codeHtml.value.push(`<span class="text-blue-code">${char}</span>`)
            break;
            default:
                codeHtml.value.push(`<span class="text-grey-400">${char}</span>`)
            break;
        }
    }

    onBeforeUnmount(() => {
        if (typingTimeout.value) clearTimeout(typingTimeout.value)
    })
</script>