<template>
    <div class="alert alert-warning alert-dismissible fade show container flash" v-bind:class="[flashStatus]"
         roleValue="alert">
        <div class="flash">{{flashMessage}}</div>
        <a class="btn" v-if="nonVerifiedUser !== null" @click="sendVerificationEmail">
            اضغط هنا لارسال البريد الالكتروني مره اخرى
        </a>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "FlashMessage",
        methods: {
            sendVerificationEmail() {
                this.nonVerifiedUser.sendEmailVerification().then(() => {
                    this.$store.dispatch('clearFlashMessage')
                    this.$store.commit('setFlash', {
                        "status": "success",
                        "message": "تم ارسال البريد الالكتروني مره اخرى"
                    })
                });
            }
        },
        computed: {
            ...mapState(['flashStatus', 'flashMessage', 'nonVerifiedUser'])
        }
    }
</script>

<style scoped>

</style>