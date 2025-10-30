export type ITabs = {
    title: string
}

export interface ICodeStore {
    code: string|null
    codeHtml: string[]
}

export interface IBfCodeStore extends ICodeStore {
    input?: string|null
    output?: string|null
}