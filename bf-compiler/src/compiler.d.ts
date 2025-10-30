export type ASTreeContent = string[] | string
export type ASTree = ASTreeContent[]

export interface ICompiler {
    code?: string
    program: ASTree
    input: string[]
    output: string[]
    memory: number[]
    memoryPointer: number
    compile: () => void
    parse: () => void
    run: () => void
    clean: () => void
}