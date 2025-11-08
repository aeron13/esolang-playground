export interface IProgram {
    id?: string
    language: string
    title: string|null
    code: string
    createdAt: string
    updatedAt: string
    userId: string
    deletedAt: string|null
    public: boolean
}

export interface IUser {
    id: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface IMenuProgram {
    id: string
    language: string
    title: string
}

export interface IUserStore {
    userId: string | undefined
    programs: IMenuProgram[] | null
    loading: boolean
}

export type ITabs = {
    title: string
}

export interface ICodeStore {
    programId?: string
    code: string|null
    codeHtml: string[]
}

export interface IBfCodeStore extends ICodeStore {
    input?: string|null
    output?: string|null
}

export interface IMenuItem {
    link: string
    text: string
}

export interface IMenuBlock {
    title: string
    items: IMenuItem[]
}