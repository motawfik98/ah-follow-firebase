<template>

    <div>
        <nav class="navbar navbar-expand-md bg-dark navbar-dark justify-content-end mb-3">
            <div class="ml-auto mr-1 text-white">{{userProfile.name}} ({{userProfile.stringClassification}})</div>
            <div class="navbar">
                <a class="list-icon-item active" href="/"><i class="fa fa-fw fa-home"></i>الرئيسيه</a>
                <a class="list-icon-item" href="/"><i class="fa fa-fw fa-envelope"></i>البريد الالكتروني</a>
                <a class="list-icon-item" href="/"><i class="fa fa-fw fa-lock"></i>كلمه السر</a>

                <a class="list-icon-item" href="/"
                ><i class="fa fa-fw fa-bell-o">
                </i>الاشعارات <span class="badge badge-danger">0</span></a>

                <a class="list-icon-item" @click="logout"><i class="fa fa-fw fa-sign-out"></i>تسجيل خروج</a>
            </div>
        </nav>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    const firebaseConfig = require('../firebaseConfig.js');

    export default {
        name: "Navigation",
        methods: {
            logout() {
                firebaseConfig.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(() => {
                    this.$store.commit('setFlash', {
                        "status": "failure",
                        "message": "حدث خطأز برجاء المحاوله مره اخرى"
                    })
                })
            }
        },
        computed: {
            ...mapState(['userProfile'])
        },
    }
</script>