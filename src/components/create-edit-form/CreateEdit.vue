<template>
    <div class="container">
        <StepNavigator :current-step="currentStep" @update="updateCurrentStep"></StepNavigator>

        <StepOne v-if="currentStep === 1" :review="false" @update="updateCurrentStep"></StepOne>
        <StepTwo v-if="currentStep === 2" :review="false" @update="updateCurrentStep"></StepTwo>
        <StepThree v-if="currentStep === 3" :review="false" @update="updateCurrentStep"></StepThree>
        <StepFour v-if="currentStep === 4" :review="false" @update="updateCurrentStep"></StepFour>

    </div>
</template>

<script>
    import StepOne from "@/components/create-edit-form/StepOne"
    import StepTwo from "@/components/create-edit-form/StepTwo"
    import StepThree from "@/components/create-edit-form/StepThree"
    import StepFour from "@/components/create-edit-form/StepFour"
    import StepNavigator from "@/components/create-edit-form/StepNavigator"

    const firebaseConfig = require('../../firebaseConfig')

    export default {
        name: "CreateEdit",
        data() {
            return {
                currentStep: 1
            }
        },
        components: {
            'StepNavigator': StepNavigator,
            'StepOne': StepOne,
            'StepTwo': StepTwo,
            'StepThree': StepThree,
            'StepFour': StepFour
        },
        methods: {
            updateCurrentStep (newStep) {
                this.currentStep = newStep
            }
        },
        created() {
            let taskID = this.$route.params.task_id
            if (taskID === 'new') {
                this.$store.dispatch('createNewTask')
            } else {
                firebaseConfig.tasksCollection.doc(taskID).get().then(doc => {
                    if (doc.exists) {
                        let task = doc.data()
                        task.id = doc.id
                        this.$store.commit('setTask', task)
                    } else {
                        this.$store.commit('setFlash', {
                            "status": "failure",
                            "message": "عفوا لم نتمكن من ايجاد الملف المطلوب. برجاء المحاوله مره اخرى"
                        })
                        this.$router.push('/')
                    }
                }).catch(err => {
                    console.log("Error getting document", err)
                })
            }
        }
    }
</script>

<style scoped>

</style>