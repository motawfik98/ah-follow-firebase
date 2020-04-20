<template>
    <div>
        <div class="row justify-content-center align-items-center">
            <h1>HERE SHOULD BE THE FILES</h1>
        </div>

        <div class="btn-group" role="group" aria-label="Basic example" v-if="!review">
            <button class="btn btn-secondary" @click="goToPreviousPage">السابق</button>
            <button class="btn btn-primary" @click="goToNextPage">التالي</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "StepThree",
        props: ['review'],
        methods: {
            goToNextPage() {
                this.$emit('update', 4)
            },
            goToPreviousPage() {
                this.$emit('update', 2)
            }
        },
    }
</script>

<style scoped>

</style>