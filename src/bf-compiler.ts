const exampleProgram = `+++++ +++++
[> +++++ +
 > +++++ ++
 > +++++ +
 > +++++ ++
 <<<< -]
> +++++ ++ .
> +++ .
> +++++ .
> +++++ ++++ .
`

type CompiledProgram = string[] | string

// 1. parse tokens, remove chars that are useless, put tokens into an array
// - code within a loop must be saved in a nested array, so that they are executed 

class Compiler {

    code: string
    private tokens = ['+', '-', '.', ',', '<', '>' ]
    public program: CompiledProgram[]

    constructor(code: string) {
        this.code = code
        this.parse()
    }

    public parse = () => {
        const stack: CompiledProgram[][] = [[]];
    
        for(let i = 0; i <this.code.length; i++) {

            const char = this.code[i];

            if (this.tokens.includes(char)) {
                stack[stack.length - 1].push(char)
            } else if (char === '[') {
                const newArray: CompiledProgram = []
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
}

// 2. execute the code:
// - the memory is an array of zeroes.
// - there is a memory pointer , which is initialized as 0
// - there is an input array/string
// - there is a output array/string
// - for every token: increase the current pointer

class Runner {
    
    input: string[] = []
    output: string[] = []

    static memorySize = 10
    private memory: number[] = []
    private memoryPointer: number = 0

    program: CompiledProgram[]

    constructor(program: CompiledProgram[], inputString: string | null = null) {
        this.input = inputString?.split('') ?? []
        this.program = program
        
        for (let i = 0; i < Runner.memorySize; i++) {
            this.memory.push(0)
        }
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

    private innerRun = (program: CompiledProgram[]) => {

        program.forEach(token => {

            if (Array.isArray(token)) {
                while(this.currentCell !== 0) {
                    this.innerRun(token)
                }
            }

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
        })
    }
}


const compiler = new Compiler(exampleProgram);
const program = compiler.program
const runner = new Runner(program)
runner.run()
console.log(runner.output)