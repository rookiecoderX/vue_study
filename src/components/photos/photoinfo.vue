<template>
	<div class="photoinfo-container">
		<div class="photoinfo-title">
			<h3>{{ photoItem.title }}</h3>
			<p class="photoinfo-subtitle">
				<span>发表时间：{{ photoItem.add_time | dateFormat }}</span>
				<span>点击：{{ photoItem.click }}次</span>
			</p>
			<hr>
		</div>
		<div class="thumb">
			<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
		</div>
		<div class="content" v-html="photoItem.content">
		</div>
		<comment :id="id"></comment>
	</div>
</template>
<script>
	import comment from '../subcomponent/comment.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id,
				photoItem: {},
				list: []
			}
		},
		created(){
			this.getphotoitem()
			this.getThumbs()
		},
		methods: {
			getphotoitem(){
				this.$http.get('api/getimageInfo/'+this.id)
				.then(result => {
					if(result.body.status === 0){
						
						this.photoItem = result.body.message[0]
						// console.log(this.photoItem);
					}
				})
			},
			getThumbs(){
				this.$http.get('api/getthumimages/'+this.id)
				.then(result => {
					if(result.body.status === 0){
						result.body.message.forEach(item => {
							item.w = 600
							item.h = 400
						})
						
						this.list = result.body.message
						console.log(this.list);
					}
				})
			}
		},
		components: {
			comment
		}
	}
</script>
<style lang="scss" scoped> 
	.photoinfo-container {
		padding: 5px;
		.photoinfo-title {
			h3 {
				font-size: 18px;
				color: #26a2ff;
				text-align: center;
				padding: 10px 0;
			}
			.photoinfo-subtitle {
				padding-top: 5px;
				display: flex;
				justify-content: space-between;
			}
		}
		.thumb {
			text-align: center;
			img {
				margin: 0 5px;
			}
		}
		.content {
			font-size: 16px;
			line-height: 30px;
			margin-bottom: 30px;
		}
	}
</style>