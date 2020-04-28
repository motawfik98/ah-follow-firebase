<template>
    <div>
        <fieldset class="border p-2" v-if="userProfile.classification === 1 && !review">
            <legend>المتابعين</legend>
            <multiselect v-model="task.followingUsers" :options="followingUsers" :multiple="true"
                         :disabled="userProfile.classification !== 1" :close-on-select="false" :clear-on-select="false"
                         :preserve-search="true" selectLabel="اضغط للاختيار" selectedLabel="مختار"
                         deselectLabel="اضغط لحذف الاختيار" noOptions="لا يوجد متابعين" placeholder="المتابعين"
                         label="username" track-by="username">
            </multiselect>
        </fieldset>
        <fieldset class="border p-2" v-else-if="userProfile.classification === 3">
            <legend>المتابعين</legend>
            <ul class="list-group" v-for="workingOnUser in currentWorkingOnUser" :key="workingOnUser.uid">
                <li class="list-group-item">
                    {{workingOnUser.followerName}}
                </li>
            </ul>
        </fieldset>
        <fieldset class="border p-2" v-else>
            <legend>المتابعين</legend>
            <ul class="list-group">
                <li class="list-group-item" v-for="user in (task.followingUsers)" :key="user.uid">
                    {{user.username}}
                </li>
            </ul>
        </fieldset>

        <fieldset class="border p-2" v-if="userProfile.classification === 2 && !review">
            <legend>القائم به</legend>
            <multiselect v-model="task.workingOnUsers" :options="workingOnUsers" :multiple="true"
                         :disabled="userProfile.classification !== 2" :close-on-select="false" :clear-on-select="false"
                         :preserve-search="true" selectLabel="اضغط للاختيار" selectedLabel="مختار"
                         deselectLabel="اضغط لحذف الاختيار" noOptions="لا يوجد قائممين به" placeholder="القائمين به"
                         label="username" track-by="username">
            </multiselect>
        </fieldset>

        <fieldset class="border p-2">
            <legend>اسم القائم به وموقفه</legend>
            <div class="form-row" v-for="(user, index) in task.workingOnUsers" :key="user.uid">
                <div v-if="userProfile.classification !== 3 ||
                (userProfile.classification === 3 && currentUser.uid === user.uid)" class="form-row w-100 border m-3">
                    <div class="col-12 col-md-4 form-group">
                        {{user.username}}
                    </div>
                    <div class="col-12 col-md form-group">
                        <input type="text" :name="'action_' + index" class="form-control repeat_form"
                               v-if="userProfile.classification === 2 && !review" @change="checkEmptyAction(user)"
                               :id="'action_' + index" placeholder="الموقف" v-model.trim="user.response">
                        <div v-else>{{user.response}}</div>
                    </div>
                    <div class="form-check pl-3 form-group">
                        <label :for="'final_response_' + index">موقف نهائي</label>
                        <input type="checkbox" class="form-check-input repeat_form" v-model="user.isFinalResponse"
                               :disabled="user.response === undefined || user.response === '' || userProfile.classification !== 2 || review"
                               :id="'final_response_' + index">
                    </div>
                    <div class="col-12 form-group">
                        تمت الاضافه بواسطه {{user.followerName}}
                    </div>

                    <div class="col-12" v-if="userProfile.classification !== 1">
                        <div v-if="userProfile.classification === 3 && !review">
                            <label :for="'workingOnNotes_' + index">ملاحظات القائم به</label>
                            <textarea name="workingOnUserNotes" :id="'workingOnNotes_' + index"
                                      v-model.trim="user.notes"
                                      style="width:100%" rows="2"></textarea>
                        </div>
                        <div v-else>
                            <fieldset class="border mt-0 mb-2 mb-2">
                                <legend>الملاحظات</legend>
                                <div>{{user.notes}}</div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>

        <div class="btn-group" role="group" aria-label="Basic example" v-if="!review">
            <button class="btn btn-secondary" @click="goToPreviousPage">السابق</button>
            <button class="btn btn-primary" @click="goToNextPage">التالي</button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "StepTwo",
        props: ['review'],
        computed: {
            ...mapState(['currentUser', 'userProfile', 'task', 'followingUsers', 'workingOnUsers']),
            currentWorkingOnUser() {
                return this.task.workingOnUsers.filter(user => {
                    return user.uid === this.currentUser.uid
                })
            }
        },
        methods: {
            goToNextPage() {
                this.$emit('update', 3)
            },
            goToPreviousPage() {
                this.$emit('update', 1)
            },
            checkEmptyAction(user) {
                if (user.finalAction === undefined || user.finalAction === '') {
                    user.isFinalResponse = false
                }
            }
        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>