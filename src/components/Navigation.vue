<template>

    <div>
        <nav class="navbar navbar-expand-md bg-dark navbar-dark justify-content-end mb-3">
            <div class="ml-auto mr-1 text-white">الوزير (الوزير)</div>
            <div class="navbar">
                <a class="list-icon-item active" href="/"><i class="fa fa-fw fa-home"></i>الرئيسيه</a>
                <a class="list-icon-item" href="/"><i class="fa fa-fw fa-envelope"></i>البريد الالكتروني</a>
                <a class="list-icon-item" href="/"><i class="fa fa-fw fa-lock"></i>كلمه السر</a>

                <a class="list-icon-item" href="/"
                ><i class="fa fa-fw fa-bell-o">
                </i>الاشعارات <span class="badge badge-danger">0</span></a>

                <a class="list-icon-item" href="/"><i class="fa fa-fw fa-sign-out"></i>تسجيل خروج</a>
            </div>
        </nav>
    </div>

</template>

<script>
    export default {
        name: "Navigation"
    }
</script>