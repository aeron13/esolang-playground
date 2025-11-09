import { doc, getDoc } from "firebase/firestore";
import { useBfStore } from "~/stores/bfStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!to.query.code) {
        return;
    }
    const {db} = useFirestore()

    const docRef = doc(db, "programs", to.query.code as string);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const store = useBfStore()
        store.programId = docSnap.id
        store.code = docSnap.data().code
        store.title = docSnap.data().title
        store.parseCode()
    }

})