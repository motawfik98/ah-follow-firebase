<template>
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 1" @click="previous">«</button>

        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 1" @click="goToFirstStep">
            1
        </button>

        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 2" @click="goToSecondStep">
            2
        </button>

        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 3" @click="goToThirdStep">
            3
        </button>

        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 4" @click="goToFourthStep">
            4
        </button>

        <button type="button" class="btn btn-circle btn-md" :disabled="currentStep === 4" @click="next">»</button>
    </div>
</template>

<script>

    export default {
        name: "StepNavigator",
        props: ['currentStep'],
        methods: {
            goToFirstStep() {
                this.$emit('update', 1)
            },
            goToSecondStep() {
                if (!this.checkForEmptyTitle())
                    this.$emit('update', 2)
            },
            goToThirdStep() {
                if (!this.checkForEmptyTitle())
                    this.$emit('update', 3)
            },
            goToFourthStep() {
                if (!this.checkForEmptyTitle())
                    this.$emit('update', 4)
            },
            next() {
                if (!this.checkForEmptyTitle())
                    this.$emit('update', this.currentStep + 1)
            },
            previous() {
                this.$emit('update', this.currentStep - 1)
            },
            checkForEmptyTitle() {
                let title = this.$store.state.task.title;
                if (this.currentStep === 1 && (title === undefined || title === '')) {
                    this.$store.commit('setFlash', {
                        "status": "failure",
                        "message": "يجب تحديد العنوان اولا"
                    })
                    return true
                }
                return false
            }
        }
    }
</script>