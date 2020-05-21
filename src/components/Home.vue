<template>
    <div class="container">
        <div class="row m-2">
            <button class="btn btn-primary btn-block mb-2" @click="viewNewPage"
                    v-if="userProfile.classification === 1">تكليف جديد
            </button>
            <Search class="w-100" @update="updateSearchValues"></Search>
        </div>

        <div v-infinite-scroll="getMoreTasks" infinite-scroll-disabled="disableScrolling"
             infinite-scroll-throttle-delay="250">
            <div class="row align-items-start">
                <div class="col-xs-12 col-sm-6 col-lg-4" v-for="task in tasks" :key="task.id">
                    <div class="mdc-card mb-5">
                        <div class="mdc-card__primary-action primary-content" tabindex="0">
                            <div class="card-title card-text">
                                <h2 class="mdc-typography mdc-typography--headline6">{{task.title}}</h2>
                            </div>
                            <div class="card-text card-body mdc-typography mdc-typography--body2">{{task.description}}
                            </div>
                        </div>
                        <div class="mdc-card__actions">
                            <div class="mdc-card__action-buttons">
                                <button class="mdc-button mdc-card__action mdc-card__action--button"><span
                                        class="mdc-button__ripple" @click="editTask(task.id)"></span> تعديل
                                </button>
                                <button class="mdc-button mdc-card__action mdc-card__action--button"><span
                                        class="mdc-button__ripple"></span> Bookmark
                                </button>
                            </div>
                            <div class="mdc-card__action-icons">
                                <button class="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded"
                                        aria-pressed="false" aria-label="Add to favorites" title="Add to favorites">
                                    <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
                                    <i class="material-icons mdc-icon-button__icon">favorite_border</i>
                                </button>
                                <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                                        title="Share" data-mdc-ripple-is-unbounded="true">share
                                </button>
                                <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                                        title="More options" data-mdc-ripple-is-unbounded="true">more_vert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center" v-if="loading">
            <strong>جاري التحميل</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>

        <div class="d-flex justify-content-center" v-if="noMoreTasks">
            <h4>لا يوجد المزيد. قم بتغيير خاصيه البحث</h4>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getTasks} from "@/getTasks";
    import Search from "@/components/Search";

    export default {
        name: "Home",
        data() {
            return {
                disableScrolling: false,
                loading: false,
                noMoreTasks: false,
                searchingValues: {
                    title: '',
                    workingOnUser: null,
                    startDate: '',
                    endDate: '',
                }
            }
        },
        components: {
            'Search': Search
        },
        methods: {
            viewNewPage() {
                this.$router.push('/tasks/task/new/')
            },
            editTask(taskID) {
                this.$router.push(`/tasks/task/${taskID}`)
            },
            updateSearchValues(newValues) {
                this.searchingValues = newValues
                this.$store.commit('setTasks', [])
                this.$store.commit('setLastViewedDoc', null)
                this.disableScrolling = false
                this.getMoreTasks()
            },
            getMoreTasks() {
                this.loading = true
                this.disableScrolling = true
                getTasks(this.userProfile.classification, this.currentUser.uid, this.lastViewedDoc, this.searchingValues).then(values => {
                    let lastDocument = values.lastDocument
                    let newTasks = values.tasks
                    this.$store.commit('appendToTasks', newTasks)
                    this.$store.commit('setLastViewedDoc', lastDocument)
                    if (lastDocument === null || lastDocument === undefined) {
                        this.disableScrolling = true
                        this.noMoreTasks = true
                    }
                    this.loading = false
                    if (!this.noMoreTasks)
                        this.disableScrolling = false
                })
            }
        },
        computed: {
            ...mapState(['userProfile', 'tasks', 'lastViewedDoc', 'currentUser'])
        },
        created() {
            this.$store.dispatch('fetchFollowersUsers')
            this.$store.dispatch('fetchWorkingOnUsers')
            this.$store.commit('setTasks', [])
            this.$store.commit('setLastViewedDoc', null)
        },
    }
</script>

<style scoped>

</style>