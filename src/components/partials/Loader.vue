<template>
	<v-progress-linear
		:active="onLoading"
		:indeterminate="onLoading"
		absolute
		top
		:color="color"
	>
	</v-progress-linear>
</template>
<script>
export default {
	name: "loader",
	props: {
		onLoading: {
			type: Boolean,
			default: false,
		},
        color:{
            default:'error'
        }
	},
};
</script>
<style>
</style>