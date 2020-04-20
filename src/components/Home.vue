<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-secondary" @click="viewNewPage"
                    v-if="userProfile.classification !== 3">تكليف جديد
            </button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Home",
        methods: {
            viewNewPage() {
                this.$store.dispatch('fetchFollowersUsers')
                this.$store.dispatch('fetchWorkingOnUsers')
                this.$store.dispatch('createNewTask')
                this.$router.push('/tasks/task/new/')
            }
        },
        computed: {
            ...mapState(['userProfile'])
        },
    }
</script>

<style scoped>

</style>