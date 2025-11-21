import type { IProgram, ProgramModel, ICreateProgramData, IUpdateProgramData } from "~/types";
import { getDoc, addDoc, collection, doc, updateDoc, query, where, onSnapshot } from "firebase/firestore";

export default class Program implements ProgramModel {

    constructor() {}

    create(data: ICreateProgramData): Promise<string> {
        return new Promise((resolve, reject) => {
            const {db} = useFirestore()

            addDoc(collection(db, "programs"), {
                language: 'bf',
                code: data.code ?? '',
                title: data.title,
                userId: data.userId,
                public: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                deletedAt: null
            })
            .then(ref => {
                resolve(ref.id)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }

    get(id:string): Promise<IProgram> {
        return new Promise((resolve, reject) => {

            const {db} = useFirestore()
    
            const docRef = doc(db, "programs", id);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data() as IProgram
                    data.id = docSnap.id
                    resolve(data)
                }
                reject('Not found')
            })
            .catch(e => {
                reject(e)
            })
        })
    }

    getAll(userId:string): Promise<IProgram[]> {
        return new Promise((resolve, reject) => {
            
            if (!userId)
                reject("missing userID")
            
            const { db } = useFirestore()
            const q = query(
                collection(db, "programs"), 
                where("userId", "==", userId), 
                where("deletedAt", "==", null)
            );
            onSnapshot(q, (docs) => {
                let programs: IProgram[] = [];
                docs.forEach(doc => {
                    const data = doc.data() as IProgram
                    programs.push({
                        id: doc.id,
                        ...data
                    })
                })
                resolve(programs)
            })
        })
    }

    getOnSnapshot(userId:string, callback:any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            
            if (!userId)
                reject("missing userID")
            
            const { db } = useFirestore()
            const q = query(
                collection(db, "programs"), 
                where("userId", "==", userId), 
                where("deletedAt", "==", null)
            );
            onSnapshot(q, (docs) => {
                let programs: IProgram[] = [];
                docs.forEach(doc => {
                    const data = doc.data() as IProgram
                    programs.push({
                        id: doc.id,
                        ...data
                    })
                })
                callback(programs)
                resolve(true)
            })
        })
    }

    update(data: IUpdateProgramData): Promise<true> {

        return new Promise((resolve, reject) => {
            const {db} = useFirestore()

            if (!data.id)
                reject('missing ID')

            const docRef = doc(db, "programs", data.id)
            updateDoc(docRef, {
                code: data.code,
                title: data.title,
                public: data.public,
                updatedAt: new Date().toISOString()
            }).then(() => {
                resolve(true)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    updateTitle(id:string,title:string): Promise<true> {
        return new Promise((resolve, reject) => {
            const {db} = useFirestore()
            
            if (!id)
                reject('missing ID')

            const docRef = doc(db, "programs", id)
            updateDoc(docRef, {
                title: title, 
                updatedAt: new Date().toISOString()
            })
            .then(() => {
                resolve(true)
            })
            .catch(e => {
                reject(e)
            })
        })
    }

    delete(id:string): Promise<true> {
        return new Promise((resolve, reject) => {
            const {db} = useFirestore()

            if (!id)
                reject('missing ID')

            const docRef = doc(db, "programs", id!)
            updateDoc(docRef, {deletedAt: new Date().toISOString()})
            .then(() => {
                resolve(true)
            })
            .catch(e => {
                reject(e)
            })
        })
    }


}