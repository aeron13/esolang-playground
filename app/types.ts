export interface IProgram {
    id?: string
    language: string
    title: string
    code: string
    createdAt: string
    updatedAt: string
    userId: string
    deletedAt: string|null
    public: boolean
}

export interface ICreateProgramData {
    userId: string
    language?: string
    title?: string
    code: string
}

export interface IUpdateProgramData {
    id: string
    code: string
    title?: string
    public?: boolean
}

export type ProgramSnapshotCallback = (programs: IProgram[]) => any

export interface ProgramModel {
    // id?: string
    // data?: IProgram
    create: (data:ICreateProgramData) => Promise<string>
    get: (id:string) => Promise<IProgram>
    getAll: (userId:string) => Promise<IProgram[]>
    getOnSnapshot: (userId:string, fn:ProgramSnapshotCallback) => Promise<boolean>
    update: (data:IUpdateProgramData) => Promise<boolean>
    updateTitle: (id:string, title:string) => Promise<boolean>
    // makePublic: (id:string) => Promise<boolean>
    // makePrivate: (id:string) => Promise<boolean>    
    delete: (id:string) => Promise<boolean>
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
    title?: string
    isPublic?: boolean
    code?: string
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