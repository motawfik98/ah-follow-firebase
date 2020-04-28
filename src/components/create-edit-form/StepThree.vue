<template>
    <div>
        <div class="row justify-content-center align-items-center">
            <b-form-file v-model="task.newFiles" :state="Boolean(task.newFiles)" placeholder="اختر الملف..." multiple
                         v-if="!review"
                         browse-text="" class="text-center m-3" drop-placeholder="أفلت الملف هنا..."></b-form-file>

            <div class="mt-3" v-if="task.newFiles !== undefined && task.newFiles.length > 0">الملفات الجديده</div>
            <ul class="list-group w-100" v-if="task.newFiles !== undefined && task.newFiles.length > 0">
                <li class="list-group-item" v-for="(file, index) in task.newFiles" :key="file">
                    {{file.name}}
                    <span class="float-left" v-if="!review">
                        <span class="badge badge-danger badge-pill btn" @click="removeNewFile(index)">مسح</span>
                    </span>
                </li>
            </ul>
        </div>

        <div class="mt-3" v-if="task.files !== undefined && task.files.length > 0">الملفات المحفوظه</div>
        <ul class="list-group w-100" v-if="task.files !== undefined && task.files.length > 0">
            <li class="list-group-item" v-for="file in task.files" :key="file">
                <a :href="file.downloadUrl" target="_blank">{{file.filename}}</a>
                <span> تم الرفع بواسطه {{file.username}} في {{file.createdAt | formatDate }}</span>
            </li>
        </ul>

        <div class="btn-group" role="group" aria-label="Basic example" v-if="!review">
            <button class="btn btn-secondary" @click="goToPreviousPage">السابق</button>
            <button class="btn btn-primary" @click="goToNextPage">التالي</button>
        </div>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import moment from "moment"
    require('moment/locale/ar')

    export default {
        name: "StepThree",
        props: ['review'],
        computed: {
            ...mapState(['currentUser', 'userProfile', 'task'])
        },
        methods: {
            goToNextPage() {
                this.$emit('update', 4)
            },
            goToPreviousPage() {
                this.$emit('update', 2)
            },
            removeNewFile(index) {
                this.task.newFiles.splice(index, 1)
            }
        },
        filters: {
            formatDate(val) {
                if (!val) {return '-'}
                let date = val.toDate()
                return moment(date).format('L')
            }
        }
    }
</script>

<style scoped>

</style>