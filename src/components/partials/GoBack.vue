<template>
<div class="d-flex align-center ">
    <v-btn text fab small @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="d-flex flex-column ml-3">
        <p class="mb-0 go-back-style font-weight-medium">{{$route.meta.title}} </p>
        <span class="grey--text body-2 go-back-style">{{titleCase(title)}}</span>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            default: ""
        }
    },
    name: 'goback',
}
</script>

<style scoped>
.go-back-style {
    line-height: 1.2 !important;
}
</style>
