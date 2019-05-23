<template>
	<div class="newsinfo">
		<h3>{{ newsinfo.title }}</h3>
		<div class="subtitle">
			<span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
			<span>点击： {{ newsinfo.click }} 次</span>
		</div>
		<hr>
		<div class="content" v-html="newsinfo.content" >
			
		</div>
		<comment :id="id"></comment>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	import comment from '../subcomponent/comment.vue'
	export default {
		data(){
			return {
				id: this.$route.params.id,
				newsinfo: {}
			}
		},
		created(){
			this.getnewsinfo()
		},
		methods: {
			getnewsinfo(){
				this.$http.get('api/getnew/'+this.id).then( result => {
					if(result.body.status===0){
						this.newsinfo = result.body.message[0]
						// console.log(this.newsinfo);
						
					}else{
						Toast('获取失败')
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
	.newsinfo {
		padding: 0 5px;
		h3 {
			color: red;
			font-size: 16px;
			text-align: center;
			margin: 10px 5px;
		}
		.subtitle {
			color: #226bff;
			font-size: 14px;
			display: flex;
			justify-content: space-between;
		}
	}
</style>