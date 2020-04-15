<template>
    <div class="row m-auto justify-content-center">
        <aside class="col-sm-6">
            <div class="card">
                <article class="card-body">
                    <h4 class="card-title mb-4 mt-1">تسجيل دخول</h4>
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="email">البريد الالكتروني</label>
                            <input class="form-control" id="email" placeholder="you@email.com" type="email">
                        </div>
                        <div class="form-group">
                            <label for="password">كلمه السر</label>
                            <input class="form-control" id="password" placeholder="******" type="password">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-block">دخول</button>
                            <div class="form-row mt-3">
                                <div class="col-6">
                                    <a class="btn btn-primary btn-block">مستخدم جديد</a>
                                </div>
                                <div class="col-6">
                                    <a class="btn btn-primary btn-block">نسيت\ تغيير كلمه السر</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
            </div>

        </aside>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>