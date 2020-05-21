<template>
    <div>
        <div class="btn-group d-flex" role="group">
            <button class="btn btn-danger" id="resetSearch" @click="resetSearch">الغاء البحث</button>
            <button class="btn btn-secondary" @click="searching = !searching">بحث</button>
        </div>

        <transition name="fade">
            <div id="searchCollapse" v-show="searching">
                <form id="searchForm" @submit.prevent>
                    <div class="form-row">
                        <div class="form-group col-12 col-md-4">
                            <label for="title">العنوان</label>
                            <input class="form-control" id="title" placeholder="العنوان"
                                   v-model="searchingValues.title"/>
                        </div>
                        <div class="form-group col-12 col-md-4" v-if="userProfile.classification !== 3">
                            <label for="sent_to">القائم به</label>
                            <multiselect v-model="searchingValues.workingOnUser" :options="workingOnUsers"
                                         :clear-on-select="false"
                                         selectLabel="اضغط للاختيار" selectedLabel="مختار"
                                         deselectLabel="اضغط لحذف الاختيار"
                                         noOptions="لا يوجد قائمين به" placeholder="القائم به" label="username"
                                         track-by="username" id="sent_to">
                            </multiselect>
                        </div>
                        <div class="form-group col-6 col-md">
                            <label for="start">من (بعد)</label>
                            <div class="input-group">
                                <flat-pickr class="form-control" id="start"
                                            :config="configs"
                                            v-model="searchingValues.startDate"
                                            @on-change="onStartChange">
                                </flat-pickr>
                                <div class="input-group-append">
                                    <button class="btn btn-danger" type="button" title="Clear" data-clear>
                                        مسح
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-6 col-md">
                            <label for="end">الى (قبل)</label>
                            <div class="input-group">
                                <flat-pickr class="form-control" id="end"
                                            :config="configs"
                                            v-model="searchingValues.endDate"
                                            @on-change="onEndChange">
                                </flat-pickr>
                                <div class="input-group-append">
                                    <button class="btn btn-danger" type="button" title="Clear" data-clear>
                                        مسح
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <button class="btn btn-primary m-auto" @click="sendSearchValues">استرجاع البيانات</button>
                    </div>
                </form>
            </div>
        </transition>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import flatPickr from 'vue-flatpickr-component';
    // import {Arabic as ArabicLocale} from 'flatpickr/dist/l10n/ar.js';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "Search",
        computed: {
            ...mapState(['userProfile', 'workingOnUsers'])
        },
        components: {
            'flatPickr': flatPickr
        },
        data() {
            return {
                configs: {
                    wrap: true,
                    maxDate: 'today',
                    minDate: '',
                    // locale: ArabicLocale
                },
                searching: false,
                searchingValues: {
                    title: '',
                    workingOnUser: null,
                    startDate: '',
                    endDate: '',
                },
            }
        },
        methods: {
            sendSearchValues() {
                this.$emit('update', this.searchingValues)
            },
            onStartChange(selectedDates, dateStr) {
                this.$set(this.configs, 'minDate', dateStr)
            },
            onEndChange(selectedDates, dateStr) {
                this.$set(this.configs, 'maxDate', dateStr)
            },
            resetSearch() {
                this.searchingValues = {
                    title: '',
                    workingOnUser: null,
                    startDate: '',
                    endDate: '',
                }
                this.searching = false
                this.sendSearchValues()
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>