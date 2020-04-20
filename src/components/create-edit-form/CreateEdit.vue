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
        }
    }
</script>

<style scoped>

</style>