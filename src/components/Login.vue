<template>
    <div class="row m-auto justify-content-center">
        <aside class="col-sm-6">
            <div class="card">
                <article v-if="showLoginForm" class="card-body">
                    <h4 class="card-title mb-4 mt-1">تسجيل دخول</h4>
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(login)">
                            <div class="form-group">
                                <label for="email">البريد الالكتروني</label>
                                <ValidationProvider name="البريد الالكتروني" rules="required|email" v-slot="{ errors }">
                                    <input v-model.trim="loginForm.email" class="form-control" id="email"
                                           placeholder="you@email.com" type="email">
                                    <span class="text-danger">{{errors[0]}}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <label for="password">كلمه السر</label>
                                <input v-model.trim="loginForm.password" class="form-control" id="password"
                                       placeholder="******" type="password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block">دخول</button>
                                <div class="form-row mt-3">
                                    <div class="col-6">
                                        <a @click="viewSignup" class="btn btn-primary btn-block">مستخدم جديد</a>
                                    </div>
                                    <div class="col-6">
                                        <a class="btn btn-primary btn-block">نسيت\ تغيير كلمه السر</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ValidationObserver>
                </article>
                <article v-if="showSignupForm" class="card-body">
                    <h4 class="card-title mb-4 mt-1">مستخدم جديد</h4>
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(signup)">
                            <div class="form-group">
                                <label for="signUpEmail">البريد الالكتروني</label>
                                <ValidationProvider name="البريد الالكتروني" rules="required|email" v-slot="{ errors }">
                                    <input v-model.trim="signupForm.email" class="form-control" id="signUpEmail"
                                           placeholder="you@email.com" type="email">
                                    <span class="text-danger">{{errors[0]}}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <label for="username">اسم المستخدم</label>
                                <ValidationProvider name="اسم المستخدم" rules="required" v-slot="{ errors }">
                                    <input v-model.trim="signupForm.username" type="text" class="form-control"
                                           id="username" placeholder="اسم المستخدم">
                                    <span class="text-danger">{{errors[0]}}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <label for="signUpPassword">كلمه السر</label>
                                    <ValidationProvider name="كلمه السر"
                                                        rules="required|confirmed:passwordConfirmation|min:6"
                                                        v-slot="{ errors }">
                                        <input v-model.trim="signupForm.password" class="form-control"
                                               id="signUpPassword" placeholder="******" type="password">
                                        <span class="text-danger">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="col">
                                    <label for="confirmPassword">تأكيد كلمه السر</label>
                                    <ValidationProvider name="تأكيد كلمه السر" v-slot="{ errors }"
                                                        vid="passwordConfirmation">
                                        <input v-model.trim="signupForm.confirmPassword" class="form-control"
                                               id="confirmPassword" placeholder="******" type="password">
                                        <span class="text-danger">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="adminPassword">كلمه السر الخاصه بالوزير</label>
                                <ValidationProvider name="كلمه السر الخاصه" rules="required"
                                                    v-slot="{ errors }">
                                    <input v-model.trim="signupForm.adminPassword" type="password"
                                           class="form-control" id="adminPassword"
                                           placeholder="كلمه السر الخاصه بالوزير">
                                    <span class="text-danger">{{errors[0]}}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <label for="classification">التصنيف</label>
                                <select v-model="signupForm.classification" class="form-control"
                                        id="classification">
                                    <option v-bind:value="1">الوزير</option>
                                    <option v-bind:value="2">متابع</option>
                                    <option v-bind:value="3">قائم به</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block">تسجيل</button>
                                <a href="" @click="viewLogin">مسجل بالبرنامج ؟</a>
                            </div>
                        </form>
                    </ValidationObserver>
                </article>
            </div>

        </aside>
    </div>
</template>

<script>
    const firebaseConfig = require('../firebaseConfig.js');

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    username: '',
                    adminPassword: '',
                    classification: 3
                },
                showLoginForm: true,
                showSignupForm: false,
                performingRequest: false
            }
        },
        methods: {
            viewLogin() {
                this.showSignupForm = false
                this.showLoginForm = true
            },
            login() {
                firebaseConfig.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                    if (!user.user.emailVerified) {
                        this.$store.commit('setFlashWithEmailResend', {
                            "status": "failure",
                            "message": "يجب تفعيل البريد الالكتروني",
                            "nonVerifiedUser": user.user
                        })
                        firebaseConfig.auth.signOut()
                    } else {
                        this.$store.commit('setCurrentUser', user.user)
                        this.$store.dispatch('fetchUserProfile').then(() => {
                            this.$router.push("/")
                        })
                    }
                }).catch(error => {
                    let message = error.code + " " + error.message
                    if (error.code === 'auth/email-already-in-use')
                        message = 'هذا البريد الالكتروني مسجل بالبرنامج'
                    if (error.code === 'auth/wrong-password')
                        message = 'بيانات الدخول ليست صحيحه'
                    if (error.code === 'auth/user-not-found')
                        message = 'لم يتم العثور على المستخدم. برجاء التأكد من البريد الالكتروني'
                    this.$store.commit('setFlash', {
                        "status": "failure",
                        "message": message
                    })
                });
            },
            viewSignup() {
                this.showLoginForm = false
                this.showSignupForm = true
            },
            signup() {
                let adminPasswordVerification = firebaseConfig.functions.httpsCallable('checkAdminPassword')
                adminPasswordVerification({adminPassword: this.signupForm.adminPassword}).then(result => {

                    let status = result.data.status
                    if (status === "success") {
                        firebaseConfig.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
                            firebaseConfig.usersCollection.doc(user.user.uid).set({
                                username: this.signupForm.username,
                                classification: this.signupForm.classification
                            }).then(() => {
                                firebaseConfig.auth.signOut()
                                this.viewLogin()
                                user.user.sendEmailVerification().then(() => {
                                    this.$store.commit('setFlash', {
                                        "status": "success",
                                        "message": "تم انشاء الحساب. برجاء تفعيل البريد الالكتروني"
                                    })
                                })
                            })
                        }).catch(error => {
                            let errorCode = error.code
                            let errorMessage = error.message
                            if (errorCode === "auth/weak-password") {
                                errorMessage = "كلمه السر يجب ان تكون على الاقل 6 احرف"
                            } else if (errorCode === 'auth/email-already-in-use') {
                                errorMessage = 'هذا البريد الالكتروني مسجل بالبرنامج'
                            }
                            this.$store.commit('setFlash', {
                                "status": "failure",
                                "message": errorMessage
                            })
                        });
                    } else {
                        this.$store.commit('setFlash', {
                            "status": "failure",
                            "message": "كلمه السر الخاصه بالوزير ليسه صحيحه"
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>