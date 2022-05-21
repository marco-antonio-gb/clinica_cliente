<template>
<div class="d-flex align-center ">
    <v-btn  depressed fab small @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="d-flex flex-column ml-3">
        <h3 class=" go-back-style">{{titleCase(title)}}</h3>
        <span class="grey--text overline go-back-style">{{$route.meta.title}} </span>
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
