<template>
	<div class="goodsdesc-container">
		<h3>{{ goodsdesc.title }}</h3>
		<hr>
		<div class="content" v-html="goodsdesc.content"></div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				goodsdesc: []
			}
		},
		created(){
			this.getGoodsDesc()
		},
		methods: {
			getGoodsDesc(){
				this.$http.get('api/goods/getdesc/'+this.$route.params.id)
				.then(result => {
					if(result.body.status === 0){
						// console.log(result.body.message);
						this.goodsdesc = result.body.message[0]

					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.goodsdesc-container {
		padding: 5px;
		h3 {
			font-size: 18px;
			color: #226aff;
			width: 300px;
			margin: 15px auto;
		}
		.content {
			img {
				width: 100%;
			}
		}
	}
</style>