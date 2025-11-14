import type { ASTree, ASTreeContent, ICompiler } from "./compiler"

export default class Compiler implements ICompiler {

    // 1. parse tokens, remove chars that are useless, put tokens into an array
    // - code within a loop must be saved in a nested array

    code: string
    static tokens = ['+', '-', '.', ',', '<', '>' ]
    public program: ASTree

    // 2. execute the code:
    // - the memory is an array of zeroes.
    // - there is a memory pointer , which is initialized as 0
    // - there is an input array/string
    // - there is a output array/string
    // - for every token: increase the current pointer

    input: string[] = []
    output: string[] = []

    static memorySize = 18
    public memory: number[] = []
    public memoryPointer: number = 0
    public runPointer: number = 0
    public loopPointers: number[] = []

    constructor(code: string) {
        this.code = code
        for (let i = 0; i < Compiler.memorySize; i++) {
            this.memory.push(0)
        }
    }

    public setInput = (inputString: string | null = null) => {
        this.input = inputString?.split('') ?? []
    }
    
    public compile = () => {
        this.clean()
        this.parse()
        this.run()
    }

    public checkCode = (): boolean => {

        const loopPointers: number[] = []

        for(let i = 0; i <this.code.length; i++) {
            const char = this.code[i];
            if (char === '[')
                loopPointers.push(i)
            else if (char === ']') {
                if (loopPointers.length < 1)
                    throw new Error("unmatched closing braket")
                else
                    loopPointers.pop()
            }
        }

        if (loopPointers.length)
            throw new Error("unmatched loop brakets")

        return true
    }

    public runNextChar = () => {
        const char = this.code.charAt(this.runPointer)
        switch (char) {
            case '[':
                if (this.currentCell !== 0) {
                    this.loopPointers.push(this.runPointer) 
                } else {
                    let p = this.runPointer+1;
                    while (this.code.charAt(p) !== ']') p++
                    this.runPointer = p
                }
            break;
            case ']':
                if (this.currentCell !== 0) {
                    this.runPointer = this.loopPointers[this.loopPointers.length-1]
                } else {
                    this.loopPointers.pop()
                }
            break;
            default:
                this.execToken(char)
            break;
        }

        if (this.runPointer !== this.code.length) this.runPointer++
        return {next: this.runPointer }
    }


    public parse = () => {
        const stack: ASTree[] = [[]];
    
        for(let i = 0; i <this.code.length; i++) {

            const char = this.code[i];

            if (Compiler.tokens.includes(char)) {
                stack[stack.length - 1].push(char)
            } else if (char === '[') {
                const newArray: ASTreeContent = []
                stack[stack.length - 1].push(newArray)
                stack.push(newArray)
            } else if (char === ']') {
                if (stack.length === 1) {
                    throw new Error("unmatched closing braket")
                }
                stack.pop()
            }
        }

        if (stack.length > 1) {
            throw new Error("unmatched loop brakets")
        }
        
        this.program = stack[0]
    }

    get currentCell() { 
        return this.memory[this.memoryPointer]
    }

    set currentCell(value: number) {
        this.memory[this.memoryPointer] = value
    }

    public run = () => {
        this.innerRun(this.program)
    }

    private innerRun = (program: ASTree) => {
        program.forEach(token => {
            if (Array.isArray(token)) {
                while(this.currentCell !== 0) {
                    this.innerRun(token)
                }
            } else {
                this.execToken(token)
            }
        })
    }

    private execToken = (token: string) => {
        switch (token) {
            case '+':
                if (this.currentCell === 255) this.currentCell = 0;
                else this.currentCell++
            break;
            case '-':
                if (this.currentCell === 0) this.currentCell = 255;
                else this.currentCell--
            break;
            case '>':
                if (this.memoryPointer === this.memory.length - 1) this.memoryPointer = 0;
                this.memoryPointer++;
            break;
            case '<':
                if (this.memoryPointer === 0) this.memoryPointer = this.memory.length - 1;
                this.memoryPointer--;
            break;
            case ',':
                if (this.input.length === 0) {
                    throw new Error('missing input')
                }
                this.currentCell = this.input[0].charCodeAt(0)
                this.input.shift()
            break;
            case '.':
                const outputChar = String.fromCharCode(this.currentCell)
                this.output.push(outputChar);
            break;
            default:
            break;
        }
    }

    public clean = () => {
        for (let i = 0; i < this.memory.length; i++) {
            this.memory[i] = 0
        }
        while (this.output.length > 0) {
            this.output.pop()
        }
        this.memoryPointer = 0
        this.runPointer = 0
    }

}