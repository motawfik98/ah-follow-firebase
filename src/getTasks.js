import * as firebaseConfig from '@/firebaseConfig'

export async function getTasks(classification, currentUserUID, lastVisible, searchingValues) {
    let tasks = []
    let document = []
    let fetchQuery = firebaseConfig.tasksCollection

    if (classification === 1) {
        fetchQuery = fetchQuery.where("uid", "==", currentUserUID)
    } else if (classification === 2) {
        fetchQuery = fetchQuery.where("followingUsersIDs", "array-contains", currentUserUID)
    } else if (classification === 3) {
        fetchQuery = fetchQuery.where("workingOnUsersIDs", "array-contains", currentUserUID)
    }

    if (searchingValues.workingOnUser !== null) {
        fetchQuery = fetchQuery.where('workingOnUsersIDs', 'array-contains-any', [searchingValues.workingOnUser.uid])
    }
    if (searchingValues.startDate !== '') {
        let date = new Date(searchingValues.startDate)
        fetchQuery = fetchQuery.where('updatedAt', '>=', date)
    }
    if (searchingValues.endDate !== '') {
        let date = new Date(searchingValues.endDate)
        fetchQuery = fetchQuery.where('updatedAt', '<=', date)
    }

    fetchQuery = fetchQuery.orderBy("updatedAt", "desc").limit(12)

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