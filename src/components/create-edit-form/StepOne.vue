<template>
    <div>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(goToNextPage)">
                <div class="form-group">
                    <div v-if="task.isNew && !review">
                        <label for="editable_title">العنوان(*)</label>
                        <ValidationProvider name="العنوان" rules="required" v-slot="{ errors }"
                                            v-if="task.uid === currentUser.uid">
                            <input v-model.trim="task.title" type="text" id="editable_title" class="form-control"
                                   placeholder="عنوان مختصر">
                            <span class="text-danger">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>
                    <div v-else>
                        <fieldset class="border">
                            <legend>العنوان</legend>
                            <div>{{task.title}}</div>
                        </fieldset>
                    </div>
                </div>
                <div class="form-group">
                    <div v-if="task.uid === currentUser.uid && !review">
                        <label for="editable_description">التكليف</label>
                        <textarea name="description" rows="5" class="form-control" v-model.trim="task.description"
                                  id="editable_description"></textarea>
                    </div>
                    <div v-else>
                        <fieldset class="border">
                            <legend>التكليف</legend>
                            <div>{{task.description}}</div>
                        </fieldset>
                    </div>

                </div>


                <div class="form-group" v-if="userProfile.classification !== 3">
                    <div v-if="userProfile.classification === 2 && !review">
                        <label for="editable_final_action">الاجراء النهائي</label>
                        <textarea name="editable_final_action" rows="5" class="form-control" id="editable_final_action"
                                  v-model.trim="task.finalAction"></textarea>
                    </div>
                    <div v-else>
                        <fieldset class="border">
                            <legend>الاجراء النهائي</legend>
                            <div>{{task.finalAction}}</div>
                        </fieldset>
                    </div>

                </div>
                <div class="btn-group" role="group" aria-label="Basic example" v-if="!review">
                    <button class="btn btn-secondary" disabled>السابق</button>
                    <button type="submit" class="btn btn-primary">التالي</button>
                </div>

            </form>
        </ValidationObserver>

    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "StepOne",
        props: ['review'],
        computed: {
            ...mapState(['currentUser', 'userProfile', 'task'])
        },
        methods: {
            goToNextPage() {
                this.$emit('update', 2)
            }
        },
    }
</script>

<style scoped>

</style>