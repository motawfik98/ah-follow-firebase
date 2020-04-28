<template>
    <div>
        <StepOne :review="true"></StepOne>
        <StepTwo :review="true"></StepTwo>
        <StepThree :review="true"></StepThree>


        <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-secondary" @click="goToPreviousPage">السابق</button>
            <button class="btn btn-primary" @click="createSaveTask">حفظ</button>
        </div>
    </div>
</template>

<script>
    import StepOne from "@/components/create-edit-form/StepOne"
    import StepTwo from "@/components/create-edit-form/StepTwo"
    import StepThree from "@/components/create-edit-form/StepThree"
    import {mapState} from "vuex";

    const firebaseConfig = require('../../firebaseConfig.js')

    export default {
        name: "FourthStep",
        props: ['review'],
        computed: {
            ...mapState(['currentUser', 'userProfile', 'task', 'taskBeforeUpdate'])
        },
        methods: {
            goToPreviousPage() {
                this.$emit('update', 3)
            },
            createSaveTask() {
                let task = this.$store.state.task
                let isNew = task.isNew
                let newFiles = task.newFiles
                task.followingUsersIDs = []
                task.workingOnUsersIDs = []
                if (task.followingUsers !== undefined) task.followingUsers.forEach(user => task.followingUsersIDs.push(user.uid))
                if (task.workingOnUsers !== undefined) task.workingOnUsers.forEach(user => task.workingOnUsersIDs.push(user.uid))
                if (task.files === undefined) task.files = []

                delete task.isNew
                delete task.newFiles
                task.updatedAt = new Date()
                if (isNew) {
                    task.createdAt = task.updatedAt
                    let taskRef = firebaseConfig.tasksCollection.doc()
                    task.id = taskRef.id
                } else {
                    let followingUsersSet = new Set()
                    if (this.taskBeforeUpdate.followingUsers !== undefined) {
                        this.taskBeforeUpdate.followingUsers.forEach(user => {
                            followingUsersSet.add(user.uid)
                        })
                    }
                    if (task.followingUsers !== undefined) {
                        task.followingUsers.forEach(user => {
                            if (!followingUsersSet.has(user.uid)) {
                                //TODO: send notification
                            }
                        })
                    }

                    let workingOnUsersSet = new Set()
                    if (this.taskBeforeUpdate.workingOnUsers !== undefined) {
                        this.taskBeforeUpdate.workingOnUsers.forEach(user => {
                            workingOnUsersSet.add(user.uid)
                        })
                    }
                    if (task.workingOnUsers !== undefined) {
                        for (let i = 0; i < task.workingOnUsers.length; i++){
                            if (!workingOnUsersSet.has(task.workingOnUsers[i].uid)) {
                                task.workingOnUsers[i].followerID = this.currentUser.uid
                                task.workingOnUsers[i].followerName = this.userProfile.username
                                //TODO: send notification
                            }
                        }
                    }
                }

                this.addFiles(task.id, newFiles).then(filesToSave => {
                    task.files = task.files.concat(filesToSave)
                    if (!isNew || (newFiles !== undefined && newFiles.length > 0)) {
                        firebaseConfig.tasksCollection.doc(task.id).set(task).then(() => {
                            this.$router.push("/")
                            this.$store.commit('setFlash', {
                                "status": "success",
                                "message": (isNew) ? "تم انشاء التكليف" : "تم تعديل التكليف"
                            })
                        })
                    }
                })
            },
            async addFiles(taskID, newFiles) {
                let files = []
                if (newFiles !== undefined && newFiles !== null) {
                    for (const file of newFiles) {
                        let filePath = taskID + '/' + this.currentUser.uid + '/' + file.name
                        await firebaseConfig.storage.child(filePath).put(file).then(async fileSnapshot => {
                            await fileSnapshot.ref.getDownloadURL().then(url => {
                                files.push({
                                    uid: this.currentUser.uid,
                                    username: this.userProfile.username,
                                    classification: this.userProfile.classification,
                                    filename: file.name,
                                    downloadUrl: url,
                                    storageUrl: fileSnapshot.metadata.fullPath,
                                    createdAt: new Date(),
                                })
                            })
                        })
                    }
                }
                return files
            },
        },
        components: {
            'StepOne': StepOne,
            'StepTwo': StepTwo,
            'StepThree': StepThree,

        }
    }
</script>

<style scoped>

</style>