<template>
    <div class="px-5 h-full py-4">
        <div class="max-w-2xl mx-auto">
            <h1 class="font-mono text-lg my-4">About Brainfuck</h1>
            
            <div class="space-y-6 text-grey-100">
                <section class="py-4">
                    <h2 class="text-base font-bold mb-3">Origins</h2>
                    <p class="leading-relaxed text-sm">
                        Brainfuck is an esoteric programming language created in 1993 by Urban Müller. 
                        The language was designed to be extremely minimal, with the goal of implementing 
                        the smallest possible compiler. Despite its intentionally obscure syntax, Brainfuck 
                        is a fully functional programming language that can compute anything that any other 
                        programming language can compute.
                    </p>
                </section>

                <section class="py-4">
                    <h2 class="text-base font-bold mb-3">The Eight Commands</h2>
                    <p class="leading-relaxed mb-4 text-sm">
                        Brainfuck operates on an array of memory cells, each initially set to zero. 
                        There is a pointer, initially pointing to the first memory cell. The language 
                        consists of only eight commands:
                    </p>
                    <ul class="space-y-2 text-sm">
                        <li class="flex gap-2"><span class="font-mono text-lg">></span>Move the pointer to the right (increment the memory pointer)</li>
                        <li class="flex gap-2"><span class="font-mono text-lg"><</span>Move the pointer to the left (decrement the memory pointer)</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">+</span>Increment the byte at the memory pointer</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">-</span>Decrement the byte at the memory pointer</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">.</span>Output the byte at the memory pointer (as an ASCII character)</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">,</span>Accept one byte of input, storing its value in the byte at the damemoryta pointer</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">[</span>If the byte at the memory pointer is zero, jump forward to the matching ]</li>
                        <li class="flex gap-2"><span class="font-mono text-lg">]</span>If the byte at the memory pointer is nonzero, jump back to the matching [</li>
                    </ul>
                </section>

                <section class="py-4">
                    <h2 class="text-base font-bold mb-3">Turing Completeness</h2>
                    <p class="leading-relaxed text-sm">
                        Brainfuck is Turing-complete, meaning it can simulate any Turing machine and thus 
                        compute anything that is computable. This is achieved through its ability to:
                    </p>
                    <ul class="list-disc list-inside space-y-2 mt-3 leading-relaxed">
                        <li>Manipulate an unbounded array of memory cells (the tape)</li>
                        <li>Read and write values to memory cells</li>
                        <li>Move the pointer in both directions</li>
                        <li>Implement conditional branching through the <span class="font-mono text-grey-400">[</span> and <span class="font-mono text-grey-400">]</span> loop constructs</li>
                    </ul>
                    <p class="leading-relaxed mt-4 text-sm">
                        These features allow Brainfuck to implement all the fundamental operations needed 
                        for computation: sequential execution, conditional statements, and loops. Despite 
                        its minimalism, Brainfuck can theoretically solve any computational problem that 
                        any other programming language can solve.
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'About Brainfuck'
})
</script>

