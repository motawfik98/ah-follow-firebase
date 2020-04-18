<template>
    <div>
        <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <script src="https://cdn.rtlcss.com/bootstrap/v4.2.1/js/bootstrap.min.js"></script>

        <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.standalone.min.css"/>

        <link rel="stylesheet" type="text/css"
              href="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/r-2.2.3/datatables.min.css"/>

        <script type="text/javascript"
                src="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/r-2.2.3/datatables.min.js"></script>

        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css"
              rel="stylesheet">
        <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">



        <navigation v-if="currentUser"></navigation>
        <flash-message v-if="flashStatus"></flash-message>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Navigation from "@/components/Navigation"
    import FlashMessage from "@/components/FlashMessage"

    export default {
        name: "Header",
        components: {
            Navigation,
            'flash-message': FlashMessage
        },
        computed: {
            ...mapState(['currentUser', 'flashStatus', 'flashMessage'])
        }
    }
</script>