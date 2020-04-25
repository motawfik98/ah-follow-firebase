import * as firebaseConfig from '@/firebaseConfig'

export async function getTasks(classification, currentUserUID, lastVisible) {
    if (classification === 1) {
        let tasks = []
        let document = []
        let fetchQuery = firebaseConfig.tasksCollection.where("uid", "==", currentUserUID)
            .orderBy("updatedAt", "desc").limit(12);
        if (!(lastVisible === null || lastVisible === undefined)) {
            fetchQuery = fetchQuery.startAfter(lastVisible)
        }
        await fetchQuery.get().then(docs => {
            document = docs.docs[docs.docs.length - 1]
            docs.forEach(doc => {
                let task = doc.data()
                task.id = doc.id
                tasks.push(task)
            })
        })
        return {
            lastDocument: document,
            tasks: tasks
        }
    }
}