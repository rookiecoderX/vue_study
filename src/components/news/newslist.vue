<template>
	<div>
		<ul class="mui-table-view" v-for="item in newslist" :key="item.id">
			<li class="mui-table-view-cell mui-media">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1 v-text="item.title"></h1>
						<p class='mui-ellipsis'><span>发表时间：{{ item.add_time | dateFormat }}</span><span>点击: {{ item.click }} 次</span></p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				newslist: []
			}
		},
		created(){
			this.getnewslist()
		},
		methods: {
			getnewslist(){
				this.$http.get('api/getnewslist').then(result => {
					if(result.body.status===0){
						this.newslist = result.body.message
						// console.log(this.newslist);
					}else{
						Toast('获取失败')
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mui-table-view {
		li {
			.mui-media-body {
				h1 {
					font-size: 13px;
					}
				.mui-ellipsis {
					font-size: 12px;
					display: flex;
					color: #226aff;
					justify-content: space-between;
					}
			}
		}
	}
	
</style>