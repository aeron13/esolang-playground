import Compiler from './bf-compiler.js'

class Test {

    program: string
    description: string
    compiler: Compiler
    input: string|null
    output: string|null
    expectedResult: string
    passed: boolean

    constructor(program: string, description: string, expected: string|null, input: string|null = null) {
        this.program = program
        this.description = description
        this.input = input
        this.expectedResult = expected

        console.log(this.description)
        this.compiler = new Compiler(this.program)
        this.compiler.setInput(this.input)
    }

    private outputResults() {
      console.log(`Expected: ${this.expectedResult} \nResult: ${this.output}`)
      if (this.passed) {
          console.log('\x1b[32m%s\x1b[0m', 'Test passed\n')
      } else {
          console.log('\x1b[31m%s\x1b[0m', 'Test failed\n')
      }
    }

    public runStepByStep() {
      this.compiler.checkCode()
      let pointer = 0;
      while (pointer < this.program.length) {
        const { next } = this.compiler.runNextChar()
        pointer = next
      }
      this.output = this.compiler.output?.join('')
      this.passed = this.expectedResult === this.output
      this.outputResults()
    }

    public run() {
        this.compiler.compile()
        this.output = this.compiler.output?.join('')
        this.passed = this.expectedResult === this.output
        this.outputResults()
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
new Test(exampleProgram2, '3) It: outputs correctly when running step by step', '<', '15').runStepByStep()
