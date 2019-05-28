<template>
	<div>
		<swipe :lunbotulist="lunbolist" :isfull="true"></swipe>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
		  <router-link to="/home/newslist">
		    <span class="mui-icon mui-icon-home"></span>
		    <div class="mui-media-body">新闻资讯</div>
		    </router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 "><router-link to="/home/photolist">
		    <span class="mui-icon mui-icon-email"></span>
		    <div class="mui-media-body">图片分享</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 "><router-link to="/home/goodslist">
		    <span class="mui-icon mui-icon-chatbubble"></span>
		    <div class="mui-media-body">商品购买</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
		    <span class="mui-icon mui-icon-location"></span>
		    <div class="mui-media-body">留言反馈</div></a></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
		    <span class="mui-icon mui-icon-search"></span>
		    <div class="mui-media-body">视频专区</div></a></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
		    <span class="mui-icon mui-icon-phone"></span>
		    <div class="mui-media-body">联系我们</div></a></li>
		</ul> 
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import swipe from '../subcomponent/swipe.vue'
	export default {
		data(){
			return {
				lunbolist: []
			}
		},
		created(){
			this.getlunbotu()
		},
		methods: {
			getlunbotu(){
				this.$http.get('api/getlunbo').then(result => {
					if(result.body.status === 0){
						this.lunbolist = result.body.message
						// console.log(result.body);
					}else{
						Toast('获取数据失败')
					}
				})
			}
		},
		components: {
			swipe
		}
	}
</script>

<style lang="scss" scoped>
	.mui-grid-view.mui-grid-9 {
		background-color: white;
		border: none;
		.mui-table-view-cell {
			border: none;
			.mui-media-body {
				font-size: 13px;
			}
	}
	}
	
</style>