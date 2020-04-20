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
    const firebaseConfig = require('../../firebaseConfig.js')

    export default {
        name: "FourthStep",
        props: ['review'],
        methods: {
            goToPreviousPage() {
                this.$emit('update', 3)
            },
            createSaveTask() {
                let task = this.$store.state.task
                let isNew = task.isNew
                delete task.isNew
                task.updatedAt = new Date()
                if (isNew) {
                    task.createdAt = task.updatedAt
                    firebaseConfig.tasksCollection.add(task).then(() => {
                        this.$router.push("/")
                        this.$store.commit('setFlash', {
                            "status": "success",
                            "message": "تم انشاء التكليف"
                        })
                    })
                } else {
                    firebaseConfig.tasksCollection.doc(task.id).set(task).then(() => {
                        this.$router.push("/")
                        this.$store.commit('setFlash', {
                            "status": "success",
                            "message": "تم تعديل التكليف"
                        })
                    })
                }
            }
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