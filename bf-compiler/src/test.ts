import Compiler from './bf-compiler.js'

class Test {

    program: string
    description: string
    input: string|null
    output: string|null
    expectedResult: string
    passed: boolean

    constructor(program: string, description: string, expected: string|null, input: string|null = null) {
        this.program = program
        this.description = description
        this.input = input
        this.expectedResult = expected
    } 

    public run() {
        console.log(this.description)
        const compiler = new Compiler(this.program, this.input)
        this.output = compiler.output?.join('')

        console.log(`Expected: ${this.expectedResult} \nResult: ${this.output} \n`)
        this.passed = this.expectedResult === this.output

        if (this.passed) {
            console.log('\x1b[32m%s\x1b[0m', 'Test passed')
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'Test failed')
        }
    }

}

const exampleProgram1 = `+++++ +++++
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
new Test(exampleProgram1, '1) It: compiles code and output correctly', 'CIAO').run()

const exampleProgram2 = `>,
>
>,
>
+
<
[[-<]<[-<]>[>]>]

>>
[
 <[>->+++++ +++++ 
   [>+++++ +<-]>.
    >
  ]
 >[->+++++ +++++ 
   [>+++++ +<-]>+.
    <
  ]
]
<
[++++ +++++ [>+++++ +<-] 
  > ++ . >
]`
new Test(exampleProgram2, '2) It: evaluates input correctly', '<', '15').run()
