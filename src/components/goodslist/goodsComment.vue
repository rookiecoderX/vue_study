<template>
	<div class="goodscomment-container">
		<comment :id='id'></comment>
	</div>
</template>
<script>
	import comment from '../subcomponent/comment.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id
			}
		},
		methods: {

		},
		components: {
			comment
		}
	}
</script>
<style></style>